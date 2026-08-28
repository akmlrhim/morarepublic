import { Head, usePage } from '@inertiajs/react';
import LandingFooter from '../components/LandingFooter';
import LandingHeader from '../components/LandingHeader';
import WhatsappFloat from '../components/WhatsappFloat';

/**
 * Layout khusus landing page iklan, terpisah dari layout web utama (PublicLayout).
 * Header cuma logo + CTA, tanpa menu navigasi, supaya pengunjung dari iklan
 * fokus ke satu ajakan bertindak.
 */
export default function LandingLayout({ seo, whatsappContext, children }) {
    const { site } = usePage().props;

    return (
        <>
            <Head>
                <title>{seo?.title ?? site?.name ?? 'Mora Republic'}</title>
                {seo?.description ? <meta name="description" content={seo.description} /> : null}
                {seo?.canonical ? <link rel="canonical" href={seo.canonical} /> : null}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={seo?.title ?? site?.name ?? ''} />
                {seo?.description ? <meta property="og:description" content={seo.description} /> : null}
                {seo?.canonical ? <meta property="og:url" content={seo.canonical} /> : null}
                {seo?.image ? <meta property="og:image" content={seo.image} /> : null}
                <meta name="twitter:card" content={seo?.image ? 'summary_large_image' : 'summary'} />
            </Head>

            <a
                href="#konten"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
                Lewati ke konten utama
            </a>

            <LandingHeader whatsappContext={whatsappContext} />

            <main id="konten" className="pt-[76px]">
                {children}
            </main>

            <LandingFooter />
            <WhatsappFloat context={whatsappContext} />
        </>
    );
}
