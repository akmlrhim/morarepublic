<?php

namespace App\Filament\Resources\CoverageAreas\Schemas;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CoverageAreaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Select::make('area_id')
                    ->label('Area')
                    ->placeholder('Pilih area')
                    ->relationship('area', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('service_type')
                    ->label('Jenis layanan')
                    ->placeholder('Pilih jenis layanan')
                    ->options(ServiceType::class)
                    ->required(),
                Select::make('status')
                    ->label('Status ketersediaan')
                    ->placeholder('Pilih status')
                    ->options(CoverageStatus::class)
                    ->default(CoverageStatus::Unavailable)
                    ->required(),
                TextInput::make('note')
                    ->label('Catatan')
                    ->placeholder('Contoh: perkiraan waktu pembangunan jaringan')
                    ->columnSpanFull(),
            ]);
    }
}
