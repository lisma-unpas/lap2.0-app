import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import { UnitGallery } from "@/components/marketing/unit-gallery";

export const metadata: Metadata = {
    ...openSharedMetadata("Pilih Unit"),
};

export default function UnitPage() {
    return (
        <UnitGallery
            title="Pilih Unit LISMA & Daftar"
            description="Temukan berbagai kategori event seni di LAP 2.0 dan tunjukkan bakatmu."
        />
    );
}
