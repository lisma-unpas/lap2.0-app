"use server";

import prisma from "@/lib/prisma";

export async function submitBulkRegistration(items: any[], paymentProofUrl: string) {
    try {
        // We create registrations one by one for now to ensure flexibility
        // In a real production apps, we might want to use a transaction

        const registrations = await Promise.all(
            items.map(async (item) => {
                // Find sub event ID
                const subEvent = await prisma.subEvent.findFirst({
                    where: {
                        name: item.subEventName,
                        event: {
                            name: item.unitId.toUpperCase()
                        }
                    }
                });

                if (!subEvent) return null;

                return prisma.registration.create({
                    data: {
                        subEventId: subEvent.id,
                        fullName: item.formData.fullName || "Unspecified",
                        phoneNumber: item.formData.phoneNumber || "Unspecified",
                        email: item.formData.email || "Unspecified",
                        detailedData: item.formData,
                        totalPrice: item.price,
                        paymentProof: paymentProofUrl,
                        status: "PENDING"
                    }
                });
            })
        );

        return { success: true, count: registrations.length };
    } catch (error) {
        console.error("Bulk registration error:", error);
        return { success: false, error: "Gagal memproses pendaftaran." };
    }
}

export async function submitRegistration(data: any) {
    // Legacy support or single registration
    try {
        const res = await prisma.registration.create({
            data: {
                ...data,
                status: "PENDING"
            }
        });
        return { success: true, id: res.id };
    } catch (err) {
        return { success: false };
    }
}
