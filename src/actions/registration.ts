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
            const unitKey = item.unitId.toLowerCase();
            const config = UNIT_CONFIG[unitKey];
            const sesiValue = item.formData.sesi;
            const categoryValue = item.formData.category;
            const subEventName = item.subEventName;

            const parts = [];
            if (subEventName && subEventName !== config?.name) {
                parts.push(subEventName);
            }
            if (sesiValue) parts.push(sesiValue);
            if (categoryValue) parts.push(categoryValue);

            const currentCategory = parts.join(" - ") || config?.name || "Uncategorized";

            const availability = await checkUnitAvailability(item.unitId.toLowerCase(), currentCategory);
            const requestedQuantity = parseInt(item.formData.quantity) || 1;

            if (!availability.success) {
                return {
                    success: false,
                    error: availability.message || `Pendaftaran untuk ${config?.name || unitKey} tidak tersedia saat ini.`
                };
            }

            if (availability.remaining! < requestedQuantity) {
                return {
                    success: false,
                    error: availability.remaining! > 0
                        ? `Maaf, sisa tiket untuk kategori ${currentCategory} hanya tinggal ${availability.remaining} tiket.`
                        : `Maaf, tiket untuk kategori ${currentCategory} sudah penuh.`
                };
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

            console.log(`[Registration] Preparing notifications. Admin: ${adminEmail}, User: ${targetEmail}`);

            const itemsSummary = validRegs.map(reg => {
                const config = UNIT_CONFIG[reg.unitId.toLowerCase()];
                return `- ${config?.name || reg.unitId} (${reg.subEventName})`;
            }).join("\n");

            const totalSessionPrice = validRegs.reduce((sum, reg) => sum + reg.totalPrice, 0);

            const itemsSummaryHtml = `
                <ul style="padding-left: 20px; margin: 10px 0; color: #374151;">
                    ${validRegs.map(reg => {
                const config = UNIT_CONFIG[reg.unitId.toLowerCase()];
                return `<li style="margin-bottom: 5px;"><strong>${config?.name || reg.unitId}</strong> (${reg.subEventName})</li>`;
            }).join("")}
                </ul>
            `;

            const userMessage = `
                <p>Pendaftaran Anda untuk <strong>Lisma Art Parade 2.0</strong> telah kami terima dan saat ini sedang dalam proses verifikasi.</p>
                
                <div style="margin: 20px 0; padding: 16px; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; display: inline-block; min-width: 200px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Status Saat Ini</p>
                    <span style="background: #fef0c7; color: #93370d; padding: 6px 14px; border-radius: 99px; font-weight: bold; font-size: 14px; display: inline-block; border: 1px solid #fde68a;">⏳ PENDING</span>
                </div>

                <p><strong>Rincian Pesanan:</strong></p>
                ${itemsSummaryHtml}

                <div style="margin-top: 20px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
                    <p style="margin: 0;">Total Pembayaran: <span style="font-size: 18px; color: #7f56d9; font-weight: bold;">Rp ${totalSessionPrice.toLocaleString('id-ID')}</span></p>
                    <p style="margin: 10px 0 0 0;">Kode Pendaftaran: <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-family: ui-monospace, monospace; color: #111827; border: 1px solid #e5e7eb;">${sessionRegistrationCode}</code></p>
                </div>
                
                <p style="margin-top: 25px; font-size: 15px; line-height: 1.6;">Tim kami akan memverifikasi bukti pembayaran Anda dalam waktu maksimal <strong>24 jam</strong>. Anda dapat memantau status pendaftaran dan mengunduh e-tiket melalui halaman <strong>Cek Status</strong> menggunakan kode di atas.</p>
            `;

            // 1. Branded Email to User (Registrant)
            // Skip if user email is the same as admin email to avoid double notifications to admin during testing
            if (targetEmail && targetEmail !== "Unspecified" && targetEmail !== adminEmail) {
                await sendEmail({
                    email: targetEmail,
                    subject: `Konfirmasi Pendaftaran: Lisma Art Parade 2.0`,
                    name: firstReg.fullName,
                    title: "Konfirmasi Pendaftaran",
                    message: userMessage,
                }).catch(err => console.error("[Registration] Error user email:", err));
            }

            // 2. Simple Notification Email to Admin
            if (adminEmail) {
                const adminHtml = `
                    <div style="font-family: sans-serif; color: #333; max-width: 600px;">
                        <h2 style="color: #4f46e5;">Pendaftaran Baru Terdeteksi</h2>
                        <p>Halo Admin, seseorang baru saja melakukan checkout pendaftaran:</p>
                        
                        <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; margin: 20px 0;">
                            <p><strong>Pendaftar:</strong> ${firstReg.fullName}</p>
                            <p><strong>Total Bayar:</strong> Rp ${totalSessionPrice.toLocaleString('id-ID')}</p>
                            <p><strong>Kode:</strong> <code style="background: #fff; padding: 2px 6px; border-radius: 4px; border: 1px solid #ddd;">${sessionRegistrationCode}</code></p>
                            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                            <p><strong>Kontak:</strong></p>
                            <ul>
                                <li>Email: ${targetEmail}</li>
                                <li>WhatsApp: <a href="https://wa.me/${firstReg.phoneNumber.replace(/\D/g, '')}">${firstReg.phoneNumber}</a></li>
                            </ul>
                        </div>

                        <p><strong>Item yang dipilih:</strong></p>
                        <pre style="background: #fafafa; padding: 10px; border-radius: 8px; border: 1px solid #eee; font-size: 13px;">${itemsSummary}</pre>
                        
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://lisma-unpas.com'}/admin/registrations" 
                               style="display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                               Buka Dashboard Admin
                            </a>
                        </div>
                    </div>
                `;

                await sendEmail({
                    email: adminEmail,
                    subject: `🚨 [NEW REG] ${firstReg.fullName} - ${sessionRegistrationCode}`,
                    name: "Admin",
                    message: `Pendaftaran baru dari ${firstReg.fullName} (${sessionRegistrationCode}). Total: Rp ${totalSessionPrice.toLocaleString('id-ID')}`,
                    htmlBody: adminHtml
                }).catch(err => console.error("[Registration] Error admin email:", err));
            } else {
                console.error("[Registration] Admin email not configured in environment variables");
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
