import { useWhatsapp } from '../lib/useWhatsapp';

export default function WhatsappFloat({ context = {} }) {
    const whatsapp = useWhatsapp(context);

    if (!whatsapp.available) {
        return null;
    }

    return (
        <a
            href={whatsapp.url}
            target="_blank"
            rel="noopener"
            onClick={whatsapp.track}
            aria-label="Hubungi kami lewat WhatsApp"
            className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(46,15,77,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary-600"
        >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.18.83.85-3.1-.2-.32a8.1 8.1 0 0 1-1.25-4.35c0-4.5 3.68-8.16 8.2-8.16 2.19 0 4.25.85 5.8 2.4a8.1 8.1 0 0 1 2.4 5.77c0 4.5-3.68 8.16-8.15 8.16Zm4.5-6.1c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.07-.25-.13-1.04-.39-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.5.58.19 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
            </svg>
            WhatsApp
        </a>
    );
}
