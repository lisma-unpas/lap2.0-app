"use client";

import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export function BackButton({ href = "/", className }: { href?: string; className?: string }) {
    return (
        <Button color="link-gray" iconLeading={ArrowLeft} href={href} className={className}>
            Kembali ke Beranda
        </Button>
    );
}
