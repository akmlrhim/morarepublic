<?php

namespace App\Support;

use Illuminate\Support\Str;

class Seo
{
    /** Dipakai kalau halaman tidak punya gambar sendiri, supaya preview share tetap ada gambarnya. */
    public const DEFAULT_IMAGE = '/img/hero-home.webp';

    /**
     * @return array{title: string, description: ?string, canonical: string, image: ?string}
     */
    public static function forPage(?string $title, ?string $description, string $path, ?string $image = null): array
    {
        $siteName = SiteConfig::companyName();
        $title = trim((string) $title);

        return [
            'title' => $title === '' ? $siteName : $title . ' | ' . $siteName,
            'description' => self::trim($description),
            'canonical' => url($path),
            'image' => SiteConfig::asset($image) ?? url(self::DEFAULT_IMAGE),
        ];
    }

    public static function trim(?string $value, int $length = 160): ?string
    {
        if (blank($value)) {
            return null;
        }

        return Str::limit(trim(strip_tags($value)), $length);
    }
}
