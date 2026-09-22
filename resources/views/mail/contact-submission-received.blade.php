<x-mail::message>
# Pesan Baru dari Website

Ada pesan masuk lewat form kontak.

- **Nama:** {{ $data['name'] }}
- **Email:** {{ $data['email'] ?: 'Tidak diisi' }}
- **Telepon:** {{ $data['phone'] ?: 'Tidak diisi' }}
- **Subjek:** {{ $data['subject'] ?: 'Tidak diisi' }}
- **Waktu:** {{ now()->format('d M Y H:i') }}

**Isi pesan:**

{{ $data['message'] }}

Terima kasih,<br>
{{ config('app.name') }}
</x-mail::message>
