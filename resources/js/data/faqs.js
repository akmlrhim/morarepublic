/**
 * Bank FAQ customer MyRepublic Air (FWA) & FTTH.
 * Statis di frontend saja (tanpa database) supaya gampang diedit langsung dari sini.
 */
export const FAQ_CATEGORIES = [
    {
        id: 'harga-tagihan-pembayaran',
        title: 'Harga, Tagihan & Pembayaran',
        items: [
            {
                question: 'Harga per bulan flat atau ada biaya tambahan?',
                answer: 'Harga paket mengikuti harga yang tertera saat pendaftaran. Untuk pemakaian internet, tidak ada biaya tambahan berdasarkan jumlah pemakaian data/GB.\nMyRepublic Air menggunakan sistem Unlimited, sehingga customer tidak perlu membayar berdasarkan jumlah kuota yang digunakan.',
            },
            {
                question: 'Apakah ada FUP atau batas kuota?',
                answer: 'Tidak ada, Kak. MyRepublic Air menggunakan kuota UNLIMITED dan TANPA FUP. Jadi pemakaian internet tidak dibatasi berdasarkan jumlah GB.\nCustomer bisa menggunakan internet sepuasnya tanpa khawatir kuota habis atau kecepatan diturunkan karena melewati batas pemakaian.',
            },
            {
                question: 'Kecepatannya berapa?',
                answer: 'Kecepatan MyRepublic Air hingga 100 Mbps.',
            },
            {
                question: 'Apakah ada biaya tambahan kalau pemakaian internet banyak?',
                answer: 'Tidak ada biaya berdasarkan banyaknya pemakaian internet. Sistemnya bukan bayar per GB dan tidak ada biaya tambahan karena customer menggunakan internet dalam jumlah besar.',
            },
            {
                question: 'Harga yang tertera sudah harga bersih?',
                answer: 'Untuk harga/promo yang ditawarkan kepada customer, kami akan informasikan harga dan komponen tagihan secara jelas sebelum pendaftaran, sehingga customer mengetahui biaya yang harus dibayarkan.\nHarga/paket dapat berbeda berdasarkan area dan periode promo.',
            },
            {
                question: 'Pembayaran dilakukan sebelum atau setelah pemasangan?',
                answer: 'Untuk MyRepublic Air, pembayaran pertama dilakukan terlebih dahulu melalui link/payment channel resmi. Setelah pembayaran terverifikasi, modem dikirim dan customer melakukan aktivasi.\nUntuk FTTH, mekanisme pemasangan dan pembayaran mengikuti paket serta ketentuan yang berlaku.',
            },
            {
                question: 'Apakah pembayaran bulanan dilakukan di muka?',
                answer: 'Ya. Sistem pembayaran layanan MyRepublic menggunakan pembayaran di muka sesuai ketentuan layanan.',
            },
        ],
    },
    {
        id: 'berhenti-berlangganan',
        title: 'Berhenti Berlangganan',
        items: [
            {
                question: 'Kalau berhenti berlangganan apakah ada penalti?',
                answer: 'Untuk MyRepublic Air, berdasarkan SKU Air yang tersedia, customer dapat mengakhiri layanan dengan memberikan pemberitahuan sesuai prosedur. SKU Air tersebut tidak mencantumkan denda terminasi seperti denda Rp1 juta sebelum 12 bulan yang terdapat pada SKU umum MyRepublic lama.\nNamun, apabila menggunakan modem/perangkat sewa, perangkat tersebut wajib dikembalikan kepada MyRepublic dalam kondisi baik setelah layanan berakhir. Jika perangkat tidak dikembalikan atau rusak/hilang, dapat dikenakan biaya penggantian sesuai ketentuan.\nUntuk customer dari tim marketing kami, kami sangat merekomendasikan berlangganan minimal 3 bulan.\nAlasannya, setelah customer berlangganan minimal 3 bulan biasanya sudah ada kesempatan mendapatkan kembali promo pemasangan/periode promo berikutnya. Selain itu, dari sisi internal marketing, apabila customer berhenti sebelum 3 bulan, tim marketing dapat dikenakan konsekuensi/denda internal oleh kantor.\nJadi, rekomendasi 3 bulan adalah rekomendasi dari sisi tim marketing, bukan berarti customer dikenakan denda RpX apabila berhenti sebelum 3 bulan.',
            },
        ],
    },
    {
        id: 'modem-perangkat',
        title: 'Modem / Perangkat',
        items: [
            {
                question: 'Modemnya beli atau sewa?',
                answer: 'MyRepublic Air menyediakan pilihan rental modem maupun beli modem, tergantung paket yang tersedia di area customer.\nUntuk modem rental, perangkat tetap menjadi milik MyRepublic dan digunakan customer selama berlangganan.\nJika berhenti berlangganan, modem/perangkat sewa wajib dikembalikan sesuai ketentuan.',
            },
            {
                question: 'Apakah modem bisa menjadi hak milik?',
                answer: 'Bisa tersedia opsi beli modem, tergantung paket/penawaran yang berlaku di area customer. MyRepublic saat ini memang menyediakan pilihan Beli Modem maupun Rental Modem untuk MyRepublic Air.',
            },
            {
                question: 'Modem bisa dibawa ke mana saja?',
                answer: 'Tidak bisa dibawa bebas seperti modem portable.\nMyRepublic Air merupakan layanan Fixed Wireless Access (FWA) yang dirancang untuk penggunaan tetap di rumah. Router membutuhkan sumber listrik dan terhubung dengan jaringan/site yang melayani lokasi tersebut.\nModem bisa dipindahkan dalam area sekitar lokasi pemasangan selama masih mendapatkan koneksi dari site yang sama.\nNamun tidak untuk dibawa ke lokasi yang berbeda jauh, keluar area coverage, atau digunakan saat perjalanan di mobil.',
            },
            {
                question: 'Apakah MyRepublic Air portable?',
                answer: 'Tidak, Kak.\nMyRepublic Air bukan modem MiFi atau modem portable untuk dibawa bepergian. Layanan ini merupakan FWA untuk penggunaan tetap di rumah.',
            },
        ],
    },
    {
        id: 'kabel-lan-koneksi-perangkat',
        title: 'Kabel LAN & Koneksi Perangkat',
        items: [
            {
                question: 'Apakah modem MyRepublic Air ada kabel LAN?',
                answer: 'Perangkat MyRepublic Air dapat mencakup modem, kabel power dan/atau kabel LAN sesuai perangkat yang diberikan kepada pelanggan. Jadi ketersediaan kabel LAN mengikuti perangkat/paket yang diterima customer.\nKalau customer membutuhkan koneksi LAN untuk perangkat tertentu, bisa dicek langsung dari modem yang diterima.',
            },
            {
                question: 'Apakah bisa menggunakan kabel LAN ke komputer/TV?',
                answer: 'Bisa jika perangkat modem yang diterima memiliki port LAN yang sesuai dan perangkat tujuan juga mendukung koneksi LAN.\nKarena konfigurasi perangkat dapat berbeda, customer dapat mengirim foto bagian belakang modem apabila ingin dibantu memastikan port yang tersedia.',
            },
            {
                question: 'Apakah MyRepublic Air bisa terhubung ke Smart TV?',
                answer: 'Bisa, Kak. Smart TV yang mendukung koneksi internet dapat terhubung melalui jaringan WiFi.\nSelain itu, ekosistem MyRep Air juga menyediakan akses ke berbagai tayangan/platform hiburan. MyRepublic menyebut MyRep Air dapat digunakan untuk mengakses saluran TV hiburan, sementara dukungan Vidio menyatakan paket Vidio dapat ditonton di Smart TV yang mendukung aplikasi Vidio.',
            },
            {
                question: 'Apakah bisa digunakan untuk YouTube, Netflix, Vidio, dan streaming lainnya?',
                answer: 'Bisa digunakan untuk aktivitas streaming, selama perangkat yang digunakan mendukung aplikasi/layanan tersebut.\nMyRepublic Air memang diposisikan untuk kebutuhan internet rumah termasuk streaming film, olahraga, dan hiburan.\nUntuk aplikasi tertentu seperti Vidio, kompatibilitas mengikuti perangkat dan aplikasi yang digunakan.',
            },
        ],
    },
    {
        id: 'fwa-vs-ftth',
        title: 'FWA vs FTTH',
        items: [
            {
                question: 'Apa bedanya FWA dan FTTH?',
                answer: 'FWA (MyRepublic Air)\n• Menggunakan jaringan wireless/FWA dari tower\n• Tidak membutuhkan penarikan kabel fiber ke dalam rumah\n• Instalasi lebih praktis\n• Customer dapat melakukan instalasi/aktivasi secara mandiri\n• Kecepatan hingga 100 Mbps\n• Unlimited dan tanpa FUP\n• Paket yang kami tawarkan diarahkan untuk maksimal 4 perangkat aktif bersamaan\n• Tidak portable\n• Coverage bergantung pada site/tower FWA\nMyRepublic secara resmi menjelaskan MyRepublic Air sebagai layanan FWA berbasis True 5G-Fiber Quality tanpa perlu instalasi kabel ke rumah.\n\nFTTH (Fiber To The Home)\n• Menggunakan fiber optik sampai ke rumah\n• Membutuhkan penarikan kabel\n• Pemasangan dilakukan teknisi\n• Pilihan kecepatan lebih beragam\n• Cocok untuk kebutuhan banyak perangkat\n• Lebih cocok untuk penggunaan internet berat',
            },
        ],
    },
    {
        id: 'keunggulan-fwa',
        title: 'Keunggulan FWA',
        items: [
            {
                question: 'Apa keunggulan FWA?',
                answer: '• Harga lebih ekonomis\n• Tidak perlu tarik kabel fiber ke rumah\n• Instalasi praktis\n• Tinggal colok modem dan aktivasi\n• Unlimited\n• Tanpa FUP\n• Kecepatan hingga 100 Mbps\n• Cocok untuk rumah dengan jumlah perangkat yang tidak terlalu banyak\n• Solusi untuk area yang belum terjangkau fiber optik\n• Tidak membutuhkan instalasi kabel fisik yang rumit\nMyRepublic sendiri memposisikan Air sebagai alternatif internet rumah yang praktis, khususnya untuk area yang belum sepenuhnya terjangkau jaringan fiber.',
            },
        ],
    },
    {
        id: 'kekurangan-fwa',
        title: 'Kekurangan / Batasan FWA',
        items: [
            {
                question: 'Apa kekurangan FWA?',
                answer: '• Kecepatan maksimal 100 Mbps\n• Paket yang kami tawarkan maksimal 4 perangkat aktif bersamaan\n• Tidak portable\n• Bergantung pada coverage/site tower\n• Tidak semua lokasi tercover FWA\n• Tidak cocok untuk customer yang membutuhkan kecepatan sangat tinggi atau penggunaan perangkat yang sangat banyak',
            },
        ],
    },
    {
        id: 'keunggulan-ftth',
        title: 'Keunggulan FTTH',
        items: [
            {
                question: 'Apa keunggulan FTTH?',
                answer: '• Menggunakan fiber optik\n• Koneksi lebih stabil\n• Pilihan kecepatan lebih tinggi\n• Cocok untuk banyak perangkat\n• Tidak dibatasi 4 perangkat seperti paket FWA yang kami tawarkan\n• Cocok untuk keluarga besar\n• Cocok untuk gaming, streaming, WFH, CCTV, dan penggunaan internet berat',
            },
        ],
    },
    {
        id: 'kekurangan-ftth',
        title: 'Kekurangan FTTH',
        items: [
            {
                question: 'Apa kekurangan FTTH?',
                answer: '• Harga umumnya lebih tinggi dibanding FWA\n• Membutuhkan penarikan kabel fiber\n• Membutuhkan teknisi untuk pemasangan\n• Proses pemasangan tidak sesederhana FWA\n• Walaupun lebih stabil, FTTH tetap dapat mengalami gangguan teknis\n• Coverage FTTH berbeda dengan coverage FWA',
            },
        ],
    },
    {
        id: 'bagusan-fwa-atau-ftth',
        title: 'Bagusan FWA atau FTTH?',
        items: [
            {
                question: 'Bagusan FTTH atau FWA?',
                answer: 'Tergantung kebutuhan, Kak.\nKalau kebutuhan customer adalah WiFi rumah yang ekonomis, unlimited, praktis, hingga 100 Mbps, dan perangkat yang digunakan tidak terlalu banyak, FWA bisa menjadi pilihan yang sangat cocok.\nKalau customer membutuhkan kecepatan lebih tinggi, banyak perangkat, dan koneksi fiber optik, FTTH lebih cocok.\nJadi bukan soal mana yang mutlak lebih bagus, tetapi mana yang paling sesuai dengan kebutuhan customer dan kondisi coverage di lokasi.',
            },
        ],
    },
    {
        id: 'coverage-area',
        title: 'Coverage / Area',
        items: [
            {
                question: 'Apakah area saya tercover?',
                answer: 'Untuk area Banjarbaru, Banjarmasin, Martapura/Kabupaten Banjar, coverage MyRepublic Air sudah tersedia di banyak area dan terus diperluas.\nSecara resmi MyRepublic juga telah menyebut coverage Air di beberapa wilayah Kalimantan seperti Pontianak, Singkawang, Banjar, Barito Kuala, Banjarbaru, Banjarmasin, Palangkaraya, Samarinda, dan Kutai Kartanegara.\nUntuk kota/kabupaten lainnya, coverage dapat berbeda dan masih terus mengalami pembangunan/perluasan.\nCoverage FWA dan FTTH berbeda.\nJadi apabila rumah customer tidak tercover FTTH, belum tentu FWA tidak tersedia. Begitu juga sebaliknya.',
            },
            {
                question: 'Bagaimana cara mengecek apakah rumah saya tercover?',
                answer: 'Boleh dibantu cek, Kak.\nSilakan kirim sharelock lokasi rumah agar kami dapat membantu mengecek apakah lokasi tersebut masuk coverage FWA atau FTTH.\nUntuk daerah di luar area yang sudah disebutkan, silakan tanyakan kepada kami dan akan kami bantu cek.',
            },
        ],
    },
    {
        id: 'pemasangan-aktivasi',
        title: 'Pemasangan & Aktivasi',
        items: [
            {
                question: 'Bagaimana pemasangan FWA?',
                answer: 'FWA sangat praktis.\nSetelah customer melakukan registrasi dan pembayaran melalui link resmi, pembayaran diverifikasi. Setelah itu modem dikirim dan customer dapat melakukan aktivasi secara mandiri.\nSecara resmi MyRepublic menjelaskan alurnya: cek lokasi → pilih paket → bayar → modem dikirim → aktivasi.',
            },
            {
                question: 'Apakah FWA perlu menarik kabel?',
                answer: 'Tidak, Kak.\nMyRepublic Air menggunakan teknologi FWA sehingga tidak membutuhkan penarikan kabel fiber optik ke rumah.',
            },
            {
                question: 'Bagaimana pemasangan FTTH?',
                answer: 'Untuk FTTH, dibutuhkan penarikan kabel fiber optik menuju rumah dan pemasangan perangkat dilakukan oleh teknisi sesuai jadwal pemasangan.',
            },
        ],
    },
    {
        id: 'kecepatan-device',
        title: 'Kecepatan & Device',
        items: [
            {
                question: 'Berapa kecepatan MyRepublic Air?',
                answer: 'Kecepatan download hingga 100 Mbps.',
            },
            {
                question: 'Berapa perangkat yang bisa terhubung?',
                answer: 'Untuk paket FWA yang kami tawarkan, penggunaan diarahkan maksimal 4 perangkat aktif secara bersamaan.\nKalau customer membutuhkan lebih banyak perangkat atau penggunaan lebih berat, kami bisa bantu pertimbangkan FTTH.',
            },
            {
                question: 'Apakah Unlimited berarti bisa dipakai sebanyak-banyaknya?',
                answer: 'Untuk kuota internet, iya, unlimited.\nTidak ada batas kuota GB dan tidak ada FUP. Namun Unlimited tidak berarti tidak ada batasan teknis pada perangkat/jaringan. Untuk paket yang kami tawarkan, terdapat batas penggunaan optimal 4 perangkat aktif bersamaan.',
            },
        ],
    },
    {
        id: 'jaringan-gangguan',
        title: 'Jaringan & Gangguan',
        items: [
            {
                question: 'Bagaimana kualitas jaringan FWA?',
                answer: 'MyRepublic Air menggunakan teknologi True 5G-Fiber Quality dan dirancang sebagai internet rumah yang cepat, stabil, dan praktis.\nNamun kualitas koneksi tetap dapat dipengaruhi oleh kondisi jaringan, lokasi, posisi modem, perangkat, dan faktor teknis lainnya.',
            },
            {
                question: 'Apakah FWA bisa mengalami gangguan?',
                answer: 'Seperti semua layanan internet, FWA tetap dapat mengalami gangguan teknis.\nNamun karena tidak menggunakan kabel fiber yang ditarik ke rumah, FWA dapat menjadi alternatif yang praktis terutama di area yang belum memiliki infrastruktur fiber.\nJika mengalami gangguan, silakan langsung hubungi CS untuk dilakukan pengecekan.',
            },
            {
                question: 'Kalau terjadi gangguan harus menghubungi siapa?',
                answer: 'Silakan langsung hubungi CS Pusat:\n0889-8150-0818\nBisa melalui WhatsApp maupun telepon.',
            },
        ],
    },
    {
        id: 'pembayaran-setelah-pemasangan',
        title: 'Pembayaran Setelah Pemasangan',
        items: [
            {
                question: 'Tagihan setelah atau sebelum pemasangan?',
                answer: 'Untuk FWA, pembayaran pertama dilakukan terlebih dahulu melalui link/payment channel resmi. Setelah pembayaran terverifikasi, modem dikirim dan customer melakukan aktivasi.\nUntuk bulan berikutnya, tagihan mengikuti sistem billing MyRepublic.\nUntuk FTTH, proses pembayaran mengikuti ketentuan paket dan proses pemasangan yang berlaku.',
            },
        ],
    },
    {
        id: 'rekomendasi-berdasarkan-kebutuhan',
        title: 'Rekomendasi Berdasarkan Kebutuhan',
        items: [
            {
                question: 'Saya hanya butuh WiFi untuk HP, laptop, TV dan beberapa perangkat. Pilih apa?',
                answer: 'Kalau kebutuhan internet rumah tidak terlalu berat dan perangkat yang digunakan relatif sedikit, FWA bisa menjadi pilihan yang ekonomis dan praktis.',
            },
            {
                question: 'Saya punya banyak perangkat dan membutuhkan kecepatan tinggi. Pilih apa?',
                answer: 'Kalau membutuhkan banyak perangkat, aktivitas internet berat, atau membutuhkan kecepatan di atas 100 Mbps, FTTH lebih direkomendasikan.',
            },
            {
                question: 'Kalau FTTH tidak tersedia di rumah saya, apakah bisa FWA?',
                answer: 'Bisa saja, Kak, selama lokasi tersebut tercover jaringan FWA.\nCoverage FWA dan FTTH berbeda, sehingga lokasi yang tidak terjangkau fiber belum tentu tidak bisa menggunakan MyRepublic Air.',
            },
            {
                question: 'Kalau FWA tidak tersedia, apakah bisa FTTH?',
                answer: 'Bisa saja jika lokasi tersebut masuk dalam coverage FTTH.\nSilakan kirim sharelock lokasi rumah, nanti kami bantu cek jaringan yang tersedia.',
            },
        ],
    },
    {
        id: 'jawaban-singkat-quick-reply',
        title: 'Jawaban Singkat / Quick Reply',
        items: [
            {
                question: 'Jadi FWA itu cocok untuk siapa?',
                answer: 'FWA cocok untuk customer yang mencari:\n• WiFi rumah ekonomis\n• Unlimited\n• Tanpa FUP\n• Hingga 100 Mbps\n• Instalasi praktis tanpa tarik kabel\n• Kebutuhan perangkat tidak terlalu banyak\n• Tidak membutuhkan WiFi portable',
            },
            {
                question: 'Jadi FTTH cocok untuk siapa?',
                answer: 'FTTH lebih cocok untuk customer yang membutuhkan:\n• Fiber optik\n• Koneksi lebih stabil\n• Kecepatan lebih tinggi\n• Banyak perangkat\n• Gaming/streaming/WFH\n• Penggunaan internet berat',
            },
            {
                question: 'Kalau saya bingung pilih FWA atau FTTH bagaimana?',
                answer: 'Tidak perlu bingung, Kak.\nSilakan kirim:\n• Sharelock lokasi rumah\n• Perkiraan jumlah pengguna\n• Perkiraan jumlah perangkat\n• Kebutuhan internet utama\nNanti kami bantu cek coverage FWA/FTTH sekaligus rekomendasikan mana yang paling sesuai.',
            },
        ],
    },
    {
        id: 'penutup-kontak-cs',
        title: 'Penutup / Kontak CS',
        items: [
            {
                question: 'Masih bingung atau ada kendala?',
                answer: 'Silakan langsung hubungi Marketing & CS MyRepublic:\n0851-1361-8632\nBisa melalui WhatsApp maupun telepon.',
            },
        ],
    },
];

/** Cuplikan buat teaser di beranda, tautannya mengarah ke /faq untuk daftar lengkap. */
export const FAQ_HIGHLIGHTS = [
    FAQ_CATEGORIES[0].items[0],
    FAQ_CATEGORIES[0].items[1],
    FAQ_CATEGORIES[0].items[2],
    FAQ_CATEGORIES[4].items[0],
    FAQ_CATEGORIES[10].items[0],
    FAQ_CATEGORIES[13].items[2],
];
