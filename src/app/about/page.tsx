import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import AboutSection from "@/components/marketing/about-section";

export const metadata: Metadata = {
    ...openSharedMetadata("Tentang Kami"),
};

export default function AboutPage() {
    return (
        <AboutSection />
    );
}
