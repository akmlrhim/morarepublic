<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\Service;
use App\Support\Seo;
use App\Support\SiteConfig;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Landing page iklan, satu method per halaman. Kontennya hardcode di sini dan di
 * halaman React masing-masing (resources/js/pages/Landing) supaya tidak perlu admin
 * panel untuk mengelolanya. Area dan produk tetap diambil dari tabel asli supaya
 * harga dan link layanan selalu akurat, dan supaya klik WhatsApp tetap tercatat
 * dengan area_id/product_id yang valid untuk analitik.
 */
class LandingPageController extends Controller
{
    public function wifiMurahBanjarmasin(): Response
    {
        $area = Area::query()->where('slug', 'banjarmasin')->first();
        $product = Service::published()->where('slug', 'my-republic-air-fwa')->first();

        return Inertia::render('Landing/WifiMurahBanjarmasin', [
            'area' => $this->areaProp($area),
            'product' => $this->productProp($product),
            'seo' => Seo::forPage(
                'Wifi Murah Banjarmasin, Pasang Cepat',
                'Cari wifi murah di Banjarmasin? Paket internet rumah kami sudah termasuk perangkat dan pemasangan. Cek ketersediaan area kamu sekarang.',
                '/wifi-murah-banjarmasin',
                $product?->image,
            ),
        ]);
    }

    public function fwaBanjarbaru(): Response
    {
        $area = Area::query()->where('slug', 'banjarbaru')->first();
        $product = Service::published()->where('slug', 'my-republic-air-fwa')->first();

        return Inertia::render('Landing/FwaBanjarbaru', [
            'area' => $this->areaProp($area),
            'product' => $this->productProp($product),
            'seo' => Seo::forPage(
                'Internet FWA Banjarbaru Tanpa Kabel',
                'Layanan internet FWA di Banjarbaru, pasang cepat tanpa perlu menarik kabel ke rumah. Cek ketersediaan area kamu.',
                '/fwa-banjarbaru',
                $product?->image,
            ),
        ]);
    }

    /**
     * @return array{id: int, name: string, slug: string}|null
     */
    private function areaProp(?Area $area): ?array
    {
        return $area?->only(['id', 'name', 'slug']);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function productProp(?Service $product): ?array
    {
        if (! $product) {
            return null;
        }

        return [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'short_description' => $product->short_description,
            'price_display' => $product->priceDisplay(),
            'image' => SiteConfig::asset($product->image),
            'benefits' => $product->benefits ?? [],
        ];
    }
}
