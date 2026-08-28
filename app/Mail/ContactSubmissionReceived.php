<?php

namespace App\Mail;

use App\Models\ContactSubmission;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactSubmissionReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactSubmission $submission) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pesan baru dari form kontak: '.$this->submission->name,
            replyTo: array_filter([$this->submission->email]),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.contact-submission-received',
        );
    }
}
