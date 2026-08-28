<?php

namespace App\Filament\Resources\CoverageCheckLogs\Pages;

use App\Filament\Resources\CoverageCheckLogs\CoverageCheckLogResource;
use Filament\Resources\Pages\ListRecords;

class ListCoverageCheckLogs extends ListRecords
{
    protected static string $resource = CoverageCheckLogResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
