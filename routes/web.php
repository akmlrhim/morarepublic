<?php

use App\Http\Controllers\Public\ArticleController;
use App\Http\Controllers\Public\CompanyController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\CoverageController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\LandingPageController;
use App\Http\Controllers\Public\PackageController;
use App\Http\Controllers\Public\ServiceController;
use App\Http\Controllers\Public\SitemapController;
use App\Http\Controllers\Public\WhatsappClickController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::get('/tentang-kami', [CompanyController::class, 'about'])->name('about');

Route::get('/layanan/{service:slug}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/paket-dan-harga', [PackageController::class, 'index'])->name('packages.index');

Route::get('/berita', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/berita/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::get('/cek-coverage', [CoverageController::class, 'show'])->name('coverage.show');
Route::post('/cek-coverage', [CoverageController::class, 'check'])->name('coverage.check');

// FAQ dipindah ke beranda (lihat Home.jsx #faq); redirect supaya link lama tidak 404.
Route::redirect('/faq', '/#faq', 301)->name('faq');

Route::get('/kontak', [ContactController::class, 'show'])->name('contact.show');
Route::post('/kontak', [ContactController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.store');

Route::post('/track/whatsapp', [WhatsappClickController::class, 'store'])
    ->middleware('throttle:60,1')
    ->name('track.whatsapp');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');

Route::get('/robots.txt', function () {
    return response(
        "User-agent: *\nDisallow: /admin\nDisallow: /livewire\n\nSitemap: ".url('/sitemap.xml')."\n"
    )->header('Content-Type', 'text/plain');
})->name('robots');

/*
 * Landing page iklan. Kontennya hardcode (lihat LandingPageController dan
 * resources/js/pages/Landing), tambahkan baris baru di sini setiap kali ada
 * landing page baru.
 */
Route::get('/wifi-murah-banjarmasin', [LandingPageController::class, 'wifiMurahBanjarmasin'])
    ->name('landing.wifi-murah-banjarmasin');
Route::get('/fwa-banjarbaru', [LandingPageController::class, 'fwaBanjarbaru'])
    ->name('landing.fwa-banjarbaru');
