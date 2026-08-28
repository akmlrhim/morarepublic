<?php

namespace App\Filament\Resources\WhatsappClicks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class WhatsappClicksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->description('Rekap klik tombol WhatsApp per halaman, area, dan produk. Tidak menyimpan nama atau nomor pengunjung.')
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                TextColumn::make('page_path')
                    ->label('Halaman')
                    ->placeholder('Tidak tercatat')
                    ->searchable(),
                TextColumn::make('area.name')
                    ->label('Area')
                    ->placeholder('Tidak diketahui')
                    ->searchable(),
                TextColumn::make('product.name')
                    ->label('Produk')
                    ->placeholder('Tidak diketahui')
                    ->searchable(),
                TextColumn::make('search_term')
                    ->label('Search term')
                    ->placeholder('Tidak ada')
                    ->searchable(),
                TextColumn::make('utm_source')
                    ->label('Source')
                    ->placeholder('Direct')
                    ->toggleable(),
                TextColumn::make('utm_campaign')
                    ->label('Campaign')
                    ->placeholder('Tidak ada')
                    ->toggleable(),
            ])
            ->filters([
                SelectFilter::make('area_id')
                    ->label('Area')
                    ->relationship('area', 'name')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('product_id')
                    ->label('Produk')
                    ->relationship('product', 'name')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
