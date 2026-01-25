import InfoClient from "./info-client";
import { getInfoList } from "@/actions/info";

export const metadata = {
    title: "Manajemen Informasi | Admin",
};

export default async function InfoPage() {
    const res = await getInfoList();
    return <InfoClient initialInfo={res.success ? (res.data ?? []) : []} />;
}
