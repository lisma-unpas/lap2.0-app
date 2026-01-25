import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export default imagekit;

export async function uploadToImageKit(file: string | Buffer, fileName: string, folder: string = "/news") {
    try {
        const response = await imagekit.upload({
            file, // base64 string or buffer
            fileName,
            folder,
        });
        return { success: true, url: response.url, fileId: response.fileId };
    } catch (error) {
        console.error("ImageKit upload error:", error);
        return { success: false, message: "Gagal mengunggah gambar ke ImageKit." };
    }
}

export async function deleteFromImageKit(fileId: string) {
    try {
        await imagekit.deleteFile(fileId);
        return { success: true };
    } catch (error) {
        console.error("ImageKit delete error:", error);
        return { success: false, message: "Gagal menghapus gambar dari ImageKit." };
    }
}
