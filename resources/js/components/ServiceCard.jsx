import { Link } from '@inertiajs/react';
import PackagePriceList from './PackagePriceList';

export default function ServiceCard({ service, hidePrice = false }) {
    const hero = service.is_hero;
    const hasPackages = service.packages?.length > 0;

    const priceArea = !hidePrice && hasPackages ? (
        <PackagePriceList packages={service.packages} tone="light" />
    ) : (
        <span />
    );

    return (
        <article
            className="group relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-[var(--radius-card)] p-7 text-white shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
        >
            {service.image ? (
                <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                />
            ) : (
                <div aria-hidden="true" className="absolute inset-0 -z-20 bg-hero-gradient" />
            )}

            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary-900/45 mix-blend-multiply" />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage:
                        'linear-gradient(180deg, rgba(26,11,46,0.85) 0%, rgba(26,11,46,0.4) 45%, rgba(26,11,46,0.9) 100%)',
                }}
            />

            {hero ? (
                <span className="mb-3 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold uppercase tracking-widest text-white">
                    Produk Utama
                </span>
            ) : null}

            <h3 className="text-xl font-extrabold">
                <Link href={`/layanan/${service.slug}`} className="transition hover:text-white/80">
                    {service.name}
                </Link>
            </h3>

            {service.short_description ? (
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{service.short_description}</p>
            ) : null}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                {priceArea}
                <Link
                    href={`/layanan/${service.slug}`}
                    className="text-sm font-semibold text-white transition group-hover:translate-x-0.5"
                >
                    Lihat detail
                    <span aria-hidden="true"> &rsaquo;</span>
                </Link>
            </div>
        </article>
    );
}
