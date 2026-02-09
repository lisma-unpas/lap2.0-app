import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const settings = await prisma.unitSetting.findMany({
        where: {
            unitId: {
                contains: 'fg',
                mode: 'insensitive'
            }
        }
    });
    console.log('Unit Settings for fg (any case):', settings.map(s => ({ unitId: s.unitId, categoryName: s.categoryName })));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
