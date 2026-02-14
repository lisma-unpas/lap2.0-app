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

    email: {
        scriptUrl: process.env.GOOGLE_SCRIPT_URL || "",
        scriptToken: process.env.GOOGLE_SCRIPT_TOKEN || "",
        adminEmail: process.env.NOTIFICATION_ADMIN_EMAIL || "",
    },
    googleDrive: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirectUri: process.env.OAUTH_REDIRECT_URL || "",
    },
    spreadsheet: {
        scriptUrlSync: process.env.GOOGLE_SCRIPT_URL_SPREADSHEET || "",
        url: process.env.GOOGLE_URL_SPREADSHEET || "https://docs.google.com/spreadsheets",
    },
};
