<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Service;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = collect();

        $staticPaths = [
            'home' => ['/', '1.0'],
            'packages.index' => ['/paket-dan-harga', '0.8'],
            'articles.index' => ['/berita', '0.8'],
            'coverage.show' => ['/cek-coverage', '0.8'],
            'contact.show' => ['/kontak', '0.8'],
            'about' => ['/tentang-kami', '0.7'],
            'faq' => ['/faq', '0.7'],
            'landing.wifi-murah-banjarmasin' => ['/wifi-murah-banjarmasin', '0.9'],
            'landing.fwa-banjarbaru' => ['/fwa-banjarbaru', '0.9'],
        ];

        foreach ($staticPaths as $routeName => [$path, $priority]) {
            if (Route::has($routeName)) {
                $urls->push(['loc' => url($path), 'priority' => $priority]);
            }
        }

        Service::published()
            ->get(['slug', 'updated_at'])
            ->each(fn (Service $service) => $urls->push([
                'loc' => url('/layanan/'.$service->slug),
                'lastmod' => $service->updated_at?->toAtomString(),
                'priority' => '0.8',
            ]));

        Article::published()
            ->get(['slug', 'updated_at'])
            ->each(fn (Article $article) => $urls->push([
                'loc' => url('/berita/'.$article->slug),
                'lastmod' => $article->updated_at?->toAtomString(),
                'priority' => '0.6',
            ]));

        return response()
            ->view('sitemap', ['urls' => $urls->unique('loc')->values()])
            ->header('Content-Type', 'application/xml');
    }
}
