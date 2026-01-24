"use client";

import { ArrowRight, BookOpen01, Camera01, MusicNote02, PlayCircle, Wind03 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";

const unitUnits = [
    {
        name: "Teater dan Sastra (TESAS)",
        emoji: "🎭",
        description: "Unit yang mewadahi seni bermain peran, berpuisi, dan prosa.",
        icon: BookOpen01,
        color: "purple",
        href: "/tesas",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop"
    },
    {
        name: "Kesenian Daerah Sunda (KDS)",
        emoji: "🪭",
        description: "Tradisi luhur: tari tradisional, alat musik tradisional, pupuh, dan tembang sunda.",
        icon: Wind03,
        color: "orange",
        href: "/kds",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop"
    },
    {
        name: "Paduan Suara dan Musik (PSM)",
        emoji: "🎼",
        description: "Harmoni suara dan musik. Mewadahi karya orisinal dan pembentukan band.",
        icon: MusicNote02,
        color: "blue",
        href: "/psm",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Tari Kreasi (TAKRE)",
        emoji: "🎧",
        description: "Ekspresi modern: modern dance, K-Pop, dan berbagai genre tari masa kini.",
        icon: PlayCircle,
        color: "pink",
        href: "/takre",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop"
    },
    {
        name: "Fotografi & Videografi (FG)",
        emoji: "📸",
        description: "Menangkap momen melalui lensa dan kompetisi kreatif Fun Games.",
        icon: Camera01,
        color: "indigo",
        href: "/fg",
        image: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?q=80&w=2072&auto=format&fit=crop"
    },
];

export default function FeatureBlocks() {
    return (
        <Section className="bg-primary" id="units">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">
                        Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Unit Kesenian</span> LISMA
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg text-tertiary">
                        Pilih unit yang sesuai dengan minat dan bakat Anda untuk bersinar di LISMA ART PARADE 2.0.
                    </p>
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-8">
                    {unitUnits.map((unit) => (
                        <div
                            key={unit.name}
                            className="group relative flex flex-col items-start rounded-2xl border border-secondary bg-primary overflow-hidden hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                        >
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                <img
                                    src={unit.image}
                                    alt={unit.name}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <FeaturedIcon icon={unit.icon} color="brand" theme="dark" size="sm" />
                                    <span className="text-xl">{unit.emoji}</span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-xl font-semibold text-primary group-hover:text-purple-700 transition-colors">
                                    {unit.name}
                                </h3>
                                <p className="mt-2 text-md text-tertiary leading-relaxed flex-1">
                                    {unit.description}
                                </p>
                                <a
                                    href={unit.href}
                                    className="mt-6 text-sm font-semibold text-purple-600 hover:text-purple-800 inline-flex items-center gap-2"
                                >
                                    Lihat Detail & Daftar <ArrowRight className="size-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
