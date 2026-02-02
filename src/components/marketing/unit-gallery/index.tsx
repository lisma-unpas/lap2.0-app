"use client";

import { ArrowRight } from "@untitledui/icons";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNITS_MOCK } from "@/mock/units";
import { cx } from "@/utils/cx";
import { UnitImage } from "@/components/application/unit/unit-image";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { getUnitAvailability } from "@/actions/admin";
import { Badge } from "@/components/base/badges/badges";

function UnitCardSkeleton({ index }: { index: number }) {
    return (
        <div
            className="flex flex-col items-start rounded-2xl border border-secondary bg-primary overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] animate-pulse"
        >
            <div className="relative w-full aspect-[4/3] bg-secondary_alt" />
            <div className="px-8 py-10 flex flex-col w-full flex-1">
                <div className="h-7 w-1/2 bg-secondary_alt rounded-md" />
                <div className="mt-6 space-y-3 flex-1">
                    <div className="h-4 w-full bg-secondary_alt rounded-md" />
                    <div className="h-4 w-full bg-secondary_alt rounded-md" />
                    <div className="h-4 w-3/4 bg-secondary_alt rounded-md" />
                </div>
                <div className="mt-10 h-5 w-1/3 bg-secondary_alt rounded-md" />
            </div>
        </div>
    );
}

function UnitCard({ unit, index, availability }: { unit: any; index: number; availability: any }) {
    const today = new Date();
    const startDate = availability?.startDate ? new Date(availability.startDate) : null;
    const endDate = availability?.endDate ? new Date(availability.endDate) : null;

    // A registration is open ONLY if it's after startDate (if set) AND before endDate (if set)
    const isComingSoon = !!(startDate && today < startDate);
    const isClosed = !!(endDate && today > endDate);

    // Check if ALL categories are full
    const availabilityMap = availability?.data || {};
    const hasSettings = Object.keys(availabilityMap).length > 0;
    const isFull = availability?.success &&
        hasSettings &&
        Object.values(availabilityMap).every((a: any) => !a.available);

    // Final Status Determination
    let status: 'COMING_SOON' | 'CLOSED' | 'FULL' | 'OPEN' = 'OPEN';
    if (isClosed) status = 'CLOSED';
    else if (isComingSoon) status = 'COMING_SOON';
    else if (isFull) status = 'FULL';

    const statusConfigs = {
        COMING_SOON: {
            color: "blue" as const,
            text: "Coming Soon",
        },
        CLOSED: {
            color: "error" as const,
            text: "Ditutup",
        },
        FULL: {
            color: "warning" as const,
            text: "Tiket Terbatas",
        },
        OPEN: {
            color: "success" as const,
            text: "Dibuka",
        }
    };

    const currentStatus = statusConfigs[status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col items-start rounded-2xl border border-secondary bg-primary overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
        >
            <div className="relative w-full overflow-hidden bg-bg-secondary">
                <UnitImage
                    unitId={unit.id}
                    fallbackUrl={unit.imageUrl}
                    alt={`${unit.name} showcase`}
                    className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {/* Only show OPEN badge if availability sync was successful */}
                    {(status !== 'OPEN' || availability?.success) && (
                        <Badge
                            color={currentStatus.color}
                            size="sm"
                            type="pill-color"
                        >
                            {currentStatus.text}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="px-8 py-10 flex flex-col flex-1">
                <h3 className="text-xl font-black text-primary tracking-tight uppercase">
                    {unit.name}
                </h3>
                <p className="mt-4 text-md text-tertiary leading-relaxed flex-1 line-clamp-4 whitespace-pre-wrap">
                    {unit.description}
                </p>

                <div className="mt-10 w-full">
                    <a
                        href={`/${unit.id}`}
                        className={cx(
                            "text-sm font-bold inline-flex items-center gap-2 transition-all group-hover:translate-x-1 py-1.5 px-0",
                            status === 'CLOSED' ? "text-tertiary cursor-not-allowed" : "text-brand-600 hover:text-brand-700"
                        )}
                    >
                        {status === 'COMING_SOON' ? "Lihat Detail" : (status === 'CLOSED' ? "Pendaftaran Berakhir" : "Lihat Detail & Daftar")} <ArrowRight className="size-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

interface UnitGalleryProps {
    title?: string;
    description?: string;
    showFooter?: boolean;
    className?: string;
    showMainEvent?: boolean;
}

export function UnitGallery({
    title = "Jelajahi Unit Kesenian LISMA",
    description = "Pilih unit yang sesuai dengan minat dan bakat Anda untuk bersinar di LISMA ART PARADE 2.0.",
    className,
    showMainEvent = false
}: UnitGalleryProps) {
    // Order units: main-event first, then others
    const sortedUnits = [...UNITS_MOCK].sort((a, b) => {
        if (a.id === "main-event") return -1;
        if (b.id === "main-event") return 1;
        return 0;
    });

    const [availabilities, setAvailabilities] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isSubscribed = true;
        async function fetchAllAvailabilities() {
            setIsLoading(true);
            const results: Record<string, any> = {};
            const unitBatch = showMainEvent ? sortedUnits : sortedUnits.filter(u => u.id !== "main-event");

            try {
                // Fetch in parallel but wait for all
                const responses = await Promise.all(unitBatch.map(u => getUnitAvailability(u.id)));
                if (!isSubscribed) return;

                unitBatch.forEach((u, i) => {
                    results[u.id] = responses[i];
                });
                setAvailabilities(results);
            } catch (err) {
                console.error("Failed to fetch unit availabilities:", err);
            } finally {
                if (isSubscribed) setIsLoading(false);
            }
        }
        fetchAllAvailabilities();
        return () => { isSubscribed = false; };
    }, [showMainEvent]); // Dependency on showMainEvent to refetch if view changes

    const units = showMainEvent
        ? sortedUnits
        : sortedUnits.filter(unit => unit.id !== "main-event");

    return (
        <Section className={cx("bg-primary", className)} id="units">
            <Container>
                {title && (
                    <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
                        <h2 className="text-display-xs font-bold text-primary md:text-display-sm">
                            {title === "Jelajahi Unit Kesenian LISMA" ? (
                                <>
                                    Jelajahi <span className="text-brand-500">Unit Kesenian</span> LISMA
                                </>
                            ) : title === "Pilih Kategori Event" ? (
                                <>
                                    Pilih Kategori <span className="text-brand-500">Event</span>
                                </>
                            ) : title}
                        </h2>
                        {description && (
                            <p className="mt-4 max-w-2xl text-lg text-tertiary">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className={cx(
                    "flex flex-wrap justify-center gap-8",
                    className
                )}>
                    {isLoading ? (
                        units.map((_, index) => (
                            <UnitCardSkeleton key={index} index={index} />
                        ))
                    ) : (
                        units.map((unit, index) => (
                            <UnitCard
                                key={unit.id}
                                unit={unit}
                                index={index}
                                availability={availabilities[unit.id]}
                            />
                        ))
                    )}
                </div>
            </Container>
        </Section>
    );
}
