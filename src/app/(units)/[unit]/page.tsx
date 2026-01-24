import { notFound } from "next/navigation";
import UnitContent from "@/components/application/unit/unit-content";
import { UNIT_CONFIG } from "@/constants/units";

interface PageProps {
    params: Promise<{ unit: string }>;
}

export default async function UnitDetailPage({ params }: PageProps) {
    const { unit } = await params;
    const unitKey = unit.toLowerCase();
    const config = UNIT_CONFIG[unitKey];

    if (!config) {
        notFound();
    }

    // Mock sub-events from config if available
    let subEvents: any[] = [];
    if (config.subEventConfigs) {
        subEvents = Object.keys(config.subEventConfigs).map(name => ({
            id: name,
            name: name,
            price: config.subEventConfigs[name].price
        }));
    } else if (config.subEvents) {
        // Use the string array from the seeder data
        subEvents = config.subEvents.map((name: string) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name: name,
            price: config.price || 0
        }));
    } else {
        subEvents = [{ id: 'default', name: config.name, price: config.fixedPrice || 0 }];
    }

    return (
        <UnitContent
            unitName={config.name}
            description={config.description || "Unit kesenian LISMA yang mewadahi bakat dan minat mahasiswa."}
            subEvents={subEvents}
            badgeText={config.badgeText}
            imageUrl={config.imageUrl}
            colorClass={config.colorClass}
            highlightIconId={config.iconId}
            highlightTitle={config.highlightTitle}
            highlightSubtitle={config.highlightSubtitle}
            cpName={config.cpName}
            cpWhatsapp={config.cpWhatsapp}
            cpDescription={config.cpDescription}
        />
    );
}
