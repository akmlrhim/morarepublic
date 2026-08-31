import { Head, usePage } from "@inertiajs/react";
import Button from "../../components/Button";

const CONTENT = {
    403: {
        title: "Akses Ditolak",
        description: "Kamu tidak punya izin untuk mengakses halaman ini.",
    },
    404: {
        title: "Halaman Tidak Ditemukan",
        description:
            "Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.",
    },
    419: {
        title: "Sesi Berakhir",
        description:
            "Halaman ini sudah kedaluwarsa. Silakan muat ulang lalu coba lagi.",
    },
    429: {
        title: "Terlalu Banyak Permintaan",
        description:
            "Kamu mengirim terlalu banyak permintaan dalam waktu singkat. Coba lagi sebentar lagi.",
    },
    500: {
        title: "Terjadi Kesalahan Server",
        description:
            "Ada yang tidak beres di sisi kami. Tim kami sudah diberi tahu, silakan coba lagi nanti.",
    },
    503: {
        title: "Sedang Pemeliharaan",
        description:
            "Layanan sedang dalam pemeliharaan singkat untuk peningkatan. Silakan coba lagi beberapa saat lagi.",
    },
};

export default function ErrorPage({ status }) {
    const { site } = usePage().props;
    const info = CONTENT[status] ?? {
        title: "Terjadi Kesalahan",
        description: "Sesuatu berjalan tidak semestinya. Silakan coba lagi.",
    };

    return (
        <>
            <Head title={`${status} - ${info.title}`} />

            <div className="flex min-h-screen flex-col bg-white">
                <main className="flex flex-1 items-center">
                    <div className="mx-auto w-full max-w-[640px] px-6 py-16 text-center lg:px-12">
                        <p className="mt-3 text-[88px] font-extrabold leading-none text-primary-900 md:text-[120px]">
                            {status}
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-ink md:text-3xl">
                            {info.title}
                        </h1>
                        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                            {info.description}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Button href="/" variant="primary" size="md">
                                Kembali ke Beranda
                            </Button>
                            <Button href="/kontak" variant="ghost" size="md">
                                Hubungi Kami
                            </Button>
                        </div>
                    </div>
                </main>

                <footer className="relative px-6 py-6 text-center text-sm text-muted lg:px-12">
                    &copy; {new Date().getFullYear()}{" "}
                    {site?.name ?? "Mora Republic"}. Seluruh hak cipta
                    dilindungi.
                </footer>
            </div>
        </>
    );
}
