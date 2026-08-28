<?php

namespace App\Http\Controllers\Public;

use App\Enums\PublishStatus;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Support\Seo;
use App\Support\SiteConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('kategori');

        $articles = Article::published()
            ->with('category')
            ->when($categorySlug, fn ($query) => $query->whereHas(
                'category',
                fn ($q) => $q->where('slug', $categorySlug)
            ))
            ->orderByDesc('published_at')
            ->paginate(9)
            ->withQueryString()
            ->through(fn (Article $article) => self::toCard($article));

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'categories' => Category::query()
                ->orderBy('name')
                ->get(['name', 'slug']),
            'activeCategory' => $categorySlug,
            'seo' => Seo::forPage(
                'Berita',
                'Kabar terbaru, pengumuman layanan, dan artikel dari kami.',
                '/berita',
            ),
        ]);
    }

    public function show(Article $article): Response
    {
        abort_unless(
            $article->status === PublishStatus::Published
                && ($article->published_at === null || $article->published_at->isPast()),
            404
        );

        $related = Article::published()
            ->whereKeyNot($article->getKey())
            ->when($article->category_id, fn ($query) => $query->where('category_id', $article->category_id))
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Article $item) => self::toCard($item));

        return Inertia::render('Articles/Show', [
            'article' => [
                'title' => $article->title,
                'slug' => $article->slug,
                'content' => $article->content,
                'cover_image' => SiteConfig::asset($article->cover_image),
                'published_at' => $article->published_at?->toIso8601String(),
                'category' => $article->category?->only(['name', 'slug']),
            ],
            'related' => $related,
            'seo' => Seo::forPage(
                $article->meta_title ?: $article->title,
                $article->meta_description ?: self::excerpt($article),
                '/berita/'.$article->slug,
                $article->cover_image,
            ),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public static function toCard(Article $article): array
    {
        return [
            'title' => $article->title,
            'slug' => $article->slug,
            'excerpt' => self::excerpt($article),
            'cover_image' => SiteConfig::asset($article->cover_image),
            'published_at' => $article->published_at?->toIso8601String(),
            'category' => $article->category?->only(['name', 'slug']),
        ];
    }

    private static function excerpt(Article $article): string
    {
        return $article->excerpt
            ?: Str::limit(trim(strip_tags((string) $article->content)), 160);
    }
}
