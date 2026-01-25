"use client";

import { useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { Modal } from "@/components/shared/modals/modal";
import { cx } from "@/utils/cx";

interface FloatingWhatsAppProps {
    cpName: string;
    cpWhatsapp: string;
    cpDescription: string;
    unitName: string;
    className?: string;
}

export default function FloatingWhatsApp({ cpName, cpWhatsapp, cpDescription, unitName, className }: FloatingWhatsAppProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cx("fixed bottom-6 right-2 z-50", className)}>
            <AriaButton
                onPress={() => setIsOpen(true)}
                className={({ isPressed }) => cx(
                    "flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 p-0",
                    isPressed && "scale-90"
                )}
            >
                <img src="/icon-wa.webp" alt="WhatsApp Icon" className="size-12 pointer-events-none" />
                <span className="sr-only">Hubungi Panitia {unitName}</span>
            </AriaButton>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                title={`Hubungi Panitia ${unitName}`}
                description="Ada pertanyaan atau kendala? Silakan hubungi penanggung jawab unit untuk bantuan lebih lanjut."
                icon={() => <img src="/icon-wa.webp" alt="WhatsApp" className="size-full object-contain" />}
                iconColor="success"
                iconTheme="outline"
                maxWidth="sm"
                primaryAction={{
                    label: "Hubungi panitia",
                    onClick: () => {
                        window.open(`https://wa.me/${cpWhatsapp}`, "_blank");
                        setIsOpen(false);
                    },
                    color: "primary", // Note: The Modal component might need some custom CSS for the WhatsApp green if desired, but using primary for now
                }}
                secondaryAction={{
                    label: "Mungkin nanti",
                    onClick: () => setIsOpen(false),
                    color: "secondary"
                }}
            >
                <div className="mt-4 w-full rounded-lg bg-secondary/30 p-4 border border-secondary">
                    <p className="text-[10px] font-bold text-fg-quaternary uppercase tracking-widest">Kontak Person</p>
                    <p className="text-md font-bold text-primary mt-1">{cpName}</p>
                    <p className="text-sm text-tertiary mt-1 leading-relaxed">
                        {cpDescription}
                    </p>
                </div>
            </Modal>
        </div>
    );
}
