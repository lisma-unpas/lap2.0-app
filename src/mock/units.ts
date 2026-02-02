export const UNITS_MOCK = [
    {
        id: 'tesas',
        name: 'TESAS',
        description: `LISMA ART PARADE 2.0 (LAP 2.0): Pagelaran Teater Drama Musikal \n\nTahta bisa direbut. Wajah bisa diubah. Tapi ketulusan selalu menemukan jalannya.\n\nSaat Purbasari diusir ke hutan, takdir justru mempertemukannya dengan Lutung Kasarung—Pangeran yang terkutuk. Saat semua topeng runtuh, siapakah yang berkuasa?\n\nTemukan jawabannya dan saksikan legenda hidup LUTUNG KASARUNG 🎭`,
        subEvents: ['Teater Drama Musikal'],
        price: 25000,
        badgeText: "🎭 Teater dan Sastra",
        colorClass: "purple",
        iconId: "ticket",
        highlightSubtitle: "📍 Mayang Sunda",
        imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop",
        cpName: "Kak Athari (TESAS)",
        cpWhatsapp: "6285788397608",
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
        price: 35000,
        badgeText: "🪭 Kategori Seni Tradisional",
        colorClass: "rose",
        iconId: "music",
        highlightSubtitle: "📍 Tempat Makan Bandung – Dago Giri",
        imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop",
        cpName: "Kak Raisa (KDS)",
        cpWhatsapp: "6282119381300",
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
        description: `✨ LISMA ART PARADE 2.0 (LAP 2.0): BAND COMPETITION ✨\n\nPunya karya yang cuma mentok di ruang latihan? Inilah saatnya menunjukkan taringmu di kompetisi band paling dinamis tahun ini! Unit PSM mengundang band berbakat untuk unjuk gigi. Bukan sekadar kompetisi, ini adalah pembuktian jati diri lewat nada dan harmoni!\n\n🔥 BENEFIT EKSKLUSIF: Juara 1, 2, dan 3 akan mendapatkan kesempatan emas untuk tampil di Main Event dan berbagi panggung langsung dengan Guest Star kami!`,
        subEvents: ['Band Competition'],
        price: 150000,
        badgeText: "🎼 Paduan Suara dan Musik",
        colorClass: "indigo",
        iconId: "music",
        highlightSubtitle: "📍 Parkiran FISS Unpas Setiabudhi",
        imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
        cpName: "Kak Rayi (PSM)",
        cpWhatsapp: "628815724135",
        cpDescription: "Pertanyaan seputar alat musik dan teknis panggung.",
        formFields: [
            { id: "bandName", label: "Nama Band", type: "text", required: true },
            { id: "members", label: "Nama Anggota", type: "textarea", placeholder: "Sebutkan nama anggota satu per satu...", required: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            { id: "instagram", label: "Instagram", type: "text", required: true },
            { id: "domisili", label: "Domisili", type: "text", required: true },
            { id: "bandPhoto", label: "Foto Band", type: "file", required: true },
            { id: "priceInfo", label: "Biaya Registrasi", type: "info", text: "Biaya: Rp300.000 / Tim" },
            { id: "note_psm_1", label: "Info PENTING", type: "info", text: "Peserta wajib membawakan satu lagu bebas berbahasa inggris atau indonesia dan membawakan 1 dari 20 lagu yang telah ditentukan panitia bergenre non pop punk yang akan di aransemen menjadi pop punk (penentuan lagu akan diumumkan saat technical meeting)" },
            { id: "note_psm_2", label: "Info PENTING", type: "info", text: "Invoice akan dikirimkan melalui WhatsApp oleh CP" },
            { id: "catatan", label: "🔌 CATATAN PESERTA", type: "info", text: "Bagi peserta yang memiliki gearband atau kabel jack sendiri, dipersilakan untuk membawanya masing-masing demi kenyamanan performa." }
        ],
        fixedPrice: 300000
    },
    {
        id: 'takre',
        name: 'TAKRE',
        description: `LISMA ART PARADE 2.0 (LAP 2.0): K-POP DANCE COMPETITION\n\nInilah saatnya kamu bersinar dan menunjukkan bakat terbaikmu di dunia K-Pop dance! Lisma Art Parade mengajak seluruh dancer untuk bergabung dalam K-Pop Dance Competition dengan kategori Dance Solo, Rookie, dan Hoosun.\n\n✨ Jangan lewatkan keseruannya! akan ada Random Play Dance dan Noraebang yang siap bikin acara makin pecah! 🔥`,
        subEvents: ['SOLO', 'Grup', 'RPD'],
        price: 50000,
        badgeText: "💃 Tari Kreatif & Dance",
        colorClass: "orange",
        iconId: "play",
        highlightSubtitle: "📍 Bandung Indah Plaza",
        imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop",
        cpName: "Kak Rara (TAKRE)",
        cpWhatsapp: "6283159471511",
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
        description: `✨LISMA ART PARADE 2.0 (LAP 2.0)✨\n\nWaktunya Cerita Kamu Jadi Pusat Perhatian! 📸🎬\n\nAyo tuangkan imajinasimu lewat lensa! Ikuti Kompetisi Foto & Film Pendek tingkat SMA/SMK dan Umum Dengan Genre Fiksi melalui tema:\n- Perubahan Budaya\n- Perubahan Sosial\n- Perubahan Personal`,
        subEvents: ['Audiens short film', 'Lomba foto', 'Lomba short film'],
        price: 30000,
        badgeText: "📸 Fotografi & Fun Games",
        colorClass: "indigo",
        iconId: "camera",
        highlightSubtitle: "📍 Bandung Creative Hub",
        imageUrl: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?q=80&w=2072&auto=format&fit=crop",
        cpName: "Kak Zena (FG)",
        cpWhatsapp: "6285320634272",
        cpDescription: "Tanya seputar link submit dan durasi video.",
        subEventConfigs: {
            "Audiens short film": {
                fields: [
                    { id: "fullName", label: "Nama Lengkap", type: "text", required: true, persistent: true },
                    { id: "email", label: "Alamat Email", type: "text", required: true, persistent: true },
                    { id: "institution", label: "Nama Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true }
                ],
                price: 0
            },
            "Lomba foto": {
                fields: [
                    { id: "fullName", label: "Nama Fotografer", type: "text", required: true, persistent: true },
                    { id: "email", label: "Alamat Email", type: "text", required: true, persistent: true },
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
                    { id: "karya", label: "Pengumpulan foto", type: "file", multiple: true, required: true },
                    { id: "photoName", label: "Nama Foto", type: "text", required: true },
                    { id: "description", label: "Deskripsi Foto", type: "textarea", required: true }
                ]
            },
            "Lomba short film": {
                fields: [
                    { id: "producer", label: "Nama Producer", type: "text", required: true },
                    { id: "director", label: "Nama Director", type: "text", required: true },
                    { id: "script", label: "Nama Script", type: "text", required: true },
                    { id: "institution", label: "Nama PH/Komunitas/Sekolah", type: "text", required: true },
                    { id: "origin", label: "Asal", type: "text", required: true },
                    { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
                    { id: "email", label: "Alamat Email", type: "text", required: true, persistent: true },
                    { id: "instagram", label: "Instagram", type: "text", required: true },
                    {
                        id: "category", label: "Kategori Peserta", type: "radio",
                        options: [
                            { label: "SMA/SMK (Rp30.000)", value: "sma", price: 30000 },
                            { label: "Umum (Rp50.000)", value: "umum", price: 50000 }
                        ], required: true
                    },
                    { id: "karya", label: "Pengumpulan file", type: "file", multiple: true, required: true },
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
        highlightSubtitle: "📍 UNPAS Setiabudi",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        price: 50000,
        cpName: "Kak Talitha (Humas Lisma)",
        cpWhatsapp: "6281324046884",
        cpDescription: "Hubungi untuk informasi tiket dan acara puncak.",
        formFields: [
            { id: "fullName", label: "Nama", type: "text", required: true, persistent: true },
            { id: "phoneNumber", label: "Nomor Telepon", type: "text", required: true, persistent: true },
            { id: "quantity", label: "Jumlah Tiket", type: "number", min: 1, defaultValue: 1, required: true }
        ]
    }
];

export const UNIT_CONFIG: Record<string, any> = UNITS_MOCK.reduce((acc, unit) => {
    acc[unit.id] = unit;
    return acc;
}, {} as Record<string, any>);
