import { Suspense } from "react";
import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import TicketsClient from "./tickets-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Admin - Tiket"),
};

export default function AdminTicketsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TicketsClient />
        </Suspense>
    );
}
