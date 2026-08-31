import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import Accordion from '../components/Accordion';
import ArticleCard from '../components/ArticleCard';
import AdvantagesBlock from '../components/blocks/AdvantagesBlock';
import HeroBlock from '../components/blocks/HeroBlock';
import StatsStripBlock from '../components/blocks/StatsStripBlock';
import Button from '../components/Button';
import HeroBackground from '../components/HeroBackground';
import Reveal from '../components/Reveal';
import { Section, SectionHeading } from '../components/Section';
import ServiceCard from '../components/ServiceCard';
import { FAQ_HIGHLIGHTS } from '../data/faqs';
import PublicLayout from '../layouts/PublicLayout';
import { cx, serviceGridColsClass } from '../lib/format';

const iconProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'h-9 w-9',
    'aria-hidden': 'true',
};

const ADVANTAGES = {
    eyebrow: 'Keunggulan',
    heading: 'Kenapa Memilih Kami?',
    description: 'Empat alasan utama ribuan pelanggan beralih ke internet unlimited Mora Republic.',
    items: [
        {
            title: 'Unlimited',
            description: 'Internet tanpa batas kuota, streaming, WFH, dan gaming sepuasnya.',
            image: '/img/advantages/unlimited.webp',
            icon: (
                <svg {...iconProps}>
                    <path d="M8.5 8c-2.2 0-4 1.8-4 4s1.8 4 4 4c2.8 0 4.4-2.7 5.5-4.5C15.1 9.7 16.7 8 19.5 8c2.2 0 4 1.8 4 4s-1.8 4-4 4c-2.8 0-4.4-2.7-5.5-4.5C12.9 9.7 11.3 8 8.5 8Z" />
                </svg>
            ),
        },
        {
            title: 'Tanpa FUP',
            description: 'Kecepatan tidak diturunkan berdasarkan pemakaian.',
            image: '/img/advantages/no-fup.webp',
            icon: (
                <svg {...iconProps}>
                    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            ),
        },
        {
            title: 'Gratis Pemasangan',
            description: 'Untuk area dan periode promo terpilih. Konfirmasi via WhatsApp.',
            image: '/img/advantages/installation.webp',
            icon: (
                <svg {...iconProps}>
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.06-3.06a6 6 0 0 1-7.94 7.94l-6.7 6.7a2.1 2.1 0 0 1-3-3l6.7-6.7a6 6 0 0 1 7.94-7.94L14.7 6.3Z" />
                </svg>
            ),
        },
        {
            title: 'Cepat & Stabil',
            description: 'Jaringan modern FWA dan fiber optik dengan dukungan teknisi responsif.',
            image: '/img/advantages/stable.webp',
            icon: (
                <svg {...iconProps}>
                    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
                </svg>
            ),
        },
    ],
};

const HERO = {
    heading: 'Internet cepat dan stabil untuk rumah dan usaha kamu',
    subheading:
        'Layanan FWA dan FTTH dengan jangkauan yang terus bertambah. Cek dulu ketersediaan di area kamu, tim kami siap bantu dari pemasangan sampai perawatan.',
    cta_text: 'Lihat Layanan',
    cta_url: '/#layanan',
    image: '/img/hero-home.webp',
};

const STATS_STRIP = {
    items: [
        { value: '24+', label: 'Kota & kabupaten terjangkau' },
        { value: '100%', label: 'Unlimited tanpa FUP' },
        { value: '1-3', label: 'Hari kerja instalasi' },
        { value: '24/7', label: 'Dukungan pelanggan' },
    ],
};

export default function Home({ services = [], articles = [], seo }) {
    useEffect(() => {
        const hash = window.location.hash.slice(1);

        if (!hash) {
            return;
        }

        const scrollToHash = () => document.getElementById(hash)?.scrollIntoView({ block: 'start' });

        scrollToHash();
        window.addEventListener('load', scrollToHash);

        return () => window.removeEventListener('load', scrollToHash);
    }, []);

    return (
        <PublicLayout seo={seo} transparentNav>
            <HeroBlock data={HERO} />

            <StatsStripBlock data={STATS_STRIP} />

            <AdvantagesBlock data={ADVANTAGES} />

            {services.length > 0 ? (
                <Section id="layanan">
                    <SectionHeading
                        eyebrow="Layanan Kami"
                        title="Pilih layanan yang paling pas"
                        description="Setiap paket dirancang untuk kebutuhan yang berbeda, dari rumah tangga sampai kebutuhan usaha."
                    />

                    <div className={cx('mt-10 grid gap-6', serviceGridColsClass(services.length))}>
                        {services.map((service, index) => (
                            <Reveal key={service.slug} delay={index * 60}>
                                <ServiceCard service={service} hidePrice />
                            </Reveal>
                        ))}
                    </div>
                </Section>
            ) : null}

            <section className="relative isolate overflow-hidden py-16 md:py-24">
                <HeroBackground image="/img/coverage.webp" variant="compact" />

                <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-12">
                    <div className="max-w-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Cek Coverage</p>
                        <h2 className="text-balance-heading mt-3 text-[28px] font-extrabold leading-[1.1] text-white md:text-[40px]">
                            Sudah terjangkau di area kamu?
                        </h2>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                            Masukkan nama kota atau kecamatan kamu, lalu pilih jenis layanan. Hasilnya langsung
                            kelihatan tanpa perlu isi data pribadi. Kalau area kamu belum tercover, kamu tetap bisa
                            masuk daftar tunggu supaya diprioritaskan saat jaringan kami masuk ke sana.
                        </p>
                        <Button href="/cek-coverage" variant="outline" size="lg" className="mt-7">
                            Cek Coverage Sekarang
                        </Button>
                    </div>
                </div>
            </section>

            {articles.length > 0 ? (
                <Section>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading eyebrow="Berita" title="Kabar terbaru dari kami" />
                        <Link href="/berita" className="text-sm font-semibold text-primary-500">
                            Lihat semua berita
                            <span aria-hidden="true"> &rsaquo;</span>
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article, index) => (
                            <Reveal key={article.slug} delay={index * 60}>
                                <ArticleCard article={article} />
                            </Reveal>
                        ))}
                    </div>
                </Section>
            ) : null}

            <Section id="faq" tone="surface">
                <SectionHeading
                    eyebrow="Bantuan"
                    title="Pertanyaan yang Sering Ditanyakan"
                    description="Kalau jawabannya belum ada di sini, cek daftar FAQ lengkap atau tim kami siap bantu lewat halaman kontak."
                />

                <Accordion items={FAQ_HIGHLIGHTS} className="mt-10" />

                <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link href="/faq" className="text-sm font-semibold text-primary-500 hover:underline">
                        Lihat semua FAQ
                        <span aria-hidden="true"> &rsaquo;</span>
                    </Link>
                    <Button href="/kontak" size="sm">
                        Hubungi Kami
                    </Button>
                </div>
            </Section>
        </PublicLayout>
    );
}
