"use server";

import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { UNIT_CONFIG } from "@/constants/units";
import { config as appConfig } from "@/lib/config";
import { checkUnitAvailability } from "./admin";

function generateRegistrationCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `${segment()}-${segment()}-${segment()}`;
}

export async function generateTicketCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No O, I, 1, 0 to avoid confusion
    const segment = () => Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `TKT-${segment()}-${segment()}`;
}


export async function submitBulkRegistration(items: any[], paymentProofUrl: string, userEmail?: string) {
    try {
        // Check availability for all items first
        for (const item of items) {
            const availability = await checkUnitAvailability(item.unitId.toLowerCase());
            if (availability.success && !availability.available) {
                return { success: false, error: `Maaf, kuota untuk unit ${item.unitName} sudah penuh.` };
            }
        }

        // Generate ONE code for the entire checkout session
        const sessionRegistrationCode = generateRegistrationCode();

        const registrations = await Promise.all(
            items.map(async (item) => {
                const unitKey = item.unitId.toLowerCase();
                const config = UNIT_CONFIG[unitKey];

                if (!config) {
                    console.error(`[Registration] Unit config not found for key: ${unitKey}`);
                    return null;
                }

                const registration = await prisma.registration.create({
                    data: {
                        unitId: unitKey,
                        subEventName: item.subEventName || config.name,
                        fullName: item.formData.fullName || item.formData.bandName || item.formData.groupName || "Unspecified",
                        phoneNumber: item.formData.phoneNumber || "Unspecified",
                        email: userEmail || item.formData.email || "Unspecified",
                        detailedData: item.formData,
                        totalPrice: item.price,
                        paymentProof: paymentProofUrl,
                        registrationCode: sessionRegistrationCode,
                        status: "PENDING"
                    }
                });

                console.log(`[Registration] Created record for ${registration.fullName} (${registration.id}) code: ${sessionRegistrationCode}`);
                return registration;
            })
        );

        const validRegs = registrations.filter((r): r is any => r !== null);

        // Send consolidated emails after all records are created
        if (validRegs.length > 0) {
            const firstReg = validRegs[0];
            const targetEmail = userEmail || firstReg.email;
            const adminEmail = appConfig.email.adminEmail;

            if (targetEmail && targetEmail !== "Unspecified") {
                const itemsSummary = validRegs.map(reg => {
                    const config = UNIT_CONFIG[reg.unitId.toLowerCase()];
                    return `- ${config?.name || reg.unitId} (${reg.subEventName})`;
                }).join("\n");

                const totalSessionPrice = validRegs.reduce((sum, reg) => sum + reg.totalPrice, 0);

                // Consolidated Email to User
                await sendEmail({
                    email: targetEmail,
                    subject: `Konfirmasi Pendaftaran: Lisma Art Parade 2.0`,
                    name: firstReg.fullName,
                    message: `Halo ${firstReg.fullName},\n\nPendaftaran Anda untuk event berikut telah kami terima:\n\n${itemsSummary}\n\n**Kode Pendaftaran (Gunakan untuk Cek Status)**: ${sessionRegistrationCode}\n**Total Pembayaran**: Rp ${totalSessionPrice.toLocaleString('id-ID')}\n\nStatus pendaftaran Anda saat ini adalah **PENDING**. Tim kami akan memverifikasi bukti pembayaran Anda dalam waktu maksimal 24 jam.\n\nSimpan kode di atas untuk melihat status verifikasi dan mengunduh tiket di halaman Cek Status.\n\nTerima kasih atas partisipasi Anda!`,
                    title: "Konfirmasi Pendaftaran"
                }).catch(err => console.error("[Registration] Error user email:", err));

                // Consolidated Email to Admin
                if (adminEmail) {
                    await sendEmail({
                        email: adminEmail,
                        subject: `🚨 Pendaftaran Baru: ${firstReg.fullName}`,
                        name: "Admin Lisma",
                        message: `Halo Admin,\n\nTerdeteksi pendaftaran baru dari **${firstReg.fullName}**:\n\n${itemsSummary}\n\n📧 **Email**: ${targetEmail}\n📱 **WhatsApp**: ${firstReg.phoneNumber}\n💰 **Total Transaksi**: Rp ${totalSessionPrice.toLocaleString('id-ID')}\n🔑 **Kode Pendaftaran**: ${sessionRegistrationCode}\n\nSilakan cek dashboard admin untuk memverifikasi pembayaran.`,
                        title: "Pendaftaran Masuk"
                    }).catch(err => console.error("[Registration] Error admin email:", err));
                }
            }
        }

        return {
            success: true,
            count: registrations.filter(r => r !== null).length,
            registrationCode: sessionRegistrationCode,
            registrations: registrations.filter(r => r !== null).map((r: any) => ({
                id: r.id,
                code: r.registrationCode,
                unit: r.unitId,
                category: r.subEventName
            }))
        };
    } catch (error) {
        console.error("Bulk registration error:", error);
        return { success: false, error: "Gagal memproses pendaftaran." };
    }
}

export async function submitRegistration(data: any) {
    try {
        const registrationCode = generateRegistrationCode();
        const res = (await prisma.registration.create({
            data: {
                ...data,
                registrationCode,
                status: "PENDING"
            } as any
        })) as any;
        return { success: true, id: res.id, registrationCode };
    } catch (err) {
        return { success: false };
    }
}
