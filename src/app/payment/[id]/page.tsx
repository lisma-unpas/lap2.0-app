import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";
import { UNIT_CONFIG } from "@/constants/units";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PaymentPage({ params }: PageProps) {
    const { id } = await params;

    const registration = await prisma.registration.findUnique({
        where: { id }
    });

    if (!registration) {
        notFound();
    }

    const config = UNIT_CONFIG[registration.unitId.toLowerCase()] || { name: registration.unitId };

    return (
        <PaymentForm
            registrationId={id}
            fullName={registration.fullName}
            subEventName={registration.subEventName || ""}
            eventName={config.name}
            price={registration.totalPrice}
        />
    );
}
