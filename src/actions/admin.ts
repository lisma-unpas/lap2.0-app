"use server";

import prisma from "@/lib/prisma";
import { RegStatus } from "@prisma/client";
import { UNIT_CONFIG } from "@/constants/units";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { generateTicketCode } from "@/actions/registration";
import { sendEmail } from "@/lib/email";
import { config } from "@/lib/config";

export async function getRegistrations(params: { search?: string; status?: string; unitId?: string; page?: number; limit?: number } = {}) {
    const { search = "", status = "ALL", unitId = "ALL", page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    try {
        const where: any = {};

        if (status !== "ALL") {
            where.status = status;
        }

        if (unitId !== "ALL") {
            where.unitId = unitId.toLowerCase();
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
            prisma.registration.findMany({
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
            const registration = await tx.registration.findUnique({
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
                const updatedRegistration = await tx.registration.findUnique({
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
                        subject: `[Verified] Tiket & Konfirmasi Pembayaran - ${updatedRegistration.fullName}`,
                        name: updatedRegistration.fullName,
                        title: "Pembayaran Telah Diverifikasi",
                        message: `Selamat! Pembayaran Anda untuk ${updatedRegistration.subEventName || updatedRegistration.unitId} telah diverifikasi. Berikut adalah invoice dan tiket elektronik Anda.`,
                        htmlBody: `
                            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                                <div style="background-color: #4f46e5; padding: 40px 20px; text-align: center; color: white;">
                                    <h1 style="margin: 0; font-size: 24px; font-weight: 800;">E-TICKET & INVOICE</h1>
                                    <p style="margin: 10px 0 0; opacity: 0.9;">Lisma Art Parade 2.0</p>
                                </div>
                                
                                <div style="padding: 30px;">
                                    <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 20px;">
                                        <h2 style="font-size: 16px; color: #64748b; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.05em;">Informasi Pembayaran</h2>
                                        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b;">Nama Pemesan</td>
                                                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${updatedRegistration.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b;">Email</td>
                                                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${updatedRegistration.email}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b;">Unit / Kategori</td>
                                                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${updatedRegistration.subEventName || updatedRegistration.unitId}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b;">Tanggal Verifikasi</td>
                                                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b;">Status</td>
                                                <td style="padding: 8px 0; text-align: right;"><span style="background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 99px; font-weight: bold; font-size: 12px;">VERIFIED</span></td>
                                            </tr>
                                        </table>
                                    </div>

                                    <div style="text-align: center; margin: 40px 0;">
                                        <h2 style="font-size: 16px; color: #64748b; margin-bottom: 10px; text-transform: uppercase;">QR Check-In (Absensi)</h2>
                                        <p style="font-size: 13px; color: #64748b; margin-bottom: 25px;">Tunjukkan QR Code di bawah ini kepada petugas saat memasuki lokasi acara untuk proses absensi.</p>
                                        ${ticketItemsHtml}
                                    </div>

                                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; font-size: 13px; color: #475569; border: 1px solid #e2e8f0;">
                                        <strong style="color: #0f172a; display: block; margin-bottom: 8px;">Informasi Penting:</strong>
                                        <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                                            <li>E-ticket ini adalah bukti sah pembayaran Anda.</li>
                                            <li>Satu QR Code hanya dapat digunakan untuk satu kali absensi/check-in.</li>
                                            <li>Dilarang menggandakan atau membagikan tiket ini kepada pihak lain.</li>
                                        </ul>
                                    </div>

                                    <div style="margin-top: 30px; text-align: center;">
                                        <a href="${baseUrl}/check-status?code=${updatedRegistration.registrationCode}" style="background-color: #4f46e5; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.4);">Download PDF Ticket</a>
                                    </div>
                                </div>
                                
                                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
                                    <p style="margin: 0;">&copy; 2026 Lisma Art Parade 2.0. All rights reserved.</p>
                                    <p style="margin: 5px 0 0;">Jika ada pertanyaan, silakan hubungi CP unit terkait melalui WhatsApp.</p>
                                </div>
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

export async function getTickets(params: { search?: string; unitId?: string; status?: string; page?: number; limit?: number } = {}) {
    const { search = "", unitId = "ALL", status = "ALL", page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    try {
        const where: any = {};

        if (unitId !== "ALL") {
            where.registration = {
                unitId: unitId.toLowerCase()
            };
        }

        if (status === "CHECKED_IN") {
            where.isUsed = true;
        } else if (status === "NOT_CHECKED_IN") {
            where.isUsed = false;
        }

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
        const settings = await prisma.unitSetting.findMany();
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
        await prisma.unitSetting.upsert({
            where: {
                unitId_categoryName: {
                    unitId: unitId.toLowerCase(),
                    categoryName: categoryName
                }
            },
            update: { limit },
            create: { unitId: unitId.toLowerCase(), categoryName, limit }
        });
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("[updateUnitSetting] Error:", error);
        return { success: false, message: "Gagal memperbarui pengaturan." };
    }
}

export async function updateUnitSettings(
    unitId: string,
    settings: { categoryName: string, limit: number }[],
    dates?: { startDate: string | null, endDate: string | null, eventDate?: string | null }
) {
    try {
        const startDate = dates?.startDate ? new Date(dates.startDate) : null;
        const endDate = dates?.endDate ? new Date(dates.endDate) : null;
        const eventDate = dates?.eventDate ? new Date(dates.eventDate) : null;

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
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (error) {
        console.error("[updateUnitSettings] Error:", error);
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

        // Group registrations by unitId
        const groupedByUnit: Record<string, any[]> = {};

        registrations.forEach(reg => {
            const unitKey = reg.unitId.toUpperCase();
            if (!groupedByUnit[unitKey]) groupedByUnit[unitKey] = [];

            const detailedData = (reg.detailedData as any) || {};
            groupedByUnit[unitKey].push({
                registrationCode: reg.registrationCode,
                fullName: reg.fullName,
                email: reg.email,
                phoneNumber: reg.phoneNumber,
                unitId: reg.unitId,
                subEventName: reg.subEventName,
                totalPrice: reg.totalPrice,
                status: reg.status,
                createdAt: reg.createdAt.toISOString(),
                tickets: reg.tickets.map((t: any) => t.ticketCode).join(", "),
                ...detailedData
            });
        });

        let totalSynced = 0;

        // Sync each unit to its specific sheet
        for (const [unit, data] of Object.entries(groupedByUnit)) {
            const sheetName = `Reg-${unit}`;
            const response = await fetch(`${syncUrl}?sheet=${encodeURIComponent(sheetName)}`, {
                method: "POST",
                body: JSON.stringify({
                    action: "sync",
                    data: data
                })
            });

            const result = await response.json();
            if (!result.success) {
                console.error(`Sync failed for ${sheetName}:`, result.error);
                continue;
            }
            totalSynced += data.length;
        }

        // Also sync all to a master sheet
        const allFormatted = registrations.map(reg => ({
            registrationCode: reg.registrationCode,
            fullName: reg.fullName,
            email: reg.email,
            phoneNumber: reg.phoneNumber,
            unitId: reg.unitId,
            subEventName: reg.subEventName,
            totalPrice: reg.totalPrice,
            status: reg.status,
            createdAt: reg.createdAt.toISOString(),
            tickets: reg.tickets.map((t: any) => t.ticketCode).join(", "),
            ...(typeof reg.detailedData === 'object' ? (reg.detailedData as any) : {})
        }));

        await fetch(`${syncUrl}?sheet=All-Registrations`, {
            method: "POST",
            body: JSON.stringify({ action: "sync", data: allFormatted })
        });

        return { success: true, count: totalSynced };
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

        // Group tickets by unitId
        const groupedByUnit: Record<string, any[]> = {};

        tickets.forEach(t => {
            const unitKey = t.registration.unitId.toUpperCase();
            if (!groupedByUnit[unitKey]) groupedByUnit[unitKey] = [];

            groupedByUnit[unitKey].push({
                id: t.id,
                ticketCode: t.ticketCode,
                isUsed: t.isUsed ? "YES" : "NO",
                issuedAt: t.issuedAt.toISOString(),
                registrantName: t.registration.fullName,
                registrantEmail: t.registration.email,
                unit: t.registration.unitId,
                event: t.registration.subEventName
            });
        });

        let totalSynced = 0;

        // Sync each unit to its specific sheet
        for (const [unit, data] of Object.entries(groupedByUnit)) {
            const sheetName = `Ticket-${unit}`;
            const response = await fetch(`${syncUrl}?sheet=${encodeURIComponent(sheetName)}`, {
                method: "POST",
                body: JSON.stringify({
                    action: "sync",
                    data: data
                })
            });

            const result = await response.json();
            if (!result.success) {
                console.error(`Sync failed for ${sheetName}:`, result.error);
                continue;
            }
            totalSynced += data.length;
        }

        // Also sync all to a master sheet
        const allFormatted = tickets.map(t => ({
            id: t.id,
            ticketCode: t.ticketCode,
            isUsed: t.isUsed ? "YES" : "NO",
            issuedAt: t.issuedAt.toISOString(),
            registrantName: t.registration.fullName,
            registrantEmail: t.registration.email,
            unit: t.registration.unitId,
            event: t.registration.subEventName
        }));

        await fetch(`${syncUrl}?sheet=All-Tickets`, {
            method: "POST",
            body: JSON.stringify({ action: "sync", data: allFormatted })
        });

        return { success: true, count: totalSynced };
    } catch (error) {
        console.error("Sync Error:", error);
        return { success: false, message: error instanceof Error ? error.message : "Gagal sinkronisasi." };
    }
}

export async function checkUnitAvailability(unitId: string, categoryName: string) {
    try {
        const unitKey = unitId.toLowerCase();
        const unitConfig = UNIT_CONFIG[unitKey];
        if (!unitConfig) throw new Error("Unit not found");

        const settings = await prisma.unitSetting.findMany({
            where: { unitId: unitKey }
        });

        // Date validation - Find dates from any record that has them
        const today = new Date();
        const startDateSettings = settings.find((s: any) => s.startDate);
        const endDateSettings = settings.find((s: any) => s.endDate);
        const eventDateSettings = settings.find((s: any) => s.eventDate);
        const startDate = startDateSettings?.startDate ? new Date(startDateSettings.startDate) : null;
        const endDate = endDateSettings?.endDate ? new Date(endDateSettings.endDate) : null;
        const eventDate = eventDateSettings?.eventDate ? new Date(eventDateSettings.eventDate) : null;

        if (startDate && today < startDate) {
            return {
                success: false,
                isComingSoon: true,
                message: `Pendaftaran untuk ${unitConfig.name} belum dibuka.`
            };
        }

        if (endDate && today > endDate) {
            return {
                success: false,
                isClosed: true,
                message: `Pendaftaran untuk ${unitConfig.name} sudah ditutup.`
            };
        }

        const specificLimit = settings.find((s: any) => s.categoryName === categoryName)?.limit;

        const registrations = await prisma.registration.findMany({
            where: {
                unitId: unitKey,
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
            const subEventName = reg.subEventName;

            const parts = [];
            if (subEventName && subEventName !== unitConfig.name) {
                parts.push(subEventName);
            }
            if (sesiValue) parts.push(sesiValue);
            if (categoryValue) parts.push(categoryValue);

            const regCategory = parts.join(" - ") || unitConfig.name;

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
        return { success: false, available: true, remaining: 100, sold: 0, limit: 100, message: "Terjadi kesalahan saat memeriksa ketersediaan." };
    }
}

export async function getUnitAvailability(unitId: string) {
    try {
        const settings = await prisma.unitSetting.findMany({
            where: { unitId: unitId.toLowerCase() }
        });

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

        const availabilityMap: Record<string, { sold: number, limit: number, available: boolean }> = {};

        // Pre-fill with limits from settings
        settings.forEach((s: any) => {
            availabilityMap[s.categoryName] = {
                sold: 0,
                limit: s.limit,
                available: true
            };
        });

        // Initialize fallback category if not present (using unitConfig.name)
        const unitConfig = UNIT_CONFIG[unitId.toLowerCase()];
        if (unitConfig && !availabilityMap[unitConfig.name]) {
            availabilityMap[unitConfig.name] = { sold: 0, limit: 9999, available: true };
        }

        // Calculate sold counts
        registrations.forEach(reg => {
            const data = (reg.detailedData as any) || {};
            const quantity = parseInt(data.quantity) || 1;
            const categoryValue = data.category;
            const sesiValue = data.sesi;
            const subEventName = reg.subEventName;

            const parts = [];
            if (subEventName && subEventName !== unitConfig?.name) {
                parts.push(subEventName);
            }
            if (sesiValue) parts.push(sesiValue);
            if (categoryValue) parts.push(categoryValue);

            const regCategory = parts.join(" - ") || unitConfig?.name || unitId;

            if (!availabilityMap[regCategory]) {
                availabilityMap[regCategory] = { sold: 0, limit: 9999, available: true };
            }
            availabilityMap[regCategory].sold += quantity;
        });

        // Finalize availability
        Object.keys(availabilityMap).forEach(key => {
            const item = availabilityMap[key];
            item.available = item.sold < item.limit;
        });

        // Get dates from any setting that has them (synced across categories)
        const startDate = settings.find((s: any) => s.startDate)?.startDate || null;
        const endDate = settings.find((s: any) => s.endDate)?.endDate || null;
        const eventDate = settings.find((s: any) => s.eventDate)?.eventDate || null;

        return {
            success: true,
            data: availabilityMap,
            startDate: startDate,
            endDate: endDate,
            eventDate: eventDate
        };
    } catch (error) {
        console.error("[getUnitAvailability] Error:", error);
        return { success: false, data: {} };
    }
}
