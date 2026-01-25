import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import TicketsClient from "./tickets-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Tiket"),
};

export default async function AdminTicketsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return <TicketsClient />;
}
