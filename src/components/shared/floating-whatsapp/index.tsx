"use client";

import { useState } from "react";
import { MessageCircle02 } from "@untitledui/icons";
import { Button as AriaButton } from "react-aria-components";
import { Modal } from "@/components/shared/modals/modal";
import { cx } from "@/utils/cx";

interface FloatingWhatsAppProps {
    cpName: string;
    cpWhatsapp: string;
    cpDescription: string;
    unitName: string;
}

export default function FloatingWhatsApp({ cpName, cpWhatsapp, cpDescription, unitName }: FloatingWhatsAppProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AriaButton
                onPress={() => setIsOpen(true)}
                className={({ isHovered, isPressed }) => cx(
                    "flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95",
                    isHovered && "bg-[#20ba5a]",
                    isPressed && "scale-90"
                )}
            >
                <MessageCircle02 className="size-8" />
                <span className="sr-only">Hubungi Panitia {unitName}</span>
            </AriaButton>

            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                title={`Hubungi Panitia ${unitName}`}
                description="Ada pertanyaan atau kendala? Silakan hubungi penanggung jawab unit untuk bantuan lebih lanjut."
                icon={MessageCircle02}
                iconColor="success"
                iconTheme="light"
                maxWidth="sm"
                primaryAction={{
                    label: "Lanjut ke WhatsApp",
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
                <div className="mt-4 w-full rounded-xl bg-secondary/30 p-4 border border-secondary">
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
