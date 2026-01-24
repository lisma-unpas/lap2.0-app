import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";
import ConditionalLayout from "@/components/shared/conditional-layout";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Web LAP — LISMA",
    description: "Platform Terintegrasi LISMA dan LAP untuk Pendaftaran dan Materi.",
};

export const viewport: Viewport = {
    themeColor: "#7f56d9",
    colorScheme: "light dark",
};

import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/context/toast-context";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <CartProvider>
                        <ToastProvider>
                            <Theme>
                                <ConditionalLayout>
                                    {children}
                                </ConditionalLayout>
                            </Theme>
                        </ToastProvider>
                    </CartProvider>
                </RouteProvider>
            </body>
        </html>
    );
}
