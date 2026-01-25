"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ShoppingCart01, InfoCircle, CheckCircle, Upload01, Copy01, Eraser, LogIn01, RefreshCw01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { RadioButton as RadioGroup } from "@/components/base/radio-groups/radio-groups";
import { Label } from "@/components/base/input/label";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { UNIT_CONFIG } from "@/constants/units";
import { useCart } from "@/context/cart-context";
import { cx } from "@/utils/cx";
import { uploadImage } from "@/actions/upload";
import FloatingWhatsApp from "@/components/shared/floating-whatsapp";
import { Modal as SharedModal } from "@/components/shared/modals/modal/index";
import { useToast } from "@/context/toast-context";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { compressImage } from "@/utils/image-converter";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { checkUnitAvailability } from "@/actions/admin";

interface RegistrationFormProps {
    unit: string;
    subEvents: any[];
}

export default function RegistrationForm({ unit, subEvents }: RegistrationFormProps) {
    const config = UNIT_CONFIG[unit.toLowerCase()];
    const { addToCart, userIdentity, updateUserIdentity } = useCart();
    const { toastSuccess, toastError } = useToast();
    const router = useRouter();

    if (!config) return null;

    const [selectedSubEvent, setSelectedSubEvent] = useState<string>(subEvents[0]?.name || "");
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [pendingDraft, setPendingDraft] = useState<{ subEvent: string; data: any } | null>(null);
    const [availability, setAvailability] = useState<{ sold: number, limit: number, remaining: number } | null>(null);
    const { isConnected } = useGoogleAuth();
    const [fileAttachments, setFileAttachments] = useState<Record<string, Array<{ file: File, progress: number, status: 'idle' | 'uploading' | 'success' | 'error', error?: string, url?: string }>>>({});

    const hasCheckedDraft = useRef(false);
    const DRAFT_KEY = `lisma_draft_${unit.toLowerCase()}`;

    // 1. Initial Check for Draft - Only once on mount
    useEffect(() => {
        if (hasCheckedDraft.current) return;

        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            try {
                const draft = JSON.parse(saved);
                if (draft.data && Object.keys(draft.data).length > 0) {
                    setPendingDraft(draft);
                    setShowDraftModal(true);
                }
            } catch (e) {
                console.error("Failed to parse draft", e);
            }
        }
        hasCheckedDraft.current = true;
    }, [unit, DRAFT_KEY]);

    const subEventConfig = config?.subEventConfigs?.[selectedSubEvent];
    const fields = subEventConfig?.fields || config?.formFields || [];

    useEffect(() => {
        async function fetchAvailability() {
            // Determine if we need a specific selection before checking
            const hasCategoryField = fields.some((f: any) => f.id === "category");
            const hasSesiField = fields.some((f: any) => f.id === "sesi");

            const categoryValue = formData.category;
            const sesiValue = formData.sesi;

            // If category or sesi is required but not selected, don't show availability
            if ((hasCategoryField && !categoryValue) || (hasSesiField && !sesiValue)) {
                setAvailability(null);
                return;
            }

            // Construct combined category key consistently with Admin Settings
            const parts = [];
            if (selectedSubEvent && selectedSubEvent !== config.name) {
                parts.push(selectedSubEvent);
            }
            if (sesiValue) parts.push(sesiValue);
            if (categoryValue) parts.push(categoryValue);

            const currentCategory = parts.join(" - ") || "TOTAL";

            if (!currentCategory) {
                setAvailability(null);
                return;
            }

            const res = await checkUnitAvailability(unit.toLowerCase(), currentCategory);
            if (res.success) {
                setAvailability({
                    sold: res.sold!,
                    limit: res.limit!,
                    remaining: res.remaining!
                });
            }
        }
        fetchAvailability();
    }, [unit, selectedSubEvent, formData.category, formData.sesi, fields]);

    // 2. Persist Data as User Types - Debounced manually or just guarded
    useEffect(() => {
        // Skip saving if we are currently showing the modal or if data is empty
        if (showDraftModal || !formData || Object.keys(formData).length === 0) return;

        const timeout = setTimeout(() => {
            localStorage.setItem(DRAFT_KEY, JSON.stringify({
                subEvent: selectedSubEvent,
                data: formData
            }));
        }, 1000); // 1s debounce

        return () => clearTimeout(timeout);
    }, [formData, selectedSubEvent, unit, DRAFT_KEY, showDraftModal]);


    useEffect(() => {
        if (userIdentity) {
            setFormData(prev => ({
                ...prev,
                fullName: userIdentity.fullName,
                phoneNumber: userIdentity.phoneNumber
            }));
        }
    }, [userIdentity, selectedSubEvent]);

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleInputChange = (id: string, value: any) => {
        const field = fields.find((f: any) => f.id === id);
        const isNumberType = field?.type === "number";
        let finalValue = value;

        if (id === "phoneNumber") {
            finalValue = value.replace(/\D/g, "");
        } else if (isNumberType) {
            // Remove non-numeric characters (prevents - and .)
            let numericValue = value.toString().replace(/\D/g, "");

            // Strictly enforce that it cannot be empty for number inputs, default to "0"
            if (numericValue === "") {
                finalValue = "0";
            } else {
                // Handle leading zeros: replaces "0" with new digit if length > 1
                if (numericValue.length > 1 && numericValue.startsWith("0")) {
                    finalValue = numericValue.replace(/^0+/, "") || "0";
                } else {
                    finalValue = numericValue;
                }
            }
        }

        if (id === "quantity" && availability) {
            const numVal = parseInt(finalValue) || 0;
            if (numVal > availability.remaining) {
                finalValue = availability.remaining.toString();
                toastError("Melebihi Kuota", `Maaf, sisa kuota tiket hanya tinggal ${availability.remaining}.`);
            }
        }

        setFormData(prev => ({ ...prev, [id]: finalValue }));

        if (formErrors[id]) {
            setFormErrors(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }
    };

    const getFileType = (file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image';
        if (ext === 'pdf') return 'pdf';
        return 'empty';
    };

    const handleFileUpload = async (id: string, file: File, isMultiple: boolean = false) => {
        if (!isConnected) {
            toastError("Akses Ditolak", "Silakan hubungkan Google Drive terlebih dahulu.");
            window.location.href = "/auth/google/login";
            return;
        }

        if (!file.type.startsWith("image/")) {
            toastError("Format File Tidak Valid", "Hanya diperbolehkan mengunggah file gambar (JPG, PNG, GIF).");
            return;
        }

        const compressedFile = await compressImage(file);
        const newAttachment = { file: compressedFile, progress: 10, status: 'uploading' as const };

        setFileAttachments(prev => ({
            ...prev,
            [id]: isMultiple ? [...(prev[id] || []), newAttachment] : [newAttachment]
        }));

        setIsUploading(true);

        try {
            const fd = new FormData();
            fd.append("file", compressedFile);

            const progressInterval = setInterval(() => {
                setFileAttachments(prev => {
                    const list = prev[id] || [];
                    const index = list.findIndex(att => att.file === compressedFile);
                    if (index === -1 || list[index].status !== 'uploading') {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    const newList = [...list];
                    newList[index] = { ...newList[index], progress: Math.min(newList[index].progress + 15, 90) };
                    return { ...prev, [id]: newList };
                });
            }, 300);

            const tokens = localStorage.getItem("gdrive_tokens");
            const res = await uploadImage(fd, tokens);
            clearInterval(progressInterval);

            if (res.success) {
                setFileAttachments(prev => {
                    const list = prev[id] || [];
                    const index = list.findIndex(att => att.file === compressedFile);
                    if (index === -1) return prev;
                    const newList = [...list];
                    newList[index] = { ...newList[index], progress: 100, status: 'success', url: res.url || undefined };

                    // Update form data with all successful URLs
                    const urls = newList.filter(a => a.status === 'success' && a.url).map(a => a.url);
                    handleInputChange(id, isMultiple ? urls : urls[0]);

                    return { ...prev, [id]: newList };
                });
                toastSuccess("Berhasil", "File berhasil diunggah.");
            } else {
                setFileAttachments(prev => {
                    const list = prev[id] || [];
                    const index = list.findIndex(att => att.file === file);
                    if (index === -1) return prev;
                    const newList = [...list];
                    newList[index] = { ...newList[index], progress: 0, status: 'error', error: res.message || "Gagal upload" };
                    return { ...prev, [id]: newList };
                });
                if (res.error === "AUTH_REQUIRED") {
                    window.location.href = "/auth/google/login";
                }
            }
        } catch (err) {
            setFileAttachments(prev => {
                const list = prev[id] || [];
                const index = list.findIndex(att => att.file === file);
                if (index === -1) return prev;
                const newList = [...list];
                newList[index] = { ...newList[index], progress: 0, status: 'error', error: "Kesalahan sistem" };
                return { ...prev, [id]: newList };
            });
        } finally {
            setIsUploading(false);
        }
    };

    const calculatePrice = () => {
        if (subEventConfig?.price !== undefined) return subEventConfig.price;
        if (config?.fixedPrice !== undefined) return config.fixedPrice;

        let price = 0;
        fields.forEach((field: any) => {
            if (field.type === "radio") {
                const selectedOption = field.options.find((opt: any) => opt.value === formData[field.id]);
                if (selectedOption?.price !== undefined) price = selectedOption.price;
            }
        });

        const quantity = parseInt(formData.quantity) || 1;
        return price * quantity;
    };

    const handleAddToCart = () => {
        if (formData.quantity === "0" || formData.quantity === 0 || formData.quantity === "") {
            setFormErrors(prev => ({ ...prev, quantity: "Jumlah tiket tidak boleh 0" }));
            toastError("Input Tidak Valid", "Jumlah tiket tidak boleh 0.");
            return;
        }

        const item = {
            id: Math.random().toString(36).substr(2, 9),
            unitId: unit,
            subEventId: selectedSubEvent,
            unitName: config.name,
            subEventName: selectedSubEvent,
            formData,
            price: calculatePrice()
        };

        updateUserIdentity({
            fullName: formData.fullName || userIdentity?.fullName || "",
            phoneNumber: formData.phoneNumber || userIdentity?.phoneNumber || "",
            email: userIdentity?.email || ""
        });

        addToCart(item);

        // Clear draft after adding to cart
        localStorage.removeItem(DRAFT_KEY);

        // After adding to cart, navigate directly to the cart page
        setIsNavigating(true);
        router.push('/checkout');
    };


    const isMd = useBreakpoint("md");
    const [isMounted, setIsMounted] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPinned(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Section className="py-12 bg-primary">
            <Container>
                {/* Modal Pemulihan Draft */}
                <SharedModal
                    isOpen={showDraftModal}
                    onOpenChange={setShowDraftModal}
                    title="Lanjutkan Pendaftaran?"
                    description="Kami menemukan data pendaftaran sebelumnya yang belum selesai. Apakah Anda ingin melanjutkan pengisian atau mulai dari awal?"
                    icon={RefreshCw01}
                    iconColor="brand"
                    primaryAction={{
                        label: "Lanjutkan Pengisian",
                        onClick: () => {
                            if (pendingDraft) {
                                setSelectedSubEvent(pendingDraft.subEvent);
                                setFormData(pendingDraft.data);
                            }
                            setShowDraftModal(false);
                        },
                        icon: LogIn01
                    }}
                    secondaryAction={{
                        label: "Mulai Baru",
                        onClick: () => {
                            localStorage.removeItem(DRAFT_KEY);
                            setFormData({});
                            setShowDraftModal(false);
                        },
                        color: "secondary"
                        // icon: Eraser (Eraser is available now)
                    }}
                />

                <div className="max-w-2xl mx-auto">
                    <Button color="link-gray" iconLeading={ArrowLeft} href={`/${unit.toLowerCase()}`}>
                        Kembali ke Detail Unit
                    </Button>

                    <div className="mt-8">
                        <h1 className="text-display-xs font-bold text-primary">Form Pendaftaran</h1>
                        <p className="text-tertiary">Unit {config.name} — Silakan isi data pendukung di bawah ini.</p>
                    </div>

                    {subEvents.length > 1 && !config.formFields && (
                        <div className="mt-8 space-y-4">
                            <Label>Pilih Sub-Event / Kategori</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {subEvents.map((se) => (
                                    <button
                                        key={se.id}
                                        onClick={() => setSelectedSubEvent(se.name)}
                                        className={cx(
                                            "p-4 rounded-lg border text-sm font-bold transition-all text-left shadow-xs",
                                            selectedSubEvent === se.name
                                                ? "border-brand-solid bg-brand-primary/5 text-brand-secondary ring-2 ring-brand-solid/20"
                                                : "border-secondary bg-primary text-secondary hover:border-tertiary"
                                        )}
                                    >
                                        {se.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-10 space-y-8">
                        {fields.map((field: any) => {
                            if (field.type === "info") {
                                return (
                                    <div key={field.id} className="p-4 rounded-lg bg-utility-blue-50 border border-utility-blue-100 flex gap-3">
                                        <InfoCircle className="size-5 text-utility-blue-700 shrink-0 mt-0.5" />
                                        <p className="text-sm text-utility-blue-700 whitespace-pre-line leading-relaxed">{field.text}</p>
                                    </div>
                                );
                            }

                            if (field.type === "radio") {
                                return (
                                    <div key={field.id} className="space-y-1.5">
                                        <Label isRequired={field.required}>{field.label}</Label>
                                        <RadioGroup
                                            value={formData[field.id]}
                                            onChange={(val) => handleInputChange(field.id, val)}
                                            items={field.options.map((opt: any) => ({
                                                value: opt.value,
                                                title: opt.label,
                                                description: "",
                                                secondaryTitle: "",
                                                icon: () => null
                                            }))}
                                        />
                                    </div>
                                );
                            }

                            if (field.type === "select") {
                                return (
                                    <Select
                                        key={field.id}
                                        label={field.label}
                                        isRequired={field.required}
                                        placeholder="Pilih salah satu..."
                                        selectedKey={formData[field.id]}
                                        onSelectionChange={(val) => handleInputChange(field.id, val)}
                                        items={field.options.map((opt: any) => ({
                                            id: opt,
                                            label: opt
                                        }))}
                                        size="md"
                                    >
                                        {(item) => <Select.Item key={item.id} id={item.id as string}>{item.label}</Select.Item>}
                                    </Select>
                                );
                            }

                            if (field.type === "textarea") {
                                return (
                                    <TextArea
                                        key={field.id}
                                        label={field.label}
                                        isRequired={field.required}
                                        placeholder={field.placeholder}
                                        value={formData[field.id] || ""}
                                        onChange={(val) => handleInputChange(field.id, val)}
                                        rows={4}
                                    />
                                );
                            }

                            if (field.type === "file") {
                                const attachments = fileAttachments[field.id] || [];
                                return (
                                    <div key={field.id} className="space-y-1.5">
                                        <Label isRequired={field.required}>{field.label}</Label>
                                        <FileUpload.DropZone
                                            isConnected={isConnected}
                                            accept="image/*"
                                            allowsMultiple={field.multiple}
                                            maxSize={5 * 1024 * 1024}
                                            hint={`File Gambar (PNG, JPG) (Maks. 5MB${field.multiple ? ', bisa beberapa file' : ''})`}
                                            onDropFiles={(files) => Array.from(files).forEach(f => handleFileUpload(field.id, f, field.multiple))}
                                            isDisabled={isUploading}
                                        />
                                        {attachments && attachments.length > 0 && (
                                            <FileUpload.List className="mt-4">
                                                {attachments.map((att, index) => (
                                                    <FileUpload.ListItemProgressBar
                                                        key={`${att.file.name}-${index}`}
                                                        name={att.file.name}
                                                        size={att.file.size}
                                                        progress={att.progress}
                                                        failed={att.status === 'error'}
                                                        error={att.error}
                                                        type={getFileType(att.file) as any}
                                                        onDelete={() => {
                                                            const newList = attachments.filter((_, i) => i !== index);
                                                            setFileAttachments(prev => ({ ...prev, [field.id]: newList }));
                                                            const urls = newList.filter(a => a.status === 'success' && a.url).map(a => a.url);
                                                            handleInputChange(field.id, field.multiple ? urls : urls[0] || undefined);
                                                        }}
                                                        onRetry={() => handleFileUpload(field.id, att.file, field.multiple)}
                                                    />
                                                ))}
                                            </FileUpload.List>
                                        )}
                                    </div>
                                );
                            }

                            const isQuantity = field.id === "quantity";
                            const isQuantityDisabled = isQuantity && !availability;

                            return (
                                <Input
                                    key={field.id}
                                    type={
                                        (field.id === "phoneNumber" || field.type === "number") ? "text" :
                                            field.type === "url" ? "url" :
                                                field.type === "email" ? "email" :
                                                    "text"
                                    }
                                    inputMode={
                                        (field.id === "phoneNumber" || field.type === "number") ? "numeric" : undefined
                                    }
                                    label={field.label}
                                    isRequired={field.required}
                                    hint={isQuantity && availability ? `Sisa kuota: ${availability.remaining} tiket` : undefined}
                                    placeholder={isQuantityDisabled ? "Pilih kategori terlebih dahulu..." : (field.placeholder || `Masukkan ${field.label}...`)}
                                    value={formData[field.id] ?? (field.type === "number" ? (field.defaultValue?.toString() || "0") : "")}
                                    onChange={(val) => handleInputChange(field.id, val)}
                                    size="md"
                                    isDisabled={isQuantityDisabled}
                                    isInvalid={!!formErrors[field.id]}
                                    errorMessage={
                                        formErrors[field.id] ||
                                        (field.type === "email" ? "Format email tidak valid" :
                                            field.type === "url" ? "Format URL tidak valid" : undefined)
                                    }
                                />
                            );
                        })}
                    </div>

                    <div className="relative mt-12">
                        <div className="sticky bottom-0 left-0 right-0 md:static px-2 py-2 md:px-4 md:py-4 flex justify-between items-center border-t md:border border-secondary md:rounded-lg bg-primary z-40 dark:bg-gray-900">
                            <div>
                                <p className="text-sm font-medium text-tertiary uppercase tracking-widest font-mono">Biaya Pendaftaran</p>
                                <p className="text-xl md:text-3xl font-bold text-primary mt-1">Rp {calculatePrice().toLocaleString('id-ID')}</p>
                            </div>
                            <Button
                                size={isMounted && isMd ? "xl" : "md"}
                                color="primary"
                                iconLeading={ShoppingCart01}
                                onClick={handleAddToCart}
                                isLoading={isUploading || isNavigating}
                                className="w-fit sm:w-auto md:px-10"
                            >
                                Checkout
                            </Button>
                        </div>
                        {/* Sentinel placed at the very bottom of the relative container to detect when the sticky bar 'lands' */}
                        <div ref={sentinelRef} className="absolute bottom-0 h-px w-full pointer-events-none" />
                    </div>
                </div>
            </Container>

            {config && (
                <FloatingWhatsApp
                    cpName={config.cpName}
                    cpWhatsapp={config.cpWhatsapp}
                    cpDescription={config.cpDescription}
                    unitName={config.name}
                    className={cx(
                        "transition-all duration-300",
                        isPinned ? "bottom-24 md:bottom-6" : "bottom-6"
                    )}
                />
            )}
        </Section>
    );
}
