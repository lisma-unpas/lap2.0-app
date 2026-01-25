import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import MainEventClient from "./main-event-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Main Event"),
};

export default function MainEventPage() {
    return <MainEventClient />;
}
