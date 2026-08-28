<?php

namespace Database\Seeders;

use App\Enums\PublishStatus;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'my-republic-air-fwa',
                'name' => 'My Republic Air - FWA',
                'short_description' => 'Internet nirkabel yang bisa dipasang cepat tanpa perlu menarik kabel ke rumah.',
                'content' => '<p>My Republic Air adalah layanan FWA (Fixed Wireless Access) kami, cocok untuk area yang belum terjangkau kabel fiber. Perangkat modem dipasang di rumah kamu, lalu terhubung ke pemancar terdekat milik kami sehingga internet bisa langsung jalan tanpa penarikan kabel.</p><h2>Kenapa pilih My Republic Air</h2><p>Pemasangan jauh lebih cepat dibanding fiber karena tidak perlu izin penarikan kabel ke rumah. Perangkat sudah termasuk dalam paket dan bisa dipindah kalau kamu pindah rumah di area yang masih terjangkau jaringan kami.</p><h2>Cocok untuk siapa</h2><p>Rumah tangga dengan kebutuhan streaming, kerja dari rumah, dan belajar daring. Juga cocok untuk usaha kecil yang butuh koneksi cepat tanpa pemasangan rumit.</p>',
                'image' => 'services/my-republic-air-fwa.webp',
                'customer_terms' => ['modem wifi', 'modem internet', 'modem portable', 'wifi tanpa kabel', 'my republic air'],
                'is_hero' => true,
                'order' => 1,
            ],
            [
                'slug' => 'my-republic-ftth',
                'name' => 'My Republic - FTTH',
                'short_description' => 'Fiber optik langsung ke rumah untuk kecepatan dan kestabilan paling tinggi.',
                'content' => '<p>My Republic FTTH menarik kabel fiber optik langsung sampai ke rumah kamu. Ini pilihan terbaik kalau kamu butuh koneksi stabil untuk banyak perangkat sekaligus.</p><h2>Kenapa pilih My Republic FTTH</h2><p>Kecepatan unduh dan unggah seimbang, jadi tetap lancar walau dipakai video call, upload konten, dan streaming secara bersamaan. Router dual band sudah termasuk dan pelanggan fiber mendapat prioritas penanganan gangguan.</p><h2>Cocok untuk siapa</h2><p>Keluarga dengan banyak perangkat aktif, pekerja kreatif yang sering mengunggah file besar, dan usaha yang mengandalkan koneksi setiap hari.</p>',
                'image' => 'services/my-republic-ftth.webp',
                'customer_terms' => ['wifi fiber', 'internet kabel', 'indihome alternatif', 'wifi rumah', 'my republic ftth'],
                'is_hero' => false,
                'order' => 2,
            ],
        ];

        foreach ($services as $service) {
            Service::query()->updateOrCreate(
                ['slug' => $service['slug']],
                $service + ['status' => PublishStatus::Published],
            );
        }
    }
}
