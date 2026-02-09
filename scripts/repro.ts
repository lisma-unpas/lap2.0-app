import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateUnitSettings(
    unitId: string,
    settings: { categoryName: string, limit: number }[],
    dates?: { startDate: string | null, endDate: string | null, eventDate?: string | null }
) {
    try {
        const startDate = dates?.startDate ? new Date(dates.startDate) : null;
        const endDate = dates?.endDate ? new Date(dates.endDate) : null;
        const eventDate = dates?.eventDate ? new Date(dates.eventDate) : null;

        console.log('Parsed Dates:', { startDate, endDate, eventDate });

        await prisma.$transaction([
            // Update all existing records for this unit to ensure dates are synced
            prisma.unitSetting.updateMany({
                where: { unitId: unitId.toLowerCase() },
                data: { startDate, endDate, eventDate }
            }),
            // Upsert the specific categories being saved from the UI
            ...settings.map(s => prisma.unitSetting.upsert({
                where: {
                    unitId_categoryName: {
                        unitId: unitId.toLowerCase(),
                        categoryName: s.categoryName
                    }
                },
                update: {
                    limit: s.limit,
                    startDate,
                    endDate,
                    eventDate
                },
                create: {
                    unitId: unitId.toLowerCase(),
                    categoryName: s.categoryName,
                    limit: s.limit,
                    startDate,
                    endDate,
                    eventDate
                }
            }))
        ]);
        return { success: true };
    } catch (error) {
        console.error("[updateUnitSettings] Error:", error);
        return { success: false, message: "Gagal memperbarui pengaturan." };
    }
}

async function main() {
    const payload = [
        { "categoryName": "Audiens short film - Sesi 1 (Hanya untuk SMA/SMK Free)", "limit": 100 },
        { "categoryName": "Audiens short film - Sesi 2 (Hanya untuk Umum Free)", "limit": 100 },
        { "categoryName": "Lomba foto", "limit": 100 },
        { "categoryName": "Lomba short film - sma", "limit": 30 },
        { "categoryName": "Lomba short film - umum", "limit": 30 }
    ];
    const dates = { "startDate": "2026-02-09T14:00", "endDate": "2026-04-27T13:59", "eventDate": "2026-05-06T08:00:00" };

    console.log('Original eventDate in payload:', dates.eventDate);
    const res = await updateUnitSettings('fg', payload, dates);
    console.log('Result:', res);

    const final = await prisma.unitSetting.findFirst({
        where: { unitId: 'fg', categoryName: 'Lomba foto' }
    });
    console.log('Final eventDate in DB:', final?.eventDate);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
