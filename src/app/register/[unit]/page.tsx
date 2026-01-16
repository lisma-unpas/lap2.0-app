import prisma from "@/lib/prisma";
import RegistrationForm from "./registration-form";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ unit: string }>;
}

export default async function Page({ params }: PageProps) {
    const { unit } = await params;
    
    // Convert unit parameter to event name (TESAS, KDS, etc.)
    const eventName = unit.toUpperCase();
    
    const event = await prisma.event.findUnique({
        where: { name: eventName },
        include: {
            subEvents: true
        }
    });

    if (!event) {
        notFound();
    }

    const subEvents = event.subEvents.map((se: any) => ({
        id: se.id,
        name: se.name,
        price: se.price
    }));

    return <RegistrationForm unit={unit} subEvents={subEvents} />;
}
