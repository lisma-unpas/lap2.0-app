"use client";

import { Calendar, MarkerPin01, Star01, Ticket01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { motion } from "motion/react";
import { BadgeWithIcon } from "@/components/base/badges/badges";

export default function MainEventHighlight() {
    return (
        <Section className="bg-primary pt-0 pb-16 lg:pb-24">
            <Container>
                <div className="relative group overflow-hidden rounded-lg md:rounded-[2rem] border border-secondary shadow-2xl bg-white dark:bg-gray-900/50">
                    {/* Background with dynamic gradient & pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-orange-50/50 dark:from-purple-900/10 dark:via-transparent dark:to-orange-900/10 opacity-50" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-secondary">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
                                alt="Main Event Highlight"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                            <div className="absolute top-6 left-6">
                                <BadgeWithIcon 
                                    type="pill-color" 
                                    color="brand" 
                                    size="md" 
                                    iconLeading={Star01}
                                    className="backdrop-blur-sm shadow-lg border border-white/20 dark:border-white/10"
                                >
                                    MAIN EVENT
                                </BadgeWithIcon>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 lg:p-16 flex flex-col justify-center gap-8 bg-white/40 dark:bg-black/20 backdrop-blur-xl">
                            <div className="flex flex-col gap-4">
                                <h2 className="text-display-sm font-black text-primary tracking-tight uppercase leading-none">
                                    Puncak <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-purple-500 dark:from-brand-400 dark:via-brand-300 dark:to-purple-400">
                                        <span className="hidden sm:inline">LISMA Art Parade 2.0</span>
                                        <span className="sm:hidden">LAP 2.0</span>
                                    </span>
                                </h2>
                                <p className="text-lg text-tertiary leading-relaxed">
                                    Momen spektakuler yang mempertemukan seluruh energi kreatif unit kesenian LISMA.
                                    Saksikan penampilan bintang tamu spesial, pameran interaktif, dan kolaborasi seni yang tak terlupakan.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-brand-primary dark:bg-brand-900/30 text-brand-secondary">
                                        <Calendar className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">Tanggal</p>
                                        <p className="text-primary font-bold">24 Mei 2026</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-brand-primary dark:bg-brand-900/30 text-brand-secondary">
                                        <MarkerPin01 className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-tertiary uppercase tracking-wider">Lokasi</p>
                                        <p className="text-primary font-bold">Bandung, Jawa Barat</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="xl" color="primary" iconLeading={Ticket01} href="/register/main-event" className="flex-1 shadow-brand-600/20 shadow-lg">
                                    <span className="hidden sm:inline">Dapatkan Tiket Sekarang</span>
                                    <span className="sm:hidden">Dapatkan Tiket</span>
                                </Button>
                                <Button size="xl" color="secondary" href="/main-event" className="flex-1">
                                    <span className="hidden sm:inline">Lihat Detail Acara</span>
                                    <span className="sm:hidden">Detail Acara</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
