const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Starting Database Cleanup ---');

    try {
        // Delete in order of dependecy
        console.log('Cleaning Tickets...');
        await prisma.ticket.deleteMany({});

        console.log('Cleaning Registrations...');
        await prisma.registration.deleteMany({});

        console.log('Cleaning Info...');
        await prisma.info.deleteMany({});

        // Optionally clean non-admin users if needed
        console.log('Cleaning non-admin Users...');
        await prisma.user.deleteMany({
            where: {
                role: {
                    not: 'ADMIN'
                }
            }
        });

        console.log('--- Cleanup Completed ---');

        console.log('--- Running Seeder ---');
        execSync('node prisma/seed.js', { stdio: 'inherit' });
        console.log('--- Seeder Completed ---');

    } catch (error) {
        console.error('Error during database cleanup/seeding:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
