import { getTokens, getUserInfoClient } from "@/lib/google-drive";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const tokens = await getTokens(code);
        const cookieStore = await cookies();

        // Storing tokens in cookies (you might want to encrypt this in production)
        cookieStore.set("gdrive_tokens", JSON.stringify(tokens), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        // Fetch user info to store in cookie for navbar
        if (tokens.access_token) {
            const oauth2 = getUserInfoClient(tokens.access_token);
            const { data } = await oauth2.userinfo.get();

            cookieStore.set("google_user", JSON.stringify({
                name: data.name,
                email: data.email,
                picture: data.picture,
            }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });
        }

        const html = `
            <html>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.location.reload();
                        }
                        window.close();
                    </script>
                    <p>Autentikasi berhasil. Menutup jendela...</p>
                </body>
            </html>
        `;
        return new NextResponse(html, {
            headers: { "Content-Type": "text/html" },
        });
    } catch (error) {
        console.error("Google OAuth error:", error);
        const html = `
            <html>
                <body>
                    <script>
                        alert("Autentikasi gagal. Silakan coba lagi.");
                        window.close();
                    </script>
                </body>
            </html>
        `;
        return new NextResponse(html, {
            headers: { "Content-Type": "text/html" },
        });
    }
}

