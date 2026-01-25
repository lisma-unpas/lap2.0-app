import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import TicketsClient from "./tickets-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Tiket"),
};

export default function AdminTicketsPage() {
    return <TicketsClient />;
}
