import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import CheckStatusClient from "./check-status-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Cek Status"),
};

export default function CheckStatusPage() {
    return <CheckStatusClient />;
}
