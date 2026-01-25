"use server";

import { cookies } from "next/headers";

export async function getGoogleUser() {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("google_user")?.value;

    if (!userCookie) return null;

    try {
        return JSON.parse(userCookie);
    } catch {
        return null;
    }
}

export async function hasGoogleTokens() {
    const cookieStore = await cookies();
    return cookieStore.has("gdrive_tokens");
}
export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("gdrive_tokens");
    cookieStore.delete("google_user");
}
