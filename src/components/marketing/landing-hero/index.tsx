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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-purple-500">LISMA ART PARADE 2.0</span>
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


            </Container>
        </Section>
    );
}
