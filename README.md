# Mora Republic

Website company profile Mora Republic. Spesifikasi produk ada di [PRD.md](PRD.md), panduan desain di [DESIGN.md](DESIGN.md).

Stack: Laravel 13, Inertia.js, React 19, Tailwind CSS 4, Filament 5 (CMS), MySQL.

## Menjalankan Secara Lokal

```bash
composer setup      # install dependency, generate key, migrate, build asset
php artisan db:seed # isi konten awal dan akun admin
composer dev        # jalankan server, queue, dan vite bersamaan
```

Akun admin bawaan seeder:

- URL: `/admin`
- Email: `admin@morarepublic.test`
- Password: `password`

Ganti password ini sebelum deploy. Hanya user dengan kolom `is_admin` bernilai true yang bisa masuk CMS, dan website ini tidak punya pendaftaran publik.

## Struktur Halaman

| URL                  | Sumber konten                                     |
| -------------------- | ------------------------------------------------- |
| `/`                  | Halaman `home` di CMS Halaman, plus layanan dan berita terbaru |
| `/tentang-kami`      | CMS Halaman                                       |
| `/layanan`           | CMS Layanan                                       |
| `/layanan/{slug}`    | CMS Layanan                                       |
| `/berita`            | CMS Berita                                        |
| `/berita/{slug}`     | CMS Berita                                        |
| `/cek-coverage`      | Data area dan status coverage                     |
| `/faq`               | CMS FAQ                                           |
| `/kontak`            | CMS Halaman, plus form kontak                     |
| `/{slug}`            | Halaman statis dulu, lalu landing page dinamis    |
| `/sitemap.xml`       | Otomatis, termasuk landing page yang published    |

Slug root dipakai bersama oleh halaman statis dan landing page. Halaman statis selalu menang, dan slug bawaan seperti `layanan` atau `berita` diblokir di form landing page lewat `LandingPage::RESERVED_SLUGS`.

## Landing Page Dinamis

Halaman iklan per kombinasi area dan produk dibuat dari CMS, bukan dari kode. Admin mengisi slug, area, produk, headline, benefit, FAQ, keyword, dan meta SEO, lalu halaman langsung tersedia di URL tersebut memakai template `resources/js/pages/LandingPage.jsx`.

Kolom `primary_keyword`, `secondary_keywords`, `customer_terms`, dan `search_term_actual` menggantikan spreadsheet keyword lock. Variasi kata dengan maksud sama dikumpulkan di `customer_terms`, bukan dibuatkan halaman terpisah.

## Import Search Term

Menu **Landing Page > Import Search Term** menerima CSV export Google Search Console. CSV minimal punya kolom `Query` dan `Page` (atau `URL`), opsional `Clicks` dan `Impressions`. Nama kolom bahasa Indonesia juga diterima. Data periode yang sama akan ditimpa, periode lain tetap disimpan.

## Analitik

Dua tabel analitik sengaja tidak menyimpan data pribadi pengunjung:

- `coverage_check_logs`: area yang dicek, jenis layanan, dan hasilnya.
- `whatsapp_clicks`: halaman, area, produk, search term, dan parameter UTM saat tombol WhatsApp diklik.

## Perintah Lain

```bash
php artisan test        # jalankan test suite
./vendor/bin/pint       # rapikan format kode PHP
npm run build           # build asset produksi
```

## Catatan Deploy

- Isi `MAIL_*` di `.env` supaya notifikasi form kontak terkirim. Kalau pengiriman email gagal, pesan tetap tersimpan di CMS dan kegagalannya dicatat di log.
- Isi nomor WhatsApp dan info kontak lewat menu **Pengaturan > Pengaturan Website**. Tombol WhatsApp otomatis disembunyikan kalau nomornya belum diisi.
- Jalankan `php artisan storage:link` supaya gambar yang diunggah admin bisa diakses publik.
- Warna di `DESIGN.md` masih hasil estimasi visual. Verifikasi ke brand asset resmi sebelum dikunci.
