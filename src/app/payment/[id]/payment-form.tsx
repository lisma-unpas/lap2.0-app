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
import { useEffect } from "react";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { LogIn01 } from "@untitledui/icons";
import { Modal as SharedModal } from "@/components/shared/modals/modal/index";

interface PaymentFormProps {
    registrationId: string;
    fullName: string;
    subEventName: string;
    eventName: string;
    price: number;
}

export default function PaymentForm({ registrationId, fullName, subEventName, eventName, price }: PaymentFormProps) {
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<{ file: File, progress: number, status: 'idle' | 'uploading' | 'success' | 'error', error?: string } | null>(null);
    const { isConnected } = useGoogleAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isReAuthModalOpen, setIsReAuthModalOpen] = useState(false);
    const { toastSuccess, toastError } = useToast();
    const config = UNIT_CONFIG[eventName.toLowerCase()];

    const handleFileDrop = async (files: FileList) => {
        if (!isConnected) {
            toastError("Akses Ditolak", "Silakan hubungkan Google Drive terlebih dahulu.");
            window.location.href = "/auth/google/login";
            return;
        }

        const file = files[0];
        if (!file) return;

        setAttachment({ file, progress: 10, status: 'uploading' });

        try {
            const formData = new FormData();
            formData.append("file", file);

            // Simulate some progress since server actions are atomic
            const progressInterval = setInterval(() => {
                setAttachment(prev => {
                    if (!prev || prev.status !== 'uploading') {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return { ...prev, progress: Math.min(prev.progress + 15, 90) };
                });
            }, 300);

            const tokensRaw = typeof window !== "undefined" ? localStorage.getItem("gdrive_tokens") : null;
            const uploadRes = await uploadImage(formData, tokensRaw);
            clearInterval(progressInterval);

            if (uploadRes.success) {
                setAttachment({ file, progress: 100, status: 'success' });
                setUploadedUrl(uploadRes.url!);
                toastSuccess("Berhasil", "File berhasil diunggah ke Google Drive.");
            } else {
                setAttachment({ file, progress: 0, status: 'error', error: uploadRes.message || "Gagal upload" });
                if (uploadRes.error === "AUTH_REQUIRED") {
                    window.location.href = "/auth/google/login";
                } else if (uploadRes.error === "AUTH_INVALID") {
                    setIsReAuthModalOpen(true);
                }
            }
        } catch (error) {
            setAttachment({ file, progress: 0, status: 'error', error: "Kesalahan sistem" });
        }
    };

    const handleFinalSubmit = async () => {
        if (!uploadedUrl) return;
        setIsSubmitting(true);

        try {
            const saveRes = await uploadPaymentProof(registrationId, uploadedUrl);
            if (saveRes.success) {
                setIsSuccess(true);
                toastSuccess("Berhasil", "Bukti pembayaran berhasil disimpan.");
            } else {
                toastError("Gagal", "Gagal menyimpan data ke server.");
            }
        } catch (error) {
            toastError("Kesalahan", "Terjadi kesalahan sistem.");
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

                            <FileUpload.DropZone
                                isConnected={isConnected}
                                accept="image/*"
                                allowsMultiple={false}
                                maxSize={2 * 1024 * 1024}
                                hint="JPG, PNG atau GIF (maks. 2MB)"
                                onDropFiles={handleFileDrop}
                                onSizeLimitExceed={() => toastError("File Terlalu Besar", "Maksimal ukuran file adalah 2MB.")}
                            />

                            {attachment && (
                                <FileUpload.List className="mt-4">
                                    <FileUpload.ListItemProgressBar
                                        name={attachment.file.name}
                                        size={attachment.file.size}
                                        progress={attachment.progress}
                                        failed={attachment.status === 'error'}
                                        error={attachment.error}
                                        type="image"
                                        onDelete={() => {
                                            setAttachment(null);
                                            setUploadedUrl(null);
                                        }}
                                    />
                                </FileUpload.List>
                            )}

                            <Button
                                className="w-full mt-6"
                                color="primary"
                                disabled={!uploadedUrl || isSubmitting}
                                isLoading={isSubmitting}
                                onClick={handleFinalSubmit}
                            >
                                Konfirmasi Pembayaran
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

            <SharedModal
                isOpen={isReAuthModalOpen}
                onOpenChange={setIsReAuthModalOpen}
                title="Sesi Google Drive Berakhir"
                description="Sesi Anda telah berakhir atau kredensial tidak valid. Silakan login kembali untuk melanjutkan upload bukti pembayaran."
                icon={LogIn01}
                iconColor="brand"
                primaryAction={{
                    label: "Login Kembali",
                    onClick: () => {
                        window.open("/auth/google/login", "_blank");
                    }
                }}
                secondaryAction={{
                    label: "Batal",
                    onClick: () => setIsReAuthModalOpen(false)
                }}
            />
        </>
    );
}
