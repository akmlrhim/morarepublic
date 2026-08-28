import { useForm, usePage } from '@inertiajs/react';
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
                <p id={`${id}-help`} className="mt-2 text-sm text-muted">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}

export default function ContactForm() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    function submit(event) {
        event.preventDefault();
        post('/kontak', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    const inputClass = (hasError) =>
        cx(
            'mt-2 w-full rounded-xl border px-4 py-3 text-base text-ink transition placeholder:text-muted/60',
            hasError ? 'border-[color:var(--color-error)]' : 'border-line',
        );

    return (
        <form
            onSubmit={submit}
            noValidate
            className="rounded-[var(--radius-card)] border border-line bg-white p-8"
        >
            {flash?.success ? (
                <p
                    role="status"
                    aria-live="polite"
                    className="mb-6 rounded-xl bg-[color:var(--color-success)]/10 p-4 text-sm font-medium text-[color:var(--color-success)]"
                >
                    {flash.success}
                </p>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
                <Field id="name" label="Nama" error={errors.name}>
                    <input
                        id="name"
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        placeholder="Nama lengkap Anda"
                        className={inputClass(errors.name)}
                    />
                </Field>

                <Field id="subject" label="Subjek" error={errors.subject} hint="Opsional">
                    <input
                        id="subject"
                        value={data.subject}
                        onChange={(event) => setData('subject', event.target.value)}
                        placeholder="Contoh: Tanya paket internet"
                        className={inputClass(errors.subject)}
                    />
                </Field>

                <Field id="email" label="Email" error={errors.email} hint="Isi email atau nomor telepon">
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(event) => setData('email', event.target.value)}
                        aria-invalid={errors.email ? 'true' : undefined}
                        aria-describedby={errors.email ? 'email-error' : 'email-help'}
                        placeholder="nama@email.com"
                        className={inputClass(errors.email)}
                    />
                </Field>

                <Field id="phone" label="Nomor telepon" error={errors.phone}>
                    <input
                        id="phone"
                        type="tel"
                        value={data.phone}
                        onChange={(event) => setData('phone', event.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className={inputClass(errors.phone)}
                    />
                </Field>
            </div>

            <div className="mt-6">
                <Field id="message" label="Pesan" error={errors.message}>
                    <textarea
                        id="message"
                        rows={6}
                        value={data.message}
                        onChange={(event) => setData('message', event.target.value)}
                        aria-invalid={errors.message ? 'true' : undefined}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        placeholder="Tulis pesan Anda di sini..."
                        className={inputClass(errors.message)}
                    />
                </Field>
            </div>

            <Button type="submit" disabled={processing} className="mt-8">
                {processing ? 'Mengirim...' : 'Kirim Pesan'}
            </Button>
        </form>
    );
}
