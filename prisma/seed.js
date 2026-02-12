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

    const sharedEndDate = new Date('2026-04-26T23:59:59');

    const unitSettings = [
        // TESAS - May 16, 2026. Start: Feb 21, 2026. Time: 08:30
        { unitId: 'tesas', categoryName: 'Sesi 1 - umum', limit: 0, eventDate: new Date('2026-05-16T08:30:00'), startDate: new Date('2026-02-21T00:00:00'), endDate: sharedEndDate },
        { unitId: 'tesas', categoryName: 'Sesi 1 - sekolah', limit: 160, eventDate: new Date('2026-05-16T08:30:00'), startDate: new Date('2026-02-21T00:00:00'), endDate: sharedEndDate },
        { unitId: 'tesas', categoryName: 'Sesi 2 - umum', limit: 90, eventDate: new Date('2026-05-16T08:30:00'), startDate: new Date('2026-02-21T00:00:00'), endDate: sharedEndDate },
        { unitId: 'tesas', categoryName: 'Sesi 2 - sekolah', limit: 90, eventDate: new Date('2026-05-16T08:30:00'), startDate: new Date('2026-02-21T00:00:00'), endDate: sharedEndDate },
        { unitId: 'tesas', categoryName: 'Sesi 3 - umum', limit: 176, eventDate: new Date('2026-05-16T08:30:00'), startDate: new Date('2026-02-21T00:00:00'), endDate: sharedEndDate },
        { unitId: 'tesas', categoryName: 'Sesi 3 - sekolah', limit: 0, eventDate: new Date('2026-05-16T08:30:00'), startDate: new Date('2026-02-21T00:00:00'), endDate: sharedEndDate },

        // KDS - May 2, 2026. Start: Feb 14, 2026. Time: 15:30
        { unitId: 'kds', categoryName: 'umum', limit: 200, eventDate: new Date('2026-05-02T15:30:00'), startDate: new Date('2026-02-14T00:00:00'), endDate: sharedEndDate },
        { unitId: 'kds', categoryName: 'sma', limit: 100, eventDate: new Date('2026-05-02T15:30:00'), startDate: new Date('2026-02-14T00:00:00'), endDate: sharedEndDate },

        // PSM - May 10, 2026. Start: Feb 9, 2026. Time: 07:00
        { unitId: 'psm', categoryName: 'PSM', limit: 50, eventDate: new Date('2026-05-10T07:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },

        // TAKRE - April 26, 2026. Start: Feb 9, 2026. Time: 10:00
        { unitId: 'takre', categoryName: 'SOLO', limit: 20, eventDate: new Date('2026-04-26T10:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },
        { unitId: 'takre', categoryName: 'Grup - hoosun', limit: 15, eventDate: new Date('2026-04-26T10:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },
        { unitId: 'takre', categoryName: 'Grup - rookie', limit: 15, eventDate: new Date('2026-04-26T10:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },
        { unitId: 'takre', categoryName: 'RPD', limit: 100, eventDate: new Date('2026-04-26T10:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },

        // FG - May 6, 2026. Start: Feb 9, 2026. Time: 08:00
        { unitId: 'fg', categoryName: 'Audiens short film', limit: 100, eventDate: new Date('2026-05-06T08:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },
        { unitId: 'fg', categoryName: 'Lomba foto - default', limit: 50, eventDate: new Date('2026-05-06T08:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },
        { unitId: 'fg', categoryName: 'Lomba short film - sma', limit: 30, eventDate: new Date('2026-05-06T08:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },
        { unitId: 'fg', categoryName: 'Lomba short film - umum', limit: 30, eventDate: new Date('2026-05-06T08:00:00'), startDate: new Date('2026-02-09T00:00:00'), endDate: sharedEndDate },

        // Main Event - Start: April 8, 2026. Time: 12:30. Event Date: May 24, 2026
        { unitId: 'main-event', categoryName: 'Main Event', limit: 1000, eventDate: new Date('2026-05-24T12:30:00'), startDate: new Date('2026-04-08T00:00:00'), endDate: sharedEndDate },
    ];

    for (const setting of unitSettings) {
        await prisma.unitSetting.upsert({
            where: {
                unitId_categoryName: {
                    unitId: setting.unitId,
                    categoryName: setting.categoryName
                }
            },
            update: {
                limit: setting.limit,
                eventDate: setting.eventDate,
                startDate: setting.startDate,
                endDate: setting.endDate
            },
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
