import { openSharedMetadata } from "@/utils/metadata";
import InfoClient from "./info-client";
import { getInfoList } from "@/actions/info";

export const metadata = {
    ...openSharedMetadata("Manajemen Informasi"),
};

export default async function InfoPage() {
    const res = await getInfoList();
    return <InfoClient initialInfo={res.success ? (res.data ?? []) : []} />;
}
