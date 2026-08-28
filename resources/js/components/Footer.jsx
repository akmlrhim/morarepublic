import { Link, usePage } from "@inertiajs/react";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import WhatsappIcon from "./icons/WhatsappIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import { Container } from "./Section";

const SOCIAL_LABELS = {
    facebook: "Facebook",
    instagram: "Instagram",
    youtube: "YouTube",
};

const SOCIAL_ICONS = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
};

const HELP_LINKS = [
    { label: "FAQ", href: "/#faq" },
    { label: "Blog & Edukasi", href: "/berita" },
    { label: "Kontak", href: "/kontak" },
];

export default function Footer() {
    const { site } = usePage().props;
    const contact = site?.contact ?? {};
    const social = site?.social ?? {};
    const salesContact = site?.sales_contact;

    return (
        <footer className="bg-primary-900 text-white">
            <Container className="py-14 md:py-20">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        {site?.logo_light ? (
                            <img
                                src={site.logo_light}
                                alt={site?.name ?? "Logo"}
                                width="297"
                                height="100"
                                className="h-12 w-auto md:h-14"
                            />
                        ) : (
                            <p className="text-xl font-extrabold">
                                {site?.name ?? "Mora Republic"}
                            </p>
                        )}
                        {site?.tagline ? (
                            <p className="mt-4 max-w-xs text-sm text-white/70">
                                {site.tagline}
                            </p>
                        ) : null}

                        {Object.entries(social).length > 0 ? (
                            <ul className="mt-6 space-y-2.5">
                                {Object.entries(social).map(([key, href]) => {
                                    const Icon = SOCIAL_ICONS[key];

                                    return (
                                        <li key={key}>
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener"
                                                className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
                                            >
                                                {Icon ? (
                                                    <Icon className="h-4 w-4 shrink-0" />
                                                ) : null}
                                                {SOCIAL_LABELS[key] ?? key}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
                    </div>

                    <div>
                        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-300">
                            Bantuan
                        </h2>
                        <ul className="mt-4 space-y-2">
                            {HELP_LINKS.map((item) =>
                                item.href.includes("#") ? (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            className="text-sm text-white/75 transition hover:text-white"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-white/75 transition hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-300">
                            Kontak Utama
                        </h2>

                        {salesContact ? (
                            <div className="mt-4 flex gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-300">
                                    <WhatsappIcon className="h-4 w-4" />
                                </span>
                                <p className="text-sm leading-relaxed">
                                    {salesContact.name ? (
                                        <span className="block font-semibold text-white">
                                            {salesContact.name}
                                        </span>
                                    ) : null}
                                    {salesContact.phone ? (
                                        <a
                                            href={`tel:${salesContact.phone.replace(/[^0-9+]/g, "")}`}
                                            className="font-semibold text-white transition hover:text-primary-300"
                                        >
                                            {salesContact.phone}
                                        </a>
                                    ) : null}
                                    {salesContact.role ? (
                                        <span className="block text-white/60">
                                            {salesContact.role}
                                        </span>
                                    ) : null}
                                </p>
                            </div>
                        ) : null}

                        <ul className="mt-4 space-y-3 text-sm text-white/75">
                            {contact.address ? (
                                <li className="whitespace-pre-line">
                                    {contact.address}
                                </li>
                            ) : null}
                            {contact.hours ? <li>{contact.hours}</li> : null}
                            {contact.email ? (
                                <li>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="transition hover:text-white"
                                    >
                                        {contact.email}
                                    </a>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
                    <p>
                        &copy; {new Date().getFullYear()}{" "}
                        {site?.name ?? "Mora Republic"}. Seluruh hak cipta
                        dilindungi.
                    </p>
                    <Link
                        href="/kontak"
                        className="transition hover:text-white"
                    >
                        Butuh bantuan? Hubungi kami.
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
