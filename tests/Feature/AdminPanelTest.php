<?php

use App\Enums\PublishStatus;
use App\Filament\Resources\Services\Pages\CreateService;
use App\Filament\Resources\Services\Pages\EditService;
use App\Filament\Resources\Services\Pages\ListServices;
use App\Filament\Resources\Services\ServiceResource;
use App\Models\Service;
use App\Models\User;
use Livewire\Livewire;

beforeEach(function () {
    $this->actingAs(User::factory()->create(['is_admin' => true]));
});

it('menutup panel admin untuk tamu', function () {
    auth()->logout();

    $this->get('/admin')->assertRedirect();
});

it('menolak user biasa yang bukan admin', function () {
    $this->actingAs(User::factory()->create(['is_admin' => false]));

    $this->get('/admin')->assertForbidden();
});

it('mengisi slug otomatis tanpa field slug di form saat membuat layanan', function () {
    Livewire::test(CreateService::class)
        ->fillForm(['name' => 'Paket Uji Coba'])
        ->call('create')
        ->assertHasNoFormErrors()
        ->assertRedirect(ServiceResource::getUrl('index'));

    expect(Service::query()->where('slug', 'paket-uji-coba')->exists())->toBeTrue();
});

it('tidak mengubah slug saat nama layanan diedit lalu redirect ke index', function () {
    $service = Service::create([
        'slug' => 'demo-layanan',
        'name' => 'Demo Layanan',
        'status' => PublishStatus::Draft,
    ]);

    Livewire::test(EditService::class, ['record' => $service->getRouteKey()])
        ->fillForm(['name' => 'Demo Layanan Diubah'])
        ->call('save')
        ->assertHasNoFormErrors()
        ->assertRedirect(ServiceResource::getUrl('index'));

    expect($service->fresh())
        ->name->toBe('Demo Layanan Diubah')
        ->slug->toBe('demo-layanan');
});

it('bisa menghapus layanan lewat action di index table', function () {
    $service = Service::create([
        'slug' => 'hapus-saya',
        'name' => 'Hapus Saya',
        'status' => PublishStatus::Draft,
    ]);

    Livewire::test(ListServices::class)
        ->callTableAction('delete', $service);

    expect(Service::query()->find($service->id))->toBeNull();
});
