"use client";

import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { cx } from "@/utils/cx";

export default function AboutSection({ className }: { className?: string }) {
    return (
        <Section className={cx("bg-primary", className)} id="about">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">
                            Tentang <span className="text-brand-500">LAP 2.0</span>
                        </h2>
                        <div className="flex flex-col gap-4 text-lg text-tertiary text-justify leading-relaxed">
                            <p>
                                <span className="italic">LISMA ART PARADE 2.0 (LAP 2.0)</span> Lingkung
                                Seni Mahasiswa Universitas Pasundan (LISMA UNPAS) merupakan wadah bagi
                                mahasiswa aktif yang berdedikasi terhadap pelestarian budaya dan
                                pengembangan seni kreatif. Kami menyadari bahwa sebuah karya seni yang
                                indah tidak lahir secara instan, melainkan melalui proses panjang,
                                latihan yang tekun, dan semangat kolaborasi yang mendalam.
                            </p>
                            <p>
                                Oleh karena itu, kami menghadirkan &quot;LISMA ART PARADE 2.0&quot; sebagai
                                ruang ekspresi dan apresiasi nyata. Melalui rangkaian Unit Event yang
                                kompetitif dan Main Event yang interaktif, kami merayakan proses kreatif
                                di balik setiap karya seni.
                            </p>
                            <div className="mt-4">
                                <a
                                    href="https://www.lisma-unpas.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-semibold text-brand-500 hover:text-brand-600 underline decoration-brand-300 underline-offset-4"
                                >
                                    Pelajari selengkapnya tentang LISMA UNPAS →
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden">
                        <img
                            src="/logo.png"
                            alt="LISMA Culture"
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 mix-blend-multiply"></div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
