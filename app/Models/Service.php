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
        'icon',
        'image',
        'price',
        'price_label',
        'benefits',
        'customer_terms',
        'is_hero',
        'order',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
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

    /**
     * Harga siap tampil, mis. "Mulai dari Rp 150.000" atau "Hubungi kami".
     */
    public function priceDisplay(): ?string
    {
        if ($this->price === null) {
            return $this->price_label ?: null;
        }

        $amount = 'Rp '.number_format((float) $this->price, 0, ',', '.');

        return trim(($this->price_label ? $this->price_label.' ' : '').$amount);
    }
}
