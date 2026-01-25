import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { getDashboardStats } from "@/actions/admin";
import DashboardClient from "./dashboard-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Dashboard"),
};

export default async function AdminDashboardPage() {
    const statsRes = await getDashboardStats();

    return (
        <DashboardClient
            initialStats={statsRes.success ? statsRes.data : null}
        />
    );
}
