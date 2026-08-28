<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Enums\PublishStatus;
use App\Support\ImageUploadOptimizer;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Artikel')
                    ->columns(1)
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->placeholder('Judul artikel')
                            ->required(),
                        Select::make('category_id')
                            ->label('Kategori')
                            ->placeholder('Pilih kategori')
                            ->relationship('category', 'name')
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                TextInput::make('name')
                                    ->label('Nama kategori')
                                    ->placeholder('Contoh: Berita, Promo, Tips')
                                    ->required(),
                            ]),
                        DateTimePicker::make('published_at')
                            ->label('Tanggal publish')
                            ->placeholder('Pilih tanggal dan waktu')
                            ->seconds(false)
                            ->default(now()),
                        FileUpload::make('cover_image')
                            ->label('Gambar cover')
                            ->image()
                            ->disk('public')
                            ->directory('articles')
                            ->visibility('public')
                            ->saveUploadedFileUsing(ImageUploadOptimizer::saveAsWebp(...))
                            ->columnSpanFull(),
                        Textarea::make('excerpt')
                            ->label('Ringkasan')
                            ->placeholder('Kosongkan untuk otomatis dari awal isi artikel')
                            ->rows(3)
                            ->maxLength(300)
                            ->columnSpanFull(),
                        RichEditor::make('content')
                            ->label('Isi artikel')
                            ->placeholder('Tulis isi artikel di sini...')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Publikasi')
                    ->collapsed()
                    ->columns(1)
                    ->schema([
                        Select::make('status')
                            ->label('Status')
                            ->placeholder('Pilih status')
                            ->options(PublishStatus::class)
                            ->default(PublishStatus::Draft)
                            ->required(),
                    ]),
            ]);
    }
}
