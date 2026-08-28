<?php

namespace App\Models;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoverageCheckLog extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = ['area_id', 'service_type', 'result', 'query_text'];

    protected function casts(): array
    {
        return [
            'service_type' => ServiceType::class,
            'result' => CoverageStatus::class,
        ];
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }
}
