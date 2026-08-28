<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                TextInput::make('question')
                    ->label('Pertanyaan')
                    ->placeholder('Tulis pertanyaan yang sering ditanyakan')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('answer')
                    ->label('Jawaban')
                    ->placeholder('Tulis jawaban lengkap di sini')
                    ->rows(5)
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->label('Urutan')
                    ->placeholder('0')
                    ->numeric()
                    ->default(0),
                Toggle::make('is_published')
                    ->label('Tampilkan di website')
                    ->default(true),
            ]);
    }
}
