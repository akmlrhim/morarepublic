<?php

namespace App\Models;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoverageArea extends Model
{
    protected $fillable = ['area_id', 'service_type', 'status', 'note'];

    protected function casts(): array
    {
        return [
            'service_type' => ServiceType::class,
            'status' => CoverageStatus::class,
        ];
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }
}
