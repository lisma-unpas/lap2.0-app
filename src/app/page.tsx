import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import AboutSection from "@/components/marketing/about-section";
import FeatureBlocks from "@/components/marketing/feature-blocks";
import LandingHero from "@/components/marketing/landing-hero";
import MainEventHighlight from "@/components/marketing/main-event-highlight";
import { Reveal } from "@/components/shared/animations/reveal";

export const metadata: Metadata = {
    ...openSharedMetadata("Beranda"),
};

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-0">
            <Reveal y={30} duration={0.6}>
                <LandingHero />
            </Reveal>
            <Reveal y={30} duration={0.6} delay={0.1}>
                <MainEventHighlight />
            </Reveal>
            <Reveal y={30} duration={0.6}>
                <AboutSection className="border-y border-secondary" />
            </Reveal>
            <Reveal y={30} duration={0.6}>
                <FeatureBlocks />
            </Reveal>
        </div>
    );
}
