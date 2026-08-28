import { usePage } from "@inertiajs/react";

/**
 * Membuka WhatsApp sambil mencatat klik untuk analitik iklan.
 * Yang dikirim ke server cuma konteks halaman, bukan data pribadi pengunjung.
 */
export function useWhatsapp(context = {}) {
    const { site, tracking } = usePage().props;
    const url = site?.whatsapp?.url;

    function track() {
        if (typeof window === "undefined") {
            return;
        }

        const token = document.querySelector(
            'meta[name="csrf-token"]',
        )?.content;

        const payload = JSON.stringify({
            area_id: context.areaId ?? null,
            product_id: context.productId ?? null,
            page_path: window.location.pathname.slice(0, 190),
            search_term: tracking?.search_term ?? null,
            utm_source: tracking?.utm_source ?? null,
            utm_medium: tracking?.utm_medium ?? null,
            utm_campaign: tracking?.utm_campaign ?? null,
        });

        fetch("/track/whatsapp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token ?? "",
            },
            body: payload,
            keepalive: true,
        }).catch(() => {
            // Analitik tidak boleh menghalangi user menghubungi kami.
        });
    }

    return { url, track, available: Boolean(url) };
}
