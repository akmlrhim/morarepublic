<?php

use App\Mail\ContactSubmissionReceived;
use Illuminate\Support\Facades\Mail;

beforeEach(function () {
    Mail::fake();
});

it('mengirim notifikasi email saat form disubmit', function () {
    $this->post('/kontak', [
        'name' => 'Budi',
        'email' => 'budi@example.test',
        'message' => 'Saya mau tanya soal paket internet rumah.',
    ])->assertSessionHas('success');

    Mail::assertSent(ContactSubmissionReceived::class, fn ($mail) => $mail->hasTo('halo@morarepublic.test'));
});

it('menerima nomor telepon tanpa email', function () {
    $this->post('/kontak', [
        'name' => 'Siti',
        'phone' => '081234567890',
        'message' => 'Tolong hubungi saya soal pemasangan.',
    ])->assertSessionHasNoErrors();

    Mail::assertSent(ContactSubmissionReceived::class);
});

it('menolak submit tanpa email dan tanpa telepon', function () {
    $this->post('/kontak', [
        'name' => 'Tanpa Kontak',
        'message' => 'Halo, saya mau tanya sesuatu.',
    ])->assertSessionHasErrors('email');

    Mail::assertNotSent(ContactSubmissionReceived::class);
});

it('menolak pesan yang terlalu pendek', function () {
    $this->post('/kontak', [
        'name' => 'Budi',
        'email' => 'budi@example.test',
        'message' => 'halo',
    ])->assertSessionHasErrors('message');

    Mail::assertNotSent(ContactSubmissionReceived::class);
});

it('tetap mengirim email walau ada error', function () {
    Mail::shouldReceive('to')->andThrow(new RuntimeException('SMTP mati'));

    $this->post('/kontak', [
        'name' => 'Budi',
        'email' => 'budi@example.test',
        'message' => 'Saya mau tanya soal paket internet rumah.',
    ])->assertSessionHas('success');
});
