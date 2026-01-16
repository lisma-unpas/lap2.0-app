"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function uploadPaymentProof(registrationId: string, proofUrl: string) {
    try {
        await prisma.registration.update({
            where: { id: registrationId },
            data: {
                paymentProof: proofUrl,
                status: "PENDING" // Stay pending but now with proof
            }
        });

        revalidatePath(`/check-status`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Gagal mengupdate bukti pembayaran" };
    }
}
