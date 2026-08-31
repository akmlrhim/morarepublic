<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = collect();

        $staticPaths = [
            '/' => '1.0',
            '/paket-dan-harga' => '0.8',
            '/berita' => '0.8',
            '/cek-coverage' => '0.8',
            '/kontak' => '0.8',
            '/tentang-kami' => '0.7',
            '/faq' => '0.7',
            '/wifi-murah-banjarmasin' => '0.9',
            '/fwa-banjarbaru' => '0.9',
        ];

        foreach ($staticPaths as $path => $priority) {
            $urls->push(['loc' => url($path), 'priority' => $priority]);
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
