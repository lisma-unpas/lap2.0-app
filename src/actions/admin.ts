"use server";

import prisma from "@/lib/prisma";
import { RegStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { generateTicketCode } from "@/actions/registration";
import { sendEmail } from "@/lib/email";
import { config } from "@/lib/config";

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
                { unitId: { contains: search, mode: "insensitive" } },
                { subEventName: { contains: search, mode: "insensitive" } }
            ];
        }

        const [registrations, total] = await Promise.all([
            (prisma.registration as any).findMany({
                where,
                orderBy: {
                    createdAt: "desc"
                },
                skip,
                take: limit,
                include: {
                    tickets: true
                }
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
        await prisma.$transaction(async (tx) => {
            const registration = await (tx.registration as any).findUnique({
                where: { id },
                include: { tickets: true }
            });

            if (!registration) throw new Error("Pendaftaran tidak ditemukan.");

            // If updating to VERIFIED and no tickets exist yet
            if (status === "VERIFIED" && registration.tickets.length === 0) {
                // Determine quantity from detailedData or default to 1
                const detailedData = (registration.detailedData as any) || {};
                const quantity = parseInt(detailedData.quantity) || 1;

                console.log(`[Admin] Verifying registration ${id}. Generating ${quantity} ticket(s).`);

                // Create N tickets
                const ticketData = await Promise.all(
                    Array.from({ length: quantity }).map(async () => ({
                        registrationId: id,
                        ticketCode: await generateTicketCode(),
                        isUsed: false,
                        issuedAt: new Date()
                    }))
                );

                await tx.ticket.createMany({
                    data: ticketData
                });
            }

            // Update status
            await tx.registration.update({
                where: { id },
                data: { status }
            });

            // Send Email if VERIFIED
            if (status === "VERIFIED") {
                const updatedRegistration = await (tx.registration as any).findUnique({
                    where: { id },
                    include: { tickets: true }
                });

                if (updatedRegistration && updatedRegistration.tickets.length > 0) {
                    const host = (await headers()).get("host") || "lisma.id";
                    const protocol = host.includes("localhost") ? "http" : "https";
                    const baseUrl = `${protocol}://${host}`;

                    const ticketItemsHtml = updatedRegistration.tickets.map((ticket: any) => `
                        <div style="margin-bottom: 30px; padding: 20px; border: 2px dashed #e2e8f0; border-radius: 12px; text-align: center; background-color: #f8fafc;">
                            <p style="font-size: 12px; font-weight: bold; color: #64748b; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">E-Ticket Code</p>
                            <p style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 20px; font-family: monospace;">${ticket.ticketCode}</p>
                            <div style="background-color: white; padding: 10px; display: inline-block; border-radius: 8px; border: 1px solid #e2e8f0;">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${baseUrl}/check-in/${ticket.ticketCode}`)}" alt="QR Code" width="200" height="200" />
                            </div>
                        </div>
                    `).join("");

                    await sendEmail({
                        email: updatedRegistration.email,
                        subject: `[Verified] Tiket Anda - ${updatedRegistration.fullName}`,
                        name: updatedRegistration.fullName,
                        title: "Pendaftaran Diverifikasi",
                        message: `Selamat! Pendaftaran Anda untuk ${updatedRegistration.subEventName || updatedRegistration.unitId} telah diverifikasi. Berikut adalah tiket Anda.`,
                        htmlBody: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                                <h1 style="color: #4f46e5; text-align: center;">Pendaftaran Diverifikasi</h1>
                                <p>Halo ${updatedRegistration.fullName},</p>
                                <p>Selamat! Pembayaran Anda telah kami terima dan verifikasi. Silakan simpan tiket di bawah ini untuk digunakan saat check-in di lokasi acara.</p>
                                
                                <div style="margin: 40px 0;">
                                    ${ticketItemsHtml}
                                </div>

                                <div style="background-color: #eff6ff; padding: 20px; border-radius: 12px; font-size: 14px; color: #1e40af;">
                                    <strong>Instruksi Penting:</strong>
                                    <ul style="margin-top: 10px; padding-left: 20px;">
                                        <li>Tunjukkan QR Code di atas kepada petugas check-in.</li>
                                        <li>Satu kode tiket hanya berlaku untuk satu kali masuk.</li>
                                        <li>Jangan membagikan kode tiket atau QR Code ini kepada orang lain.</li>
                                    </ul>
                                </div>

                                <p style="margin-top: 30px; text-align: center;">
                                    <a href="${baseUrl}/check-status?code=${updatedRegistration.registrationCode}" style="background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Cek Status & Download PDF</a>
                                </p>
                            </div>
                        `
                    });
                }
            }
        });

        revalidatePath("/admin/dashboard");
        revalidatePath("/admin/registrations");
        revalidatePath("/admin/tickets");
        return { success: true };
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false, message: error instanceof Error ? error.message : "Gagal memperbarui status." };
    }
}

