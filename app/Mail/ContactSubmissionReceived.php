<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactSubmissionReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public array $data) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pesan baru dari form kontak: '.$this->data['name'],
            replyTo: array_filter([$this->data['email'] ?? null]),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.contact-submission-received',
        );
    }
}
