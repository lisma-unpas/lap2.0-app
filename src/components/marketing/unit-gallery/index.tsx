"use client";

import { ArrowRight } from "@untitledui/icons";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNITS_MOCK } from "@/mock/units";
import { cx } from "@/utils/cx";
import { UnitImage } from "@/components/application/unit/unit-image";
import { motion } from "motion/react";

function UnitCard({ unit, index }: { unit: any; index: number }) {
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
                        className="text-sm font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-2 transition-colors transition-transform group-hover:translate-x-1"
                    >
                        Lihat Detail & Daftar <ArrowRight className="size-4" />
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
                    {units.map((unit, index) => (
                        <UnitCard key={unit.id} unit={unit} index={index} />
                    ))}
                </div>
            </Container>
        </Section>
    );
}
