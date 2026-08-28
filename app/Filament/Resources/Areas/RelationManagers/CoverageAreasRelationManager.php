<?php

namespace App\Filament\Resources\Areas\RelationManagers;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CoverageAreasRelationManager extends RelationManager
{
    protected static string $relationship = 'coverageAreas';

    protected static ?string $title = 'Status Layanan di Area Ini';

    public function form(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
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
                ->helperText('Opsional, mis. perkiraan waktu pembangunan jaringan.'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('service_type')
                    ->label('Layanan')
                    ->badge(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge(),
                TextColumn::make('note')
                    ->label('Catatan')
                    ->placeholder('Tidak ada')
                    ->wrap(),
            ])
            ->headerActions([
                CreateAction::make()->label('Tambah layanan'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }
}
