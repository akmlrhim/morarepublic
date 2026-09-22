import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Button from './Button';
import { cx } from '../lib/format';

function Field({ id, label, error, hint, children }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-ink">
                {label}
            </label>
            {children}
            {error ? (
                <p id={`${id}-error`} className="mt-2 text-sm text-[color:var(--color-error)]">
                    {error}
                </p>
            ) : hint ? (
                <p id={`${id}-help`} className="mt-2 text-sm text-ink">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}

export default function ContactForm() {
    const { data, setData } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [clientErrors, setClientErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    function submit(event) {
        event.preventDefault();
        setProcessing(true);

        const errors = {};
        if (!data.name.trim()) errors.name = 'Nama harus diisi';
        if (!data.message.trim()) errors.message = 'Pesan harus diisi';
        if (!data.email.trim() && !data.phone.trim()) {
            errors.email = 'Isi email atau nomor telepon';
            errors.phone = 'Isi email atau nomor telepon';
        }

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
            setProcessing(false);
            return;
        }

        setClientErrors({});

        const messageText = `Halo Riqqo, nama saya ${data.name}.\n\nSubjek: ${data.subject || '(tidak ada)'}\n\nPesan:\n${data.message}\n\nKontak balik:\nEmail: ${data.email || '(tidak ada)'}\nTelepon: ${data.phone || '(tidak ada)'}`;

        const whatsappUrl = `https://wa.me/628134104187?text=${encodeURIComponent(messageText)}`;
        window.open(whatsappUrl, '_blank');
        setProcessing(false);
    }

    const inputClass = (hasError) =>
        cx(
            'mt-2 w-full rounded-xl border px-4 py-3 text-base text-ink transition placeholder:text-ink/60',
            hasError ? 'border-[color:var(--color-error)]' : 'border-line',
        );

    return (
        <form
            onSubmit={submit}
            noValidate
            className="rounded-[var(--radius-card)] border border-line bg-white p-8"
        >
            <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Nama" error={clientErrors.name}>
                    <input
                        id="name"
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                        aria-invalid={clientErrors.name ? 'true' : undefined}
                        aria-describedby={clientErrors.name ? 'name-error' : undefined}
                        placeholder="Nama lengkap Anda"
                        className={inputClass(clientErrors.name)}
                    />
                </Field>

                <Field id="subject" label="Subjek" error={clientErrors.subject} hint="Opsional">
                    <input
                        id="subject"
                        value={data.subject}
                        onChange={(event) => setData('subject', event.target.value)}
                        placeholder="Contoh: Tanya paket internet"
                        className={inputClass(clientErrors.subject)}
                    />
                </Field>

                <div className="sm:col-span-2">
                    <Field id="email" label="Email" error={clientErrors.email} hint="Isi email atau nomor telepon">
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            aria-invalid={clientErrors.email ? 'true' : undefined}
                            aria-describedby={clientErrors.email ? 'email-error' : 'email-help'}
                            placeholder="nama@email.com"
                            className={inputClass(clientErrors.email)}
                        />
                    </Field>
                </div>

                <div className="sm:col-span-2">
                    <Field id="phone" label="Nomor telepon" error={clientErrors.phone}>
                        <input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(event) => setData('phone', event.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className={inputClass(clientErrors.phone)}
                        />
                    </Field>
                </div>
            </div>

            <div className="mt-6">
                <Field id="message" label="Pesan" error={clientErrors.message}>
                    <textarea
                        id="message"
                        rows={6}
                        value={data.message}
                        onChange={(event) => setData('message', event.target.value)}
                        aria-invalid={clientErrors.message ? 'true' : undefined}
                        aria-describedby={clientErrors.message ? 'message-error' : undefined}
                        placeholder="Tulis pesan Anda di sini..."
                        className={inputClass(clientErrors.message)}
                    />
                </Field>
            </div>

            <Button type="submit" disabled={processing} className="mt-8">
                {processing ? 'Mengirim...' : 'Kirim ke WhatsApp'}
            </Button>
        </form>
    );
}
