import { useState } from 'react';
import { cx } from '../lib/format';

export default function PackagePriceList({ packages = [], className, triggerLabel = 'Lihat Daftar Harga', tone = 'default' }) {
    const [open, setOpen] = useState(false);

    if (packages.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className={cx(
                    'inline-flex items-center gap-1.5 text-sm font-semibold transition',
                    tone === 'light' ? 'text-white hover:text-white/80' : 'text-primary-600 hover:text-primary-500',
                )}
            >
                {open ? 'Sembunyikan Daftar Harga' : triggerLabel}
                <span
                    aria-hidden="true"
                    className={cx('inline-block text-xs transition duration-200', open && 'rotate-180')}
                >
                    &#9662;
                </span>
            </button>

            {open ? (
                <ul className="mt-3 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line">
                    {packages.map((pkg) => (
                        <li key={pkg.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                            <div>
                                <p className="font-semibold text-ink">{pkg.name}</p>
                                {pkg.description ? <p className="mt-0.5 text-xs text-muted">{pkg.description}</p> : null}
                            </div>
                            <span className="shrink-0 text-right">
                                {pkg.promo_price_display ? (
                                    <span className="block text-xs font-medium text-muted line-through">{pkg.price_display}</span>
                                ) : null}
                                <span className="font-semibold text-primary-600">
                                    {pkg.promo_price_display ?? pkg.price_display ?? 'Hubungi kami'}
                                </span>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
