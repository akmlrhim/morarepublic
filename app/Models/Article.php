<?php

namespace App\Models;

use App\Enums\PublishStatus;
use App\Models\Concerns\HasSeoMeta;
use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasSeoMeta;
    use HasSlug;

    protected $fillable = [
        'slug',
        'title',
        'category_id',
        'excerpt',
        'content',
        'cover_image',
        'author_name',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => PublishStatus::class,
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', PublishStatus::Published);
    }

    public function slugSourceColumn(): string
    {
        return 'title';
    }

    public function seoTitleSourceColumn(): string
    {
        return 'title';
    }

    public function seoDescriptionSourceColumn(): string
    {
        return 'excerpt';
    }
}
