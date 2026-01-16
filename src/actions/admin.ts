"use server";

import prisma from "@/lib/prisma";
import { RegStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getRegistrations(params: { search?: string; status?: string; page?: number; limit?: number } = {}) {
    const { search = "", status = "ALL", page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    try {
        const where: any = {};

        if (status !== "ALL") {
            where.status = status;
        }

        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { subEvent: { name: { contains: search, mode: "insensitive" } } },
                { subEvent: { event: { name: { contains: search, mode: "insensitive" } } } }
            ];
        }

        const [registrations, total] = await Promise.all([
            prisma.registration.findMany({
                where,
                include: {
                    subEvent: {
                        include: {
                            event: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take: limit
            }),
            prisma.registration.count({ where })
        ]);

        return { success: true, data: registrations, total };
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return { success: false, message: "Gagal mengambil data pendaftaran." };
    }
}

export async function updateRegistrationStatus(id: string, status: RegStatus) {
    try {
        await prisma.registration.update({
            where: { id },
            data: { status }
        });
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false, message: "Gagal memperbarui status." };
    }
}

export async function getDashboardStats() {
    try {
        const [total, pending, verified, rejected] = await Promise.all([
            prisma.registration.count(),
            prisma.registration.count({ where: { status: "PENDING" } }),
            prisma.registration.count({ where: { status: "VERIFIED" } }),
            prisma.registration.count({ where: { status: "REJECTED" } }),
        ]);

        const totalRevenue = await prisma.registration.aggregate({
            _sum: {
                totalPrice: true
            },
            where: {
                status: "VERIFIED"
            }
        });

        return {
            success: true,
            data: {
                total,
                pending,
                verified,
                rejected,
                revenue: totalRevenue._sum.totalPrice || 0
            }
        };
    } catch (error) {
        return { success: false, message: "Gagal mengambil statistik." };
    }
}
