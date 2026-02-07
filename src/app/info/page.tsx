import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
    ...openSharedMetadata("Informasi & Update"),
};
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Badge } from "@/components/base/badges/badges";
import { Calendar, Image01 as ImageIcon } from "@untitledui/icons";
import Link from "next/link";
import Image from "next/image";
import { formatDateTime } from "@/utils/date";
import { Markdown } from "@/components/shared/markdown";
import { InfoEmptyState } from "@/components/application/empty-state/info-empty-state";



export const dynamic = "force-dynamic";

export default async function NewsPage() {
    let infoList: any[] = [];
    try {
        infoList = await prisma.info.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Database error during info fetch:", error);
    }

    return (
        <Section className="py-12 md:py-20">
            <Container>
                <div className="max-w-3xl">
                    <h1 className="text-display-sm font-bold text-primary md:text-display-md">Informasi & Update</h1>
                    <p className="mt-4 text-lg text-tertiary">
                        Dapatkan informasi terbaru, jadwal technical meeting, dan informasi penting seputar LAP 2.0.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {infoList.map((n) => (
                        <Link
                            key={n.id}
                            href={`/info/${(n as any).slug}`}
                            className="group flex flex-col h-full rounded-2xl border border-secondary bg-primary hover:border-brand-solid hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Image Workspace */}
                            <div className="relative aspect-video w-full bg-secondary overflow-hidden">
                                {n.imageUrl ? (
                                    <Image
                                        src={n.imageUrl}
                                        alt={n.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <ImageIcon className="size-10 text-quaternary" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <Badge color="brand" size="sm" className="shadow-lg backdrop-blur-md bg-white/90">{n.category}</Badge>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex items-center gap-1.5 text-xs text-quaternary mb-3">
                                    <Calendar className="size-3.5" />
                                    {formatDateTime(n.createdAt)}
                                </div>

                                <h3 className="text-xl font-bold text-primary group-hover:text-brand-tertiary transition-colors line-clamp-2">
                                    {n.title}
                                </h3>

                                <Markdown
                                    content={n.body}
                                    isTruncated={true}
                                    lineClamp={3}
                                    maxLength={200}
                                    className="mt-3 flex-1 prose-sm"
                                />



                                <div className="mt-6 flex items-center text-sm font-semibold text-brand-secondary group-hover:gap-2 transition-all">
                                    Baca Selengkapnya <span>→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {infoList.length === 0 && (
                    <InfoEmptyState />
                )}
            </Container>
        </Section>
    );
}
