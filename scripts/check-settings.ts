import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const settings = await prisma.unitSetting.findMany({
        where: { unitId: 'fg' }
    });
    console.log('Unit Settings for fg:', JSON.stringify(settings, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
