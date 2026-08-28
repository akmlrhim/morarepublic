<?php

namespace App\Support;

use Filament\Forms\Components\BaseFileUpload;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

/**
 * Dipasang lewat FileUpload::saveUploadedFileUsing() supaya semua gambar yang
 * diunggah admin otomatis dikonversi ke WebP dan dikompres, tanpa perlu diingat
 * satu per satu tiap ada field upload baru.
 *
 * SVG dilewati apa adanya karena format vektor, bukan sesuatu yang bisa
 * dikonversi jadi WebP.
 */
class ImageUploadOptimizer
{
    private const QUALITY = 75;

    private const CONVERTIBLE_MIMES = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/bmp',
    ];

    public static function saveAsWebp(BaseFileUpload $component, TemporaryUploadedFile $file): ?string
    {
        if (! $file->exists()) {
            return null;
        }

        if (! in_array($file->getMimeType(), self::CONVERTIBLE_MIMES, true)) {
            return $component->saveUploadedFile($file);
        }

        $encoded = (new ImageManager(new Driver()))
            ->read($file->getRealPath())
            ->toWebp(quality: self::QUALITY);

        $name = pathinfo($component->getUploadedFileNameForStorage($file), PATHINFO_FILENAME).'.webp';
        $path = trim($component->getDirectory().'/'.$name, '/');

        $component->getDisk()->put($path, (string) $encoded);

        if ($component->getVisibility() === 'public') {
            rescue(fn () => $component->getDisk()->setVisibility($path, 'public'), report: false);
        }

        return $path;
    }
}
