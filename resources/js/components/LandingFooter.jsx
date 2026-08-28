import { usePage } from '@inertiajs/react';
import { Container } from './Section';

export default function LandingFooter() {
    const { site } = usePage().props;
    const phone = site?.contact?.phone;

    return (
        <footer className="border-t border-line bg-white">
            <Container className="flex flex-col gap-3 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
                <p>
                    &copy; {new Date().getFullYear()} {site?.name ?? 'Mora Republic'}. Seluruh hak cipta dilindungi.
                </p>
                {phone ? (
                    <a href={`tel:${phone}`} className="font-semibold text-primary-600 hover:underline">
                        {phone}
                    </a>
                ) : null}
            </Container>
        </footer>
    );
}
