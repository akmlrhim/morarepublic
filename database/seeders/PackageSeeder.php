<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Models\Service;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $baseFeatures = ['Unlimited, tanpa FUP', 'Gratis pemasangan*', 'ONT + router WiFi'];

        $this->seedFor('my-republic-air-fwa', [
            [
                'name' => 'Air Hemat',
                'speed_mbps' => 10,
                'description' => 'Cocok untuk 1-2 perangkat, browsing dan streaming ringan.',
                'features' => [...$baseFeatures, 'Latency rendah & stabil'],
            ],
            [
                'name' => 'Air Keluarga',
                'speed_mbps' => 20,
                'description' => 'Cocok untuk keluarga kecil dengan beberapa perangkat aktif.',
                'features' => [...$baseFeatures, 'WFH, meeting & kelas online'],
                'is_featured' => true,
            ],
            [
                'name' => 'Air Plus',
                'speed_mbps' => 50,
                'description' => 'Cocok untuk kerja dari rumah dan streaming HD.',
                'features' => [...$baseFeatures, 'Streaming 4K multi-device'],
            ],
        ]);

        $this->seedFor('my-republic-ftth', [
            [
                'name' => 'Fiber Value',
                'speed_mbps' => 30,
                'description' => 'Paket dasar untuk kebutuhan rumah tangga.',
                'features' => [...$baseFeatures, 'Latency rendah & stabil', 'Stabil di segala cuaca'],
            ],
            [
                'name' => 'Fiber Keluarga',
                'speed_mbps' => 75,
                'description' => 'Cocok untuk banyak perangkat terhubung sekaligus.',
                'features' => [...$baseFeatures, 'Cocok untuk keluarga aktif'],
                'is_featured' => true,
            ],
            [
                'name' => 'Fiber Bisnis',
                'speed_mbps' => 150,
                'description' => 'Untuk kebutuhan usaha kecil dan transfer file besar.',
                'features' => [...$baseFeatures, 'Latency ultra rendah', 'Prioritas gaming & kreator'],
            ],
        ]);
    }

    /**
     * @param  list<array{name: string, speed_mbps: int, description: string, features: list<string>, is_featured?: bool}>  $packages
     */
    private function seedFor(string $serviceSlug, array $packages): void
    {
        $service = Service::query()->where('slug', $serviceSlug)->first();

        if (! $service) {
            return;
        }

        $service->packages()->delete();

        foreach ($packages as $index => $package) {
            Package::query()->create(
                $package + [
                    'service_id' => $service->id,
                    'is_featured' => false,
                    'price_label' => 'Hubungi kami',
                    'order' => $index + 1,
                ],
            );
        }
    }
}
