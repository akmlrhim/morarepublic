<?php

namespace App\Services;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use App\Models\Area;
use App\Models\CoverageArea;
use App\Models\CoverageCheckLog;
use Illuminate\Support\Str;

/**
 * Mencocokkan input area dari user ke data coverage, lalu mencatat hasilnya
 * untuk analitik permintaan per wilayah. Tidak menyimpan data pribadi.
 */
class CoverageChecker
{
    /**
     * @return array{area: ?Area, service_type: ServiceType, status: CoverageStatus, note: ?string}
     */
    public function check(string $query, ServiceType $serviceType): array
    {
        $area = $this->matchArea($query);

        $coverage = $area
            ? CoverageArea::query()
                ->where('area_id', $area->id)
                ->where('service_type', $serviceType)
                ->first()
            : null;

        $status = $coverage?->status ?? CoverageStatus::Unavailable;

        CoverageCheckLog::create([
            'area_id' => $area?->id,
            'service_type' => $serviceType,
            'result' => $status,
            'query_text' => Str::limit(trim($query), 190, ''),
        ]);

        return [
            'area' => $area,
            'service_type' => $serviceType,
            'status' => $status,
            'note' => $coverage?->note,
        ];
    }

    /**
     * Cocokkan input bebas ke area, lewat nama, slug, atau penulisan lain.
     */
    public function matchArea(string $query): ?Area
    {
        $needle = $this->normalise($query);

        if ($needle === '') {
            return null;
        }

        $areas = Area::query()->get();

        foreach ($areas as $area) {
            foreach ($area->searchableTerms() as $term) {
                if ($this->normalise($term) === $needle) {
                    return $area;
                }
            }
        }

        foreach ($areas as $area) {
            foreach ($area->searchableTerms() as $term) {
                $candidate = $this->normalise($term);

                if ($candidate !== '' && str_contains($needle, $candidate)) {
                    return $area;
                }
            }
        }

        return null;
    }

    private function normalise(string $value): string
    {
        return trim(preg_replace('/\s+/', ' ', Str::lower(Str::ascii($value))));
    }
}
