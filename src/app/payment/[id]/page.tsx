import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";
import { UNIT_CONFIG } from "@/constants/units";

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function PaymentPage({ params }: PageProps) {
    const { id } = await params;

    let registration = null;
    try {
        registration = await prisma.registration.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Database error during payment page fetch:", error);
    }

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