export async function getTickets(params: { search?: string; page?: number; limit?: number } = {}) {
    const { search = "", page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    try {
        const where: any = {};

        if (search) {
            where.OR = [
                { ticketCode: { contains: search, mode: "insensitive" } },
                { registration: { fullName: { contains: search, mode: "insensitive" } } },
                { registration: { email: { contains: search, mode: "insensitive" } } }
            ];
        }

        const [tickets, total] = await Promise.all([
            prisma.ticket.findMany({
                where,
                orderBy: {
                    issuedAt: "desc"
                },
                skip,
                take: limit,
                include: {
                    registration: true
                }
            }),
            prisma.ticket.count({ where })
        ]);

        return { success: true, data: tickets, total };
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return { success: false, message: "Gagal mengambil data tiket." };
    }
}

export async function getDashboardStats() {
    try {
        const [totalReg, pendingReg, verifiedReg, rejectedReg] = await Promise.all([
            prisma.registration.count(),
            prisma.registration.count({ where: { status: "PENDING" } }),
            prisma.registration.count({ where: { status: "VERIFIED" } }),
            prisma.registration.count({ where: { status: "REJECTED" } }),
        ]);

        const [totalTickets, usedTickets] = await Promise.all([
            prisma.ticket.count(),
            prisma.ticket.count({ where: { isUsed: true } }),
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
                registrations: {
                    total: totalReg,
                    pending: pendingReg,
                    verified: verifiedReg,
                    rejected: rejectedReg
                },
                tickets: {
                    total: totalTickets,
                    used: usedTickets,
                    unused: totalTickets - usedTickets
                },
                revenue: totalRevenue._sum.totalPrice || 0
            }
        };
    } catch (error) {
        return { success: false, message: "Gagal mengambil statistik." };
    }
}

export async function getUnitSettings() {
    try {
        const settings = await (prisma as any).unitSetting.findMany();
        return { success: true, data: settings };
    } catch (error) {
        return { success: false, message: "Gagal mengambil pengaturan unit." };
    }
}

export async function getSpreadsheetUrl() {
    return config.spreadsheet.url;
}

export async function updateUnitSetting(unitId: string, limit: number, categoryName: string = "TOTAL") {
    try {
        await (prisma as any).unitSetting.upsert({
            where: {
                unitId_categoryName: {
                    unitId,
                    categoryName
                }
            },
            update: { limit },
            create: { unitId, categoryName, limit }
        });
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("[updateUnitSetting] Error:", error);
        return { success: false, message: "Gagal memperbarui pengaturan." };
    }
}

export async function syncRegistrations() {
    try {
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: "desc" },
            include: { tickets: true }
        });

        const syncUrl = config.spreadsheet.scriptUrlSync;
        if (!syncUrl) throw new Error("GOOGLE_SCRIPT_URL_SPREADSHEET not configured");

        // Format data for spreadsheet
        const formattedData = registrations.map(reg => ({
            id: reg.id,
            fullName: reg.fullName,
            email: reg.email,
            phoneNumber: reg.phoneNumber,
            unitId: reg.unitId,
            subEventName: reg.subEventName,
            status: reg.status,
            totalPrice: reg.totalPrice,
            registrationCode: reg.registrationCode,
            createdAt: reg.createdAt.toISOString(),
            tickets: reg.tickets.map((t: any) => t.ticketCode).join(", "),
            ...(typeof reg.detailedData === 'object' ? (reg.detailedData as any) : {})
        }));

        const response = await fetch(`${syncUrl}?sheet=Registrations`, {
            method: "POST",
            body: JSON.stringify({
                action: "sync",
                data: formattedData
            })
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || "Sync failed");

        return { success: true, count: formattedData.length };
    } catch (error) {
        console.error("Sync Error:", error);
        return { success: false, message: error instanceof Error ? error.message : "Gagal sinkronisasi." };
    }
}

export async function syncTickets() {
    try {
        const tickets = await prisma.ticket.findMany({
            orderBy: { issuedAt: "desc" },
            include: { registration: true }
        });

        const syncUrl = config.spreadsheet.scriptUrlSync;
        if (!syncUrl) throw new Error("GOOGLE_SCRIPT_URL_SPREADSHEET not configured");

        const formattedData = tickets.map(t => ({
            id: t.id,
            ticketCode: t.ticketCode,
            isUsed: t.isUsed ? "YES" : "NO",
            issuedAt: t.issuedAt.toISOString(),
            registrantName: t.registration.fullName,
            registrantEmail: t.registration.email,
            unit: t.registration.unitId,
            event: t.registration.subEventName
        }));

        const response = await fetch(`${syncUrl}?sheet=Tickets`, {
            method: "POST",
            body: JSON.stringify({
                action: "sync",
                data: formattedData
            })
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error || "Sync failed");

        return { success: true, count: formattedData.length };
    } catch (error) {
        console.error("Sync Error:", error);
        return { success: false, message: error instanceof Error ? error.message : "Gagal sinkronisasi." };
    }
}

export async function checkUnitAvailability(unitId: string, categoryName: string) {
    try {
        const settings = await (prisma as any).unitSetting.findMany({
            where: { unitId: unitId.toLowerCase() }
        });

        const specificLimit = settings.find((s: any) => s.categoryName === categoryName)?.limit;

        const registrations = await prisma.registration.findMany({
            where: {
                unitId: unitId.toLowerCase(),
                status: { in: ["VERIFIED", "PENDING"] }
            },
            select: {
                detailedData: true,
                subEventName: true
            }
        });

        let categorySold = 0;

        registrations.forEach(reg => {
            const data = (reg.detailedData as any) || {};
            const quantity = parseInt(data.quantity) || 1;

            const categoryValue = data.category;
            const sesiValue = data.sesi;

            let regCategory = "";
            if (sesiValue && categoryValue) {
                regCategory = `${sesiValue} - ${categoryValue}`;
            } else {
                regCategory = categoryValue || sesiValue || reg.subEventName;
            }

            if (regCategory === categoryName) {
                categorySold += quantity;
            }
        });

        const available = specificLimit !== undefined ? categorySold < specificLimit : true;

        return {
            success: true,
            available,
            sold: categorySold,
            limit: specificLimit ?? 0,
            remaining: specificLimit !== undefined ? Math.max(0, specificLimit - categorySold) : 9999
        };
    } catch (error) {
        console.error("[checkUnitAvailability] Error:", error);
        return { success: false, available: true, remaining: 100, sold: 0, limit: 100 };
    }
}
