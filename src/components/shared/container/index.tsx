import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={twMerge("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
            {children}
        </div>
    );
}
