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

    const unitSettings = [
        // TESAS
        { unitId: 'tesas', categoryName: 'Sesi 1 - umum', limit: 0 },
        { unitId: 'tesas', categoryName: 'Sesi 1 - sekolah', limit: 160 },
        { unitId: 'tesas', categoryName: 'Sesi 2 - umum', limit: 90 },
        { unitId: 'tesas', categoryName: 'Sesi 2 - sekolah', limit: 90 },
        { unitId: 'tesas', categoryName: 'Sesi 3 - umum', limit: 176 },
        { unitId: 'tesas', categoryName: 'Sesi 3 - sekolah', limit: 0 },

        // KDS
        { unitId: 'kds', categoryName: 'umum', limit: 200 },
        { unitId: 'kds', categoryName: 'sma', limit: 100 },

        // PSM
        { unitId: 'psm', categoryName: 'PSM', limit: 50 },

        // TAKRE
        { unitId: 'takre', categoryName: 'SOLO', limit: 20 },
        { unitId: 'takre', categoryName: 'Grup - hoosun', limit: 15 },
        { unitId: 'takre', categoryName: 'Grup - rookie', limit: 15 },
        { unitId: 'takre', categoryName: 'RPD', limit: 100 },

        // FG
        { unitId: 'fg', categoryName: 'Audiens short film', limit: 100 },
        { unitId: 'fg', categoryName: 'Lomba foto - default', limit: 50 },
        { unitId: 'fg', categoryName: 'Lomba short film - sma', limit: 30 },
        { unitId: 'fg', categoryName: 'Lomba short film - umum', limit: 30 },

        // Main Event
        { unitId: 'main-event', categoryName: 'Main Event', limit: 1000 },
    ];

    for (const setting of unitSettings) {
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

    console.log(`Seed completed successfully! Added ${unitSettings.length} unit settings.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
