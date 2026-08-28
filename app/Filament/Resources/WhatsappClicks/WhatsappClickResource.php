<?php

namespace App\Filament\Resources\WhatsappClicks;

use App\Filament\Resources\WhatsappClicks\Pages\ListWhatsappClicks;
use App\Filament\Resources\WhatsappClicks\Tables\WhatsappClicksTable;
use App\Models\WhatsappClick;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class WhatsappClickResource extends Resource
{
    protected static ?string $model = WhatsappClick::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    protected static string|UnitEnum|null $navigationGroup = 'Analitik';

    protected static ?int $navigationSort = 1;

    protected static ?string $modelLabel = 'Klik WhatsApp';

    protected static ?string $pluralModelLabel = 'Klik WhatsApp';

    public static function table(Table $table): Table
    {
        return WhatsappClicksTable::configure($table);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListWhatsappClicks::route('/'),
        ];
    }
}
