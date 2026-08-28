<?php

namespace App\Filament\Resources\CoverageCheckLogs\Tables;

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CoverageCheckLogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->description('Rekap permintaan cek coverage per wilayah. Tidak menyimpan data pribadi pengunjung.')
            ->columns([
                TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                TextColumn::make('area.name')
                    ->label('Area terdeteksi')
                    ->placeholder('Tidak dikenali')
                    ->searchable(),
                TextColumn::make('query_text')
                    ->label('Yang diketik user')
                    ->searchable()
                    ->placeholder('Tidak ada'),
                TextColumn::make('service_type')
                    ->label('Layanan')
                    ->badge(),
                TextColumn::make('result')
                    ->label('Hasil')
                    ->badge(),
            ])
            ->filters([
                SelectFilter::make('service_type')
                    ->label('Jenis layanan')
                    ->options(ServiceType::class),
                SelectFilter::make('result')
                    ->label('Hasil')
                    ->options(CoverageStatus::class),
                SelectFilter::make('area_id')
                    ->label('Area')
                    ->relationship('area', 'name')
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
