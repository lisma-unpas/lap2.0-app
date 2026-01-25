"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: "Terjadi kesalahan sistem." };
    }
}

export async function adminLogout() {
    return { success: true };
}
