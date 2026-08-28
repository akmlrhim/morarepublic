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
        'description',
        'price',
        'features',
        'is_featured',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
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
}
