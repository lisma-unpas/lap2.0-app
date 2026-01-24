/**
 * Centralized configuration for the application.
 * All access to process.env should happen here.
 */

export const config = {
    env: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",

    database: {
        url: process.env.DATABASE_URL,
        directUrl: process.env.DIRECT_URL,
    },

    imagekit: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
    },

    email: {
        scriptUrl: process.env.GOOGLE_SCRIPT_URL || "",
        scriptToken: process.env.GOOGLE_SCRIPT_TOKEN || "",
        adminEmail: process.env.ADMIN_EMAIL || process.env.NOTIFICATION_ADMIN_EMAIL || "muhhjam@gmail.com",
    },
};
