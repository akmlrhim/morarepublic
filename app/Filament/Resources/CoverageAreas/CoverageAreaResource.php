<?php

namespace App\Filament\Resources\CoverageAreas;

use App\Filament\Resources\CoverageAreas\Pages\CreateCoverageArea;
use App\Filament\Resources\CoverageAreas\Pages\EditCoverageArea;
use App\Filament\Resources\CoverageAreas\Pages\ListCoverageAreas;
use App\Filament\Resources\CoverageAreas\Schemas\CoverageAreaForm;
use App\Filament\Resources\CoverageAreas\Tables\CoverageAreasTable;
use App\Models\CoverageArea;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CoverageAreaResource extends Resource
{
    protected static ?string $model = CoverageArea::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSignal;

    protected static string|UnitEnum|null $navigationGroup = 'Coverage';

    protected static ?int $navigationSort = 2;

    protected static ?string $modelLabel = 'Status Coverage';

    protected static ?string $pluralModelLabel = 'Status Coverage';

    public static function form(Schema $schema): Schema
    {
        return CoverageAreaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CoverageAreasTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCoverageAreas::route('/'),
            'create' => CreateCoverageArea::route('/create'),
            'edit' => EditCoverageArea::route('/{record}/edit'),
        ];
    }
}
