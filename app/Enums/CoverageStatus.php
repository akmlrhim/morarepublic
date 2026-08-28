<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum CoverageStatus: string implements HasColor, HasLabel
{
    case Available = 'available';
    case Waitlist = 'waitlist';
    case Unavailable = 'unavailable';

    public function getLabel(): string
    {
        return match ($this) {
            self::Available => 'Tersedia',
            self::Waitlist => 'Waiting List',
            self::Unavailable => 'Belum Tersedia',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Available => 'success',
            self::Waitlist => 'warning',
            self::Unavailable => 'danger',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::Available => 'Layanan sudah aktif di area ini dan bisa langsung dipasang.',
            self::Waitlist => 'Area ini sedang dalam antrean pembangunan jaringan. Daftar sekarang untuk diprioritaskan.',
            self::Unavailable => 'Layanan belum menjangkau area ini. Hubungi kami untuk alternatif layanan lain.',
        };
    }
}
