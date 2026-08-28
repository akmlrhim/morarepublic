<?php

namespace App\Filament\Resources\CoverageCheckLogs;

use App\Filament\Resources\CoverageCheckLogs\Pages\ListCoverageCheckLogs;
use App\Filament\Resources\CoverageCheckLogs\Tables\CoverageCheckLogsTable;
use App\Models\CoverageCheckLog;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CoverageCheckLogResource extends Resource
{
    protected static ?string $model = CoverageCheckLog::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMagnifyingGlassCircle;

    protected static string|UnitEnum|null $navigationGroup = 'Analitik';

    protected static ?int $navigationSort = 2;

    protected static ?string $modelLabel = 'Log Cek Coverage';

    protected static ?string $pluralModelLabel = 'Log Cek Coverage';

    public static function table(Table $table): Table
    {
        return CoverageCheckLogsTable::configure($table);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCoverageCheckLogs::route('/'),
        ];
    }
}
