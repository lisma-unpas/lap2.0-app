import AboutSection from "@/components/marketing/about-section";
import FeatureBlocks from "@/components/marketing/feature-blocks";
import LandingHero from "@/components/marketing/landing-hero";
import MainEventHighlight from "@/components/marketing/main-event-highlight";

export default function LandingPage() {
    return (
        <>
            <LandingHero />
            <MainEventHighlight />
            <AboutSection className="border-y border-secondary" />
            <FeatureBlocks />
        </>
    );
}
