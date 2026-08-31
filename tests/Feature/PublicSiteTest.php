<?php

use App\Enums\PublishStatus;
use App\Models\Article;
use App\Models\Service;
use App\Support\SiteConfig;

it('menampilkan beranda', function () {
    $this->get('/')->assertOk();
});

it('menampilkan halaman statis yang hardcode', function () {
    $this->get('/tentang-kami')->assertOk();
});

it('menampilkan landing page iklan', function () {
    $this->get('/wifi-murah-banjarmasin')->assertOk();
    $this->get('/fwa-banjarbaru')->assertOk();
});

it('menampilkan halaman FAQ lengkap', function () {
    $this->get('/faq')->assertOk();
});

it('menampilkan halaman error kustom untuk 404', function () {
    $this->get('/halaman-tidak-ada')
        ->assertNotFound()
        ->assertInertia(fn ($page) => $page->component('Errors/Error')->where('status', 404));
});

it('hanya menampilkan layanan yang published', function () {
    Service::create(['slug' => 'fwa', 'name' => 'FWA', 'status' => PublishStatus::Published]);
    Service::create(['slug' => 'rahasia', 'name' => 'Rahasia', 'status' => PublishStatus::Draft]);

    $this->get('/layanan/fwa')->assertOk();
    $this->get('/layanan/rahasia')->assertNotFound();
});

it('menyembunyikan artikel yang tanggal publishnya belum tiba', function () {
    Article::create([
        'slug' => 'nanti',
        'title' => 'Nanti',
        'status' => PublishStatus::Published,
        'published_at' => now()->addWeek(),
    ]);

    $this->get('/berita/nanti')->assertNotFound();
});

it('membuat sitemap yang memuat halaman statis', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertSee(url('/tentang-kami'));
});

it('tidak memuat landing page yang rutenya sedang dinonaktifkan', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertDontSee(url('/wifi-murah-banjarmasin'));
});

it('menyusun menu utama jadi lima item', function () {
    $nav = SiteConfig::nav();

    expect($nav)->toHaveCount(5)
        ->and(array_column($nav, 'label'))->toBe(['Beranda', 'Tentang Kami', 'Cek Coverage', 'Berita', 'Kontak']);
});

it('meratakan menu untuk footer tanpa kehilangan halaman', function () {
    $hrefs = array_column(SiteConfig::navLinks(), 'href');

    expect($hrefs)->toBe([
        '/',
        '/tentang-kami',
        '/cek-coverage',
        '/berita',
        '/kontak',
    ]);
});

it('memakai logo bawaan berwarna dan putih', function () {
    $site = SiteConfig::forFrontend();

    expect($site['logo'])->toBe('/img/logo_colorized.png')
        ->and($site['logo_light'])->toBe('/img/logo_white.png');
});
