import prisma from "@/lib/prisma";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Badge } from "@/components/base/badges/badges";
import { Calendar } from "@untitledui/icons";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { BackButton } from "@/components/shared/info/back-button";
import { formatDateTime } from "@/utils/date";

import { openSharedMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const info = await prisma.info.findUnique({
        where: { slug }
    });

    if (!info) return openSharedMetadata("Info Tidak Ditemukan");

    return openSharedMetadata(info.title, info.body.substring(0, 160));
}

export const dynamic = "force-dynamic";

export default async function InfoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let info = null;

    try {
        info = await prisma.info.findUnique({
            where: { slug }
        });
    } catch (error) {
        console.error("Database error during info detail fetch:", error);
    }

    if (!info) {
        notFound();
    }

    return (
        <Section className="py-12 md:py-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <BackButton href="/info" label="Kembali ke Informasi" />

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge color="brand" size="md">{info.category}</Badge>
                            <div className="flex items-center gap-1.5 text-sm text-tertiary">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="size-4" />
                                    {formatDateTime(info.createdAt)}
                                </span>
                            </div>
                        </div>

                        <h1 className="text-display-sm md:text-display-md font-bold text-primary leading-tight">
                            {info.title}
                        </h1>

                        {info.imageUrl && (
                            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-secondary shadow-2xl my-4">
                                <Image
                                    src={info.imageUrl}
                                    alt={info.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none mt-4">
                            <div className="text-lg text-primary leading-relaxed whitespace-pre-wrap">
                                {info.body}
                            </div>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-16 p-8 rounded-3xl bg-secondary_alt border border-secondary">
                        <h4 className="font-bold text-primary mb-2">Punya pertanyaan seputar informasi ini?</h4>
                        <p className="text-tertiary mb-6">Hubungi admin kami melalui tombol WhatsApp di bawah ini untuk bantuan lebih lanjut.</p>
                        <Button color="primary" href="https://wa.me/6281234567890" target="_blank">
                            Hubungi Admin
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
