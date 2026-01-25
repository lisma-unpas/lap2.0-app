import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
    // Clear cookies just in case any old ones exist
    const cookieStore = await cookies();
    cookieStore.delete("gdrive_tokens");
    cookieStore.delete("google_user");
    redirect("/");
}
