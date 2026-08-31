import { Link, usePage } from '@inertiajs/react';
import Button from './Button';
import Logo from './Logo';
import { Container } from './Section';
import { useWhatsapp } from '../lib/useWhatsapp';

export default function LandingHeader() {
    const { site } = usePage().props;
    const whatsapp = useWhatsapp();

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-[0_2px_16px_rgba(46,15,77,0.08)]">
            <Container className="flex h-[76px] items-center justify-between gap-4">
                <Link href="/" className="flex items-center" aria-label={`Beranda ${site?.name ?? ''}`}>
                    <Logo site={site} solid />
                </Link>

                {whatsapp.available ? (
                    <Button as="a" href={whatsapp.url} target="_blank" rel="noopener" variant="primary" size="sm">
                        Chat WhatsApp
                    </Button>
                ) : (
                    <Button href="/kontak" variant="primary" size="sm">
                        Hubungi Kami
                    </Button>
                )}
            </Container>
        </header>
    );
}
