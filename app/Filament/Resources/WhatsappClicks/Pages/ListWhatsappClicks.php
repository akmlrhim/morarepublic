<?php

namespace App\Filament\Resources\WhatsappClicks\Pages;

use App\Filament\Resources\WhatsappClicks\WhatsappClickResource;
use App\Filament\Widgets\WhatsappClickBreakdown;
use Filament\Resources\Pages\ListRecords;

class ListWhatsappClicks extends ListRecords
{
    protected static string $resource = WhatsappClickResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            WhatsappClickBreakdown::class,
        ];
    }
}
