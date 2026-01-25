import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/actions/auth";
import RegistrationsClient from "./registrations-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Registrasi"),
};

export default async function AdminRegistrationsPage() {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return <RegistrationsClient />;
}
