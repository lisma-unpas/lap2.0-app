"use server";

import { imagekit } from "@/lib/imagekit";

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
        const result = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: "/lisma-registrations",
        });

        return {
            success: true,
            url: result.url,
            fileId: result.fileId,
        };
    } catch (error) {
        console.error("ImageKit upload error:", error);
        return { success: false, error: "Upload failed" };
    }
}

export async function deleteImage(fileId: string) {
    try {
        await imagekit.deleteFile(fileId);
        return { success: true };
    } catch (error) {
        console.error("ImageKit delete error:", error);
        return { success: false, error: "Delete failed" };
    }
}
