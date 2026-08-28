<?php

namespace App\Filament\Resources\Services\Schemas;

use App\Enums\PublishStatus;
use App\Models\Service;
use App\Support\ImageUploadOptimizer;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Informasi Layanan')
                    ->columns(1)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama layanan')
                            ->placeholder('Contoh: Internet Fiber 50 Mbps')
                            ->required(),
                        Textarea::make('short_description')
                            ->label('Deskripsi singkat')
                            ->placeholder('Ringkasan singkat untuk kartu layanan')
                            ->rows(3)
                            ->maxLength(300)
                            ->columnSpanFull(),
                        RichEditor::make('content')
                            ->label('Deskripsi lengkap')
                            ->placeholder('Tulis deskripsi lengkap layanan di sini...')
                            ->columnSpanFull(),
                    ]),

                Section::make('Media')
                    ->columns(1)
                    ->schema([
                        FileUpload::make('image')
                            ->label('Gambar cover')
                            ->image()
                            ->disk('public')
                            ->directory('services')
                            ->visibility('public')
                            ->saveUploadedFileUsing(ImageUploadOptimizer::saveAsWebp(...)),
                    ]),

                Section::make('Benefit')
                    ->columns(1)
                    ->schema([
                        Repeater::make('benefits')
                            ->label('Poin benefit')
                            ->simple(TextInput::make('item')->label('Benefit')->placeholder('Contoh: Gratis instalasi')->required())
                            ->addActionLabel('Tambah benefit')
                            ->defaultItems(0),
                    ]),

                Section::make('Marketing dan SEO')
                    ->columns(1)
                    ->schema([
                        Toggle::make('is_hero')
                            ->label('Produk utama'),
                        TextInput::make('order')
                            ->label('Urutan tampil')
                            ->placeholder('0')
                            ->numeric()
                            ->default(fn (): int => (Service::max('order') ?? 0) + 1)
                            ->helperText('Terisi otomatis dengan urutan berikutnya, bisa diubah manual kalau perlu.'),
                        TagsInput::make('customer_terms')
                            ->label('Bahasa awam customer')
                            ->placeholder('modem wifi, modem internet, ...')
                            ->columnSpanFull(),
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
