import { google } from "googleapis";
import { config } from "./config";

const clientID = config.googleDrive.clientId;
const clientSecret = config.googleDrive.clientSecret;
const redirectURI = config.googleDrive.redirectUri;

export const oauth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    redirectURI
);

export const DRIVE_SCOPES = [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];

export function getAuthUrl() {
    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: DRIVE_SCOPES,
        prompt: "consent",
    });
}

export async function getTokens(code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

export function getDriveClient(accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return google.drive({ version: "v3", auth });
}

export function getUserInfoClient(accessToken: string) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return google.oauth2({ version: "v2", auth });
}
