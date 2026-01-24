const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
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

    console.log('Seed completed successfully (Admin only)!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
