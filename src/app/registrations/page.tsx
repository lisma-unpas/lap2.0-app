"use client";

import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
const units = [
    { id: 'tesas', name: "TESAS", description: "Teater & Sastra", color: "purple", image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop" },
    { id: 'kds', name: "KDS", description: "Kesenian Daerah Sunda", color: "orange", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop" },
    { id: 'psm', name: "PSM", description: "Paduan Suara & Musik", color: "blue", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop" },
    { id: 'tari', name: "TAKRE", description: "Tari Kreasi", color: "pink", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop" },
    { id: 'fg', name: "FG", description: "Fotografi & Fun Games", color: "indigo", image: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?q=80&w=2072&auto=format&fit=crop" },
];

export default function RegistrationsPage() {
    return (
        <Section>
            <Container>
                <div className="max-w-3xl">
                    <h1 className="text-display-sm font-semibold text-primary md:text-display-md">Pilih Kategori Event</h1>
                    <p className="mt-4 text-lg text-tertiary">
                        Silakan pilih unit kesenian yang ingin Anda ikuti untuk memulai proses pendaftaran-mu di LAP 2.0.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {units.map((unit) => (
                        <div key={unit.id} className="group overflow-hidden rounded-2xl border border-secondary bg-primary shadow-sm hover:border-purple-300 transition-all">
                            <div className="aspect-[16/9] overflow-hidden">
                                <img
                                    src={unit.image}
                                    alt={unit.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-primary">{unit.name}</h3>
                                <p className="mt-1 text-tertiary">{unit.description}</p>
                                <Button className="mt-6 w-full" color="secondary" iconTrailing={ArrowRight} href={`/${unit.id}`}>
                                    Daftar {unit.name}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
