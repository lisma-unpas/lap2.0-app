export const UNITS_MOCK = [
    {
        id: 'tesas',
        name: 'TESAS',
        subTitle: 'Pagelaran Drama Musikal Lutung Kasarung',
        description: `LISMA ART PARADE 2.0 (LAP 2.0): Pagelaran Teater Drama Musikal \n\nTahta bisa direbut. Wajah bisa diubah. Tapi ketulusan selalu menemukan jalannya.\n\nSaat Purbasari diusir ke hutan, takdir justru mempertemukannya dengan Lutung Kasarung—Pangeran yang terkutuk. Saat semua topeng runtuh, siapakah yang berkuasa?\n\nTemukan jawabannya dan saksikan legenda hidup LUTUNG KASARUNG 🎭`,
        subEvents: ['Teater Drama Musikal'],
        badgeText: "🎭 Teater dan Sastra",
        colorClass: "purple",
        iconId: "ticket",
        highlightSubtitle: "RRI Bandung",
        locationUrl: "https://maps.app.goo.gl/7k49M7p1dHfTSiR67",
        cpName: "Kak Syavira (TESAS)",
        cpWhatsapp: "6287733196269",
        cpDescription: "Hubungi pendamping unit TESAS untuk informasi teknis.",
        formFields: [
            { id: "fullName", label: "Nama Lengkap", type: "text", required: true, persistent: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            { id: "sesi", label: "Pilih Sesi", type: "select", options: ["Sesi 1: 08.00", "Sesi 2: 13.00"], required: true },
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
        subTitle: 'Pagelaran Jaya Perbangsa',
        description: "Jaya Perbangsa by LISMA ART PARADE merupakan pagelaran seni budaya yang dirancang sebagai ruang apresiasi antara tradisi, spiritualitas, dan keindahan artistik. Melalui perpaduan tari klasik, musik live, dan pertunjukan wayang, acara ini menghadirkan pengalaman budaya yang utuh, hangat, dan bermakna dalam suasana eksklusif khas Bandung.",
        subEvents: ['Badaya', 'Yudharini', 'Karaton Mandala Agung', 'Gaplek', 'Arimbi', 'Jaya Perbangsa'],
        price: 0,
        badgeText: "🪭 Kategori Seni Tradisional",
        colorClass: "rose",
        iconId: "music",
        highlightSubtitle: "Tempat Makan Bandung",
        locationUrl: "https://maps.app.goo.gl/WMyAZJn1QjCj9z6r7",
        imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop",
        cpName: "Adel (KDS)",
        cpWhatsapp: "62881023246600",
        cpDescription: "Tanyakan seputar alat musik tradisional dan pupuh.",
        formFields: [
            { id: "fullName", label: "Nama Lengkap", type: "text", required: true, persistent: true },
            { id: "phoneNumber", label: "Nomor WhatsApp", type: "text", required: true, persistent: true },
            {
                id: "category", label: "Kategori Tiket", type: "radio",
                options: [
                    { label: "Umum (Tiket + Minuman) - Rp100.000", value: "umum_minuman", price: 100000 },
                    { label: "Umum (Tiket tanpa Minuman) - Rp80.000", value: "umum_no_minuman", price: 80000 },
                    { label: "SMA (Free)", value: "sma", price: 0 }
                ], required: true
            },
            {
                id: "ticketType", label: "Pilihan Minuman", type: "radio",
                options: [
                    { label: "Tiket + eskosu 2 kaum", value: "eskosu", image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2000&auto=format&fit=crop" },
                    { label: "Tiket + hazelnut choco", value: "hazelnut", image: "https://images.unsplash.com/photo-1650793456548-733c7c656da2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
                ], required: true
            },
            { id: "note_1", label: "Info PENTING", type: "info", text: "Harga tiket sudah termasuk bundling minuman, sehingga audiens tidak hanya menikmati pertunjukan seni, tetapi juga pengalaman bersantap yang menyatu with atmosfer acara." },
            { id: "note_2", label: "Info PENTING", type: "info", text: "Penonton diwajibkan membawa jas hujan atau ponco dikarenakan cuaca yang tidak menentu and venue outdoor." }
        ]
    },
    {
        id: 'psm',
        name: 'PSM',
        subTitle: 'LISMA ART PARADE 2.0: SOUNDCLASH ARENA',
        description: `Panggung sudah siap—sekarang giliran band kamu.\n\nKalau musikmu selama ini cuma terdengar di ruang latihan, saatnya naik ke panggung sesungguhnya. Soundclash Arena adalah tempat band-band berbakat unjuk performa, menunjukkan karakter, dan membakar atmosfer dengan energi terbaik mereka!\n\n🔥 KENAPA HARUS IKUT?\nKarena ini bukan sekadar tampil—ini tentang eksistensi, koneksi, dan pengalaman panggung yang nyata.\n\n⚡ HIGHLIGHT ACARA\nBand terpilih akan tampil langsung di Soundclash Arena, di hadapan penonton dan komunitas musik yang siap merasakan gebrakanmu.\n\n📍 WAKTU & TEMPAT\n📅 10 Mei 2026\n🕗 08.00 – 17.00 WIB\n🏢 Stage FISS Kampus IV UNPAS Setiabudhi\n\n🎶 Saatnya naik panggung, tunjukkan warna musikmu, dan buat arena bergetar! 🤘🏻🔥`,
        subEvents: ['Band Competition'],
        price: 0,
        badgeText: "🎼 Paduan Suara dan Musik",
        colorClass: "indigo",
        iconId: "music",
        highlightSubtitle: "Stage FISS Kampus IV UNPAS Setiabudhi",
        locationUrl: "https://maps.app.goo.gl/i8xg7gy4Pd297CfE6",
        cpName: "Kak Rayi (PSM)",
        cpWhatsapp: "628815724135",
        cpDescription: "Pertanyaan seputar alat musik dan teknis panggung.",
        formFields: [
            { id: "bandName", label: "Nama Band", type: "text", required: true },
            { id: "personil", label: "Personil", type: "textarea", placeholder: "Sebutkan nama personil satu per satu...", required: true },
            { id: "email", label: "Email", type: "text", required: true },
            { id: "phoneNumber", label: "Nomor WhatsApp", type: "text", required: true, persistent: true },
            { id: "gmail", label: "Gmail", type: "text", required: true, persistent: true },
            { id: "instagram", label: "Instagram", type: "text", required: true },
            { id: "bandPhoto", label: "Foto Band", type: "file", required: true },
            { id: "bandLogo", label: "Logo Band", type: "file", required: true },
            { id: "catatan", label: "CATATAN PENTING", type: "info", text: "Untuk kenyamanan performa, peserta disarankan membawa gear pribadi seperti kabel jack atau perlengkapan tambahan lainnya." }
        ],
        fixedPrice: 0
    },
    {
        id: 'takre',
        name: 'TAKRE',
        subTitle: 'K-Pop Dance Cover Competition',
        description: `LISMA ART PARADE 2.0 (LAP 2.0): K-POP DANCE COMPETITION\n\nInilah saatnya kamu bersinar dan menunjukkan bakat terbaikmu di dunia K-Pop dance! Lisma Art Parade mengajak seluruh dancer untuk bergabung dalam K-Pop Dance Competition dengan kategori Dance Solo, Rookie, dan Hoosun.\n\n✨ Jangan lewatkan keseruannya! akan ada Random Play Dance dan Noraebang yang siap bikin acara makin pecah! 🔥`,
        subEvents: ['SOLO', 'Grup', 'RPD'],
        price: 50000,
        badgeText: "💃 Tari Kreatif & Dance",
        colorClass: "orange",
        iconId: "play",
        highlightSubtitle: "Bandung Indah Plaza",
        locationUrl: "https://maps.app.goo.gl/XCagujRyYEqzfaRA9",
        cpName: "Saffa (TAKRE)",
        cpWhatsapp: "6281322887279",
        cpDescription: "Info seputar kategori solo dan grup dance.",
        subEventConfigs: {
            "SOLO": {
                fields: [
                    { id: "fullName", label: "Nama Lengkap atau Nama Panggung", type: "text", required: true, persistent: true },
                    { id: "phoneNumber", label: "Nomor yang dapat dihubungi", type: "text", required: true, persistent: true },
                    { id: "note_takre", label: "Info PENTING", type: "info", text: "Invoice akan dikirimkan melalui WhatsApp oleh CP" }
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
                    { id: "phoneNumber", label: "Nomor yang dapat dihubungi", type: "text", required: true, persistent: true },
                    { id: "note_takre", label: "Info PENTING", type: "info", text: "Invoice akan dikirimkan melalui WhatsApp oleh CP" }
                ]
            },
            "RPD": {
                fields: [
                    { id: "fullName", label: "Nama Lengkap atau Nama Panggilan", type: "text", required: true, persistent: true },
                    { id: "phoneNumber", label: "Nomor yang dapat dihubungi", type: "text", required: true, persistent: true },
                    { id: "note_takre", label: "Info PENTING", type: "info", text: "Invoice akan dikirimkan melalui WhatsApp oleh CP" }
                ],
                price: 10000
            }
        }
    },
    {
        id: 'fg',
        name: 'FG',
        subTitle: 'Retak Tradisi Screening Short Film & Photo Exhibition',
        description: `✨LISMA ART PARADE✨\n🚨 CALLING ALL CREATIVES! OPEN SUBMISSION! 🚨 \n\nSetiap sudut kota punya cerita, setiap detik punya perubahan. Kamu tipikal yang menangkap momen lewat lensa atau merangkai narasi lewat gerak kamera?\n\nLISMA ART PARADE 2.0 memanggilmu! Kami membuka pintu selebar-lebarnya untuk Open Submission karya:\n🎬 Short Film\n📸 Photography\nTema: Sosial | Budaya | Personal\n\nSiapa yang bisa ikut?\n✅ Siswa SMA/SMK Sederajat\n✅ Umum (Mahasiswa/Profesional/Hobi)\n\nKarya terbaikmu bakal dipajang di Pameran Foto dan ditonton bareng di Screening Film Pendek!\n\n📍 Lokasi: Bandung Creative Hub \n📅 Tanggal: 6 Mei 2026\n 🕗 Waktu: 08.00 WIB - Selesai`,
        subEvents: ['Screening Short Film', 'Photo Exhibition', 'Audiens'],
        price: 0,
        badgeText: "📸 Fotografi & Fun Games",
        colorClass: "indigo",
        iconId: "camera",
        highlightSubtitle: "Bandung Creative Hub",
        locationUrl: "https://maps.app.goo.gl/A9ewrxCnM37TwwpUA",
        cpName: "Kak Zena (FG)",
        cpWhatsapp: "6285320634272",
        cpDescription: "Tanya seputar link submit dan durasi video.",
        subEventConfigs: {
            "Screening Short Film": {
                price: 0,
                fields: [
                    { id: "producer", label: "Nama Producer", type: "text", required: true },
                    { id: "director", label: "Nama Director", type: "text", required: true },
                    { id: "script", label: "Nama Script", type: "text", required: true },
                    { id: "institution", label: "Nama Production House/Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal Dari Mana", type: "text", required: true },
                    { id: "phoneNumber", label: "No Telepon", type: "text", required: true, persistent: true },
                    { id: "instagram", label: "Instagram", type: "text", required: true },
                    { id: "email", label: "Gmail", type: "text", required: true, persistent: true },
                    { id: "karya", label: "Pengumpulan Film", type: "file", required: true, hint: "Gunakan link Google Drive atau YouTube" },
                    { id: "syarat_1", label: "Info PENTING", type: "info", text: "Wajib membawa lima audiens" },
                    { id: "bukti_audiens", label: "Bukti lima audiens", type: "file", required: true }
                ]
            },
            "Photo Exhibition": {
                price: 0,
                fields: [
                    { id: "fullName", label: "Nama Fotografer", type: "text", required: true, persistent: true },
                    { id: "institution", label: "Nama Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal Dari Mana", type: "text", required: true },
                    { id: "phoneNumber", label: "No Telepon", type: "text", required: true, persistent: true },
                    { id: "instagram", label: "Instagram", type: "text", required: true },
                    { id: "email", label: "Gmail", type: "text", required: true, persistent: true },
                    { id: "karya", label: "Pengumpulan Foto (Wajib membawa/upload 3 foto)", type: "file", multiple: true, required: true, hint: "Wajib membawa/upload 3 foto", minFiles: 3, maxFiles: 3 },
                    { id: "photoName", label: "Nama Foto", type: "text", required: true },
                    { id: "description", label: "Deskripsi Foto", type: "textarea", required: true },
                    { id: "syarat_1", label: "Info PENTING", type: "info", text: "Wajib membawa tiga audiens" },
                    { id: "bukti_audiens", label: "Bukti tiga audiens", type: "file", required: true }
                ]
            },
            "Audiens": {
                price: 20000,
                fields: [
                    { id: "fullName", label: "Nama", type: "text", required: true, persistent: true },
                    { id: "institution", label: "Nama Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true },
                ]
            }
        }
    }
];

export const UNIT_CONFIG: Record<string, any> = UNITS_MOCK.reduce((acc, unit) => {
    acc[unit.id] = unit;
    return acc;
}, {} as Record<string, any>);
