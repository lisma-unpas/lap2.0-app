import RegistrationForm from "./registration-form";
import { notFound } from "next/navigation";
import { UNIT_CONFIG } from "@/constants/units";
import { checkUnitAvailability } from "@/actions/admin";
import { AlertCircle } from "@untitledui/icons";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Button } from "@/components/base/buttons/button";

interface PageProps {
    params: Promise<{ unit: string }>;
}

export default async function Page({ params }: PageProps) {
    const { unit } = await params;
    const unitKey = unit.toLowerCase();
    const config = UNIT_CONFIG[unitKey];

    if (!config) {
        notFound();
    }

    const availability = await checkUnitAvailability(unitKey);

    if (availability.success && !availability.available) {
        return (
            <Section className="py-24 bg-primary min-h-[60vh] flex items-center">
                <Container>
                    <div className="max-w-md mx-auto text-center">
                        <div className="mx-auto w-16 h-16 bg-error-50 text-error-600 rounded-full flex items-center justify-center mb-6">
                            <AlertCircle className="size-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Pendaftaran Ditutup</h1>
                        <p className="mt-4 text-tertiary">
                            Mohon maaf, kuota pendaftaran untuk unit <strong>{config.name}</strong> telah mencapai batas maksimal ({availability.limit}).
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
