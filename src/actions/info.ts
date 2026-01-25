"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";
import { uploadToImageKit } from "@/lib/imagekit";
import { slugify } from "@/utils/slugify";

export async function getInfoList() {
    try {
        const info = await prisma.info.findMany({
            orderBy: { createdAt: "desc" }
        });
        return { success: true, data: info };
    } catch (error) {
        console.error("Error fetching info:", error);
        return { success: false, message: "Gagal mengambil data informasi." };
    }
}

export async function createInfo(data: { title: string; body: string; category: string; imageBase64?: string; fileName?: string }) {
    try {
        let imageUrl = "";

        if (data.imageBase64 && data.fileName) {
            const uploadRes = await uploadToImageKit(data.imageBase64, data.fileName);
            if (uploadRes.success) {
                imageUrl = uploadRes.url || "";
            } else {
                return { success: false, message: uploadRes.message };
            }
        }

        let slug = slugify(data.title);

        // Ensure slug uniqueness
        const existing = await prisma.info.findUnique({ where: { slug } });
        if (existing) {
            slug = `${slug}-${Date.now().toString().slice(-4)}`;
        }

        const info = await prisma.info.create({
            data: {
                title: data.title,
                slug,
                body: data.body,
                category: data.category,
                imageUrl,
            }
        });

        revalidatePath("/admin/info");
        return { success: true, data: info };
    } catch (error) {
        console.error("Error creating info:", error);
        return { success: false, message: "Gagal membuat informasi." };
    }
}

export async function updateInfo(id: string, data: { title: string; body: string; category: string; imageBase64?: string; fileName?: string }) {
    try {
        let updateData: any = {
            title: data.title,
            body: data.body,
            category: data.category,
        };

        if (data.imageBase64 && data.fileName) {
            const uploadRes = await uploadToImageKit(data.imageBase64, data.fileName);
            if (uploadRes.success) {
                updateData.imageUrl = uploadRes.url;
            } else {
                return { success: false, message: uploadRes.message };
            }
        }

        if (data.title) {
            let slug = slugify(data.title);
            const existing = await prisma.info.findFirst({
                where: {
                    slug,
                    id: { not: id }
                }
            });
            if (existing) {
                slug = `${slug}-${Date.now().toString().slice(-4)}`;
            }
            updateData.slug = slug;
        }

        const info = await prisma.info.update({
            where: { id },
            data: updateData
        });

        revalidatePath("/admin/info");
        return { success: true, data: info };
    } catch (error) {
        console.error("Error updating info:", error);
        return { success: false, message: "Gagal memperbarui informasi." };
    }
}

export async function deleteInfo(id: string) {
    try {
        await prisma.info.delete({ where: { id } });
        revalidatePath("/admin/info");
        return { success: true };
    } catch (error) {
        console.error("Error deleting info:", error);
        return { success: false, message: "Gagal menghapus informasi." };
    }
}

export async function sendInfoNotification(infoId: string) {
    try {
        const info = await prisma.info.findUnique({ where: { id: infoId } });
        if (!info) return { success: false, message: "Informasi tidak ditemukan." };

        // Collect unique emails
        const [users, registrations] = await Promise.all([
            prisma.user.findMany({ select: { email: true }, where: { email: { not: null } } }),
            prisma.registration.findMany({ select: { email: true } })
        ]);

        const emailSet = new Set<string>();
        users.forEach(u => u.email && emailSet.add(u.email));
        registrations.forEach(r => emailSet.add(r.email));

        const uniqueEmails = Array.from(emailSet);
        console.log(`[Notification] Sending info ${infoId} to ${uniqueEmails.length} emails.`);

        await Promise.all(
            uniqueEmails.map(email =>
                sendEmail({
                    email,
                    subject: `[Informasi Baru] ${info.title}`,
                    name: "User", // Generic name
                    title: info.title,
                    message: info.body.substring(0, 200) + "...", // Short preview
                    htmlBody: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                            ${info.imageUrl ? `<img src="${info.imageUrl}" alt="Banner" style="width: 100%; border-radius: 12px; margin-bottom: 20px;" />` : ""}
                            <h1 style="color: #4f46e5;">${info.title}</h1>
                            <p style="font-size: 14px; color: #666; font-style: italic;">Kategori: ${info.category}</p>
                            <div style="line-height: 1.6; margin-top: 20px;">
                                ${info.body.replace(/\n/g, "<br/>")}
                            </div>
                            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                            <p style="text-align: center; font-size: 12px; color: #999;">
                                Pesan ini dikirimkan otomatis karena Anda terdaftar di platform Lisma.
                            </p>
                        </div>
                    `
                })
            )
        );

        return { success: true, count: uniqueEmails.length };
    } catch (error) {
        console.error("Error sending notifications:", error);
        return { success: false, message: "Gagal mengirim notifikasi." };
    }
}

export async function uploadImage(base64: string, fileName: string) {
    try {
        const res = await uploadToImageKit(base64, fileName, "/editor");
        return res;
    } catch (error) {
        return { success: false, message: "Error uploading image" };
    }
}

// Keep backward compatibility for a while if needed, or just export them as aliases
export const getNewsList = getInfoList;
export const createNews = createInfo;
export const updateNews = updateInfo;
export const deleteNews = deleteInfo;
export const sendNewsNotification = sendInfoNotification;
