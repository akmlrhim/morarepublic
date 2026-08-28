<?php

namespace App\Models;

use App\Models\Concerns\HasSlug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Area extends Model
{
    use HasSlug;

    protected $fillable = ['name', 'slug', 'aliases', 'is_test_variant'];

    protected function casts(): array
    {
        return [
            'aliases' => 'array',
            'is_test_variant' => 'boolean',
        ];
    }

    public function coverageAreas(): HasMany
    {
        return $this->hasMany(CoverageArea::class);
    }

    /**
     * Semua penulisan yang dianggap merujuk ke area ini.
     *
     * @return list<string>
     */
    public function searchableTerms(): array
    {
        return array_values(array_filter(array_merge(
            [$this->name, $this->slug],
            $this->aliases ?? [],
        )));
    }
}
