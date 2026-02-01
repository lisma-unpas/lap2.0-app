"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, PanInfo } from "motion/react";
import { ArrowLeft, CreditCard01, Trash01, CheckCircle, Upload01, ShoppingCart01, Copy07, ChevronUp, ChevronDown, QrCode01, Check } from "@untitledui/icons";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Button } from "@/components/base/buttons/button";
import { Label } from "@/components/base/input/label";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { useCart } from "@/context/cart-context";
import { PAYMENT_INFO, UNIT_CONFIG } from "@/constants/units";
import { MessageCircle02 } from "@untitledui/icons";
import { uploadImage } from "@/actions/upload";
import { submitBulkRegistration } from "@/actions/registration";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { LogIn01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { useClipboard } from "@/hooks/use-clipboard";
import { compressImage } from "@/utils/image-converter";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { DialogTrigger, Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Modal as SharedModal } from "@/components/shared/modals/modal/index";
import { Input } from "@/components/base/input/input";
import { CloseButton } from "@/components/base/buttons/close-button";
import { useToast } from "@/context/toast-context";

// --- Sub-components to prevent re-rendering the whole page on typing ---

interface EmailModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    currentEmail: string;
    onEmailChange: (email: string) => void;
    onConfirm: (email: string) => void;
    isSubmitting: boolean;
    userIdentity: any;
}

const EmailConfirmationModal = ({
    isOpen,
    onOpenChange,
    currentEmail,
    onEmailChange,
    onConfirm,
    isSubmitting,
    agreedToTerms,
    onAgreedToTermsChange
}: EmailModalProps & { agreedToTerms: boolean; onAgreedToTermsChange: (value: boolean) => void }) => {
    return (
        <SharedModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Konfirmasi Email"
            description="Masukkan email untuk menerima notifikasi pendaftaran & bukti pembayaran."
            icon={ShoppingCart01}
            iconColor="brand"
            primaryAction={{
                label: "Konfirmasi & Bayar",
                onClick: () => onConfirm(currentEmail),
                isLoading: isSubmitting,
                isDisabled: !agreedToTerms
            }}
            secondaryAction={{
                label: "Batal",
                onClick: () => onOpenChange(false)
            }}
        >
            <div className="space-y-3">
                <div>
                    <Label isRequired className="mb-1.5">Email Notifikasi</Label>
                    <Input
                        type="email"
                        placeholder="contoh@email.com"
                        value={currentEmail}
                        onChange={(val) => onEmailChange(val)}
                        autoFocus
                    />
                </div>

                <Checkbox
                    size="md"
                    isSelected={agreedToTerms}
                    onChange={onAgreedToTermsChange}
                    label={
                        <span className="text-xs text-tertiary">
                            Saya setuju dengan{" "}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline font-medium" onClick={(e) => e.stopPropagation()}>
                                Kebijakan Privasi
                            </a>
                            {" "}dan{" "}
                            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline font-medium" onClick={(e) => e.stopPropagation()}>
                                Syarat & Ketentuan
                            </a>
                        </span>
                    }
                />
            </div>
        </SharedModal>
    );
};


