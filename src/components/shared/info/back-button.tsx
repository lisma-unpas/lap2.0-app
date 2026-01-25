"use client";

import { Button } from "@/components/base/buttons/button";
import { ArrowLeft } from "@untitledui/icons";

export function BackButton({ href, label }: { href: string; label: string }) {
    return (
        <Button
            href={href}
            color="secondary"
            size="sm"
            iconLeading={ArrowLeft}
            className="mb-8"
        >
            {label}
        </Button>
    );
}
