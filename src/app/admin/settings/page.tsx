import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import SettingsClient from "./settings-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Pengaturan"),
};

export default function AdminSettingsPage() {
    return <SettingsClient />;
}
