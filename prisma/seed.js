const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    // Admin Seeder
    console.log('Seed: Creating admin user...');
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

    console.log('Seed: Creating unit settings...');

    // Example settings for TESAS combinations
    const tesasSettings = [
        { unitId: 'tesas', categoryName: 'Sesi 1 - umum', limit: 50 },
        { unitId: 'tesas', categoryName: 'Sesi 1 - sekolah', limit: 30 },
        { unitId: 'tesas', categoryName: 'Sesi 2 - umum', limit: 50 },
        { unitId: 'tesas', categoryName: 'Sesi 2 - sekolah', limit: 30 },
        { unitId: 'tesas', categoryName: 'Sesi 3 - umum', limit: 50 },
        { unitId: 'tesas', categoryName: 'Sesi 3 - sekolah', limit: 30 },
    ];

    // Example settings for TAKRE
    const takreSettings = [
        { unitId: 'takre', categoryName: 'SOLO', limit: 20 },
        { unitId: 'takre', categoryName: 'Grup - hoosun', limit: 15 },
        { unitId: 'takre', categoryName: 'Grup - rookie', limit: 15 },
        { unitId: 'takre', categoryName: 'RPD', limit: 100 },
    ];

    // Example settings for Main Event
    const mainEventSettings = [
        { unitId: 'main-event', categoryName: 'early', limit: 100 },
        { unitId: 'main-event', categoryName: 'presale1', limit: 200 },
        { unitId: 'main-event', categoryName: 'presale2', limit: 300 },
        { unitId: 'main-event', categoryName: 'siswa', limit: 150 },
    ];

    const allSettings = [...tesasSettings, ...takreSettings, ...mainEventSettings];

    for (const setting of allSettings) {
        await prisma.unitSetting.upsert({
            where: {
                unitId_categoryName: {
                    unitId: setting.unitId,
                    categoryName: setting.categoryName
                }
            },
            update: { limit: setting.limit },
            create: setting
        });
    }

    console.log(`Seed completed successfully! Added ${allSettings.length} unit settings.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
