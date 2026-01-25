"use server";

import { cookies } from "next/headers";

// Since we moved to localStorage, we no longer set cookies on the server.
// These actions are kept for backward compatibility if needed, but 
// they will no longer return session data from the client's localStorage.

export async function signOut() {
    // Clear cookies just in case any old ones exist
    const cookieStore = await cookies();
    cookieStore.delete("gdrive_tokens");
    cookieStore.delete("google_user");
}
