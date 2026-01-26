"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { motion, AnimatePresence } from "motion/react";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <AnimatePresence mode="wait">
                <motion.main
                    key={pathname}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex-1"
                >
                    {children}
                </motion.main>
            </AnimatePresence>
            <Footer />
        </div>
    );
}
