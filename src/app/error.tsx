"use client";

import { useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import Section from "@/components/shared/section";
import Container from "@/components/shared/container";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Section className="flex-1 flex items-center justify-center py-20">
            <Container>
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-display-sm font-bold text-primary mb-4">Ups, ada kendala!</h2>
                    <p className="text-lg text-tertiary mb-8">Terjadi kesalahan saat memuat halaman ini.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            size="lg"
                            color="primary"
                            onClick={() => reset()}
                        >
                            Coba Lagi
                        </Button>
                        <Button
                            size="lg"
                            color="secondary"
                            href="/"
                        >
                            Kembali ke Beranda
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
