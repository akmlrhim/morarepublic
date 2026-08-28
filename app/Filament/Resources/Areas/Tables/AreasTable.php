<?php

namespace App\Filament\Resources\Areas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class AreasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Area')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('aliases')
                    ->label('Penulisan lain')
                    ->badge()
                    ->limitList(3)
                    ->placeholder('Tidak ada'),
                TextColumn::make('coverage_areas_count')
                    ->label('Layanan terdaftar')
                    ->counts('coverageAreas'),
                IconColumn::make('is_test_variant')
                    ->label('Uji coba')
                    ->boolean(),
            ])
            ->filters([
                TernaryFilter::make('is_test_variant')
                    ->label('Area uji coba'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('name');
    }
}
