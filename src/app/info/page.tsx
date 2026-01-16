import prisma from "@/lib/prisma";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Badge } from "@/components/base/badges/badges";
import { Calendar } from "@untitledui/icons";

export default async function NewsPage() {
    const news = await prisma.news.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <Section>
            <Container>
                <div className="max-w-3xl">
                    <h1 className="text-display-sm font-semibold text-primary md:text-display-md">Informasi & Update</h1>
                    <p className="mt-4 text-lg text-tertiary">
                        Dapatkan berita terbaru, jadwal technical meeting, dan informasi penting seputar LAP 2.0.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.map((n) => (
                        <div key={n.id} className="group p-6 rounded-2xl border border-secondary bg-primary hover:border-brand-solid transition-all cursor-pointer">
                            <div className="flex items-center gap-2 mb-4">
                                <Badge color="brand" size="sm">{n.category}</Badge>
                                <div className="flex items-center gap-1.5 text-xs text-quaternary">
                                    <Calendar className="size-3.5" />
                                    {n.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-primary group-hover:text-brand-tertiary transition-colors">{n.title}</h3>
                            <p className="mt-3 text-tertiary line-clamp-3 leading-relaxed">
                                {n.body}
                            </p>
                            <div className="mt-6 flex items-center text-sm font-semibold text-brand-secondary">
                                Baca Selengkapnya →
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
