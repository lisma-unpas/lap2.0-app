import type { Metadata, Viewport } from "next";
import { Poppins, EB_Garamond } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";
import ConditionalLayout from "@/components/shared/conditional-layout";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/context/toast-context";
import { GoogleAuthProvider } from "@/context/google-auth-context";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-poppins",
});

const ebGaramond = EB_Garamond({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
    title: "Web LAP — LISMA",
    description: "Platform Terintegrasi LISMA dan LAP untuk Pendaftaran dan Materi.",
};

export const viewport: Viewport = {
    themeColor: "#FFA500",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/logo.png" />
            </head>
            <body className={cx(poppins.variable, ebGaramond.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <GoogleAuthProvider>
                        <CartProvider>
                            <ToastProvider>
                                <Theme>
                                    <ConditionalLayout>
                                        {children}
                                    </ConditionalLayout>
                                </Theme>
                            </ToastProvider>
                        </CartProvider>
                    </GoogleAuthProvider>
                </RouteProvider>
            </body>
        </html>
    );
}
