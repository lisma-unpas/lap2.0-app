import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import { getRegistrations, getDashboardStats } from "@/actions/admin";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboardPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    const [regRes, statsRes] = await Promise.all([
        getRegistrations(),
        getDashboardStats()
    ]);

    return (
        <DashboardClient
            initialData={regRes.success ? (regRes.data ?? []) : []}
            initialStats={statsRes.success ? statsRes.data : null}
            initialTotal={regRes.success ? (regRes.total ?? 0) : 0}
        />
    );
}
