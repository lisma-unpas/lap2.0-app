import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import UnitContent from "@/components/application/unit/unit-content";

interface PageProps {
    params: Promise<{ unit: string }>;
}

import { UNIT_CONFIG } from "@/constants/units";

export default async function UnitDetailPage({ params }: PageProps) {
    const { unit } = await params;
    const config = UNIT_CONFIG[unit.toLowerCase()];

    if (!config) {
        notFound();
    }

    const event = await prisma.event.findFirst({
        where: { name: config.dbName },
        include: {
            subEvents: true
        }
    });

    if (!event) {
        notFound();
    }

    return (
        <UnitContent
            unitName={event.name}
            description={event.description || ""}
            subEvents={event.subEvents}
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
