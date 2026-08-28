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
                'excerpt' => 'Pembangunan jaringan fiber di Banjarbaru sudah masuk tahap penarikan kabel utama.',
                'content' => '<p>Setelah permintaan yang terus masuk dari warga Banjarbaru, kami mulai menarik kabel fiber utama di beberapa titik. Tahap ini ditargetkan selesai dalam beberapa bulan ke depan.</p><h2>Apa artinya buat calon pelanggan</h2><p>Kalau kamu sudah pernah mengecek coverage dan hasilnya waiting list, statusnya akan berubah otomatis begitu jaringan di area kamu siap. Kami sarankan cek ulang secara berkala.</p>',
                'days_ago' => 5,
            ],
            [
                'slug' => 'cara-menata-posisi-router-di-rumah',
                'title' => 'Cara Menata Posisi Router Supaya Sinyal Merata',
                'category' => 'tips-internet',
                'excerpt' => 'Posisi router yang salah bisa bikin sinyal lemah walau paket internetnya cepat.',
                'content' => '<p>Banyak keluhan sinyal lemah sebenarnya bukan karena kecepatan paket, tapi karena penempatan router yang kurang tepat.</p><h2>Beberapa hal yang membantu</h2><ul><li>Letakkan router di tengah rumah, bukan di pojok.</li><li>Hindari menaruh router di dalam lemari atau di lantai.</li><li>Jauhkan dari benda logam besar dan microwave.</li><li>Kalau rumah bertingkat, taruh di lantai tengah.</li></ul>',
                'days_ago' => 12,
            ],
            [
                'slug' => 'jadwal-pemeliharaan-jaringan-bulanan',
                'title' => 'Jadwal Pemeliharaan Jaringan Bulanan',
                'category' => 'pengumuman',
                'excerpt' => 'Pemeliharaan rutin dilakukan pada dini hari untuk menekan gangguan ke pelanggan.',
                'content' => '<p>Setiap bulan kami menjalankan pemeliharaan rutin pada perangkat jaringan. Kegiatan ini dijadwalkan dini hari supaya dampaknya sekecil mungkin.</p><p>Kalau ada pemeliharaan yang berpotensi mengganggu layanan lebih lama, kami akan memberi tahu lebih dulu lewat WhatsApp ke pelanggan yang terdampak.</p>',
                'days_ago' => 20,
            ],
        ];

        foreach ($articles as $article) {
            Article::query()->updateOrCreate(
                ['slug' => $article['slug']],
                [
                    'title' => $article['title'],
                    'category_id' => $categories[$article['category']],
                    'excerpt' => $article['excerpt'],
                    'content' => $article['content'],
                    'published_at' => now()->subDays($article['days_ago']),
                    'status' => PublishStatus::Published,
                ],
            );
        }
    }
}
