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
    $this->markTestSkipped('Landing pages routes commented out');
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

it('menampilkan artikel published tanpa kolom published_at', function () {
    Article::create([
        'slug' => 'nanti',
        'title' => 'Nanti',
        'status' => PublishStatus::Published,
    ]);

    $this->get('/artikel/nanti')->assertOk();
});

it('menyembunyikan artikel draft', function () {
    Article::create([
        'slug' => 'draft',
        'title' => 'Draft',
        'status' => PublishStatus::Draft,
    ]);

    $this->get('/artikel/draft')->assertNotFound();
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
        ->and(array_column($nav, 'label'))->toBe(['Beranda', 'Tentang Kami', 'Artikel', 'Coverage Area', 'Kontak']);
});

it('meratakan menu untuk footer tanpa kehilangan halaman', function () {
    $hrefs = array_column(SiteConfig::navLinks(), 'href');

    expect($hrefs)->toBe([
        '/',
        '/tentang-kami',
        '/artikel',
        '/coverage-area',
        '/kontak',
    ]);
});

it('memakai logo bawaan berwarna dan putih', function () {
    $site = SiteConfig::forFrontend();

    expect($site['logo'])->toBe(url('/img/logo_colorized.png'))
        ->and($site['logo_light'])->toBe(url('/img/logo_white.png'));
});
