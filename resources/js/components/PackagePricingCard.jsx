import Button from './Button';
import { cx } from '../lib/format';

export default function PackagePricingCard({
    package: pkg,
    eyebrow,
    onSelect,
    selectHref,
    selectLabel = 'Pilih Paket',
    selectTarget,
    selectRel,
}) {
    return (
        <div
            className={cx(
                'relative flex flex-col rounded-[var(--radius-card)] border bg-white p-6 shadow-[var(--shadow-card)] transition duration-200',
                pkg.is_featured ? 'border-primary-500 shadow-[var(--shadow-card-hover)]' : 'border-line',
            )}
        >
            {pkg.is_featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                    Favorit
                </span>
            ) : null}

            {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">{eyebrow}</p>
            ) : null}

            <h3 className="mt-1 text-lg font-semibold text-ink">{pkg.name}</h3>

            {pkg.speed_mbps ? (
                <div className="mt-4 flex items-end gap-2">
                    {pkg.promo_speed_mbps ? (
                        <span className="mb-1 text-lg font-semibold leading-none text-muted line-through">
                            {pkg.speed_mbps}
                        </span>
                    ) : null}
                    <span className="text-4xl font-extrabold leading-none text-ink">
                        {pkg.promo_speed_mbps ?? pkg.speed_mbps}
                    </span>
                    <span className="mb-0.5 flex flex-col text-xs leading-tight text-muted">
                        <span>Mbps</span>
                        <span>up-to</span>
                    </span>
                </div>
            ) : null}

            <p className="mt-3">
                {pkg.promo_price_display ? (
                    <span className="mr-2 text-sm font-medium text-muted line-through">{pkg.price_display}</span>
                ) : null}
                <span className="text-xl font-bold text-primary-600">
                    {pkg.promo_price_display ?? pkg.price_display ?? 'Hubungi kami'}
                </span>
                {pkg.has_price ? <span className="text-sm font-medium text-muted"> /bulan*</span> : null}
            </p>

            {pkg.description ? <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p> : null}

            {pkg.features?.length > 0 ? (
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-sm text-ink">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="mt-0.5 h-4 w-4 shrink-0 text-primary-500"
                            >
                                <path
                                    d="M16.5 5.5L8 14l-4.5-4.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            ) : null}

            <Button
                href={selectHref}
                target={selectTarget}
                rel={selectRel}
                onClick={onSelect}
                variant={pkg.is_featured ? 'primary' : 'ghost'}
                size="sm"
                className="mt-6 w-full"
            >
                {selectLabel}
            </Button>
        </div>
    );
}
