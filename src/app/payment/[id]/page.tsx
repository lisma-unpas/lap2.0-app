import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentForm from "./payment-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PaymentPage({ params }: PageProps) {
    const { id } = await params;

    const registration = await prisma.registration.findUnique({
        where: { id },
        include: {
            subEvent: {
                include: {
                    event: true
                }
            }
        }
    });

    if (!registration) {
        notFound();
    }

    return (
        <PaymentForm
            registrationId={id}
            fullName={registration.fullName}
            subEventName={registration.subEvent.name}
            eventName={registration.subEvent.event.name}
            price={registration.subEvent.price}
        />
    );
}
