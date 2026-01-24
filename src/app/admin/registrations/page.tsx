import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import RegistrationsClient from "./registrations-client";

export default async function AdminRegistrationsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return <RegistrationsClient />;
}
