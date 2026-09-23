<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Enums\PublishStatus;
use App\Support\ImageUploadOptimizer;
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
                        TextInput::make('author_name')
                            ->label('Nama Penulis')
                            ->placeholder('Contoh: Budi'),
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
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('articles/content')
                            ->fileAttachmentsVisibility('public')
                            ->columnSpanFull(),
                    ]),

                Section::make('SEO & Meta')
                    ->collapsed()
                    ->columns(1)
                    ->schema([
                        TextInput::make('meta_title')
                            ->label('Meta Title')
                            ->placeholder('Kosongkan untuk otomatis dari judul')
                            ->maxLength(70),
                        Textarea::make('meta_description')
                            ->label('Meta Description')
                            ->placeholder('Kosongkan untuk otomatis dari ringkasan / isi')
                            ->rows(2)
                            ->maxLength(160),
                        TextInput::make('meta_keywords')
                            ->label('Meta Keywords')
                            ->placeholder('Contoh: router, wifi, sinyal, tips internet')
                            ->helperText('Pisahkan dengan koma, max 5-7 keywords')
                            ->maxLength(200),
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
