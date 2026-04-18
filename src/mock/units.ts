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
            { id: "sesi", label: "Pilih Sesi", type: "select", options: ["Sesi 1", "Sesi 2"], required: true },
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
                id: "category", label: "Kategori", type: "radio",
                options: [
                    { label: "Umum (Rp100.000)", value: "umum", price: 100000 },
                    { label: "SMA (Free)", value: "sma", price: 0 }
                ], required: true
            },
            {
                id: "ticketType", label: "Kategori tiket (Umum)", type: "radio",
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
        subTitle: '"Soundclash Arena" Band Competition',
        description: `✨ LISMA ART PARADE 2.0 (LAP 2.0): BAND COMPETITION ✨\n\nPunya karya yang cuma mentok di ruang latihan? Inilah saatnya menunjukkan taringmu di kompetisi band paling dinamis tahun ini! Unit PSM mengundang band berbakat untuk unjuk gigi. Bukan sekadar kompetisi, ini adalah pembuktian jati diri lewat nada dan harmoni!\n\n📍 WAKTU & TEMPAT\n📅 Tanggal: 10 Mei 2026\n🕗 Waktu: 08.00 – 17.00 WIB\n🏢 Tempat: Stage FISS Kampus IV Unpas Setiabudhi\n\n🏆 HADIAH PEMENANG\n🥇 Juara 1: Rp1.000.000\n🥈 Juara 2: Rp750.000\n🥉 Juara 3: Rp500.000\n\nSiapkan instrumenmu, setel distorsinya, dan sampai jumpa di panggung LISMA ART PARADE! 👋🏻🤘🏻`,
        subEvents: ['Band Competition'],
        price: 50000,
        badgeText: "🎼 Paduan Suara dan Musik",
        colorClass: "indigo",
        iconId: "music",
        highlightSubtitle: "Stage FISS Kampus IV Unpas Setiabudhi",
        locationUrl: "https://maps.app.goo.gl/i8xg7gy4Pd297CfE6",
        cpName: "Kak Rayi (PSM)",
        cpWhatsapp: "628815724135",
        cpDescription: "Pertanyaan seputar alat musik dan teknis panggung.",
        formFields: [
            { id: "bandName", label: "Nama Band", type: "text", required: true },
            { id: "members", label: "Nama Anggota", type: "textarea", placeholder: "Sebutkan nama anggota satu per satu...", required: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            { id: "instagram", label: "Instagram", type: "text", required: true },
            { id: "email", label: "Email", type: "text", required: true },
            { id: "domisili", label: "Domisili", type: "text", required: true },
            { id: "bandPhoto", label: "Foto Band", type: "file", required: true },
            { id: "videoBand", label: "Video Penampilan Band", type: "file", required: true, accept: "video/*", maxSize: 100 * 1024 * 1024 },
            { id: "selectionInfo", label: "Keterangan Seleksi", type: "info", text: "Peserta yang terpilih ke audisi tahap 2 akan dihubungi melalui WhatsApp Ketua Tim dan wajib berkomitmen untuk berkompetisi dan membayar biaya registrasi sebesar Rp150.000" },
            { id: "catatan", label: "🔌 CATATAN PESERTA", type: "info", text: "Bagi peserta yang memiliki gearband atau kabel jack sendiri, dipersilakan untuk membawanya masing-masing demi kenyamanan performa." }
        ],
        fixedPrice: 50000
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
        subTitle: '"Retak Tradisi" Photography & Short Movie Competition',
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
                    { id: "karya", label: "Pengumpulan Film", type: "file", multiple: true, required: true }
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
                    { id: "karya", label: "Pengumpulan Foto", type: "file", multiple: true, required: true },
                    { id: "photoName", label: "Nama Foto", type: "text", required: true },
                    { id: "description", label: "Deskripsi Foto", type: "textarea", required: true }
                ]
            },
            "Audiens": {
                price: 20000,
                fields: [
                    { id: "fullName", label: "Nama", type: "text", required: true, persistent: true },
                    { id: "institution", label: "Nama Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true },
                    { id: "sesi", label: "Sesi", type: "select", options: ["Sesi 1 (SMA)", "Sesi 2 (Umum)"], required: true },
                    { id: "paymentProof", label: "Bukti Pembayaran", type: "file", required: true }
                ]
            }
        }
    }
];

export const UNIT_CONFIG: Record<string, any> = UNITS_MOCK.reduce((acc, unit) => {
    acc[unit.id] = unit;
    return acc;
}, {} as Record<string, any>);
