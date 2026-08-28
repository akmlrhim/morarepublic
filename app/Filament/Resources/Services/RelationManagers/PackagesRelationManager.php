<?php

namespace App\Filament\Resources\Services\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PackagesRelationManager extends RelationManager
{
    protected static string $relationship = 'packages';

    protected static ?string $title = 'Paket Harga';

    public function form(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            TextInput::make('name')
                ->label('Nama paket')
                ->placeholder('Contoh: Fiber Value')
                ->required()
                ->helperText('Mis. "Fiber Value" atau "Paket Hemat".'),
            TextInput::make('speed_mbps')
                ->label('Kecepatan (Mbps)')
                ->placeholder('50')
                ->numeric()
                ->suffix('Mbps')
                ->helperText('Opsional. Ditampilkan sebagai angka besar di kartu harga.'),
            Toggle::make('is_featured')
                ->label('Tandai sebagai favorit')
                ->helperText('Menampilkan label "Favorit" di kartu harga.'),
            TextInput::make('description')
                ->label('Keterangan singkat')
                ->placeholder('Contoh: Cocok untuk 1-2 perangkat')
                ->helperText('Opsional, mis. "Cocok untuk 1-2 perangkat".'),
            TextInput::make('price')
                ->label('Harga')
                ->placeholder('150000')
                ->numeric()
                ->prefix('Rp')
                ->helperText('Kosongkan kalau harga custom atau nego.'),
            TextInput::make('price_label')
                ->label('Label harga')
                ->placeholder('Contoh: Per bulan')
                ->datalist(['Per bulan', 'Sekali bayar', 'Hubungi kami']),
            TagsInput::make('features')
                ->label('Poin fitur')
                ->placeholder('Unlimited, tanpa FUP')
                ->helperText('Ditampilkan sebagai daftar centang di kartu harga.'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->reorderable('order')
            ->recordTitleAttribute('name')
            ->columns([
                TextColumn::make('name')
                    ->label('Nama paket'),
                TextColumn::make('speed_mbps')
                    ->label('Kecepatan')
                    ->placeholder('-')
                    ->suffix(' Mbps'),
                IconColumn::make('is_featured')
                    ->label('Favorit')
                    ->boolean(),
                TextColumn::make('price')
                    ->label('Harga')
                    ->state(fn ($record) => $record->priceDisplay() ?? 'Belum diatur'),
            ])
            ->headerActions([
                CreateAction::make()->label('Tambah paket'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->defaultSort('order');
    }
}
