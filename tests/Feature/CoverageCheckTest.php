<?php

use App\Enums\CoverageStatus;
use App\Enums\ServiceType;
use App\Models\Area;
use App\Models\CoverageArea;
use App\Models\CoverageCheckLog;

beforeEach(function () {
    $this->area = Area::create([
        'name' => 'Banjarmasin',
        'slug' => 'banjarmasin',
        'aliases' => ['Kota Banjarmasin', 'Bjm'],
    ]);

    CoverageArea::create([
        'area_id' => $this->area->id,
        'service_type' => ServiceType::Fwa,
        'status' => CoverageStatus::Available,
    ]);

    CoverageArea::create([
        'area_id' => $this->area->id,
        'service_type' => ServiceType::Ftth,
        'status' => CoverageStatus::Waitlist,
    ]);
});

it('mengembalikan status tersedia untuk area yang tercover', function () {
    $this->from('/cek-coverage')
        ->post('/cek-coverage', ['area' => 'Banjarmasin', 'service_type' => 'fwa'])
        ->assertRedirect('/cek-coverage')
        ->assertSessionHas('coverageResult.status', CoverageStatus::Available->value);
});

it('mengenali penulisan lain dari nama area', function () {
    $this->post('/cek-coverage', ['area' => 'kota banjarmasin', 'service_type' => 'ftth'])
        ->assertSessionHas('coverageResult.area', 'Banjarmasin')
        ->assertSessionHas('coverageResult.status', CoverageStatus::Waitlist->value);
});

it('mengembalikan belum tersedia untuk area yang tidak dikenali', function () {
    $this->post('/cek-coverage', ['area' => 'Kota Antah Berantah', 'service_type' => 'fwa'])
        ->assertSessionHas('coverageResult.status', CoverageStatus::Unavailable->value);
});

it('mencatat log analitik tanpa data pribadi', function () {
    $this->post('/cek-coverage', ['area' => 'Banjarmasin', 'service_type' => 'fwa']);

    $log = CoverageCheckLog::query()->sole();

    expect($log->area_id)->toBe($this->area->id)
        ->and($log->result)->toBe(CoverageStatus::Available)
        ->and($log->query_text)->toBe('Banjarmasin')
        ->and($log->getAttributes())->not->toHaveKeys(['name', 'email', 'phone', 'ip_address']);
});

it('menolak input kosong', function () {
    $this->post('/cek-coverage', ['area' => '', 'service_type' => 'fwa'])
        ->assertSessionHasErrors('area');
});

it('menyertakan layanan alternatif di area yang sama', function () {
    $this->post('/cek-coverage', ['area' => 'Banjarmasin', 'service_type' => 'fwa'])
        ->assertSessionHas('coverageResult.alternatives.0.service_type', 'FTTH');
});
