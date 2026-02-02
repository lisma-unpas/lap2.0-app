import RegistrationForm from "./registration-form";
import { notFound } from "next/navigation";
import { UNIT_CONFIG } from "@/constants/units";
import { checkUnitAvailability, getUnitAvailability } from "@/actions/admin";
import { AlertCircle } from "@untitledui/icons";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Button } from "@/components/base/buttons/button";
import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";

interface PageProps {
    params: Promise<{ unit: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { unit } = await params;
    const config = UNIT_CONFIG[unit.toLowerCase()];
    return openSharedMetadata(`Daftar ${config?.name || "Unit"}`);
}

export default async function Page({ params }: PageProps) {
    const { unit } = await params;
    const unitKey = unit.toLowerCase();
    const config = UNIT_CONFIG[unitKey];

    if (!config) {
        notFound();
    }

    const availabilityRes = await getUnitAvailability(unitKey);
    const today = new Date();
    const startDate = availabilityRes.startDate ? new Date(availabilityRes.startDate) : null;
    const endDate = availabilityRes.endDate ? new Date(availabilityRes.endDate) : null;

    // Format dates for display
    const formatDateTime = (date: Date) => {
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(/\./g, ':');
    };

    // 1. Coming Soon Logic
    if (startDate && today < startDate) {
        return (
            <Section className="py-24 bg-primary min-h-[60vh] flex items-center">
                <Container>
                    <div className="max-w-md mx-auto text-center">
                        <div className="mx-auto w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="size-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary uppercase tracking-tight">Coming Soon</h1>
                        <p className="mt-4 text-tertiary">
                            Pendaftaran untuk unit <strong>{config.name}</strong> belum dibuka.<br />
                            Silakan kembali lagi pada tanggal <strong>{formatDateTime(startDate)}</strong> WIB.
                        </p>
                        <Button href={`/${unitKey}`} className="mt-8" color="secondary">
                            Lihat Detail Unit
                        </Button>
                    </div>
                </Container>
            </Section>
        );
    }

    // 2. Registration Closed (Time Limit) Logic
    if (endDate && today > endDate) {
        return (
            <Section className="py-24 bg-primary min-h-[60vh] flex items-center">
                <Container>
                    <div className="max-w-md mx-auto text-center">
                        <div className="mx-auto w-16 h-16 bg-error-50 text-error-600 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="size-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Pendaftaran Ditutup</h1>
                        <p className="mt-4 text-tertiary">
                            Terima kasih atas antusiasme Anda! Pendaftaran untuk unit <strong>{config.name}</strong> telah ditutup pada tanggal <strong>{formatDateTime(endDate)}</strong> WIB.<br /><br />
                            Tetap pantau informasi terbaru dari kami. Sampai jumpa di Lisma Art Parade 2.0!
                        </p>
                        <Button href="/#units" className="mt-8" color="secondary">
                            Lihat Unit Lain
                        </Button>
                    </div>
                </Container>
            </Section>
        );
    }

    const isAnyAvailable = availabilityRes.success &&
        (Object.keys(availabilityRes.data).length === 0 ||
            Object.values(availabilityRes.data).some((a: any) => a.available));

    if (!isAnyAvailable) {
        // Find the lowest limit or some representative limit to show
        const maxLimit = Object.values(availabilityRes.data).reduce((acc: number, curr: any) => acc + (curr.limit || 0), 0);

        return (
            <Section className="py-24 bg-primary min-h-[60vh] flex items-center">
                <Container>
                    <div className="max-w-md mx-auto text-center">
                        <div className="mx-auto w-16 h-16 bg-error-50 text-error-600 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="size-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Pendaftaran Ditutup</h1>
                        <p className="mt-4 text-tertiary">
                            Mohon maaf, kuota pendaftaran untuk unit <strong>{config.name}</strong> telah mencapai batas maksimal ({maxLimit || (availabilityRes.data as any)?.TOTAL?.limit || 'Batas Kuota'}).
                        </p>
                        <Button href="/#units" className="mt-8" color="secondary">
                            Lihat Unit Lain
                        </Button>
                    </div>
                </Container>
            </Section>
        );
    }

    // Prepare subEvents from UNIT_CONFIG
    let subEvents: any[] = [];
    if (config.subEventConfigs) {
        subEvents = Object.keys(config.subEventConfigs).map(name => ({
            id: name,
            name: name,
            price: config.subEventConfigs[name].price
        }));
    } else {
        // For units like TESAS that use form fields for pricing
        subEvents = [{ id: 'default', name: config.name, price: config.fixedPrice || 0 }];
    }

    return <RegistrationForm unit={unit} subEvents={subEvents} />;
}
