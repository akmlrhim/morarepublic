import { useWhatsapp } from '../lib/useWhatsapp';
import WhatsappIcon from './icons/WhatsappIcon';

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
            <WhatsappIcon className="h-5 w-5" />
            WhatsApp
        </a>
    );
}
