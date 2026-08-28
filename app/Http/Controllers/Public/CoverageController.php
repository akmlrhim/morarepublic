<?php

namespace App\Http\Controllers\Public;

use App\Enums\ServiceType;
use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\CoverageArea;
use App\Services\CoverageChecker;
use App\Support\Seo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class CoverageController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('CoverageCheck', [
            'areaSuggestions' => Area::query()
                ->where('is_test_variant', false)
                ->orderBy('name')
                ->pluck('name'),
            'serviceTypes' => collect(ServiceType::cases())->map(fn (ServiceType $type) => [
                'value' => $type->value,
                'label' => $type->getLabel(),
                'short' => $type->shortLabel(),
            ]),
            'seo' => Seo::forPage(
                'Cek Coverage',
                'Cek ketersediaan layanan FWA dan FTTH di area kamu sebelum berlangganan.',
                '/cek-coverage',
            ),
        ]);
    }

    public function check(Request $request, CoverageChecker $checker): RedirectResponse
    {
        $validated = $request->validate([
            'area' => ['required', 'string', 'max:190'],
            'service_type' => ['required', new Enum(ServiceType::class)],
        ], [
            'area.required' => 'Isi nama area atau alamat kamu dulu.',
            'service_type.required' => 'Pilih jenis layanan yang mau dicek.',
        ]);

        $result = $checker->check(
            $validated['area'],
            ServiceType::from($validated['service_type']),
        );

        $alternatives = $result['area']
            ? CoverageArea::query()
                ->where('area_id', $result['area']->id)
                ->where('service_type', '!=', $result['service_type'])
                ->get()
                ->map(fn (CoverageArea $coverage) => [
                    'service_type' => $coverage->service_type->shortLabel(),
                    'status' => $coverage->status->value,
                    'status_label' => $coverage->status->getLabel(),
                ])
                ->values()
            : collect();

        return back()->with('coverageResult', [
            'query' => $validated['area'],
            'area' => $result['area']?->name,
            'service_type' => $result['service_type']->value,
            'service_label' => $result['service_type']->getLabel(),
            'status' => $result['status']->value,
            'status_label' => $result['status']->getLabel(),
            'description' => $result['status']->description(),
            'note' => $result['note'],
            'alternatives' => $alternatives,
        ]);
    }
}
