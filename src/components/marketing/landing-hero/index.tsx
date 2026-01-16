"use client";

import { ArrowRight, InfoCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";

export default function LandingHero() {
    return (
        <Section className="bg-primary overflow-hidden">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary bg-brand-primary px-3 py-1 text-sm font-medium text-brand-secondary">
                        <span className="flex h-2 w-2 rounded-full bg-brand-solid animate-pulse" />
                        LISMA ART PARADE 2.0 is Coming
                    </div>

                    <h1 className="mt-6 max-w-4xl text-display-md font-semibold tracking-tight text-primary md:text-display-lg lg:text-display-xl">
                        Selamat Datang di <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">LISMA ART PARADE 2.0</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-tertiary md:text-xl">
                        Ruang ekspresi dan apresiasi nyata bagi pegiat seni. Rangkaian Unit Event kompetitif dan Main Event interaktif menanti Anda.
                    </p>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button size="xl" color="primary" iconTrailing={ArrowRight} href="/registrations">
                            Daftar Sekarang
                        </Button>
                        <Button size="xl" color="secondary" iconLeading={InfoCircle} href="/#about">
                            Tentang LAP 2.0
                        </Button>
                    </div>
                </div>

                <div className="mt-16 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-primary border border-secondary rounded-2xl shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                        <img
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
                            alt="Art Parade Preview"
                            className="w-full h-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white text-lg font-medium">"Setiap karya lahir dari proses panjang dan kolaborasi mendalam."</p>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
