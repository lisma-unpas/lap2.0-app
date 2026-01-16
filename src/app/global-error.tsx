"use client";

import { useEffect } from "react";
import { Button } from "@/components/base/buttons/button";

export default function GlobalError({
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
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
                    <h2 className="text-display-sm font-bold text-primary mb-4">Terjadi Kesalahan Fatal</h2>
                    <p className="text-lg text-tertiary mb-8">Maaf, terjadi kesalahan sistem yang tidak terduga.</p>
                    <Button
                        size="lg"
                        color="primary"
                        onClick={() => reset()}
                    >
                        Coba Lagi
                    </Button>
                </div>
            </body>
        </html>
    );
}
