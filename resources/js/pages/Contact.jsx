import { usePage } from '@inertiajs/react';
import ContactForm from '../components/ContactForm';
import PageHeader from '../components/PageHeader';
import { Container } from '../components/Section';
import PublicLayout from '../layouts/PublicLayout';
import ContactInfoBlock from '../components/blocks/ContactInfoBlock';

export default function Contact({ seo }) {
    const { site } = usePage().props;

    const contactInfo = {
        heading: 'Kantor Kami',
        address: site?.contact?.address,
        hours: site?.contact?.hours,
        phone: site?.contact?.phone,
        email: site?.contact?.email,
        map_embed: site?.contact?.map_embed,
    };

    return (
        <PublicLayout seo={seo} transparentNav>
            <PageHeader
                eyebrow="Kontak"
                title="Hubungi Kami"
                description="Isi form di bawah ini dan tim kami akan menghubungi kembali. Kamu juga bisa langsung telepon atau WhatsApp."
            />

            <div className="py-14 md:py-24">
                <Container>
                    <ContactForm />
                </Container>
            </div>

            <ContactInfoBlock data={contactInfo} />

            <img
                src="/img/contact.webp"
                alt="Tim Mora Republic siap membantu"
                className="h-70 w-full object-cover md:h-105 lg:h-130"
                loading="lazy"
            />
        </PublicLayout>
    );
}
