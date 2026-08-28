<?php

namespace App\Http\Controllers\Public;

use App\Enums\PublishStatus;
use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Service;
use App\Support\Seo;
use App\Support\SiteConfig;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function show(Service $service): Response
    {
        abort_unless($service->status === PublishStatus::Published, 404);

        $service->loadMissing('packages');

        return Inertia::render('Services/Show', [
            'service' => [
                'slug' => $service->slug,
                'name' => $service->name,
                'short_description' => $service->short_description,
                'content' => $service->content,
                'image' => SiteConfig::asset($service->image),
                'icon' => $service->icon,
                'price_display' => $service->priceDisplay(),
                'benefits' => $service->benefits ?? [],
                'packages' => self::toPackages($service),
                'is_hero' => $service->is_hero,
                'id' => $service->id,
            ],
            'seo' => Seo::forPage(
                $service->meta_title ?: $service->name,
                $service->meta_description ?: $service->short_description,
                '/layanan/'.$service->slug,
                $service->image,
            ),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public static function toCard(Service $service): array
    {
        return [
            'slug' => $service->slug,
            'name' => $service->name,
            'short_description' => $service->short_description,
            'icon' => $service->icon,
            'image' => SiteConfig::asset($service->image),
            'price_display' => $service->priceDisplay(),
            'packages' => self::toPackages($service),
            'is_hero' => $service->is_hero,
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private static function toPackages(Service $service): array
    {
        return $service->packages
            ->map(fn (Package $package) => [
                'id' => $package->id,
                'name' => $package->name,
                'speed_mbps' => $package->speed_mbps,
                'description' => $package->description,
                'price_display' => $package->priceDisplay(),
                'has_price' => $package->price !== null,
                'features' => $package->features ?? [],
                'is_featured' => $package->is_featured,
            ])
            ->values()
            ->all();
    }
}
