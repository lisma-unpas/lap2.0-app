import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import { getDashboardStats } from "@/actions/admin";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    const statsRes = await getDashboardStats();

    return (
        <DashboardClient
            initialStats={statsRes.success ? statsRes.data : null}
        />
    );
}
