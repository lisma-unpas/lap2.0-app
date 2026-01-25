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
        let userData = null;
        if (tokens.access_token) {
            const oauth2 = getUserInfoClient(tokens.access_token);
            const { data } = await oauth2.userinfo.get();
            userData = {
                name: data.name,
                email: data.email,
                picture: data.picture,
            };
        }

        const html = `
            <html>
                <body>
                    <script>
                        try {
                            const user = ${JSON.stringify(userData)};
                            const tokens = ${JSON.stringify(tokens)};
                            const expiryDate = new Date();
                            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                            
                            localStorage.setItem("google_user", JSON.stringify(user));
                            localStorage.setItem("gdrive_tokens", JSON.stringify(tokens));
                            localStorage.setItem("google_auth_expiry", expiryDate.getTime().toString());
                            
                            if (window.opener) {
                                window.opener.location.reload();
                            }
                            window.close();
                        } catch (e) {
                            console.error("Auth persistence failed", e);
                            alert("Gagal menyimpan sesi. Silakan coba lagi.");
                        }
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

