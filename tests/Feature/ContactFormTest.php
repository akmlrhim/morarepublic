<?php

use App\Enums\SubmissionStatus;
use App\Mail\ContactSubmissionReceived;
use App\Models\ContactSubmission;
use App\Models\Setting;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Mail::fake();
    Setting::put('notification_email', 'admin@morarepublic.test');
});

it('menyimpan pesan dan mengirim notifikasi ke admin', function () {
    $this->post('/kontak', [
        'name' => 'Budi',
        'email' => 'budi@example.test',
        'message' => 'Saya mau tanya soal paket internet rumah.',
    ])->assertSessionHas('success');

    $submission = ContactSubmission::query()->sole();

    expect($submission->name)->toBe('Budi')
        ->and($submission->status)->toBe(SubmissionStatus::New);

    Mail::assertSent(ContactSubmissionReceived::class, fn ($mail) => $mail->hasTo('admin@morarepublic.test'));
});

it('menerima nomor telepon tanpa email', function () {
    $this->post('/kontak', [
        'name' => 'Siti',
        'phone' => '081234567890',
        'message' => 'Tolong hubungi saya soal pemasangan.',
    ])->assertSessionHasNoErrors();

    expect(ContactSubmission::query()->count())->toBe(1);
});

it('menolak submit tanpa email dan tanpa telepon', function () {
    $this->post('/kontak', [
        'name' => 'Tanpa Kontak',
        'message' => 'Halo, saya mau tanya sesuatu.',
    ])->assertSessionHasErrors('email');

    expect(ContactSubmission::query()->count())->toBe(0);
});

it('menolak pesan yang terlalu pendek', function () {
    $this->post('/kontak', [
        'name' => 'Budi',
        'email' => 'budi@example.test',
        'message' => 'halo',
    ])->assertSessionHasErrors('message');
});

it('tetap menyimpan pesan walau pengiriman email gagal', function () {
    Mail::shouldReceive('to')->andThrow(new RuntimeException('SMTP mati'));

    $this->post('/kontak', [
        'name' => 'Budi',
        'email' => 'budi@example.test',
        'message' => 'Saya mau tanya soal paket internet rumah.',
    ])->assertSessionHas('success');

    expect(ContactSubmission::query()->count())->toBe(1);
});
