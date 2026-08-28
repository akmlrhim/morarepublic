import { Link, usePage } from '@inertiajs/react';
import { Container } from './Section';

const SOCIAL_LABELS = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    youtube: 'YouTube',
};

const SOCIAL_ICONS = {
    facebook: (
        <path d="M13.5 9H15.5V6.2C15.16 6.15 14 6.05 12.65 6.05C9.82 6.05 7.89 7.79 7.89 10.96V13.5H4.75V16.65H7.89V25H11.15V16.65H14.17L14.65 13.5H11.15V11.32C11.15 10.38 11.41 9.75 12.5 9.75L13.5 9Z" />
    ),
    instagram: (
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.75 5.5H20.25C22.87 5.5 25 7.63 25 10.25V19.75C25 22.37 22.87 24.5 20.25 24.5H9.75C7.13 24.5 5 22.37 5 19.75V10.25C5 7.63 7.13 5.5 9.75 5.5ZM15 10.25C12.38 10.25 10.25 12.38 10.25 15C10.25 17.62 12.38 19.75 15 19.75C17.62 19.75 19.75 17.62 19.75 15C19.75 12.38 17.62 10.25 15 10.25ZM15 12.5C16.38 12.5 17.5 13.62 17.5 15C17.5 16.38 16.38 17.5 15 17.5C13.62 17.5 12.5 16.38 12.5 15C12.5 13.62 13.62 12.5 15 12.5ZM20.5 9.5C20.5 10.19 19.94 10.75 19.25 10.75C18.56 10.75 18 10.19 18 9.5C18 8.81 18.56 8.25 19.25 8.25C19.94 8.25 20.5 8.81 20.5 9.5Z"
        />
    ),
    youtube: (
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.2 10.35C24.94 9.37 24.17 8.6 23.19 8.34C21.42 7.87 15 7.87 15 7.87C15 7.87 8.58 7.87 6.81 8.34C5.83 8.6 5.06 9.37 4.8 10.35C4.33 12.13 4.33 15.83 4.33 15.83C4.33 15.83 4.33 19.54 4.8 21.32C5.06 22.3 5.83 23.04 6.81 23.3C8.58 23.77 15 23.77 15 23.77C15 23.77 21.42 23.77 23.19 23.3C24.17 23.04 24.94 22.3 25.2 21.32C25.67 19.54 25.67 15.83 25.67 15.83C25.67 15.83 25.67 12.13 25.2 10.35ZM12.7 19.32V12.35L18.7 15.83L12.7 19.32Z"
        />
    ),
};

const PRODUCT_LINKS = [
    { label: 'My Republic Air - FWA', href: '/layanan/my-republic-air-fwa' },
    { label: 'My Republic - FTTH', href: '/layanan/my-republic-ftth' },
    { label: 'Daftar Paket dan Harga', href: '/paket-dan-harga' },
    { label: 'Cek Coverage', href: '/cek-coverage' },
];

const HELP_LINKS = [
    { label: 'FAQ', href: '/#faq' },
    { label: 'Blog & Edukasi', href: '/berita' },
    { label: 'Kontak', href: '/kontak' },
];

export default function Footer() {
    const { site } = usePage().props;
    const contact = site?.contact ?? {};
    const social = site?.social ?? {};
    const salesContact = site?.sales_contact;

    return (
        <footer className="bg-primary-900 text-white">
            <Container className="py-14 md:py-20">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        {site?.logo_light ? (
                            <img
                                src={site.logo_light}
                                alt={site?.name ?? 'Logo'}
                                width="297"
                                height="100"
                                className="h-12 w-auto md:h-14"
                            />
                        ) : (
                            <p className="text-xl font-extrabold">{site?.name ?? 'Mora Republic'}</p>
                        )}
                        {site?.tagline ? <p className="mt-4 max-w-xs text-sm text-white/70">{site.tagline}</p> : null}

                        {Object.entries(social).length > 0 ? (
                            <ul className="mt-6 space-y-2.5">
                                {Object.entries(social).map(([key, href]) => (
                                    <li key={key}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener"
                                            className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
                                        >
                                            <svg viewBox="0 0 30 30" fill="currentColor" aria-hidden="true" className="h-4 w-4 shrink-0">
                                                {SOCIAL_ICONS[key]}
                                            </svg>
                                            {SOCIAL_LABELS[key] ?? key}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>

                    <div>
                        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-300">Produk</h2>
                        <ul className="mt-4 space-y-2">
                            {PRODUCT_LINKS.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-sm text-white/75 transition hover:text-white">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-300">Bantuan</h2>
                        <ul className="mt-4 space-y-2">
                            {HELP_LINKS.map((item) =>
                                item.href.includes('#') ? (
                                    <li key={item.href}>
                                        <a href={item.href} className="text-sm text-white/75 transition hover:text-white">
                                            {item.label}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={item.href}>
                                        <Link href={item.href} className="text-sm text-white/75 transition hover:text-white">
                                            {item.label}
                                        </Link>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-300">Kontak Utama</h2>

                        {salesContact ? (
                            <div className="mt-4 flex gap-3">
                                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary-300">
                                    <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-.826 1.66l-.94.47a6.51 6.51 0 0 0 3.417 3.417l.47-.94a1.5 1.5 0 0 1 1.66-.826l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" />
                                </svg>
                                <p className="text-sm leading-relaxed">
                                    {salesContact.name ? <span className="font-semibold text-white">{salesContact.name}</span> : null}
                                    {salesContact.name && salesContact.phone ? <span className="text-white/50"> &mdash; </span> : null}
                                    {salesContact.phone ? (
                                        <a href={`tel:${salesContact.phone.replace(/[^0-9+]/g, '')}`} className="font-semibold text-white transition hover:text-primary-300">
                                            {salesContact.phone}
                                        </a>
                                    ) : null}
                                    {salesContact.role ? <span className="block text-white/60">{salesContact.role}</span> : null}
                                </p>
                            </div>
                        ) : null}

                        <ul className="mt-4 space-y-3 text-sm text-white/75">
                            {contact.address ? <li className="whitespace-pre-line">{contact.address}</li> : null}
                            {contact.hours ? <li>{contact.hours}</li> : null}
                            {contact.email ? (
                                <li>
                                    <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                                        {contact.email}
                                    </a>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
                    <p>
                        &copy; {new Date().getFullYear()} {site?.name ?? 'Mora Republic'}. Seluruh hak cipta dilindungi.
                    </p>
                    <Link href="/kontak" className="transition hover:text-white">
                        Butuh bantuan? Hubungi kami.
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
