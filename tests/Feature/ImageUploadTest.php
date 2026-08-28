<?php

use App\Filament\Resources\Services\Pages\CreateService;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;

beforeEach(function () {
    $this->actingAs(User::factory()->create(['is_admin' => true]));
});

it('menyimpan gambar cover layanan ke disk public sebagai webp yang bisa diakses', function () {
    Storage::fake('public');

    Livewire::test(CreateService::class)
        ->fillForm([
            'name' => 'Layanan Gambar',
            'image' => UploadedFile::fake()->image('cover.jpg', 800, 600),
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    $service = Service::query()->where('slug', 'layanan-gambar')->firstOrFail();

    expect($service->image)->toEndWith('.webp');
    Storage::disk('public')->assertExists($service->image);
});
