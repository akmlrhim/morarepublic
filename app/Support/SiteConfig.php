<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

/**
 * Data website yang dipakai di semua halaman publik: identitas, kontak, dan menu.
 *
 * Sementara di-hardcode di COMPANY sampai data final dari klien tersedia
 * (dulu bisa diedit lewat halaman "Pengaturan Website" di admin, sekarang dihapus).
 */
class SiteConfig
{
    /** Logo berwarna, dipakai di atas latar terang seperti navbar yang sudah di-scroll. */
    public const DEFAULT_LOGO = '/img/logo_colorized.png';

    /** Logo versi putih, dipakai di atas hero gradient dan footer gelap. */
    public const DEFAULT_LOGO_LIGHT = '/img/logo_white.png';

    /**
     * @var array<string, mixed>
     */
    private const COMPANY = [
        'company_name' => 'Mora Republic',
        'tagline' => 'Internet cepat dan stabil untuk rumah dan usaha di Kalimantan Selatan.',
        'logo' => null,
        'logo_light' => null,
        'whatsapp_number' => '628123456789',
        'whatsapp_message' => 'Halo, saya mau tanya soal layanan internet Mora Republic.',
        'phone' => '0511 1234567',
        'email' => 'halo@morarepublic.test',
        'notification_email' => 'halo@morarepublic.test',
        'address' => "Jl. Ahmad Yani KM 5\nBanjarmasin, Kalimantan Selatan 70249",
        'operating_hours' => 'Senin sampai Jumat, 08.00 sampai 17.00 WITA',
        'map_embed' => null,
        'sales_contact_name' => 'Riqqo',
        'sales_contact_phone' => '0813-4104-187',
        'sales_contact_role' => 'Sales & Pemasangan',
        'facebook_url' => null,
        'instagram_url' => null,
        'youtube_url' => null,
    ];

    public static function companyName(): string
    {
        return self::COMPANY['company_name'] ?: config('app.name');
    }

    /**
     * @return array<string, mixed>
     */
    public static function forFrontend(): array
    {
        $values = self::COMPANY;

        return [
            'name' => $values['company_name'] ?? config('app.name'),
            'tagline' => $values['tagline'] ?? null,
            'logo' => self::asset($values['logo'] ?? null) ?? self::DEFAULT_LOGO,
            'logo_light' => self::asset($values['logo_light'] ?? null) ?? self::DEFAULT_LOGO_LIGHT,
            'whatsapp' => [
                'number' => $values['whatsapp_number'] ?? null,
                'url' => self::whatsappUrl($values),
            ],
            'contact' => [
                'phone' => $values['phone'] ?? null,
                'email' => $values['email'] ?? null,
                'address' => $values['address'] ?? null,
                'hours' => $values['operating_hours'] ?? null,
                'map_embed' => $values['map_embed'] ?? null,
            ],
            'sales_contact' => array_filter([
                'name' => $values['sales_contact_name'] ?? null,
                'phone' => $values['sales_contact_phone'] ?? null,
                'role' => $values['sales_contact_role'] ?? null,
            ]) ?: null,
            'social' => array_filter([
                'facebook' => $values['facebook_url'] ?? null,
                'instagram' => $values['instagram_url'] ?? null,
                'youtube' => $values['youtube_url'] ?? null,
            ]),
            'nav' => self::nav(),
            'nav_links' => self::navLinks(),
        ];
    }

    /**
     * Menu utama. Item yang punya "children" tampil sebagai dropdown,
     * supaya navbar tetap ringkas walau halamannya bertambah.
     *
     * @return list<array{label: string, href?: string, children?: list<array{label: string, href: string, description?: string}>}>
     */
    public static function nav(): array
    {
        return [
            ['label' => 'Beranda', 'href' => '/'],
            ['label' => 'Tentang Kami', 'href' => '/tentang-kami'],
            ['label' => 'Cek Coverage', 'href' => '/cek-coverage'],
            ['label' => 'Berita', 'href' => '/berita'],
            ['label' => 'Kontak', 'href' => '/kontak'],
        ];
    }

    /**
     * Menu yang sudah diratakan, dipakai footer dan tempat lain yang tidak butuh dropdown.
     *
     * @return list<array{label: string, href: string}>
     */
    public static function navLinks(): array
    {
        $links = [];

        foreach (self::nav() as $item) {
            foreach ($item['children'] ?? [$item] as $link) {
                $links[] = ['label' => $link['label'], 'href' => $link['href']];
            }
        }

        return $links;
    }

    public static function asset(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    public static function notificationEmail(): ?string
    {
        return self::COMPANY['notification_email'] ?: config('mail.from.address');
    }

    /**
     * @param  array<string, mixed>  $values
     */
    private static function whatsappUrl(array $values): ?string
    {
        $number = preg_replace('/[^0-9]/', '', (string) ($values['whatsapp_number'] ?? ''));

        if (blank($number)) {
            return null;
        }

        $message = $values['whatsapp_message'] ?? null;

        return 'https://wa.me/'.$number.(filled($message) ? '?text='.rawurlencode($message) : '');
    }
}
