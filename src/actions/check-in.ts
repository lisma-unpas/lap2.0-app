"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTicketDetails(ticketCode: string) {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { ticketCode },
            include: {
                registration: true
            }
        });

        if (!ticket) return { success: false, error: "Tiket tidak ditemukan" };

        return { success: true, data: ticket };
    } catch (error) {
        return { success: false, error: "Gagal mengambil data tiket" };
    }
}

export async function markTicketAsUsed(ticketCode: string) {
    try {
        const ticket = await prisma.ticket.update({
            where: { ticketCode },
            data: { isUsed: true }
        });

        revalidatePath(`/check-in/${ticketCode}`);
        revalidatePath("/admin/tickets");
        revalidatePath("/admin/dashboard");
        return { success: true, data: ticket };
    } catch (error) {
        return { success: false, error: "Gagal memperbarui status tiket" };
    }
}

export async function revertTicketUsage(ticketCode: string) {
    try {
        const ticket = await prisma.ticket.update({
            where: { ticketCode },
            data: { isUsed: false }
        });

        revalidatePath(`/check-in/${ticketCode}`);
        revalidatePath("/admin/tickets");
        revalidatePath("/admin/dashboard");
        return { success: true, data: ticket };
    } catch (error) {
        return { success: false, error: "Gagal membatalkan status check-in" };
    }
}
