"use client";

import React from "react";
import {
    BarChart11,
    Users01,
    Ticket01,
    Settings02,
    LogOut01,
    Home01,
    InfoSquare
} from "@untitledui/icons";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/actions/auth";
import { useRouter } from "next/navigation";

import { getAdminSession } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [adminUser, setAdminUser] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchSession = async () => {
            const user = await getAdminSession();
            if (user) setAdminUser(user);
        };
        fetchSession();
    }, []);

    const menuItems = [
        {
            label: "Dashboard",
            icon: BarChart11,
            href: "/admin/dashboard",
        },
        {
            label: "Registrations",
            icon: Users01,
            href: "/admin/registrations",
        },
        {
            label: "Tickets",
            icon: Ticket01,
            href: "/admin/tickets",
        },
        {
            label: "Information",
            icon: InfoSquare,
            href: "/admin/info",
        },
        {
            label: "Settings",
            icon: Settings02,
            href: "/admin/settings",
        },
    ];

    const footerItems = [
        {
            label: "Log Out",
            icon: LogOut01,
            href: "#",
            onClick: async () => {
                await adminLogout();
                router.push("/admin/login");
            }
        }
    ];

    // If we are on the login page, don't show the sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-secondary_alt">
            <SidebarNavigationSimple
                items={menuItems}
                footerItems={footerItems}
                activeUrl={pathname}
                adminEmail={adminUser?.email}
            />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
