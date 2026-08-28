import { Link } from '@inertiajs/react';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { Section } from '../../components/Section';
import PublicLayout from '../../layouts/PublicLayout';
import { cx } from '../../lib/format';

function FilterButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                active ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-700 hover:bg-primary-200',
            )}
        >
            {children}
        </button>
    );
}

export default function PackagesIndex({ categories = [], seo }) {
    const [activeSlug, setActiveSlug] = useState('all');

    const visibleCategories =
        activeSlug === 'all' ? categories : categories.filter((category) => category.slug === activeSlug);

    return (
        <PublicLayout seo={seo} transparentNav>
            <PageHeader
                eyebrow="Harga"
                title="Daftar Paket dan Harga"
                description="Semua paket kami dalam satu halaman. Pilih jenis layanan untuk menyaring daftarnya."
            />

            <Section>
                {categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        <FilterButton active={activeSlug === 'all'} onClick={() => setActiveSlug('all')}>
                            Semua Layanan
                        </FilterButton>
                        {categories.map((category) => (
                            <FilterButton
                                key={category.slug}
                                active={activeSlug === category.slug}
                                onClick={() => setActiveSlug(category.slug)}
                            >
                                {category.name}
                            </FilterButton>
                        ))}
                    </div>
                ) : null}

                <div className="mt-10 space-y-12">
                    {visibleCategories.length === 0 ? (
                        <p className="text-base text-muted">Belum ada paket yang dipublikasikan.</p>
                    ) : (
                        visibleCategories.map((category) => (
                            <div key={category.slug}>
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <h2 className="text-xl font-bold text-ink">{category.name}</h2>
                                    <Link
                                        href={`/layanan/${category.slug}`}
                                        className="text-sm font-semibold text-primary-500 hover:underline"
                                    >
                                        Lihat detail layanan
                                        <span aria-hidden="true"> &rsaquo;</span>
                                    </Link>
                                </div>

                                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {category.packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)]"
                                        >
                                            <h3 className="text-lg font-semibold text-ink">{pkg.name}</h3>
                                            {pkg.description ? (
                                                <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.description}</p>
                                            ) : null}
                                            <p className="mt-4 text-lg font-bold text-primary-600">
                                                {pkg.price_display ?? 'Hubungi kami'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Section>
        </PublicLayout>
    );
}
