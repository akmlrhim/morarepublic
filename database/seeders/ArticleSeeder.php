<?php

namespace Database\Seeders;

use App\Enums\PublishStatus;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $categories = collect([
            ['name' => 'Pengumuman', 'slug' => 'pengumuman'],
            ['name' => 'Tips Internet', 'slug' => 'tips-internet'],
            ['name' => 'Perluasan Jaringan', 'slug' => 'perluasan-jaringan'],
        ])->mapWithKeys(function (array $data) {
            $category = Category::query()->updateOrCreate(['slug' => $data['slug']], $data);

            return [$data['slug'] => $category->id];
        });

        $articles = [
            [
                'slug' => 'jaringan-ftth-masuk-banjarbaru',
                'title' => 'Jaringan FTTH Mulai Masuk Banjarbaru',
                'category' => 'perluasan-jaringan',
                'author_name' => 'Budi Santoso',
                'excerpt' => 'Pembangunan jaringan fiber di Banjarbaru sudah masuk tahap penarikan kabel utama.',
                'meta_keywords' => 'FTTH, fiber optik, internet cepat, Banjarbaru, jaringan,perluasan',
                'content' => '<p>Setelah permintaan yang terus masuk dari warga Banjarbaru, kami mulai menarik kabel fiber utama di beberapa titik. Tahap ini ditargetkan selesai dalam beberapa bulan ke depan.</p><h2>Apa artinya buat calon pelanggan</h2><p>Kalau kamu sudah pernah mengecek coverage dan hasilnya waiting list, statusnya akan berubah otomatis begitu jaringan di area kamu siap. Kami sarankan cek ulang secara berkala.</p><h2>Tahapan Pembangunan Jaringan</h2><ol><li>Survei lokasi dan perencanaan rute kabel</li><li>Pembuatan jalur underground dan penempatan ODP (Optical Distribution Point)</li><li>Penarikan kabel fiber utama ke seluruh area</li><li>Instalasi ONT (Optical Network Terminal) di rumah pelanggan</li><li>Testing dan aktivasi layanan internet</li></ol><h2>Jadwal Perluasan per Area</h2><table style="width: 100%; border-collapse: collapse; margin: 1rem 0;"><thead><tr style="background-color: #f0dcee;"><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Area</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Target Selesai</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Status</th></tr></thead><tbody><tr><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Jalan Kapten Piere Tendean</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Okt 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Sedang berjalan</td></tr><tr style="background-color: #faf6fa;"><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Jalan Ahmad Yani</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Nov 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Perencanaan</td></tr><tr><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Jalan Sudirman</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Des 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Perencanaan</td></tr></tbody></table><img src="https://images.unsplash.com/photo-1618092742450-dbb6b0dbbb90?q=80&w=800&auto=format&fit=crop" alt="Teknisi instalasi jaringan fiber" style="width: 100%; border-radius: 20px; margin: 1.5rem 0;"><h2>Tips Cek Status Coverage</h2><ul><li>Kunjungi halaman check coverage di website kami</li><li>Masukkan alamat lengkap dengan RT/RW</li><li>Tunggu hasilnya, biasanya instant</li><li>Kalau belum tercakup, daftar di waiting list supaya notifikasi otomatis dapat</li></ul>',
                'cover_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
                'days_ago' => 5,
            ],
            [
                'slug' => 'cara-menata-posisi-router-di-rumah',
                'title' => 'Cara Menata Posisi Router Supaya Sinyal Merata',
                'category' => 'tips-internet',
                'author_name' => 'Siti Aminah',
                'cover_image' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
                'excerpt' => 'Posisi router yang salah bisa bikin sinyal lemah walau paket internetnya cepat.',
                'meta_keywords' => 'router, wifi, sinyal, tips internet, posisi router, jangkauan wifi',
                'content' => '<p>Banyak keluhan sinyal lemah sebenarnya bukan karena kecepatan paket, tapi karena penempatan router yang kurang tepat. Berikut panduan lengkap untuk memaksimalkan sinyal WiFi di rumah.</p><h2>Prinsip Dasar Penempatan Router</h2><ol><li><strong>Posisi sentral</strong> — Letakkan di tengah rumah atau area yang paling banyak digunakan</li><li><strong>Ketinggian optimal</strong> — Taruh di ketinggian 1-2 meter dari lantai, tidak terlalu rendah dan tidak terlalu tinggi</li><li><strong>Area terbuka</strong> — Hindari penempatan di dalam lemari, di balik pintu, atau di ruang tertutup</li><li><strong>Jauh dari penghalang</strong> — Hindari dinding tebal, baja, atau material dense lainnya</li><li><strong>Ventilas baik</strong> — Pastikan tidak terlalu panas, router perlu sirkulasi udara</li></ol><img src="https://images.unsplash.com/photo-1591290619762-37a08faf8b77?q=80&w=800&auto=format&fit=crop" alt="Posisi router yang benar di rumah" style="width: 100%; border-radius: 20px; margin: 1.5rem 0;"><h2>Benda yang Harus Dijauhi</h2><table style="width: 100%; border-collapse: collapse; margin: 1rem 0;"><thead><tr style="background-color: #f0dcee;"><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Benda</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Jarak Minimal</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Alasan</th></tr></thead><tbody><tr><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Microwave</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">2-3 meter</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Gelombang 2.4GHz yang sama</td></tr><tr style="background-color: #faf6fa;"><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Kulkas</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">1-2 meter</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Motor listrik yang kuat</td></tr><tr><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Baby monitor</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">2 meter</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Frekuensi 2.4GHz sama dengan WiFi</td></tr><tr style="background-color: #faf6fa;"><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Aquarium</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">1 meter</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Air menyerap sinyal radio</td></tr></tbody></table><h2>Tips Tambahan</h2><ul><li>Gunakan frekuensi 5GHz jika perangkat mendukung (lebih cepat, jangkauan lebih pendek)</li><li>Ganti channel WiFi jika banyak jaringan tetangga mengganggu</li><li>Update firmware router secara berkala</li><li>Kurangi jumlah perangkat yang terhubung untuk performa optimal</li></ul><img src="https://images.unsplash.com/photo-1516259651218-2849621c3242?q=80&w=800&auto=format&fit=crop" alt="Perbandingan sinyal WiFi 2.4GHz vs 5GHz" style="width: 100%; border-radius: 20px; margin: 1.5rem 0;">',
                'days_ago' => 12,
            ],
            [
                'slug' => 'jadwal-pemeliharaan-jaringan-bulanan',
                'title' => 'Jadwal Pemeliharaan Jaringan Bulanan',
                'category' => 'pengumuman',
                'author_name' => 'Admin Mora',
                'cover_image' => 'https://images.unsplash.com/photo-1558494949-ef010bbbb317?q=80&w=800&auto=format&fit=crop',
                'excerpt' => 'Pemeliharaan rutin dilakukan pada dini hari untuk menekan gangguan ke pelanggan.',
                'meta_keywords' => 'pemeliharaan jaringan, maintenance, downtime, perbaikan jaringan, layanan internet',
                'content' => '<p>Setiap bulan kami menjalankan pemeliharaan rutin pada perangkat jaringan. Kegiatan ini dijadwalkan dini hari supaya dampaknya sekecil mungkin bagi layanan pelanggan kami.</p><h2>Jadwal Pemeliharaan September-Oktober 2026</h2><table style="width: 100%; border-collapse: collapse; margin: 1rem 0;"><thead><tr style="background-color: #f0dcee;"><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Tanggal</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Jam</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Area Terdampak</th><th style="border: 1px solid #e6d9e8; padding: 0.75rem; text-align: left;">Durasi Est.</th></tr></thead><tbody><tr><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">25 Sep 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">01:00 - 03:00</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Banjarmasin Utara</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">2 jam</td></tr><tr style="background-color: #faf6fa;"><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">26 Sep 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">02:00 - 04:00</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Banjarmasin Timur</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">2 jam</td></tr><tr><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">02 Okt 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">01:00 - 03:00</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Banjarbaru</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">2 jam</td></tr><tr style="background-color: #faf6fa;"><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">09 Okt 2026</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">03:00 - 05:00</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">Banjarmasin Selatan</td><td style="border: 1px solid #e6d9e8; padding: 0.75rem;">2 jam</td></tr></tbody></table><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop" alt="Teknisi melakukan pemeliharaan jaringan" style="width: 100%; border-radius: 20px; margin: 1.5rem 0;"><h2>Yang Dilakukan Saat Pemeliharaan</h2><ol><li>Pengecekan kesehatan semua perangkat jaringan (router, ODP, FDT)</li><li>Pembersihan dan replacement filter jika diperlukan</li><li>Update firmware perangkat ke versi terbaru</li><li>Testing konektivitas dan kecepatan di sejumlah titik</li><li>Pencatatan data performa untuk evaluasi</li></ol><h2>Apa yang Perlu Kamu Tahu</h2><ul><li>Layanan internet tidak akan tersedia selama jam pemeliharaan</li><li>Jika ada pemeliharaan di area kamu, notifikasi akan dikirim via WhatsApp H-1</li><li>Setelah maintenance, biasanya performa jaringan lebih stabil dan cepat</li><li>Untuk emergency maintenance di luar jadwal, kami akan memberi pemberitahuan sesegera mungkin</li><li>Kalau ada pertanyaan, bisa hubungi customer service kami melalui WhatsApp atau telepon</li></ul><h2>Benefit dari Pemeliharaan Rutin</h2><p>Pemeliharaan rutin memastikan:</p><ul><li>Uptime jaringan tetap tinggi (99.5%+)</li><li>Tidak ada bottleneck di infrastruktur</li><li>Keamanan jaringan terjaga dari ancaman cyber</li><li>Data pelanggan tersimpan aman dan terenkripsi</li></ul>',
                'days_ago' => 20,
            ],
        ];

        foreach ($articles as $article) {
            Article::query()->updateOrCreate(
                ['slug' => $article['slug']],
                [
                    'title' => $article['title'],
                    'category_id' => $categories[$article['category']],
                    'author_name' => $article['author_name'] ?? null,
                    'cover_image' => $article['cover_image'] ?? null,
                    'excerpt' => $article['excerpt'],
                    'content' => $article['content'],
                    'meta_keywords' => $article['meta_keywords'] ?? null,
                    'created_at' => now()->subDays($article['days_ago']),
                    'status' => PublishStatus::Published,
                ],
            );
        }
    }
}
