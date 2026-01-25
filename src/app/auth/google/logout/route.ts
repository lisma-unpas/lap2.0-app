import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
    const cookieStore = await cookies();
    cookieStore.delete("gdrive_tokens");
    cookieStore.delete("google_user");
    redirect("/");
}
