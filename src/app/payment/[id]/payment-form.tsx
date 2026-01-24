"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Upload01, CreditCard01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { uploadImage } from "@/actions/upload";
import { uploadPaymentProof } from "@/actions/payment";
import FloatingWhatsApp from "@/components/shared/floating-whatsapp";
import { UNIT_CONFIG } from "@/constants/units";
import { useToast } from "@/context/toast-context";

interface PaymentFormProps {
    registrationId: string;
    fullName: string;
    subEventName: string;
    eventName: string;
    price: number;
}

export default function PaymentForm({ registrationId, fullName, subEventName, eventName, price }: PaymentFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toastSuccess, toastError } = useToast();
    const config = UNIT_CONFIG[eventName.toLowerCase()];

    const handleUpload = async () => {
        if (!file) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const uploadRes = await uploadImage(formData);

            if (uploadRes.success) {
                const saveRes = await uploadPaymentProof(registrationId, uploadRes.url!);
                if (saveRes.success) {
                    setIsSuccess(true);
                    toastSuccess("Berhasil", "Bukti pembayaran berhasil diunggah.");
                } else {
                    toastError("Gagal", "Gagal menyimpan data pembayaran.");
                }
            } else {
                toastError("Gagal", "Gagal mengupload gambar.");
            }
        } catch (error) {
            console.error(error);
            toastError("Kesalahan", "Terjadi kesalahan sistem saat memproses.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <>
                <Section className="flex-1 flex items-center justify-center">
                    <Container>
                        <div className="max-w-md mx-auto text-center p-8 rounded-lg border border-secondary shadow-xl bg-primary">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-600">
                                <CheckCircle className="size-10" />
                            </div>
                            <h2 className="mt-6 text-2xl font-bold text-primary">Bukti Terkirim!</h2>
                            <p className="mt-2 text-tertiary">
                                Terima kasih. Panitia akan memverifikasi pembayaran Anda dalam 1x24 jam.
                            </p>
                            <Button className="mt-8 w-full" color="primary" href="/check-status">
                                Kembali ke Cek Status
                            </Button>
                        </div>
                    </Container>
                </Section>
                {config && (
                    <FloatingWhatsApp
                        cpName={config.cpName}
                        cpWhatsapp={config.cpWhatsapp}
                        cpDescription={config.cpDescription}
                        unitName={eventName}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <Section>
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <Button color="link-gray" iconLeading={ArrowLeft} href="/check-status">
                            Kembali
                        </Button>

                        <div className="mt-8 p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-secondary">
                                    <CreditCard01 className="size-6" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-primary">Instruksi Pembayaran</h2>
                                    <p className="text-sm text-tertiary">{eventName} — {subEventName}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-sm text-tertiary">Total yang harus dibayar:</p>
                                <p className="text-2xl font-bold text-primary">Rp {price.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        <div className="mt-8 text-center border-t border-secondary pt-8">
                            <p className="text-sm font-medium text-tertiary">Silakan scan QRIS di bawah ini:</p>
                            <div className="mt-4 mx-auto w-64 h-64 bg-secondary/20 rounded-2xl border-2 border-dashed border-secondary flex items-center justify-center overflow-hidden">
                                {/* QRIS Placeholder Image */}
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=LAP-2.0-PAYMENT"
                                    alt="QRIS Payment"
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>
                            <p className="mt-4 text-xs text-quaternary italic">*QRIS hanya untuk simulasi testing</p>
                        </div>

                        <div className="mt-10 space-y-4">
                            <label className="block text-sm font-medium text-primary">Upload Bukti Transfer</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-secondary rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        <Upload01 className="w-8 h-8 mb-3 text-tertiary" />
                                        <p className="mb-2 text-sm text-tertiary font-semibold">
                                            {file ? file.name : "Pilih file bukti pembayaran"}
                                        </p>
                                        <p className="text-xs text-tertiary">Format: JPG, PNG (Max 2MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                </label>
                            </div>
                            <Button
                                className="w-full"
                                color="primary"
                                disabled={!file}
                                isLoading={isSubmitting}
                                onClick={handleUpload}
                            >
                                Kirim Bukti Pembayaran
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
            {config && (
                <FloatingWhatsApp
                    cpName={config.cpName}
                    cpWhatsapp={config.cpWhatsapp}
                    cpDescription={config.cpDescription}
                    unitName={eventName}
                />
            )}
        </>
    );
}
