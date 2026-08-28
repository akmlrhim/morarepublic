<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum ServiceType: string implements HasColor, HasLabel
{
    case Fwa = 'fwa';
    case Ftth = 'ftth';

    public function getLabel(): string
    {
        return match ($this) {
            self::Fwa => 'FWA (Internet Nirkabel)',
            self::Ftth => 'FTTH (Fiber ke Rumah)',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Fwa => 'info',
            self::Ftth => 'primary',
        };
    }

    public function shortLabel(): string
    {
        return match ($this) {
            self::Fwa => 'FWA',
            self::Ftth => 'FTTH',
        };
    }
}
