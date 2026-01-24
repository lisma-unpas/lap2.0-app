/**
 * Utility for sending emails via Google Apps Script.
 */

interface SendEmailOptions {
    email: string;
    subject: string;
    name: string;
    message: string;
    title?: string;
    registrationLink?: string;
    htmlBody?: string;
}

import { config } from "@/lib/config";

export async function sendEmail({
    email,
    subject,
    name,
    message,
    title = "Lisma Project Notification",
    registrationLink,
    htmlBody,
}: SendEmailOptions) {
    const url = config.email.scriptUrl;
    const token = config.email.scriptToken;

    if (!url) {
        console.warn("GOOGLE_SCRIPT_URL is not defined in environment variables.");
        return { status: "error", message: "Email service not configured" };
    }

    try {
        console.log(`[EmailService] Attempting to send email to ${email}...`);
        console.log(`[EmailService] Target URL: ${url}`);

        const payload = {
            token,
            email,
            subject,
            name,
            message,
            bodyContent: message,
            title,
            registrationLink,
            htmlBody,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload),
        });

        console.log(`[EmailService] Response status: ${response.status} ${response.statusText}`);

        const responseText = await response.text();
        console.log(`[EmailService] Raw Response: ${responseText}`);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            result = { status: "error", message: "Failed to parse GAS response" };
        }

        return result;
    } catch (error) {
        console.error("[EmailService] Error occurred:", error);
        return { status: "error", message: error instanceof Error ? error.message : "Internal Server Error" };
    }
}
