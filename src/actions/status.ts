"use server";

import prisma from "@/lib/prisma";

export async function getRegistrationStatus(query: { code: string }) {
    if (!query.code) return { success: false, error: "Kode Pendaftaran diperlukan" };

    try {
        const registrations = await prisma.registration.findMany({
            where: {
                registrationCode: query.code
            } as any,
            include: {
                tickets: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, data: registrations };
    } catch (error) {
        console.error("[StatusAction] Error:", error);
        return { success: false, error: "Gagal mengambil data" };
    }
}
