<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Berapa lama proses pemasangan setelah saya mendaftar?',
                'answer' => 'Untuk area yang sudah tercover, pemasangan umumnya dijadwalkan dalam dua hari kerja. Untuk FTTH bisa lebih lama kalau perlu penarikan kabel tambahan.',
            ],
            [
                'question' => 'Apa bedanya FWA dan FTTH?',
                'answer' => 'FWA memakai koneksi nirkabel ke pemancar terdekat, jadi pemasangannya lebih cepat dan tidak perlu menarik kabel. FTTH memakai kabel fiber optik langsung ke rumah, hasilnya lebih stabil terutama saat banyak perangkat terhubung.',
            ],
            [
                'question' => 'Kalau area saya belum tercover, apa yang bisa saya lakukan?',
                'answer' => 'Kamu bisa hubungi tim kami supaya area kamu tercatat sebagai permintaan. Data permintaan per wilayah ini yang kami pakai untuk menentukan prioritas pembangunan jaringan berikutnya.',
            ],
            [
                'question' => 'Apakah ada biaya pemasangan di awal?',
                'answer' => 'Biaya pemasangan berbeda per paket dan per area. Tim kami akan menjelaskan rinciannya sebelum pemasangan dijadwalkan, jadi tidak ada biaya yang muncul mendadak.',
            ],
            [
                'question' => 'Bagaimana kalau koneksi saya bermasalah?',
                'answer' => 'Hubungi kami lewat WhatsApp atau telepon. Tim teknis akan mengecek dari sisi jaringan dulu, dan kalau perlu kunjungan ke lokasi kami jadwalkan secepatnya.',
            ],
            [
                'question' => 'Apakah modem atau router sudah termasuk?',
                'answer' => 'Ya, perangkat sudah termasuk dalam paket berlangganan. Perangkat tetap milik kami dan dirawat selama kamu berlangganan.',
            ],
        ];

        foreach ($faqs as $index => $faq) {
            Faq::query()->updateOrCreate(
                ['question' => $faq['question']],
                $faq + ['order' => $index + 1, 'is_published' => true],
            );
        }
    }
}
