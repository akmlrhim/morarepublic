<x-mail::message>
# Pesan Baru dari Website

Ada pesan masuk lewat form kontak.

- **Nama:** {{ $submission->name }}
- **Email:** {{ $submission->email ?: 'Tidak diisi' }}
- **Telepon:** {{ $submission->phone ?: 'Tidak diisi' }}
- **Subjek:** {{ $submission->subject ?: 'Tidak diisi' }}
- **Waktu:** {{ $submission->created_at->format('d M Y H:i') }}

**Isi pesan:**

{{ $submission->message }}

<x-mail::button :url="\App\Filament\Resources\ContactSubmissions\ContactSubmissionResource::getUrl('edit', ['record' => $submission])">
Buka di CMS
</x-mail::button>

Terima kasih,<br>
{{ config('app.name') }}
</x-mail::message>
