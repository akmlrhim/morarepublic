<?php

namespace App\Support;

use Illuminate\Support\Str;

/**
 * Menyusun meta title/description konsisten untuk semua halaman publik.
 */
class Seo
{
    /**
     * @return array{title: string, description: ?string, canonical: string, image: ?string}
     */
    public static function forPage(?string $title, ?string $description, string $path, ?string $image = null): array
    {
        $siteName = SiteConfig::companyName();
        $title = trim((string) $title);

        return [
            'title' => $title === '' ? $siteName : $title.' | '.$siteName,
            'description' => self::trim($description),
            'canonical' => url($path),
            'image' => SiteConfig::asset($image),
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
