import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={twMerge("py-12", className)}>
            {children}
        </section>
    );
}
