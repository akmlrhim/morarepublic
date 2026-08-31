<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Package extends Model
{
    protected $fillable = [
        'service_id',
        'name',
        'speed_mbps',
        'promo_speed_mbps',
        'description',
        'price',
        'promo_price',
        'features',
        'is_featured',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'promo_price' => 'decimal:2',
            'features' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Harga siap tampil, mis. "Rp 150.000".
     */
    public function priceDisplay(): ?string
    {
        if ($this->price === null) {
            return null;
        }

        return 'Rp '.number_format((float) $this->price, 0, ',', '.');
    }

    /**
     * Harga promo siap tampil, mis. "Rp 99.000". Null kalau tidak ada promo.
     */
    public function promoPriceDisplay(): ?string
    {
        if ($this->promo_price === null) {
            return null;
        }

        return 'Rp '.number_format((float) $this->promo_price, 0, ',', '.');
    }

    public function hasPromoPrice(): bool
    {
        return $this->promo_price !== null;
    }

    public function hasPromoSpeed(): bool
    {
        return $this->promo_speed_mbps !== null;
    }
}
