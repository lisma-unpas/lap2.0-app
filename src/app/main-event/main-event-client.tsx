"use client";

import { Calendar, MarkerPin01, Star01, Ticket01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import FloatingWhatsApp from "@/components/shared/floating-whatsapp";
import { UNIT_CONFIG } from "@/constants/units";
import { BadgeWithIcon } from "@/components/base/badges/badges";

export default function MainEventClient() {
    const activities = [
        "Penampilan garapan unit",
        "Special performance Guest Star",
        "Open Canvas",
        "Open Stage monolog & puisi",
        "Pameran karya seni",
        "Photobox dan instalasi interaktif",
        "Games seru dan mini talkshow"
    ];

    const config = UNIT_CONFIG["main-event"];

    return (
        <>
            <Section className="bg-primary">
                <Container>
                    <div className="flex flex-col items-center text-center">
                        <BadgeWithIcon type="pill-color" color="brand" size="md" iconLeading={Star01}>
                            Puncak Rangkaian LAP 2.0
                        </BadgeWithIcon>
                        <h1 className="mt-6 text-display-md font-semibold text-primary md:text-display-lg uppercase tracking-tight">Main Event</h1>
                        <p className="mt-6 max-w-3xl text-lg text-tertiary leading-relaxed">
                            Inilah puncak dari seluruh rangkaian LISMA Art Parade 2.0!
                            Main Event menjadi momen utama yang mempertemukan seluruh karya,
                            pertunjukan, dan kolaborasi seni dari unit-unit LISMA dalam satu perayaan
                            yang meriah dan penuh kreativitas.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative rounded-lg overflow-hidden aspect-square lg:aspect-auto lg:h-[600px] border border-secondary shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
                                alt="Main Event Showcase"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <h2 className="text-display-xs font-bold text-primary">Interaktif & Kolaboratif</h2>
                                <p className="text-lg text-tertiary">
                                    Main Event kami menghadirkan pameran karya seni yang dilengkapi
                                    dengan berbagai aktivitas atraktif dan interaktif, memungkinkan
                                    pengunjung untuk menikmati seni tidak hanya sebagai penonton, tetapi
                                    juga sebagai bagian dari pengalaman.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-6 rounded-2xl bg-secondary/30 border border-secondary flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-brand-600">
                                        <Calendar className="size-5" />
                                        <span className="font-bold">Kapan?</span>
                                    </div>
                                    <p className="text-primary font-medium">24 Mei 2026</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-secondary/30 border border-secondary flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-brand-600">
                                        <MarkerPin01 className="size-5" />
                                        <span className="font-bold">Dimana?</span>
                                    </div>
                                    <p className="text-primary font-medium text-sm">Segera Diumumkan!</p>
                                </div>
                            </div>

                            <div className="p-8 rounded-2xl bg-brand-primary/5 border border-brand-secondary/20">
                                <h3 className="text-lg font-bold text-primary mb-4">Rangkaian Kegiatan:</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                    {activities.map((activity, i) => (
                                        <li key={i} className="flex items-start gap-2 text-tertiary text-md">
                                            <div className="mt-1.5 size-1.5 rounded-full bg-brand-500 shrink-0" />
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-md text-tertiary italic">
                                    Rasakan suasana yang hangat, menyenangkan, dan penuh energi—ruang
                                    bertemunya kreativitas, ekspresi, dan apresiasi seni dari berbagai
                                    komunitas.
                                </p>
                                <Button size="xl" color="primary" iconLeading={Ticket01} href="/register/main-event">Dapatkan Tiket Sekarang</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            {config && (
                <FloatingWhatsApp
                    cpName={config.cpName}
                    cpWhatsapp={config.cpWhatsapp}
                    cpDescription={config.cpDescription}
                    unitName="Main Event"
                />
            )}
        </>
    );
}
