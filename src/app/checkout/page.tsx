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
import { PAYMENT_INFO } from "@/constants/units";
import { uploadImage } from "@/actions/upload";
import { submitBulkRegistration } from "@/actions/registration";
import { cx } from "@/utils/cx";
import { useClipboard } from "@/hooks/use-clipboard";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { DialogTrigger, Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";

export default function CheckoutPage() {
    const { items, removeFromCart, clearCart } = useCart();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

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
    const isDesktop = useBreakpoint("lg");

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

    const handleCheckout = async () => {
        if (!file || selectedItems.length === 0) return;
        setIsSubmitting(true);

        try {
            const fd = new FormData();
            fd.append("file", file);
            const uploadRes = await uploadImage(fd);

            if (uploadRes.success) {
                const res = await submitBulkRegistration(selectedItems, uploadRes.url!);
                if (res.success) {
                    setIsSuccess(true);
                    clearCart();
                } else {
                    alert("Gagal memproses pendaftaran.");
                }
            }
        } catch (err) {
            alert("Terjadi kesalahan.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Section className="flex-1 flex items-center justify-center">
                <Container>
                    <div className="max-w-md mx-auto text-center p-8 rounded-3xl border border-secondary shadow-xl bg-primary">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
                            <CheckCircle className="size-10" />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-primary">Pembayaran Terkirim!</h2>
                        <p className="mt-2 text-tertiary">
                            Terima kasih! Panitia akan memverifikasi pendaftaranmu dalam 1x24 jam. Kamu bisa mengecek status secara berkala.
                        </p>
                        <Button className="mt-8 w-full" color="primary" href="/check-status" size="lg">
                            Cek Status Pendaftaran
                        </Button>
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

    const PaymentCardContent = () => (
        <div className="space-y-4">
            {/* Total Price Card inside Payment Section */}
            <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-between shadow-xs">
                <div>
                    <span className="text-sm font-semibold text-secondary">Total Pembayaran</span>
                    <p className="text-[10px] text-tertiary">{selectedItems.length} item dipilih</p>
                </div>
                <span className="text-xl font-bold text-brand-secondary font-mono tabular-nums">Rp {selectedTotalPrice.toLocaleString('id-ID')}</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <div className="p-3.5 rounded-xl bg-primary border border-secondary shadow-xs flex items-center justify-between">
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

            <DialogTrigger isOpen={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                <Button
                    color="secondary"
                    size="lg"
                    className="w-full gap-2 border-secondary"
                    iconLeading={QrCode01}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    Scan QRIS
                </Button>
                <ModalOverlay isDismissable>
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
            </DialogTrigger>

            <div className="space-y-4 pt-4 border-t border-secondary">
                <div className="space-y-1.5">
                    <Label isRequired className="text-[11px] uppercase tracking-wider font-bold">Upload Bukti Transfer</Label>
                    <label
                        className={cx(
                            "flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-all",
                            file ? "border-success-500 bg-success-50" : "border-secondary hover:bg-white bg-primary shadow-xs"
                        )}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center justify-center p-3">
                            <Upload01 className={cx("size-6 mb-1.5", file ? "text-success-600" : "text-tertiary")} />
                            <p className="text-xs font-medium text-secondary text-center truncate w-full px-2 max-w-[180px]">
                                {file ? file.name : "Pilih file bukti bayar"}
                            </p>
                        </div>
                        <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </label>
                </div>
                <Button
                    size="lg"
                    color="primary"
                    className="w-full shadow-lg h-12"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleCheckout();
                    }}
                    isLoading={isSubmitting}
                    isDisabled={!file || selectedItems.length === 0}
                >
                    Konfirmasi Pembayaran
                </Button>
            </div>
        </div>
    );

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
                                        className="p-2 text-fg-quaternary hover:text-error-600 hover:bg-error-50 rounded-xl transition-all"
                                    >
                                        <Trash01 className="size-4.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Payment Card (Desktop) */}
                    <div className="hidden lg:block lg:col-span-2 space-y-5 bg-secondary_alt p-6 rounded-3xl border border-secondary h-fit shadow-xs">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-brand-solid text-white shadow-sm">
                                <CreditCard01 className="size-5" />
                            </div>
                            <h2 className="text-lg font-bold text-primary">Pembayaran</h2>
                        </div>
                        <PaymentCardContent />
                    </div>
                </div>
            </Container>

            {/* Mobile Floating Payment Bar */}
            {!isDesktop && (
                <motion.div
                    initial={false}
                    animate={isMobileCollapsed ? "collapsed" : "expanded"}
                    variants={{
                        collapsed: { y: "calc(100% - 80px)" },
                        expanded: { y: 0 }
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                    drag={isMobileCollapsed ? false : "y"}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.05}
                    onDragEnd={(_: any, info: PanInfo) => {
                        if (info.offset.y > 100 || info.velocity.y > 500) {
                            setIsMobileCollapsed(true);
                        }
                    }}
                    className={cx(
                        "fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-secondary shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.15)] px-4 pb-safe h-dvh overflow-hidden",
                        !isMobileCollapsed && "rounded-t-[32px]"
                    )}
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
                                className="gap-1.5 h-10 px-4 rounded-xl border-secondary font-bold"
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
                    <div className={cx(
                        "mt-4 pb-8 h-full overflow-y-auto overscroll-contain pb-32 transition-opacity duration-300",
                        isMobileCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
                    )}>
                        <div className="flex items-center gap-3 mb-6 bg-secondary_alt p-4 rounded-2xl">
                            <div className="p-2 rounded-xl bg-brand-solid text-white">
                                <CreditCard01 className="size-5" />
                            </div>
                            <h2 className="text-lg font-bold text-primary">Detail Pembayaran</h2>
                        </div>
                        <PaymentCardContent />
                    </div>
                </motion.div>
            )}
        </Section>
    )
}
