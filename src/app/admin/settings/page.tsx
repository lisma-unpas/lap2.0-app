import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import SettingsClient from "./settings-client";

export default async function AdminSettingsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return <SettingsClient />;
}
