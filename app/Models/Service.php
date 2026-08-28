<?php

namespace App\Models;

use App\Enums\PublishStatus;
use App\Models\Concerns\HasSeoMeta;
use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasSeoMeta;
    use HasSlug;

    protected $fillable = [
        'slug',
        'name',
        'short_description',
        'content',
        'image',
        'benefits',
        'customer_terms',
        'is_hero',
        'order',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'customer_terms' => 'array',
            'is_hero' => 'boolean',
            'status' => PublishStatus::class,
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', PublishStatus::Published);
    }

    public function packages(): HasMany
    {
        return $this->hasMany(Package::class)->orderBy('order');
    }
}
