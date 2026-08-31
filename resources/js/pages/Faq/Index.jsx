import Accordion from '../../components/Accordion';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import { Section, SectionHeading } from '../../components/Section';
import { FAQ_CATEGORIES } from '../../data/faqs';
import PublicLayout from '../../layouts/PublicLayout';

export default function FaqIndex({ seo }) {
    return (
        <PublicLayout seo={seo}>
            <PageHeader
                eyebrow="Bantuan"
                title="Pertanyaan yang Sering Ditanyakan"
                description="Semua yang perlu kamu tahu soal harga, tagihan, modem, coverage, sampai perbandingan FWA dan FTTH."
            />

            {FAQ_CATEGORIES.map((category, index) => (
                <Section key={category.id} id={category.id} tone={index % 2 === 0 ? 'white' : 'surface'}>
                    <SectionHeading title={category.title} />
                    <Accordion items={category.items} className="mt-8" />
                </Section>
            ))}

            <Section tone="dark">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Masih ada yang mau ditanyakan?</h2>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                            Tim kami siap bantu cek coverage, rekomendasi paket, sampai kendala teknis.
                        </p>
                    </div>
                    <Button href="/kontak" size="sm">
                        Hubungi Kami
                    </Button>
                </div>
            </Section>
        </PublicLayout>
    );
}
