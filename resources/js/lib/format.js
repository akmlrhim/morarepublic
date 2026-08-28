export function formatDate(value) {
    if (!value) {
        return null;
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
}

export function cx(...values) {
    return values.filter(Boolean).join(' ');
}

/**
 * Grid layanan menyesuaikan jumlah data: satu tampil penuh, dua berdampingan,
 * tiga atau lebih baru pakai tiga kolom. Semua kartu berukuran sama (lihat
 * ServiceCard) supaya tidak ada baris yang bolong.
 */
export function serviceGridColsClass(count) {
    if (count <= 1) {
        return 'grid-cols-1';
    }

    if (count === 2) {
        return 'sm:grid-cols-2';
    }

    return 'sm:grid-cols-2 lg:grid-cols-3';
}
