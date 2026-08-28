<?php

namespace Database\Seeders;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use App\Models\Area;
use App\Models\CoverageArea;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
  public function run(): void
  {
    $areas = [
      [
        'name' => 'Banjarmasin',
        'slug' => 'banjarmasin',
        'aliases' => ['Kota Banjarmasin', 'Bjm'],
        'is_test_variant' => false,
        'coverage' => [
          ['type' => ServiceType::Fwa, 'status' => CoverageStatus::Available, 'note' => null],
          ['type' => ServiceType::Ftth, 'status' => CoverageStatus::Available, 'note' => null],
        ],
      ],
      [
        'name' => 'Banjarbaru',
        'slug' => 'banjarbaru',
        'aliases' => ['Kota Banjarbaru'],
        'is_test_variant' => false,
        'coverage' => [
          ['type' => ServiceType::Fwa, 'status' => CoverageStatus::Available, 'note' => null],
          ['type' => ServiceType::Ftth, 'status' => CoverageStatus::Waitlist, 'note' => 'Pembangunan jaringan fiber ditargetkan selesai kuartal berikutnya.'],
        ],
      ],
      [
        'name' => 'Martapura',
        'slug' => 'martapura',
        'aliases' => ['Kabupaten Banjar', 'Martapura Kota'],
        'is_test_variant' => false,
        'coverage' => [
          ['type' => ServiceType::Fwa, 'status' => CoverageStatus::Available, 'note' => null],
          ['type' => ServiceType::Ftth, 'status' => CoverageStatus::Unavailable, 'note' => null],
        ],
      ],
      [
        'name' => 'Banjar',
        'slug' => 'banjar',
        'aliases' => ['Kota Banjar', 'Wilayah Banjar'],
        'is_test_variant' => true,
        'coverage' => [
          ['type' => ServiceType::Fwa, 'status' => CoverageStatus::Waitlist, 'note' => 'Area ini masih dalam pengujian permintaan.'],
        ],
      ],
    ];

    foreach ($areas as $data) {
      $coverage = $data['coverage'];
      unset($data['coverage']);

      $area = Area::query()->updateOrCreate(['slug' => $data['slug']], $data);

      foreach ($coverage as $item) {
        CoverageArea::query()->updateOrCreate(
          ['area_id' => $area->id, 'service_type' => $item['type']],
          ['status' => $item['status'], 'note' => $item['note']],
        );
      }
    }
  }
}
