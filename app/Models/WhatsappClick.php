<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WhatsappClick extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = [
        'area_id',
        'product_id',
        'page_path',
        'search_term',
        'utm_source',
        'utm_medium',
        'utm_campaign',
    ];

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'product_id');
    }
}
