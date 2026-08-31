<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Service;
use App\Support\Seo;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $services = Service::published()
            ->orderByDesc('is_hero')
            ->orderBy('order')
            ->limit(6)
            ->get()
            ->map(fn (Service $service) => ServiceController::toCard($service));

        $articles = Article::published()
            ->with('category')
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Article $article) => ArticleController::toCard($article));

        return Inertia::render('Home', [
            'services' => $services,
            'articles' => $articles,
            'seo' => Seo::forPage(
                'Internet Cepat dan Stabil untuk Rumah dan Usaha',
                'Layanan internet FWA dan FTTH dengan jangkauan yang terus bertambah di Kalimantan Selatan. Cek ketersediaan di area kamu.',
                '/',
            ),
        ]);
    }
}
