<?php

use App\Enums\PublishStatus;
use App\Models\Area;
use App\Models\Service;
use App\Models\WhatsappClick;

it('mencatat klik whatsapp dengan konteks halaman', function () {
    $area = Area::create(['name' => 'Banjarmasin', 'slug' => 'banjarmasin']);
    $service = Service::create(['slug' => 'fwa', 'name' => 'FWA', 'status' => PublishStatus::Published]);

    $this->postJson('/track/whatsapp', [
        'area_id' => $area->id,
        'product_id' => $service->id,
        'page_path' => '/wifi-murah-banjarmasin',
        'search_term' => 'modem wifi murah',
        'utm_source' => 'google',
        'utm_medium' => 'cpc',
        'utm_campaign' => 'fwa-banjarmasin',
    ])->assertOk()->assertJson(['recorded' => true]);

    $click = WhatsappClick::query()->sole();

    expect($click->area_id)->toBe($area->id)
        ->and($click->search_term)->toBe('modem wifi murah')
        ->and($click->utm_campaign)->toBe('fwa-banjarmasin');
});

it('tidak menyimpan kolom data pribadi', function () {
    $this->postJson('/track/whatsapp', ['page_path' => '/layanan']);

    $columns = array_keys(WhatsappClick::query()->sole()->getAttributes());

    expect($columns)->not->toContain('name')
        ->and($columns)->not->toContain('phone')
        ->and($columns)->not->toContain('email')
        ->and($columns)->not->toContain('ip_address');
});

it('menolak referensi yang tidak ada', function () {
    $this->postJson('/track/whatsapp', ['area_id' => 999])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('area_id');
});
