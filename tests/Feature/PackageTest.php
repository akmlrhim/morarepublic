<?php

use App\Enums\PublishStatus;
use App\Filament\Resources\Services\Pages\EditService;
use App\Filament\Resources\Services\RelationManagers\PackagesRelationManager;
use App\Models\Package;
use App\Models\Service;
use App\Models\User;
use Livewire\Livewire;

it('menampilkan halaman daftar paket dan harga dikelompokkan per layanan', function () {
    $service = Service::create(['slug' => 'demo', 'name' => 'Demo Layanan', 'status' => PublishStatus::Published]);
    Package::create(['service_id' => $service->id, 'name' => '10 Mbps', 'price_label' => 'Hubungi kami', 'order' => 1]);

    $this->get('/paket-dan-harga')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Packages/Index')
            ->has('categories', 1)
            ->where('categories.0.slug', 'demo')
            ->has('categories.0.packages', 1));
});

it('tidak menampilkan layanan yang belum punya paket', function () {
    Service::create(['slug' => 'tanpa-paket', 'name' => 'Tanpa Paket', 'status' => PublishStatus::Published]);

    $this->get('/paket-dan-harga')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Packages/Index')->has('categories', 0));
});

it('menyertakan daftar paket di halaman detail layanan', function () {
    $service = Service::create(['slug' => 'demo-detail', 'name' => 'Demo Detail', 'status' => PublishStatus::Published]);
    Package::create(['service_id' => $service->id, 'name' => '20 Mbps', 'price_label' => 'Hubungi kami', 'order' => 1]);

    $this->get('/layanan/demo-detail')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Services/Show')
            ->has('service.packages', 1));
});

it('admin bisa menambah paket harga lewat relation manager', function () {
    $this->actingAs(User::factory()->create(['is_admin' => true]));

    $service = Service::create(['slug' => 'demo-admin', 'name' => 'Demo Admin', 'status' => PublishStatus::Draft]);

    Livewire::test(PackagesRelationManager::class, [
        'ownerRecord' => $service,
        'pageClass' => EditService::class,
    ])
        ->callTableAction('create', data: [
            'name' => '10 Mbps',
            'description' => 'Cocok untuk 1-2 perangkat',
            'price_label' => 'Hubungi kami',
        ])
        ->assertHasNoTableActionErrors();

    expect($service->packages()->count())->toBe(1);
});
