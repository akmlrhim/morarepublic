<?php

use App\Enums\PublishStatus;
use App\Models\Article;

it('mengirim data artikel ke halaman publik', function () {
    foreach (range(1, 3) as $number) {
        Article::create([
            'slug' => 'artikel-'.$number,
            'title' => 'Artikel '.$number,
            'status' => PublishStatus::Published,
            'published_at' => now()->subDay(),
        ]);
    }

    $response = $this->get('/artikel');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('Articles/Index')
        ->has('articles.data', 3)
    );
});
