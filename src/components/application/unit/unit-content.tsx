"use client";

import { ArrowLeft, Camera01, MusicNote02, PlayCircle, Ticket01, Calendar, CheckCircle, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import FloatingWhatsApp from "@/components/shared/floating-whatsapp";
import { cx } from "@/utils/cx";

interface UnitContentProps {
    badgeText: string;
    unitName: string;
    description: string;
    subEvents: { name: string }[];
    highlightIconId: string;
    highlightTitle: string;
    highlightSubtitle: string;
    imageUrl: string;
    cpName: string;
    cpWhatsapp: string;
    cpDescription: string;
    colorClass: string; // e.g., "purple", "indigo", "rose", "cyan", "orange"
}

export default function UnitContent({
    badgeText,
    unitName,
    description,
    subEvents,
    highlightIconId,
    highlightTitle,
    highlightSubtitle,
    imageUrl,
    cpName,
    cpWhatsapp,
    cpDescription,
    colorClass,
}: UnitContentProps) {
    const ICON_MAP: Record<string, any> = {
        ticket: Ticket01,
        music: MusicNote02,
        play: PlayCircle,
        camera: Camera01,
    };

    const colorMap: Record<string, { bg: string; text: string; lightBg: string; border: string }> = {
        purple: { bg: "bg-purple-600", text: "text-purple-700", lightBg: "bg-purple-50", border: "border-purple-200" },
        indigo: { bg: "bg-indigo-600", text: "text-indigo-700", lightBg: "bg-indigo-50", border: "border-indigo-200" },
        rose: { bg: "bg-rose-600", text: "text-rose-700", lightBg: "bg-rose-50", border: "border-rose-200" },
        cyan: { bg: "bg-cyan-600", text: "text-cyan-700", lightBg: "bg-cyan-50", border: "border-cyan-200" },
        orange: { bg: "bg-orange-600", text: "text-orange-700", lightBg: "bg-orange-50", border: "border-orange-200" },
    };

    const colors = colorMap[colorClass] || colorMap.purple;
    const HighlightIcon = ICON_MAP[highlightIconId] || Ticket01;

    return (
        <>
            <Section className="relative">
                <Container>
                    <Button color="link-gray" iconLeading={ArrowLeft} href="/">Kembali ke Beranda</Button>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <div className={`inline-flex items-center gap-2 rounded-full ${colors.lightBg} px-3 py-1 text-sm font-medium ${colors.text}`}>
                                {badgeText}
                            </div>
                            <h1 className="mt-4 text-display-md font-semibold text-primary">{unitName}</h1>
                            <p className="mt-6 text-lg text-tertiary leading-relaxed whitespace-pre-wrap">
                                {description}
                            </p>

                            <div className="mt-10 flex flex-col gap-6">
                                {/* Sub-Events Card */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-widest pl-1">Kategori & Lomba</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {subEvents.map((se, index) => (
                                            <div
                                                key={index}
                                                className="p-4 flex items-center gap-3 transition-colors bg-primary border border-secondary rounded-xl hover:bg-secondary_alt/30 shadow-sm"
                                            >
                                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colors.lightBg} ${colors.text} border ${colors.border}`}>
                                                    <Star01 className="size-4" />
                                                </div>
                                                <p className="font-bold text-primary text-sm">{se.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Date/Location Card */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-quaternary uppercase tracking-widest pl-1">Waktu & Lokasi</p>
                                    <div className={`flex items-center gap-4 p-4 rounded-2xl border border-secondary ${colors.lightBg}/30 shadow-sm`}>
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} text-white shadow-lg`}>
                                            <HighlightIcon className="size-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary">{highlightTitle}</p>
                                            <p className="text-sm text-tertiary">{highlightSubtitle}</p>
                                        </div>
                                    </div>
                                </div>

                                <Button size="xl" color="primary" href={`/register/${unitName.toLowerCase()}`} className="h-14 rounded-lg shadow-lg shadow-brand-solid/20">
                                    Daftar Sekarang
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="rounded-2xl overflow-hidden border border-secondary shadow-2xl aspect-[4/3]">
                                <img
                                    src={imageUrl}
                                    alt={`${unitName} showcase`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6 rounded-2xl border border-secondary bg-secondary/20">
                                <h4 className="font-semibold text-primary">Butuh Bantuan? (CP)</h4>
                                <p className="text-sm text-tertiary mt-1">{cpDescription}</p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold`}>
                                        {unitName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">{cpName}</p>
                                        <a href={`https://wa.me/${cpWhatsapp}`} target="_blank" className={`text-xs ${colors.text} font-medium`}>Chat via WhatsApp →</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <FloatingWhatsApp
                cpName={cpName}
                cpWhatsapp={cpWhatsapp}
                cpDescription={cpDescription}
                unitName={unitName}
            />
        </>
    );
}
