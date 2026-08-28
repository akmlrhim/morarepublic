<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use App\Support\ImageUploadOptimizer;
use BackedEnum;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use UnitEnum;

class SiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected string $view = 'filament.pages.site-settings';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static string|UnitEnum|null $navigationGroup = 'Pengaturan';

    protected static ?string $title = 'Pengaturan Website';

    /** @var list<string> */
    public const KEYS = [
        'company_name',
        'tagline',
        'logo',
        'logo_light',
        'whatsapp_number',
        'whatsapp_message',
        'phone',
        'email',
        'address',
        'operating_hours',
        'map_embed',
        'sales_contact_name',
        'sales_contact_phone',
        'sales_contact_role',
        'facebook_url',
        'instagram_url',
        'youtube_url',
        'notification_email',
    ];

    /** @var array<string, mixed> */
    public array $data = [];

    public function mount(): void
    {
        $values = Setting::allValues();

        $this->form->fill(array_map(
            fn (string $key) => $values[$key] ?? null,
            array_combine(self::KEYS, self::KEYS),
        ));
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->columns(1)
            ->components([
                Section::make('Identitas')
                    ->columns(1)
                    ->schema([
                        TextInput::make('company_name')->label('Nama perusahaan')->placeholder('Contoh: Mora Republic')->required(),
                        TextInput::make('tagline')->label('Tagline')->placeholder('Tagline singkat perusahaan'),
                        FileUpload::make('logo')
                            ->label('Logo versi berwarna')
                            ->image()
                            ->disk('public')
                            ->directory('brand')
                            ->visibility('public')
                            ->saveUploadedFileUsing(ImageUploadOptimizer::saveAsWebp(...))
                            ->helperText('Dipakai di atas latar terang, mis. navbar setelah di-scroll. Kosongkan untuk memakai logo bawaan. Otomatis dikonversi ke WebP dan dikompres.'),
                        FileUpload::make('logo_light')
                            ->label('Logo versi putih')
                            ->image()
                            ->disk('public')
                            ->directory('brand')
                            ->visibility('public')
                            ->saveUploadedFileUsing(ImageUploadOptimizer::saveAsWebp(...))
                            ->helperText('Dipakai di atas hero gradient dan footer gelap. Kosongkan untuk memakai logo bawaan. Otomatis dikonversi ke WebP dan dikompres.'),
                    ]),

                Section::make('Kontak')
                    ->columns(1)
                    ->schema([
                        TextInput::make('whatsapp_number')
                            ->label('Nomor WhatsApp')
                            ->placeholder('628123456789')
                            ->helperText('Format internasional tanpa tanda plus, dipakai untuk semua tombol WhatsApp.'),
                        TextInput::make('whatsapp_message')
                            ->label('Pesan awal WhatsApp')
                            ->placeholder('Halo, saya mau tanya soal layanan internet'),
                        TextInput::make('phone')->label('Telepon')->placeholder('0511-1234567'),
                        TextInput::make('email')->label('Email')->placeholder('info@morarepublic.com'),
                        TextInput::make('notification_email')
                            ->label('Email penerima notifikasi form')
                            ->placeholder('admin@morarepublic.com')
                            ->email()
                            ->helperText('Alamat yang menerima notifikasi tiap ada pesan masuk dari form kontak.'),
                        TextInput::make('operating_hours')
                            ->label('Jam operasional')
                            ->placeholder('Senin sampai Jumat, 08.00 sampai 17.00'),
                        Textarea::make('address')
                            ->label('Alamat kantor')
                            ->placeholder('Alamat lengkap kantor')
                            ->rows(3)
                            ->columnSpanFull(),
                        Textarea::make('map_embed')
                            ->label('Embed peta')
                            ->placeholder('https://www.google.com/maps/embed?...')
                            ->rows(2)
                            ->columnSpanFull()
                            ->helperText('Tempel URL src dari embed Google Maps, bukan tag iframe lengkap.'),
                    ]),

                Section::make('Kontak Utama (Sales)')
                    ->schema([
                        TextInput::make('sales_contact_name')->label('Nama kontak')->placeholder('Nama kontak sales'),
                        TextInput::make('sales_contact_phone')->label('Nomor telepon/WA')->placeholder('08xxxxxxxxxx'),
                        TextInput::make('sales_contact_role')
                            ->label('Peran')
                            ->placeholder('Sales & Pemasangan'),
                    ])
                    ->columns(1)
                    ->description('Kontak utama yang tampil di footer, mis. sales lapangan yang menangani pemasangan baru.'),

                Section::make('Media Sosial')
                    ->columns(1)
                    ->schema([
                        TextInput::make('facebook_url')->label('Facebook')->placeholder('https://facebook.com/morarepublic')->url(),
                        TextInput::make('instagram_url')->label('Instagram')->placeholder('https://instagram.com/morarepublic')->url(),
                        TextInput::make('youtube_url')->label('YouTube')->placeholder('https://youtube.com/@morarepublic')->url(),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        Setting::putMany($this->form->getState());

        Notification::make()
            ->title('Pengaturan tersimpan')
            ->success()
            ->send();
    }
}
