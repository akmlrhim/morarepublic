import { usePage } from "@inertiajs/react";

/**
 * Menyediakan link WhatsApp situs untuk dipakai di tombol CTA.
 */
export function useWhatsapp() {
    const { site } = usePage().props;
    const url = site?.whatsapp?.url;

    return { url, available: Boolean(url) };
}
