"use server";

import prisma from "@/lib/prisma";

export async function getRegistrationStatus(query: { email?: string; nim?: string }) {
    if (!query.email && !query.nim) return { success: false, error: "Email atau NIM diperlukan" };

    try {
        const registrations = await prisma.registration.findMany({
            where: {
                OR: [
                    { email: query.email },
                    { nim: query.nim }
                ]
            },
            include: {
                subEvent: {
                    include: {
                        event: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, data: registrations };
    } catch (error) {
        return { success: false, error: "Gagal mengambil data" };
    }
}
