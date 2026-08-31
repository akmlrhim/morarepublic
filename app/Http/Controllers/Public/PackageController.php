<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Service;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(): Response
    {
        $categories = Service::published()
            ->with(['packages' => fn ($query) => $query->orderBy('order')])
            ->orderByDesc('is_hero')
            ->orderBy('order')
            ->get()
            ->map(fn (Service $service) => [
                'slug' => $service->slug,
                'name' => $service->name,
                'packages' => $service->packages
                    ->map(fn (Package $package) => [
                        'id' => $package->id,
                        'name' => $package->name,
                        'description' => $package->description,
                        'speed_mbps' => $package->speed_mbps,
                        'promo_speed_mbps' => $package->promo_speed_mbps,
                        'price_display' => $package->priceDisplay(),
                        'promo_price_display' => $package->promoPriceDisplay(),
                    ])
                    ->values(),
            ])
            ->filter(fn (array $category) => $category['packages']->isNotEmpty())
            ->values();

        return Inertia::render('Packages/Index', [
            'categories' => $categories,
            'seo' => Seo::forPage(
                'Daftar Paket dan Harga',
                'Semua paket dan harga layanan internet kami, bisa difilter berdasarkan jenis layanan.',
                '/paket-dan-harga',
            ),
        ]);
    }
}
