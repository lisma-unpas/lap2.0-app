"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function adminLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { success: false, message: "Email dan password wajib diisi." };
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
                role: "ADMIN"
            }
        });

        if (!user || !user.password) {
            return { success: false, message: "Akun tidak ditemukan atau bukan admin." };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: "Password salah." };
        }

        // Set a simple cookie for "session" - in a real app, use JWT or specialized auth library
        const cookieStore = await cookies();
        cookieStore.set("admin_session", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return { success: true };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Terjadi kesalahan sistem." };
    }
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return { success: true };
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value;

    if (!sessionId) return null;

    return await prisma.user.findUnique({
        where: { id: sessionId, role: "ADMIN" }
    });
}
