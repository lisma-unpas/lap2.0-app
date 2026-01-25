import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import SettingsClient from "./settings-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Pengaturan"),
};

export default async function AdminSettingsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return <SettingsClient />;
}
