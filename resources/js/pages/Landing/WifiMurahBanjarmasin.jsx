import Accordion from '../../components/Accordion';
import Button from '../../components/Button';
import HeroBackground from '../../components/HeroBackground';
import { Container, Section, SectionHeading } from '../../components/Section';
import LandingLayout from '../../layouts/LandingLayout';
import { useWhatsapp } from '../../lib/useWhatsapp';

const BENEFIT_POINTS = [
    {
        title: 'Pasang dalam dua hari kerja',
        description: 'Untuk area Banjarmasin yang sudah tercover, jadwal pemasangan bisa langsung diatur.',
    },
    {
        title: 'Harga jelas di awal',
        description: 'Biaya bulanan dan biaya pemasangan dijelaskan sebelum kamu setuju berlangganan.',
    },
    {
        title: 'Teknisi ada di kota',
        description: 'Kalau ada gangguan, tim kami tidak perlu datang dari luar kota.',
    },
];

const FAQ_ITEMS = [
    {
        question: 'Apakah semua kecamatan di Banjarmasin sudah tercover?',
        answer: 'Sebagian besar sudah, tapi ada beberapa titik yang masih dalam antrean. Cek dulu di halaman cek coverage untuk memastikan.',
    },
    {
        question: 'Apakah bisa dipasang di kos atau kontrakan?',
        answer: 'Bisa, selama pemilik bangunan mengizinkan pemasangan perangkat.',
    },
];

export default function WifiMurahBanjarmasin({ area, product, seo }) {
    const context = {
        areaId: area?.id ?? null,
        productId: product?.id ?? null,
    };

    const whatsapp = useWhatsapp(context);

    const cta = whatsapp.available ? (
        <Button as="a" href={whatsapp.url} target="_blank" rel="noopener" onClick={whatsapp.track} variant="secondary" size="lg">
            Chat WhatsApp Sekarang
        </Button>
    ) : (
        <Button href="/kontak" variant="secondary" size="lg">
            Hubungi Kami
        </Button>
    );

    return (
        <LandingLayout seo={seo} whatsappContext={context}>
            <section className="relative isolate overflow-hidden bg-primary-900 pb-20 pt-16 md:pb-28 md:pt-24">
                <HeroBackground priority />

                <Container className="relative">
                    <div className="max-w-3xl">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80">Area Banjarmasin</p>

                        <h1 className="text-balance-heading mt-3 text-[34px] font-extrabold leading-[1.1] text-white drop-shadow-[0_2px_12px_rgba(46,15,77,0.45)] md:text-[58px]">
                            Wifi Murah di Banjarmasin, Pasang Cepat Tanpa Ribet
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                            Paket internet rumah mulai dari harga terjangkau, sudah termasuk perangkat dan pemasangan oleh teknisi kami.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            {cta}
                            <Button href="/cek-coverage" variant="outline" size="lg">
                                Cek Coverage
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <Section>
                <SectionHeading eyebrow="Kenapa Kami" title="Alasan pelanggan memilih layanan ini" />
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {BENEFIT_POINTS.map((benefit) => (
                        <article
                            key={benefit.title}
                            className="rounded-[var(--radius-card)] border border-line bg-white p-8 shadow-[var(--shadow-card)]"
                        >
                            <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-ribbon-gradient" />
                            <h3 className="mt-5 text-lg font-semibold text-ink">{benefit.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted">{benefit.description}</p>
                        </article>
                    ))}
                </div>
            </Section>

            {product ? (
                <Section tone="surface">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
                            />
                        ) : (
                            <div aria-hidden="true" className="h-64 w-full rounded-[var(--radius-card)] bg-ribbon-gradient opacity-80" />
                        )}

                        <div>
                            <SectionHeading eyebrow="Produk" title={product.name} description={product.short_description} />

                            {product.benefits?.length > 0 ? (
                                <ul className="mt-6 space-y-3">
                                    {product.benefits.map((benefit, index) => (
                                        <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted">
                                            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                            <Button href={`/layanan/${product.slug}`} variant="ghost" size="sm" className="mt-8">
                                Lihat detail layanan
                            </Button>
                        </div>
                    </div>
                </Section>
            ) : null}

            <Section>
                <SectionHeading eyebrow="FAQ" title="Pertanyaan seputar layanan ini" />
                <Accordion items={FAQ_ITEMS} className="mt-10 max-w-3xl" />
            </Section>

            <section className="py-14 md:py-24">
                <Container>
                    <div className="relative overflow-hidden rounded-[28px] bg-hero-gradient px-8 py-14 text-center md:px-16 md:py-20">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-ribbon-gradient opacity-40 blur-3xl"
                        />
                        <div className="relative mx-auto max-w-2xl">
                            <h2 className="text-balance-heading text-[28px] font-bold leading-tight text-white md:text-[40px]">
                                Siap pasang di Banjarmasin?
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-white/80">
                                Chat tim kami sekarang untuk cek jadwal pemasangan dan promo yang sedang berjalan.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">{cta}</div>
                        </div>
                    </div>
                </Container>
            </section>
        </LandingLayout>
    );
}
