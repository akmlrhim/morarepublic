<?php

namespace App\Models\Concerns;

use Illuminate\Support\Str;

/**
 * Mengisi kolom slug otomatis dari kolom sumber (default: name) saat record
 * dibuat, kalau slug belum diisi manual. Dipakai supaya field slug tidak
 * perlu ditampilkan di form admin.
 *
 * Model yang pakai trait ini bisa override slugSourceColumn() kalau sumbernya
 * bukan "name" (mis. Article pakai "title").
 */
trait HasSlug
{
    protected static function bootHasSlug(): void
    {
        static::creating(function (self $model) {
            if (filled($model->slug)) {
                return;
            }

            $source = (string) $model->{$model->slugSourceColumn()};

            if (blank($source)) {
                return;
            }

            $model->slug = static::generateUniqueSlug($source);
        });
    }

    public function slugSourceColumn(): string
    {
        return 'name';
    }

    protected static function generateUniqueSlug(string $source): string
    {
        $base = Str::slug($source);
        $slug = $base;
        $suffix = 2;

        while (static::query()->where('slug', $slug)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
