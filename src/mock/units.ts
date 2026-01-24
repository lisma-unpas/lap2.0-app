export const UNITS_MOCK = [
    {
        id: 'tesas',
        name: 'TESAS',
        description: `LISMA ART PARADE 2.0 (LAP 2.0): Pagelaran Teater Drama Musikal \n\nTahta bisa direbut. Wajah bisa diubah. Tapi ketulusan selalu menemukan jalannya.\n\nSaat Purbasari diusir ke hutan, takdir justru mempertemukannya dengan Lutung Kasarung—Pangeran yang terkutuk. Saat semua topeng runtuh, siapakah yang berkuasa?\n\nTemukan jawabannya dan saksikan legenda hidup LUTUNG KASARUNG 🎭`,
        subEvents: ['Teater Drama Musikal', 'Baca Puisi', 'Cipta Prosa'],
        startDate: '2026-04-26',
        price: 25000,
        badgeText: "🎭 Teater dan Sastra",
        colorClass: "purple",
        iconId: "ticket",
        highlightTitle: "26 April 2026",
        highlightSubtitle: "📍 Mayang Sunda",
        imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop",
        cpName: "Panitia TESAS",
        cpWhatsapp: "628123456789",
        cpDescription: "Hubungi pendamping unit TESAS untuk informasi teknis.",
        formFields: [
            { id: "fullName", label: "Nama Lengkap", type: "text", required: true, persistent: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            { id: "sesi", label: "Pilih Sesi", type: "select", options: ["Sesi 1", "Sesi 2", "Sesi 3"], required: true },
            { id: "asal", label: "Asal Kampus/Sekolah/Instansi", type: "text", required: true },
            {
                id: "category", label: "Kategori Peserta", type: "radio",
                options: [
                    { label: "Umum (Rp40.000)", value: "umum", price: 40000 },
                    { label: "Sekolah (FREE)", value: "sekolah", price: 0 }
                ], required: true
            },
            { id: "quantity", label: "Jumlah Tiket", type: "number", min: 1, defaultValue: 1, required: true }
        ]
    },
    {
        id: 'kds',
        name: 'KDS',
        description: `Sampur Sekar Jagat by LISMA ART PARADE 2.0 (LAP 2.0)\n\nKeindahan Alam Semesta yang Terjalin dalam Tarian\n\nSampur sekar jagat by Lisma Art Parade merupakan pagelaran seni budaya Sunda yang dirancang sebagai ruang apresiasi antara tradisi, spiritualitas, dan keindahan artistik. Melalui perpaduan tari klasik, musik live, dan wayang golek, acara ini menghadirkan pengalaman budaya yang utuh, hangat, and bermakna dalam suasana eksklusif khas Bandung.`,
        subEvents: ['Tari Badaya', 'Tari Sulanjana', 'Tari Subali Sugriwa', 'Tari Gaplek', 'Tari Yudharini', 'Tari Jaya Perbangsa', 'Wayang Golek'],
        startDate: '2026-05-02',
        price: 35000,
        badgeText: "🎻 Kategori Seni Tradisional",
        colorClass: "rose",
        iconId: "music",
        highlightTitle: "2 Mei 2026",
        highlightSubtitle: "📍 Tempat Makan Bandung – Dago Giri",
        imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop",
        cpName: "Panitia KDS",
        cpWhatsapp: "628123456780",
        cpDescription: "Tanyakan seputar alat musik tradisional dan pupuh.",
        formFields: [
            { id: "fullName", label: "Nama Lengkap", type: "text", required: true, persistent: true },
            { id: "phoneNumber", label: "Nomor WhatsApp", type: "text", required: true, persistent: true },
            {
                id: "category", label: "Kategori", type: "radio",
                options: [
                    { label: "Umum (Rp100.000)", value: "umum", price: 100000 },
                    { label: "SMA (Rp100.000)", value: "sma", price: 100000 }
                ], required: true
            },
            { id: "note", label: "Info PENTING", type: "info", text: "Harga tiket sudah termasuk bundling minuman, sehingga audiens tidak hanya menikmati pertunjukan seni, tetapi juga pengalaman bersantap yang menyatu dengan atmosfer acara." }
        ]
    },
    {
        id: 'psm',
        name: 'PSM',
        description: `✨ LISMA ART PARADE 2.0 (LAP 2.0): BAND COMPETITION ✨\n\nPunya karya yang cuma mentok di ruang latihan? Inilah saatnya menunjukkan taringmu di kompetisi band paling dinamis tahun ini! Unit PSM mengundang band berbakat untuk unjuk gigi. Bukan sekadar kompetisi, ini adalah pembuktian jati diri lewat nada dan harmoni!\n\n🔥 BENEFIT EKSKLUSIF: Juara 1, 2, dan 3 akan mendapatkan kesempatan emas untuk tampil di Main Event dan berbagi panggung langsung dengan Guest Star kami!`,
        subEvents: ['Band Competition', 'Solo Vocal', 'Harmoni Nada'],
        startDate: '2026-05-10',
        price: 150000,
        badgeText: "🎼 Paduan Suara dan Musik",
        colorClass: "indigo",
        iconId: "music",
        highlightTitle: "10 Mei 2026",
        highlightSubtitle: "📍 Parkiran FISS Unpas Setiabudhi",
        imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
        cpName: "Kang PSM",
        cpWhatsapp: "628123456781",
        cpDescription: "Pertanyaan seputar alat musik dan teknis panggung.",
        formFields: [
            { id: "bandName", label: "Nama Band", type: "text", required: true },
            { id: "members", label: "Nama Anggota", type: "textarea", placeholder: "Sebutkan nama anggota satu per satu...", required: true },
            { id: "identityCards", label: "Kartu Identitas (KTP/Pelajar)", type: "file", required: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            { id: "instagram", label: "Instagram", type: "text", required: true },
            { id: "domisili", label: "Domisili", type: "text", required: true },
            { id: "bandPhoto", label: "Foto Band", type: "file", required: true },
            { id: "priceInfo", label: "Biaya Registrasi", type: "info", text: "Biaya: Rp300.000 / Tim" },
            { id: "catatan", label: "🔌 CATATAN PESERTA", type: "info", text: "Bagi peserta yang memiliki gearband atau kabel jack sendiri, dipersilakan untuk membawanya masing-masing demi kenyamanan performa." }
        ],
        fixedPrice: 300000
    },
    {
        id: 'takre',
        name: 'TAKRE',
        description: `LISMA ART PARADE 2.0 (LAP 2.0): K-POP DANCE COMPETITION\n\nInilah saatnya kamu bersinar dan menunjukkan bakat terbaikmu di dunia K-Pop dance! Lisma Art Parade mengajak seluruh dancer untuk bergabung dalam K-Pop Dance Competition dengan kategori Dance Solo, Rookie, dan Hoosun.\n\n✨ Jangan lewatkan keseruannya! akan ada Random Play Dance dan Noraebang yang siap bikin acara makin pecah! 🔥`,
        subEvents: ['SOLO', 'Grup', 'RPD'],
        startDate: '2026-05-17',
        price: 50000,
        badgeText: "💃 Tari Kreatif & Dance",
        colorClass: "orange",
        iconId: "play",
        highlightTitle: "17 Mei 2026",
        highlightSubtitle: "📍 Bandung Indah Plaza",
        imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop",
        cpName: "Panitia TAKRE",
        cpWhatsapp: "628123456782",
        cpDescription: "Info seputar kategori solo dan grup dance.",
        subEventConfigs: {
            "SOLO": {
                fields: [
                    { id: "fullName", label: "Nama Lengkap atau Nama Panggung", type: "text", required: true, persistent: true },
                    { id: "phoneNumber", label: "Nomor yang dapat dihubungi", type: "text", required: true, persistent: true }
                ],
                price: 125000
            },
            "Grup": {
                fields: [
                    { id: "groupName", label: "Nama Grup", type: "text", required: true },
                    {
                        id: "category", label: "Kategori Grup", type: "radio",
                        options: [
                            { label: "Hoosun - Rp250.000", value: "hoosun", price: 250000 },
                            { label: "Rookie - Rp200.000", value: "rookie", price: 200000 }
                        ], required: true
                    },
                    { id: "logo", label: "Logo Grup", type: "file", required: true },
                    { id: "groupPhoto", label: "Foto Grup", type: "file", required: true },
                    { id: "members", label: "Nama Anggota", type: "textarea", required: true },
                    { id: "count", label: "Jumlah Anggota", type: "number", min: 2, required: true },
                    { id: "phoneNumber", label: "Nomor yang dapat dihubungi", type: "text", required: true, persistent: true }
                ]
            },
            "RPD": {
                fields: [
                    { id: "fullName", label: "Nama Lengkap atau Nama Panggilan", type: "text", required: true, persistent: true },
                    { id: "phoneNumber", label: "Nomor yang dapat dihubungi", type: "text", required: true, persistent: true }
                ],
                price: 10000
            }
        }
    },
    {
        id: 'fg',
        name: 'FG',
        description: `✨LISMA ART PARADE 2.0 (LAP 2.0)✨\n\nWaktunya Cerita Kamu Jadi Pusat Perhatian! 📸🎬\n\nSadar nggak sih kalau sekitar kita sudah jauh berubah? Dari cara kita nongkrong, tradisi yang mulai luntur, sampai perubahan dalam diri kita sendiri. Daripada cuma jadi saksi, mending jadi narator lewat lensa!`,
        subEvents: ['Audiens short film', 'Lomba foto', 'Lomba short film'],
        startDate: '2026-05-06',
        price: 30000,
        badgeText: "📸 Fotografi & Fun Games",
        colorClass: "indigo",
        iconId: "camera",
        highlightTitle: "6 Mei 2026",
        highlightSubtitle: "📍 Bandung Creative Hub",
        imageUrl: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?q=80&w=2072&auto=format&fit=crop",
        cpName: "Panitia FG",
        cpWhatsapp: "628123456783",
        cpDescription: "Tanya seputar link submit dan durasi video.",
        subEventConfigs: {
            "Audiens short film": {
                fields: [
                    { id: "fullName", label: "Nama Lengkap", type: "text", required: true, persistent: true },
                    { id: "institution", label: "Nama Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true }
                ],
                price: 0
            },
            "Lomba foto": {
                fields: [
                    { id: "rules", label: "Tata Cara Pengumpulan", type: "info", text: "1. Upload karya ke GDrive.\n2. Ubah akses ke 'Anyone with the link'.\n3. Kirimkan link ke form di bawah ini." },
                    { id: "fullName", label: "Nama Fotografer", type: "text", required: true, persistent: true },
                    { id: "institution", label: "Nama Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true },
                    { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
                    { id: "instagram", label: "Instagram", type: "text", required: true },
                    {
                        id: "category", label: "Kategori Peserta", type: "radio",
                        options: [
                            { label: "Umum & SMA/SMK (Rp25.000)", value: "default", price: 25000 }
                        ], required: true
                    },
                    { id: "driveLink", label: "Link Google Drive Karya", type: "url", required: true },
                    { id: "photoName", label: "Nama Foto", type: "text", required: true },
                    { id: "description", label: "Deskripsi Foto", type: "textarea", required: true }
                ]
            },
            "Lomba short film": {
                fields: [
                    { id: "rules", label: "Tata Cara Pengumpulan", type: "info", text: "1. Upload karya ke GDrive.\n2. Ubah akses ke 'Anyone with the link'.\n3. Kirimkan link ke form di bawah ini." },
                    { id: "producer", label: "Nama Producer", type: "text", required: true },
                    { id: "director", label: "Nama Director", type: "text", required: true },
                    { id: "script", label: "Nama Script", type: "text", required: true },
                    { id: "institution", label: "Nama PH/Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true },
                    { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
                    { id: "instagram", label: "Instagram", type: "text", required: true },
                    {
                        id: "category", label: "Kategori Peserta", type: "radio",
                        options: [
                            { label: "SMA/SMK (Rp30.000)", value: "sma", price: 30000 },
                            { label: "Umum (Rp50.000)", value: "umum", price: 50000 }
                        ], required: true
                    },
                    { id: "driveLink", label: "Link Google Drive Karya", type: "url", required: true },
                    { id: "synopsis", label: "Sinopsis", type: "textarea", required: true }
                ]
            }
        }
    },
    {
        id: "main-event",
        name: "Main Event",
        description: "Puncak acara Lisma Art Parade 2.0. Menghadirkan bintang tamu spesial dan penampilan terbaik dari seluruh unit kesenian.",
        badgeText: "🌟 Puncak Acara",
        cpName: "Humas LISMA",
        cpWhatsapp: "628123456784",
        cpDescription: "Hubungi untuk informasi tiket dan acara puncak.",
        formFields: [
            { id: "fullName", label: "Nama", type: "text", required: true, persistent: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            {
                id: "category", label: "Kategori Tiket", type: "radio",
                options: [
                    { label: "Umum (Rp40.000 - Early Bird)", value: "early", price: 40000 },
                    { label: "Pre-sale 1 (Rp55.000)", value: "presale1", price: 55000 },
                    { label: "Pre-sale 2 (Rp70.000)", value: "presale2", price: 70000 },
                    { label: "Siswa Sekolah (Special Price)", value: "siswa", price: 35000 }
                ], required: true
            },
            { id: "quantity", label: "Jumlah Tiket", type: "number", min: 1, defaultValue: 1, required: true }
        ]
    }
];

export const UNIT_CONFIG: Record<string, any> = UNITS_MOCK.reduce((acc, unit) => {
    acc[unit.id] = unit;
    return acc;
}, {} as Record<string, any>);
