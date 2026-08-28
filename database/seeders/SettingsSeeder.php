<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        Setting::putMany([
            'company_name' => 'Mora Republic',
            'tagline' => 'Internet cepat dan stabil untuk rumah dan usaha di Kalimantan Selatan.',
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
        ]);
    }
}
