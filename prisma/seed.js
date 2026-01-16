const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const units = [
        {
            name: 'TESAS',
            description: `LISMA ART PARADE 2.0 (LAP 2.0): Pagelaran Teater Drama Musikal \n\nTahta bisa direbut. Wajah bisa diubah. Tapi ketulusan selalu menemukan jalannya.\n\nSaat Purbasari diusir ke hutan, takdir justru mempertemukannya dengan Lutung Kasarung—Pangeran yang terkutuk. Saat semua topeng runtuh, siapakah yang berkuasa?\n\nTemukan jawabannya dan saksikan legenda hidup LUTUNG KASARUNG 🎭`,
            subEvents: ['Teater Drama Musikal', 'Baca Puisi', 'Cipta Prosa'],
            startDate: new Date('2026-04-26'),
            price: 25000
        },
        {
            name: 'KDS',
            description: `Sampur Sekar Jagat by LISMA ART PARADE 2.0 (LAP 2.0)\n\nKeindahan Alam Semesta yang Terjalin dalam Tarian\n\nSampur sekar jagat by Lisma Art Parade merupakan pagelaran seni budaya Sunda yang dirancang sebagai ruang apresiasi antara tradisi, spiritualitas, dan keindahan artistik. Melalui perpaduan tari klasik, musik live, dan wayang golek, acara ini menghadirkan pengalaman budaya yang utuh, hangat, dan bermakna dalam suasana eksklusif khas Bandung.`,
            subEvents: ['Tari Badaya', 'Tari Sulanjana', 'Tari Subali Sugriwa', 'Tari Gaplek', 'Tari Yudharini', 'Tari Jaya Perbangsa', 'Wayang Golek'],
            startDate: new Date('2026-05-02'),
            price: 35000
        },
        {
            name: 'PSM',
            description: `✨ LISMA ART PARADE 2.0 (LAP 2.0): BAND COMPETITION ✨\n\nPunya karya yang cuma mentok di ruang latihan? Inilah saatnya menunjukkan taringmu di kompetisi band paling dinamis tahun ini! Unit PSM mengundang band berbakat untuk unjuk gigi. Bukan sekadar kompetisi, ini adalah pembuktian jati diri lewat nada dan harmoni!\n\n🔥 BENEFIT EKSKLUSIF: Juara 1, 2, dan 3 akan mendapatkan kesempatan emas untuk tampil di Main Event dan berbagi panggung langsung dengan Guest Star kami!`,
            subEvents: ['Band Competition', 'Solo Vocal', 'Harmoni Nada'],
            startDate: new Date('2026-05-10'),
            price: 150000
        },
        {
            name: 'TAKRE',
            description: `LISMA ART PARADE 2.0 (LAP 2.0): K-POP DANCE COMPETITION\n\nInilah saatnya kamu bersinar dan menunjukkan bakat terbaikmu di dunia K-Pop dance! Lisma Art Parade mengajak seluruh dancer untuk bergabung dalam K-Pop Dance Competition dengan kategori Dance Solo, Rookie, dan Hoosun.\n\n✨ Jangan lewatkan keseruannya! akan ada Random Play Dance dan Noraebang yang siap bikin acara makin pecah! 🔥`,
            subEvents: ['Dance Solo', 'Rookie', 'Hoosun', 'Random Play Dance'],
            startDate: new Date('2026-05-17'),
            price: 50000
        },
        {
            name: 'FG',
            description: `✨LISMA ART PARADE 2.0 (LAP 2.0)✨\n\nWaktunya Cerita Kamu Jadi Pusat Perhatian! 📸🎬\n\nSadar nggak sih kalau sekitar kita sudah jauh berubah? Dari cara kita nongkrong, tradisi yang mulai luntur, sampai perubahan dalam diri kita sendiri. Daripada cuma jadi saksi, mending jadi narator lewat lensa!`,
            subEvents: ['Perubahan Budaya', 'Perubahan Sosial', 'Perubahan Personal'],
            startDate: new Date('2026-05-06'),
            price: 30000
        },
    ];

    for (const unit of units) {
        const event = await prisma.event.upsert({
            where: { name: unit.name },
            update: {
                description: unit.description,
                startDate: unit.startDate,
            },
            create: {
                name: unit.name,
                description: unit.description,
                startDate: unit.startDate,
                isActive: true,
            },
        });

        for (const subName of unit.subEvents) {
            await prisma.subEvent.upsert({
                where: { name_eventId: { name: subName, eventId: event.id } },
                update: {
                    price: unit.price
                },
                create: {
                    name: subName,
                    description: `Kompetisi ${subName} di LAP 2.0`,
                    price: unit.price,
                    eventId: event.id,
                },
            });
        }
    }

    // Admin Seeder
    const adminPassword = await bcrypt.hash('Password123.', 10);
    await prisma.user.upsert({
        where: { email: 'admin@lisma-unpas.com' },
        update: {
            password: adminPassword,
            role: 'ADMIN',
        },
        create: {
            name: 'Super Admin',
            email: 'admin@lisma-unpas.com',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
