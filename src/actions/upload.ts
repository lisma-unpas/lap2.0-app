"use server";

import { getDriveClient } from "@/lib/google-drive";
import { cookies } from "next/headers";
import { Readable } from "stream";

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const cookieStore = await cookies();
    const tokensRaw = cookieStore.get("gdrive_tokens")?.value;

    if (!tokensRaw) {
        return { success: false, error: "AUTH_REQUIRED", message: "Silakan hubungkan Google Drive terlebih dahulu." };
    }

    try {
        const tokens = JSON.parse(tokensRaw);
        const drive = getDriveClient(tokens.access_token);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        const response = await drive.files.create({
            requestBody: {
                name: `LISMA_${Date.now()}_${file.name}`,
                parents: [], // You can specify a folder ID here if needed
            },
            media: {
                mimeType: file.type,
                body: stream,
            },
            fields: "id, webViewLink, webContentLink",
        });

        // Make the file readable by anyone with the link (optional, based on requirement)
        await drive.permissions.create({
            fileId: response.data.id!,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        return {
            success: true,
            url: response.data.webViewLink,
            fileId: response.data.id,
        };
    } catch (error) {
        console.error("Google Drive upload error:", error);
        return { success: false, error: "Upload failed" };
    }
}

export async function deleteImage(fileId: string) {
    const cookieStore = await cookies();
    const tokensRaw = cookieStore.get("gdrive_tokens")?.value;

    if (!tokensRaw) {
        return { success: false, error: "AUTH_REQUIRED" };
    }

    try {
        const tokens = JSON.parse(tokensRaw);
        const drive = getDriveClient(tokens.access_token);

        await drive.files.delete({
            fileId: fileId,
        });

        return { success: true };
    } catch (error) {
        console.error("Google Drive delete error:", error);
        return { success: false, error: "Delete failed" };
    }
}

