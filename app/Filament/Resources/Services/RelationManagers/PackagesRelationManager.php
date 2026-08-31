<?php

namespace App\Filament\Resources\Services\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Grid;
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
            Grid::make(2)->schema([
                TextInput::make('speed_mbps')
                    ->label('Kecepatan (Mbps)')
                    ->placeholder('50')
                    ->numeric()
                    ->suffix('Mbps')
                    ->helperText('Opsional. Ditampilkan sebagai angka besar di kartu harga.'),
                TextInput::make('promo_speed_mbps')
                    ->label('Kecepatan promo (Mbps)')
                    ->placeholder('100')
                    ->numeric()
                    ->suffix('Mbps')
                    ->helperText('Opsional. Kalau diisi, kecepatan di atas dicoret dan diganti angka ini.'),
            ]),
            Toggle::make('is_featured')
                ->label('Tandai sebagai favorit')
                ->helperText('Menampilkan label "Favorit" di kartu harga.'),
            TextInput::make('description')
                ->label('Keterangan singkat')
                ->placeholder('Contoh: Cocok untuk 1-2 perangkat')
                ->helperText('Opsional, mis. "Cocok untuk 1-2 perangkat".'),
            Grid::make(2)->schema([
                TextInput::make('price')
                    ->label('Harga')
                    ->placeholder('150000')
                    ->numeric()
                    ->live(debounce: 500)
                    ->hint(fn (?string $state): ?string => filled($state) ? 'Rp '.number_format((int) $state, 0, ',', '.') : null)
                    ->helperText('Kosongkan kalau harga custom atau nego. Ketik angkanya saja, mis. 150000.'),
                TextInput::make('promo_price')
                    ->label('Harga promo')
                    ->placeholder('99000')
                    ->numeric()
                    ->live(debounce: 500)
                    ->hint(fn (?string $state): ?string => filled($state) ? 'Rp '.number_format((int) $state, 0, ',', '.') : null)
                    ->helperText('Opsional. Kalau diisi, harga di atas dicoret dan diganti harga promo ini.'),
            ]),
            Repeater::make('features')
                ->label('Poin fitur')
                ->simple(TextInput::make('item')->label('Fitur')->placeholder('Contoh: Unlimited, tanpa FUP')->required())
                ->addActionLabel('Tambah fitur')
                ->defaultItems(0)
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
                    ->formatStateUsing(fn ($record) => $record->hasPromoSpeed()
                        ? "{$record->promo_speed_mbps} Mbps (dari {$record->speed_mbps} Mbps)"
                        : ($record->speed_mbps !== null ? "{$record->speed_mbps} Mbps" : '-')),
                IconColumn::make('is_featured')
                    ->label('Favorit')
                    ->boolean(),
                TextColumn::make('price')
                    ->label('Harga')
                    ->state(fn ($record) => $record->hasPromoPrice()
                        ? $record->promoPriceDisplay().' (dari '.$record->priceDisplay().')'
                        : ($record->priceDisplay() ?? 'Belum diatur')),
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
