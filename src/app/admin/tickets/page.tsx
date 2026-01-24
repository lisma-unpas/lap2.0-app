import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import TicketsClient from "./tickets-client";

export default async function AdminTicketsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return <TicketsClient />;
}
