<?php

namespace App\Models\Concerns;

use App\Support\Seo;

/**
 * Mengisi meta_title dan meta_description otomatis dari kolom sumber saat
 * record disimpan, supaya field SEO tidak perlu diisi manual di form admin.
 *
 * Model yang pakai trait ini bisa override seoTitleSourceColumn(),
 * seoDescriptionSourceColumn(), dan seoDescriptionFallbackColumn() kalau
 * sumbernya beda dari default.
 */
trait HasSeoMeta
{
    protected static function bootHasSeoMeta(): void
    {
        static::saving(function (self $model) {
            $model->meta_title = Seo::trim($model->{$model->seoTitleSourceColumn()}, 70);

            $description = $model->{$model->seoDescriptionSourceColumn()};

            if (blank($description) && $fallback = $model->seoDescriptionFallbackColumn()) {
                $description = $model->{$fallback};
            }

            $model->meta_description = Seo::trim($description);
        });
    }

    public function seoTitleSourceColumn(): string
    {
        return 'name';
    }

    public function seoDescriptionSourceColumn(): string
    {
        return 'short_description';
    }

    public function seoDescriptionFallbackColumn(): ?string
    {
        return 'content';
    }
}
