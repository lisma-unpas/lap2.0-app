import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { UnitGallery } from "@/components/marketing/unit-gallery";

export const metadata: Metadata = {
    ...openSharedMetadata("Pilih Unit"),
};

export default function RegistrationsPage() {
    return (
        <div className="pt-24 md:pt-32">
            <UnitGallery
                title="Pilih Kategori Event"
                description="Silakan pilih unit kesenian yang ingin Anda ikuti untuk memulai proses pendaftaran-mu di LAP 2.0."
                showMainEvent={true}
            />
        </div>
    );
}
