import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import RegistrationsClient from "./registrations-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Registrasi"),
};

export default function AdminRegistrationsPage() {
    return <RegistrationsClient />;
}
