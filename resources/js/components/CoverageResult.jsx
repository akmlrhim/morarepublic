import Button from './Button';
import { useWhatsapp } from '../lib/useWhatsapp';

const TONES = {
    available: {
        badge: 'bg-[color:var(--color-success)]/10 text-[color:var(--color-success)]',
        bar: 'bg-[color:var(--color-success)]',
    },
    waitlist: {
        badge: 'bg-[color:var(--color-warning)]/10 text-[color:var(--color-warning)]',
        bar: 'bg-[color:var(--color-warning)]',
    },
    unavailable: {
        badge: 'bg-[color:var(--color-error)]/10 text-[color:var(--color-error)]',
        bar: 'bg-[color:var(--color-error)]',
    },
};

export default function CoverageResult({ result }) {
    const whatsapp = useWhatsapp();

    if (!result) {
        return (
            <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-surface p-8">
                <h2 className="text-lg font-semibold text-ink">Hasil pengecekan muncul di sini</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                    Ada tiga kemungkinan hasil: layanan sudah tersedia, area kamu masuk daftar tunggu, atau jaringan
                    kami belum menjangkau area tersebut.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                    <li className="flex gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-success)]" />
                        Tersedia, bisa langsung dijadwalkan pemasangan.
                    </li>
                    <li className="flex gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-warning)]" />
                        Waiting list, area sedang dalam antrean pembangunan.
                    </li>
                    <li className="flex gap-3">
                        <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[color:var(--color-error)]" />
                        Belum tersedia, kami bantu carikan alternatifnya.
                    </li>
                </ul>
            </div>
        );
    }

    const tone = TONES[result.status] ?? TONES.unavailable;

    return (
        <div
            className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]"
            role="status"
            aria-live="polite"
        >
            <div aria-hidden="true" className={`h-1.5 w-full ${tone.bar}`} />

            <div className="p-8">
                <span className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${tone.badge}`}>
                    {result.status_label}
                </span>

                <h2 className="mt-4 text-xl font-semibold text-ink">
                    {result.area
                        ? `${result.service_label} di ${result.area}`
                        : `Area "${result.query}" belum ada di data kami`}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted">{result.description}</p>

                {result.note ? (
                    <p className="mt-4 rounded-xl bg-surface p-4 text-sm leading-relaxed text-muted">{result.note}</p>
                ) : null}

                {result.alternatives?.length > 0 ? (
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-ink">Layanan lain di area ini</h3>
                        <ul className="mt-3 space-y-2">
                            {result.alternatives.map((item) => (
                                <li key={item.service_type} className="flex items-center justify-between gap-4 text-sm">
                                    <span className="font-medium text-ink">{item.service_type}</span>
                                    <span className="text-muted">{item.status_label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                    {whatsapp.available ? (
                        <Button
                            as="a"
                            href={whatsapp.url}
                            target="_blank"
                            rel="noopener"
                            onClick={whatsapp.track}
                            size="sm"
                        >
                            {result.status === 'available' ? 'Pasang Sekarang' : 'Tanya Tim Kami'}
                        </Button>
                    ) : null}
                    <Button href="/kontak" variant="ghost" size="sm">
                        Hubungi lewat form
                    </Button>
                </div>
            </div>
        </div>
    );
}
