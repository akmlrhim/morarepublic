<?php

namespace App\Filament\Resources\Faqs\Schemas;

use App\Models\Faq;
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
                    ->default(fn (): int => (Faq::max('order') ?? 0) + 1)
                    ->helperText('Terisi otomatis dengan urutan berikutnya, bisa diubah manual kalau perlu.'),
                Toggle::make('is_published')
                    ->label('Tampilkan di website')
                    ->default(true),
            ]);
    }
}
