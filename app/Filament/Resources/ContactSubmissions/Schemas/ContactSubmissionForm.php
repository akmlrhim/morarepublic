<?php

namespace App\Filament\Resources\ContactSubmissions\Schemas;

use App\Enums\SubmissionStatus;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ContactSubmissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Isi Pesan')
                    ->columns(1)
                    ->schema([
                        TextInput::make('name')->label('Nama')->disabled(),
                        TextInput::make('subject')->label('Subjek')->disabled(),
                        TextInput::make('email')->label('Email')->disabled(),
                        TextInput::make('phone')->label('Nomor telepon')->disabled(),
                        Textarea::make('message')
                            ->label('Pesan')
                            ->rows(6)
                            ->disabled()
                            ->columnSpanFull(),
                    ]),

                Section::make('Tindak Lanjut')
                    ->columns(1)
                    ->schema([
                        Select::make('status')
                            ->label('Status')
                            ->placeholder('Pilih status')
                            ->options(SubmissionStatus::class)
                            ->required(),
                        Textarea::make('admin_note')
                            ->label('Catatan internal')
                            ->placeholder('Catatan internal, opsional')
                            ->rows(3),
                    ]),
            ]);
    }
}
