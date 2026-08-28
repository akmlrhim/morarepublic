import Button from '../../components/Button';
import PackagePricingCard from '../../components/PackagePricingCard';
import PageHeader from '../../components/PageHeader';
import { Section, SectionHeading } from '../../components/Section';
import PublicLayout from '../../layouts/PublicLayout';
import { useWhatsapp } from '../../lib/useWhatsapp';

export default function ServiceShow({ service, seo }) {
    const whatsapp = useWhatsapp({ productId: service.id });

    return (
        <PublicLayout seo={seo} transparentNav whatsappContext={{ productId: service.id }}>
            <PageHeader eyebrow="Layanan" title={service.name} description={service.short_description} />

            <Section>
                <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
                    <div>
                        {service.image ? (
                            <img
                                src={service.image}
                                alt={service.name}
                                className="mb-8 w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
                            />
                        ) : null}

                        {service.content ? (
                            <div className="prose-cms" dangerouslySetInnerHTML={{ __html: service.content }} />
                        ) : (
                            <p className="text-base text-muted">Detail layanan sedang disiapkan.</p>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="rounded-[var(--radius-card)] bg-hero-gradient p-8 text-white shadow-[var(--shadow-card)]">
                            <h2 className="text-lg font-semibold">Tertarik dengan layanan ini?</h2>
                            <p className="mt-3 text-sm leading-relaxed text-white/80">
                                Cek dulu ketersediaannya di area kamu, atau langsung tanya tim kami.
                            </p>
                            <div className="mt-6 flex flex-col gap-3">
                                <Button href="/cek-coverage" variant="secondary" size="sm">
                                    Cek Coverage
                                </Button>
                                {whatsapp.available ? (
                                    <Button
                                        as="a"
                                        href={whatsapp.url}
                                        target="_blank"
                                        rel="noopener"
                                        onClick={whatsapp.track}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Tanya lewat WhatsApp
                                    </Button>
                                ) : (
                                    <Button href="/kontak" variant="outline" size="sm">
                                        Hubungi Kami
                                    </Button>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </Section>

            {service.packages?.length > 0 ? (
                <Section>
                    <SectionHeading
                        eyebrow="Harga"
                        title="Kecepatan untuk Segala Kebutuhan"
                        description="Semua paket unlimited tanpa FUP."
                    />
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {service.packages.map((pkg) => (
                            <PackagePricingCard
                                key={pkg.id}
                                package={pkg}
                                eyebrow={service.name}
                                selectHref={whatsapp.available ? whatsapp.url : '/kontak'}
                                selectTarget={whatsapp.available ? '_blank' : undefined}
                                selectRel={whatsapp.available ? 'noopener' : undefined}
                                onSelect={whatsapp.available ? whatsapp.track : undefined}
                            />
                        ))}
                    </div>
                </Section>
            ) : null}
        </PublicLayout>
    );
}