export default function CheckoutClient() {
    const { items, removeFromCart, clearCart, userIdentity, updateUserIdentity } = useCart();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<{ file: File, progress: number, status: 'idle' | 'uploading' | 'success' | 'error', error?: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [confirmationEmail, setConfirmationEmail] = useState("");
    const [successfullyGeneratedCode, setSuccessfullyGeneratedCode] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [lastCheckoutInfo, setLastCheckoutInfo] = useState<{
        items: typeof items;
        url: string | null;
        code: string | null;
        email: string;
    } | null>(null);
    const { toastSuccess, toastError } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initialize selection with all items
    useEffect(() => {
        if (items.length > 0 && selectedIds.length === 0) {
            setSelectedIds(items.map(i => i.id));
        }
    }, [items]);

    const selectedItems = useMemo(() =>
        items.filter(item => selectedIds.includes(item.id)),
        [items, selectedIds]
    );

    const selectedTotalPrice = useMemo(() =>
        selectedItems.reduce((acc, item) => acc + item.price, 0),
        [selectedItems]
    );

    const { copy, copied } = useClipboard();
    const isDesktopValue = useBreakpoint("lg");
    // Ensure we have a strictly boolean value after mount
    const isDesktop = isMounted ? !!isDesktopValue : false;

    const toggleItem = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(items.map(i => i.id));
        }
    };

    const { user, isConnected } = useGoogleAuth();

    useEffect(() => {
        if (user?.email && !confirmationEmail) {
            setConfirmationEmail(user.email);
        }
    }, [user?.email, confirmationEmail]);

    const handleFileDrop = async (files: FileList) => {
        if (!isConnected) {
            toastError("Akses Ditolak", "Silakan hubungkan Google Drive terlebih dahulu.");
            window.location.href = "/auth/google/login";
            return;
        }

        const file = files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toastError("Format File Tidak Valid", "Hanya diperbolehkan mengunggah file gambar (JPG, PNG, GIF).");
            return;
        }

        const compressedFile = await compressImage(file);
        setAttachment({ file: compressedFile, progress: 10, status: 'uploading' });

        try {
            const formData = new FormData();
            formData.append("file", compressedFile);

            const progressInterval = setInterval(() => {
                setAttachment(prev => {
                    if (!prev || prev.status !== 'uploading') {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return { ...prev, progress: Math.min(prev.progress + 15, 90) };
                });
            }, 300);

            const tokens = localStorage.getItem("gdrive_tokens");
            const uploadRes = await uploadImage(formData, tokens);
            clearInterval(progressInterval);

            if (uploadRes.success) {
                setAttachment({ file: compressedFile, progress: 100, status: 'success' });
                setUploadedUrl(uploadRes.url!);
                toastSuccess("Berhasil", "File bukti pembayaran berhasil diunggah.");
            } else {
                setAttachment({ file: compressedFile, progress: 0, status: 'error', error: uploadRes.message || "Gagal upload" });
                if (uploadRes.error === "AUTH_REQUIRED") {
                    window.location.href = "/auth/google/login";
                }
            }
        } catch (error) {
            setAttachment({ file: compressedFile, progress: 0, status: 'error', error: "Kesalahan sistem" });
        }
    };

    const handleCheckout = async (userEmail?: string) => {
        setIsSubmitting(true);

        try {
            const res = await submitBulkRegistration(selectedItems, uploadedUrl || "", userEmail);
            if (res.success) {
                // Save code to local storage history
                if (typeof window !== 'undefined' && (res as any).registrationCode) {
                    const code = (res as any).registrationCode;
                    const existing = JSON.parse(localStorage.getItem('lisma_registrations') || '[]');
                    if (!existing.some((r: any) => r.code === code)) {
                        const newEntry = {
                            code,
                            unit: selectedItems.map(i => i.unitName).join(", "),
                            date: new Date().toISOString()
                        };
                        localStorage.setItem('lisma_registrations', JSON.stringify([newEntry, ...existing].slice(0, 10)));
                    }
                }

                setSuccessfullyGeneratedCode((res as any).registrationCode || null);
                setLastCheckoutInfo({
                    items: [...selectedItems],
                    url: uploadedUrl,
                    code: (res as any).registrationCode || null,
                    email: userEmail || confirmationEmail
                });
                setIsSuccess(true);
                clearCart();
                toastSuccess("Berhasil", "Pendaftaran berhasil!");
            } else {
                toastError("Gagal", res.error || "Gagal memproses pendaftaran.");
            }
        } catch (err: any) {
            console.error("[Checkout] Error:", err);
            toastError("Kesalahan Sistem", err.message || "Unknown error occurred during checkout");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isNotFreePayment = selectedTotalPrice;

    if (isSuccess) {
        return (
            <Section className="flex-1 flex items-center justify-center min-h-[60vh]">
                <Container>
                    <div className="max-w-md mx-auto text-center p-8 rounded-lg border border-secondary shadow-xl bg-primary">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
                            <CheckCircle className="size-10" />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-primary">Pendaftaran Terkirim!</h2>
                        <p className="mt-2 text-tertiary">
                            Terima kasih! Panitia akan memverifikasi pendaftaranmu dalam 1x24 jam. Kamu bisa mengecek status secara berkala menggunakan kode di bawah ini.
                        </p>

                        {successfullyGeneratedCode && (
                            <div className="mt-6 p-4 rounded-2xl bg-brand-primary/5 border border-brand-solid/20">
                                <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">Kode Pendaftaran Anda</p>
                                <div className="flex items-center justify-center gap-3 mt-1">
                                    <p className="text-xl font-mono font-bold text-primary tracking-wider">{successfullyGeneratedCode}</p>
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        className="h-8 w-8 p-0"
                                        onClick={() => copy(successfullyGeneratedCode)}
                                    >
                                        {copied ? <CheckCircle className="size-4 text-success-600" /> : <Copy07 className="size-4" />}
                                    </Button>
                                </div>
                                <p className="text-[10px] text-tertiary mt-2">Simpan kode ini untuk mengecek status pendaftaran.</p>
                            </div>
                        )}

                        {successfullyGeneratedCode && lastCheckoutInfo && (
                            <div className="mt-4 space-y-3">
                                <p className="text-xs text-tertiary">Untuk mempercepat verifikasi, silakan kirim bukti bayar ke WhatsApp Panitia:</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {Array.from(new Set(lastCheckoutInfo.items.map(i => i.unitId))).map(unitId => {
                                        const config = UNIT_CONFIG[unitId];
                                        if (!config?.cpWhatsapp) return null;

                                        const unitItems = lastCheckoutInfo.items.filter(i => i.unitId === unitId);
                                        const totalPerUnit = unitItems.reduce((acc, i) => acc + i.price, 0);

                                        const message = `Halo ${config.cpName || 'Panitia'},\n\nSaya ingin konfirmasi pembayaran untuk pendaftaran LISMA Art Parade 2.0.\n\n*Detail Pendaftaran:*\n- Kode: ${lastCheckoutInfo.code}\n- Nama: ${userIdentity?.fullName || '-'}\n- Email: ${lastCheckoutInfo.email}\n- Item: ${unitItems.map(i => `${i.unitName}${i.subEventName ? ` (${i.subEventName})` : ''}`).join(', ')}\n- Total: Rp ${totalPerUnit.toLocaleString('id-ID')}\n\n*Bukti Pembayaran:*\n${lastCheckoutInfo.url}\n\nMohon untuk segera diverifikasi. Terima kasih!`;

                                        const waUrl = `https://wa.me/${config.cpWhatsapp}?text=${encodeURIComponent(message)}`;

                                        return (
                                            <Button
                                                key={unitId}
                                                color="secondary"
                                                iconLeading={<img src="/icon-wa.webp" alt="" className="size-6" />}
                                                onClick={() => window.open(waUrl, '_blank')}
                                            >
                                                Konfirmasi {config.name}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 mt-8">
                            <Button className="w-full" color="primary" href="/check-status" size="lg">
                                Cek Status Pendaftaran
                            </Button>
                            <Button className="w-full" color="secondary" href="/" size="lg">
                                Kembali ke Beranda
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        );
    }

    if (items.length === 0) {
        return (
            <Section className="flex-1 flex items-center justify-center">
                <Container>
                    <div className="text-center py-20">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary_alt text-tertiary mb-6">
                            <ShoppingCart01 className="size-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-primary">Keranjangmu Kosong</h2>
                        <p className="mt-2 text-tertiary">Kamu belum menambahkan pendaftaran apapun.</p>
                        <Button className="mt-8" color="primary" href="/#units" size="lg">Lihat Unit & Lomba</Button>
                    </div>
                </Container>
            </Section>
        )
    }

    const renderPaymentCard = () => (
        <div className="space-y-4">
            {/* Total Price Card inside Payment Section */}
            <div className="p-4 rounded-lg bg-brand-primary/5 border border-secondary flex items-center justify-between shadow-xs">
                <div>
                    <span className="text-sm font-semibold text-secondary">Total Pembayaran</span>
                    <p className="text-[10px] text-tertiary">{selectedItems.length} item dipilih</p>
                </div>
                <span className="text-xl font-bold text-brand-secondary font-mono tabular-nums">Rp {selectedTotalPrice.toLocaleString('id-ID')}</span>
            </div>
            {isNotFreePayment ? (
                <div className="grid grid-cols-1 gap-3">
                    <div className="p-3.5 rounded-lg bg-primary border border-secondary shadow-xs flex items-center justify-between">
                        <div>
                            <Label className="text-[10px] uppercase tracking-widest mb-0.5 text-tertiary">Pembayaran via {PAYMENT_INFO.bank}</Label>
                            <p className="text-lg font-bold text-primary font-mono tracking-tighter">{PAYMENT_INFO.accountNumber}</p>
                            <p className="text-xs font-medium text-tertiary mt-0.5">a.n {PAYMENT_INFO.accountName}</p>
                        </div>
                        <Button
                            size="sm"
                            color="secondary"
                            className="shrink-0 ml-2 h-9 w-9 p-0"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                copy(PAYMENT_INFO.accountNumber);
                            }}
                        >
                            {copied ? <CheckCircle className="size-4.5 text-success-600" /> : <Copy07 className="size-4.5" />}
                        </Button>
                    </div>
                </div>
            ) : null}

            {isNotFreePayment ? (
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-100 flex gap-3">
                    <div className="shrink-0 text-orange-600">
                        <CreditCard01 className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-orange-900">Kebijakan Non-Refundable</p>
                        <p className="text-[10px] text-orange-700 leading-normal">
                            Setelah melakukan transfer dan mendaftar, biaya pendaftaran tidak dapat dikembalikan (non-refundable) dengan alasan apapun.
                        </p>
                    </div>
                </div>
            ) : null}
            {isNotFreePayment ? (
                <Button
                    color="secondary"
                    size="lg"
                    className="w-full gap-2 border-secondary"
                    iconLeading={QrCode01}
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        setIsQrModalOpen(true);
                    }}
                >
                    Scan QRIS
                </Button>
            ) : null}

            <div className="space-y-4 pt-4 border-t border-secondary">
                {isNotFreePayment ? (
                    <div className="space-y-1.5">
                        <Label isRequired className="text-[11px] uppercase tracking-wider font-bold">Upload Bukti Transfer</Label>
                        <FileUpload.DropZone
                            isConnected={isConnected}
                            accept="image/*"
                            allowsMultiple={false}
                            maxSize={5 * 1024 * 1024}
                            hint="Maks. 5MB"
                            onDropFiles={handleFileDrop}
                            className="py-6"
                        />

                        {attachment && (
                            <FileUpload.List className="mt-2">
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
                    </div>
                ) : null}

                <Button
                    size="lg"
                    color="primary"
                    className="w-full shadow-lg h-12"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        setIsEmailModalOpen(true);
                    }}
                    isLoading={isSubmitting}
                    isDisabled={(isNotFreePayment && !uploadedUrl) || selectedItems.length === 0}
                >
                    {isNotFreePayment ? "Konfirmasi Pembayaran" : "Daftar Sekarang"}
                </Button>
            </div>
        </div>
    );

    if (!isMounted) return <div className="min-h-screen bg-primary" />;

    return (
        <Section className="py-12 pb-32 lg:pb-12">
            <Container>
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: Cart Items */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h1 className="mt-2 text-display-xs font-bold text-primary">Ringkasan Pendaftaran</h1>
                            <Checkbox
                                size="md"
                                isSelected={selectedIds.length === items.length}
                                isIndeterminate={selectedIds.length > 0 && selectedIds.length < items.length}
                                onChange={toggleAll}
                                label={<span className="text-xs font-bold uppercase tracking-wider">Pilih Semua</span>}
                            />
                        </div>

                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className={cx(
                                        "p-4 rounded-2xl border transition-all flex items-center gap-4 bg-primary shadow-xs group",
                                        selectedIds.includes(item.id) ? "border-secondary ring-1 ring-brand-secondary/10" : "border-secondary grayscale opacity-80"
                                    )}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <Checkbox
                                        size="md"
                                        isSelected={selectedIds.includes(item.id)}
                                        onChange={() => toggleItem(item.id)}
                                    />
                                    <div className="flex-1 text-left cursor-pointer">
                                        <p className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">{item.unitName}</p>
                                        <h3 className="text-md font-bold text-primary mt-0.5">{item.subEventName || "Pendaftaran"}</h3>
                                        <p className="text-sm text-tertiary mt-0.5 font-mono">Rp {item.price.toLocaleString('id-ID')}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromCart(item.id);
                                        }}
                                        className="p-2 text-fg-quaternary hover:text-error-600 hover:bg-error-50 rounded-lg transition-all"
                                    >
                                        <Trash01 className="size-4.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Payment Card (Desktop) */}
                    {isMounted && isDesktop && (
                        <div className="lg:col-span-2 space-y-5 bg-secondary_alt p-6 rounded-lg border border-secondary h-fit shadow-xs relative">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-brand-solid text-white shadow-sm">
                                    <CreditCard01 className="size-5" />
                                </div>
                                <h2 className="text-lg font-bold text-primary">Pembayaran</h2>
                            </div>
                            {renderPaymentCard()}
                        </div>
                    )}
                </div>
            </Container>

            {/* Mobile Floating Payment Bar */}
            {isMounted && !isDesktop && (
                <motion.div
                    key="mobile-payment-bar"
                    initial={{ y: "100%" }}
                    animate={{
                        y: isMobileCollapsed ? "calc(100% - 80px)" : 0,
                        borderTopLeftRadius: isMobileCollapsed ? 0 : 32,
                        borderTopRightRadius: isMobileCollapsed ? 0 : 32
                    }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                    drag={isMobileCollapsed ? false : "y"}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.05}
                    onDragEnd={(_: any, info: PanInfo) => {
                        if (info.offset.y > 100 || info.velocity.y > 500) {
                            setIsMobileCollapsed(true);
                        }
                    }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-secondary shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.15)] px-4 pb-safe h-dvh overflow-hidden"
                    onClick={() => isMobileCollapsed && setIsMobileCollapsed(false)}
                >
                    {/* Handle/Toggle */}
                    <div className="flex flex-col items-center pt-2 pb-1 shrink-0">
                        <div
                            className="w-12 h-1.5 bg-secondary rounded-full mb-4 cursor-pointer"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setIsMobileCollapsed(!isMobileCollapsed);
                            }}
                        />
                        <div className="flex w-full items-center justify-between px-2 pb-2">
                            <div>
                                <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Total Bayar ({selectedItems.length})</p>
                                <p className="text-lg font-bold text-primary">Rp {selectedTotalPrice.toLocaleString('id-ID')}</p>
                            </div>
                            <Button
                                size="sm"
                                color="secondary"
                                className="gap-1.5 h-10 px-4 rounded-lg border-secondary font-bold"
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    setIsMobileCollapsed(!isMobileCollapsed);
                                }}
                                iconTrailing={<ChevronDown className={cx("transition-transform duration-300", isMobileCollapsed ? "-rotate-180" : "")} />}
                            >
                                {isMobileCollapsed ? "Bayar" : "Tutup"}
                            </Button>
                        </div>
                    </div>

                    {/* Collapsible Content */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isMobileCollapsed ? 0 : 1,
                            pointerEvents: isMobileCollapsed ? "none" : "auto"
                        }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 pb-32 h-full overflow-y-auto overscroll-contain"
                    >
                        <div className="flex items-center gap-3 mb-6 bg-secondary_alt p-4 rounded-2xl">
                            <div className="p-2 rounded-lg bg-brand-solid text-white">
                                <CreditCard01 className="size-5" />
                            </div>
                            <h2 className="text-lg font-bold text-primary">Detail Pembayaran</h2>
                        </div>
                        {renderPaymentCard()}
                    </motion.div>
                </motion.div>
            )}
            {/* Centralized Modals */}
            <EmailConfirmationModal
                isOpen={isEmailModalOpen}
                onOpenChange={setIsEmailModalOpen}
                currentEmail={confirmationEmail}
                onEmailChange={setConfirmationEmail}
                onConfirm={(email) => {
                    if (!email || !email.includes('@')) {
                        toastError("Input Tidak Valid", "Masukkan email yang valid");
                        return;
                    }
                    if (!agreedToTerms) {
                        toastError("Persetujuan Diperlukan", "Anda harus menyetujui Kebijakan Privasi dan Syarat & Ketentuan terlebih dahulu.");
                        return;
                    }
                    updateUserIdentity({
                        ...userIdentity!,
                        email: email
                    });
                    setIsEmailModalOpen(false);
                    handleCheckout(email);
                }}
                isSubmitting={isSubmitting}
                userIdentity={userIdentity}
                agreedToTerms={agreedToTerms}
                onAgreedToTermsChange={setAgreedToTerms}
            />

            <ModalOverlay isDismissable isOpen={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                <Modal className="max-w-96">
                    <Dialog className="p-0">
                        <div className="relative bg-primary rounded-2xl overflow-hidden p-6 text-center">
                            <CloseButton onClick={() => setIsQrModalOpen(false)} className="absolute top-4 right-4" />
                            <h3 className="text-lg font-bold text-primary mb-4">Scan QRIS</h3>
                            <div className="bg-white p-4 rounded-2xl border border-secondary shadow-md aspect-square flex items-center justify-center">
                                <img src={PAYMENT_INFO.qrUrl} alt="QRIS" className="max-w-full max-h-full object-contain" />
                            </div>
                            <p className="mt-4 text-xs text-tertiary uppercase tracking-widest font-bold">Lisma 2026 Payment</p>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </Section>
    )
}
