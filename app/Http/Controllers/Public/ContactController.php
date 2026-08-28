<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactSubmissionRequest;
use App\Mail\ContactSubmissionReceived;
use App\Models\ContactSubmission;
use App\Support\Seo;
use App\Support\SiteConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Contact', [
            'seo' => Seo::forPage(
                'Kontak',
                'Hubungi kami lewat form, telepon, atau WhatsApp.',
                '/kontak',
            ),
        ]);
    }

    public function store(ContactSubmissionRequest $request): RedirectResponse
    {
        $submission = ContactSubmission::create($request->validated());

        $recipient = SiteConfig::notificationEmail();

        if (filled($recipient)) {
            try {
                Mail::to($recipient)->send(new ContactSubmissionReceived($submission));
            } catch (Throwable $exception) {
                // Pesan sudah tersimpan, jadi kegagalan email tidak boleh menggagalkan submit.
                Log::error('Gagal kirim notifikasi form kontak.', [
                    'submission_id' => $submission->id,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        return back()->with('success', 'Pesan kamu sudah terkirim. Tim kami akan menghubungi kembali secepatnya.');
    }
}
