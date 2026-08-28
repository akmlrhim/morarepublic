<?php

namespace App\Filament\Resources\Areas\Schemas;

use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AreaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                TextInput::make('name')
                    ->label('Nama area')
                    ->placeholder('Contoh: Banjarmasin')
                    ->required()
                    ->helperText('Nama kota, kecamatan, atau kelurahan. Slug URL dibuat otomatis.'),
                TagsInput::make('aliases')
                    ->label('Penulisan lain')
                    ->placeholder('Banjar, Kota Banjar, Wilayah Banjar')
                    ->columnSpanFull()
                    ->helperText('Variasi penulisan yang dianggap merujuk ke area yang sama saat user cek coverage.'),
                Toggle::make('is_test_variant')
                    ->label('Area uji coba')
                    ->helperText('Nyalakan untuk area yang performanya masih diuji, jadi tidak otomatis disamakan dengan area utama.'),
            ]);
    }
}
