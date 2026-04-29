"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, ShoppingCart01, InfoCircle, CheckCircle, Upload01, Copy01, Eraser, LogIn01, RefreshCw01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { RadioButton as RadioGroup } from "@/components/base/radio-groups/radio-groups";
import { Checkbox } from "@/components/base/checkbox/checkbox";
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
import FileUploadWithUrl from "@/components/application/file-upload-with-url";
import { Tabs } from "@/components/application/tabs/tabs";
import { compressImage } from "@/utils/image-converter";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { getUnitAvailability, checkUnitAvailability } from "@/actions/admin";
import { uploadToDriveClient } from "@/utils/google-drive-client-upload";

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
    const [availabilityMap, setAvailabilityMap] = useState<Record<string, { sold: number, limit: number, available: boolean }>>({});
    const [isFetchingAvailability, setIsFetchingAvailability] = useState(true);
    const activePricingStage = useMemo(() => {
        if (!config?.pricingStages) return null;
        const today = new Date();
        return config.pricingStages.find((stage: any) => {
            const start = new Date(stage.startDate);
            const end = new Date(stage.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            return today >= start && today <= end;
        });
    }, [config]);
    const { isConnected } = useGoogleAuth();
    const [fileAttachments, setFileAttachments] = useState<Record<string, Array<{ file: File, progress: number, status: 'idle' | 'uploading' | 'success' | 'error', error?: string, url?: string }>>>({});
    const [isReAuthModalOpen, setIsReAuthModalOpen] = useState(false);

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
        async function fetchInitialAvailability() {
            setIsFetchingAvailability(true);
            const res = await getUnitAvailability(unit.toLowerCase());
            if (res.success && res.data) {
                setAvailabilityMap(res.data);

                if (subEvents.length > 1) {
                    const mappedData = res.data as Record<string, any>;

                    const isSubEventDisabled = (seName: string) => {
                        const exactAvail = mappedData[seName];
                        if (exactAvail) return !exactAvail.available;
                        const subKeys = Object.keys(mappedData).filter(k => k.startsWith(`${seName} - `));
                        if (subKeys.length > 0) return subKeys.every(k => !mappedData[k].available);
                        return false;
                    }

                    const currentDisabled = isSubEventDisabled(selectedSubEvent);
                    if (currentDisabled) {
                        const firstAvailable = subEvents.find(se => !isSubEventDisabled(se.name));
                        if (firstAvailable) {
                            setSelectedSubEvent(firstAvailable.name);
                        }
                    }
                }
            }
            setIsFetchingAvailability(false);
        }
        fetchInitialAvailability();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unit]);

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

            const currentCategory = parts.join(" - ") || config.name;

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

    const isOptionDisabled = (fieldId: string, optionValue: string): boolean => {
        // If it's a sub-event selection (top level buttons)
        if (fieldId === "subEvent") {
            const exactAvail = availabilityMap[optionValue];
            if (exactAvail) return !exactAvail.available;

            const subKeys = Object.keys(availabilityMap).filter(k => k.startsWith(`${optionValue} - `));
            if (subKeys.length > 0) return subKeys.every(k => !availabilityMap[k].available);

            return false;
        }

        // For fields like 'sesi' or 'category'
        if (fieldId === "sesi") {
            // A session is disabled if ALL categories for this session are full
            const categoryField = fields.find((f: any) => f.id === "category");
            if (categoryField && categoryField.options) {
                return categoryField.options.every((opt: any) => {
                    const key = `${optionValue} - ${opt.value}`;
                    const avail = availabilityMap[key];
                    return avail ? !avail.available : false;
                });
            }
            // Fallback: search for a limit just for the session
            const avail = availabilityMap[optionValue];
            return avail ? !avail.available : false;
        }

        if (fieldId === "category") {
            const sesiValue = formData.sesi;
            if (sesiValue) {
                const key = `${sesiValue} - ${optionValue}`;
                const avail = availabilityMap[key];
                return avail ? !avail.available : false;
            }
            const avail = availabilityMap[optionValue];
            return avail ? !avail.available : false;
        }

        if (fieldId === "ticketType") {
            return formData.category !== "umum" && formData.category !== "umum_minuman";
        }

        return false;
    };

    // Clear ticketType if category is changed from 'umum' or 'umum_minuman'
    useEffect(() => {
        const isNotUmum = formData.category !== "umum" && formData.category !== "umum_minuman";
        if (isNotUmum && formData.ticketType) {
            setFormData(prev => ({ ...prev, ticketType: null }));
        }
    }, [formData.category, formData.ticketType]);

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

        setFormData(prev => {
            const next = { ...prev, [id]: finalValue };

            // Clear ticketType if category is changed to anything other than "umum" or "umum_minuman"
            if (id === "category" && finalValue !== "umum" && finalValue !== "umum_minuman") {
                return { ...next, ticketType: null };
            }

            return next;
        });

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
        if (['mp4', 'mkv', 'mov', 'avi', 'wmv', 'flv', 'webm', '3gp'].includes(ext || '')) return 'video';
        if (ext === 'pdf') return 'pdf';
        return 'empty';
    };

    const handleFileUpload = async (id: string, file: File, isMultiple: boolean = false) => {
        if (!isConnected) {
            toastError("Akses Ditolak", "Silakan hubungkan Google Drive terlebih dahulu.");
            window.location.href = "/auth/google/login";
            return;
        }

        // Only compress if it's an image
        const isImage = file.type.startsWith("image/");
        const fileToUpload = isImage ? await compressImage(file) : file;
        const newAttachment = { file: fileToUpload, progress: 10, status: 'uploading' as const };

        setFileAttachments(prev => ({
            ...prev,
            [id]: isMultiple ? [...(prev[id] || []), newAttachment] : [newAttachment]
        }));

        setIsUploading(true);

        const tokensRaw = localStorage.getItem("gdrive_tokens");
        if (!tokensRaw) {
            toastError("Akses Ditolak", "Silakan hubungkan Google Drive terlebih dahulu.");
            window.location.href = "/auth/google/login";
            setIsUploading(false);
            return;
        }

        const tokens = JSON.parse(tokensRaw);

        try {
            const res: any = await uploadToDriveClient(fileToUpload, tokens.access_token, (progress) => {
                setFileAttachments(prev => {
                    const list = prev[id] || [];
                    const index = list.findIndex(att => att.file === fileToUpload);
                    if (index === -1) return prev;
                    const newList = [...list];
                    newList[index] = { ...newList[index], progress: Math.max(10, progress) }; // Keep at least 10% initially
                    return { ...prev, [id]: newList };
                });
            });

            if (res.success) {
                setFileAttachments(prev => {
                    const list = prev[id] || [];
                    const index = list.findIndex(att => att.file === fileToUpload);
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
                    const index = list.findIndex(att => att.file === fileToUpload);
                    if (index === -1) return prev;
                    const newList = [...list];
                    newList[index] = { ...newList[index], progress: 0, status: 'error', error: res.message || "Gagal upload" };
                    return { ...prev, [id]: newList };
                });
                if (res.error === "AUTH_REQUIRED") {
                    window.location.href = "/auth/google/login";
                } else if (res.error === "AUTH_INVALID") {
                    setIsReAuthModalOpen(true);
                }
            }
        } catch (err: any) {
            console.error("Upload error:", err);
            setFileAttachments(prev => {
                const list = prev[id] || [];
                const index = list.findIndex(att => att.file === fileToUpload);
                if (index === -1) return prev;
                const newList = [...list];
                newList[index] = { ...newList[index], progress: 0, status: 'error', error: err.message || "Kesalahan sistem" };
                return { ...prev, [id]: newList };
            });
            toastError("Upload Gagal", err.message || "Terjadi kesalahan saat mengunggah file.");
        } finally {
            setIsUploading(false);
        }
    };

    const calculatePrice = (data: Record<string, any> = formData) => {
        let basePrice = 0;

        // 1. Detect dynamic pricing stages (automatic date-based detection)
        if (config?.pricingStages && config.pricingStages.length > 0) {
            const today = new Date();
            const activeStage = config.pricingStages.find((stage: any) => {
                const start = new Date(stage.startDate);
                const end = new Date(stage.endDate);
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
                return today >= start && today <= end;
            });

            if (activeStage) {
                basePrice = activeStage.price;
            }
        }

        // 2. Fallback to existing logic if no dynamic stage is active
        if (basePrice === 0) {
            if (subEventConfig?.price !== undefined) {
                basePrice = subEventConfig.price;
            } else if (config?.fixedPrice !== undefined) {
                basePrice = config.fixedPrice;
            } else {
                // Priority: radio field selection
                fields.forEach((field: any) => {
                    if (field.type === "radio") {
                        const selectedOption = field.options.find((opt: any) => opt.value === data[field.id]);
                        if (selectedOption?.price !== undefined) basePrice = selectedOption.price;
                    }
                });

                // Fallback: unit root price
                if (basePrice === 0 && config?.price !== undefined) {
                    basePrice = config.price;
                }
            }
        }

        const quantity = parseInt(data.quantity) || 1;

        // If subEventConfig or fixedPrice is specific, it might already include quantity logic 
        // but for LAP it's usually per-item. 
        // Check if there is a quantity field to determine if we should multiply.
        const hasQuantityField = fields.some((f: any) => f.id === "quantity");

        if (hasQuantityField) {
            return basePrice * quantity;
        }

        return basePrice;
    };

    const handleAddToCart = () => {
        const errors: Record<string, string> = {};

        // 1. Prepare final form data (merging defaults)
        const finalData = { ...formData };
        fields.forEach((field: any) => {
            if (finalData[field.id] === undefined || finalData[field.id] === "") {
                if (field.id === "quantity") {
                    finalData[field.id] = "1";
                } else if (field.defaultValue !== undefined) {
                    finalData[field.id] = field.defaultValue.toString();
                }
            }
        });

        // 2. Validate using finalData
        fields.forEach((field: any) => {
            const value = finalData[field.id];

            // Skip validation for fields hidden by category logic
            const isNotUmum = finalData.category && finalData.category !== "umum" && finalData.category !== "umum_minuman";
            if (field.id === "ticketType" && isNotUmum) return;
            if (field.id === "note_1" && unit.toLowerCase() === "kds" && (finalData.category !== "umum_minuman" && finalData.category !== "umum")) return;

            // Required check
            if (field.required) {
                const isEmpty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
                const isUnchecked = field.type === "checkbox" && !value;
                if (isEmpty || isUnchecked) {
                    errors[field.id] = `${field.label} wajib diisi`;
                }
            }

            // Email format check
            if (value && field.type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors[field.id] = "Format email tidak valid";
                }
            }

            // URL format check
            if (value && field.type === "url") {
                try {
                    new URL(value);
                } catch (_) {
                    errors[field.id] = "Format URL tidak valid";
                }
            }

            // Min/Max files check
            if (field.type === "file") {
                const files = Array.isArray(value) ? value : (value ? [value] : []);
                if (field.minFiles && files.length < field.minFiles) {
                    errors[field.id] = `Minimal harus mengunggah ${field.minFiles} foto`;
                }
                if (field.maxFiles && files.length > field.maxFiles) {
                    errors[field.id] = `Maksimal hanya boleh mengunggah ${field.maxFiles} foto`;
                }
            }
        });

        // Special check for quantity in finalData
        if (finalData.quantity === "0" || finalData.quantity === 0 || finalData.quantity === "") {
            errors.quantity = "Jumlah tiket tidak boleh 0";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toastError("Data Belum Lengkap", "Silakan lengkapi semua data yang wajib diisi dengan benar.");

            // Scroll to the first error
            const firstErrorId = Object.keys(errors)[0];
            const element = document.getElementById(firstErrorId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Detect active stage name for display in cart
        let detectedStageName = selectedSubEvent || config.name;
        if (config?.pricingStages) {
            const today = new Date();
            const activeStage = config.pricingStages.find((stage: any) => {
                const start = new Date(stage.startDate);
                const end = new Date(stage.endDate);
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
                return today >= start && today <= end;
            });
            if (activeStage) {
                detectedStageName = activeStage.name;
            }
        }

        // 3. Submit with finalData
        const item = {
            id: Math.random().toString(36).substr(2, 9),
            unitId: unit,
            subEventId: selectedSubEvent,
            unitName: config.name,
            subEventName: detectedStageName,
            formData: finalData,
            price: calculatePrice(finalData)
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
        window.location.href = '/checkout';
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
        <Section className="py-12 pb-32 md:pb-12 bg-primary min-h-screen">
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
                        <p className="text-tertiary">Unit {config.name} {activePricingStage ? ` — ${activePricingStage.name}` : ""} — Silakan isi data pendukung di bawah ini.</p>
                    </div>

                    {isFetchingAvailability ? (
                        <div className="flex flex-col items-center justify-center py-20 text-tertiary">
                            <div className="w-8 h-8 border-4 border-secondary border-t-primary rounded-full animate-spin transition-all" />
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-500">
                            {subEvents.length > 1 && !config.formFields && (
                                <div className="mt-8 space-y-4">
                                    <Label>Pilih Sub-Event / Kategori</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {subEvents.map((se) => (
                                            <button
                                                key={se.id}
                                                disabled={isOptionDisabled("subEvent", se.name)}
                                                onClick={() => setSelectedSubEvent(se.name)}
                                                className={cx(
                                                    "p-4 rounded-lg border text-sm font-bold transition-all text-left shadow-xs",
                                                    selectedSubEvent === se.name
                                                        ? "border-brand-solid bg-brand-primary/5 text-brand-secondary ring-2 ring-brand-solid/20"
                                                        : "border-secondary bg-primary text-secondary hover:border-tertiary",
                                                    isOptionDisabled("subEvent", se.name) && "opacity-50 cursor-not-allowed bg-disabled_subtle grayscale"
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
                                    // Conditional visibility logic
                                    const isNotUmum = formData.category && formData.category !== "umum" && formData.category !== "umum_minuman";
                                    if (field.id === "ticketType" && isNotUmum) {
                                        return null;
                                    }
                                    if (field.id === "note_1" && unit.toLowerCase() === "kds" && (formData.category !== "umum_minuman" && formData.category !== "umum")) {
                                        return null;
                                    }

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
                                            <div key={field.id} id={field.id} className="space-y-1.5">
                                                <Label isRequired={field.required}>{field.label}</Label>
                                                <RadioGroup
                                                    value={formData[field.id]}
                                                    onChange={(val) => handleInputChange(field.id, val)}
                                                    items={field.options.map((opt: any) => {
                                                        const disabled = isOptionDisabled(field.id, opt.value);
                                                        // Only show "Sold Out" if it's not the ticketType field being disabled by category
                                                        const showSoldOut = disabled && (field.id !== "ticketType" || (formData.category === "umum" || formData.category === "umum_minuman"));

                                                        return {
                                                            value: opt.value,
                                                            title: opt.label + (showSoldOut ? " (Sold Out)" : ""),
                                                            description: "",
                                                            secondaryTitle: "",
                                                            image: opt.image,
                                                            icon: () => null,
                                                            disabled: disabled
                                                        };
                                                    })}
                                                />
                                                {formErrors[field.id] && (
                                                    <p className="text-sm font-medium text-error-600">{formErrors[field.id]}</p>
                                                )}
                                            </div>
                                        );
                                    }

                                    if (field.type === "select") {
                                        return (
                                            <div key={field.id} id={field.id}>
                                                <Select
                                                    label={field.label}
                                                    isRequired={field.required}
                                                    placeholder="Pilih salah satu..."
                                                    selectedKey={formData[field.id]}
                                                    onSelectionChange={(val) => handleInputChange(field.id, val)}
                                                    items={field.options.map((opt: any) => {
                                                        const disabled = isOptionDisabled(field.id, opt);
                                                        return {
                                                            id: opt,
                                                            label: opt + (disabled ? " (Sold Out)" : ""),
                                                            isDisabled: disabled
                                                        };
                                                    })}
                                                    size="md"
                                                    isInvalid={!!formErrors[field.id]}
                                                    errorMessage={formErrors[field.id]}
                                                >
                                                    {(item) => <Select.Item key={item.id} id={item.id as string} isDisabled={item.isDisabled}>{item.label}</Select.Item>}
                                                </Select>
                                            </div>
                                        );
                                    }

                                    if (field.type === "textarea") {
                                        return (
                                            <div key={field.id} id={field.id}>
                                                <TextArea
                                                    label={field.label}
                                                    isRequired={field.required}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.id] || ""}
                                                    onChange={(val) => handleInputChange(field.id, val)}
                                                    rows={4}
                                                    isInvalid={!!formErrors[field.id]}
                                                    errorMessage={formErrors[field.id]}
                                                />
                                            </div>
                                        );
                                    }

                                    if (field.type === "file") {
                                        const attachments = fileAttachments[field.id] || [];

                                        return (
                                            <FileUploadWithUrl
                                                key={field.id}
                                                id={field.id}
                                                label={field.label}
                                                isRequired={field.required}
                                                isConnected={isConnected}
                                                accept={field.accept}
                                                multiple={field.multiple}
                                                maxSize={field.maxSize}
                                                hint={field.hint}
                                                value={formData[field.id]}
                                                onValueChange={(val) => handleInputChange(field.id, val)}
                                                attachments={attachments}
                                                onUpload={(file) => handleFileUpload(field.id, file, field.multiple)}
                                                onRetry={(file) => handleFileUpload(field.id, file, field.multiple)}
                                                onDelete={(index) => {
                                                    const newList = attachments.filter((_, i) => i !== index);
                                                    setFileAttachments(prev => ({ ...prev, [field.id]: newList }));
                                                    const urls = newList.filter(a => a.status === 'success' && a.url).map(a => a.url);
                                                    handleInputChange(field.id, field.multiple ? urls : urls[0] || undefined);
                                                }}
                                                isUploading={isUploading}
                                                isInvalid={!!formErrors[field.id]}
                                                errorMessage={formErrors[field.id]}
                                            />
                                        );
                                    }

                                    if (field.type === "checkbox") {
                                        return (
                                            <div key={field.id} id={field.id} className="space-y-1.5">
                                                <Checkbox
                                                    isSelected={!!formData[field.id]}
                                                    onChange={(val) => handleInputChange(field.id, val)}
                                                    label={field.label}
                                                    size="md"
                                                />
                                                {formErrors[field.id] && (
                                                    <p className="text-sm font-medium text-error-600">{formErrors[field.id]}</p>
                                                )}
                                            </div>
                                        );
                                    }

                                    const isQuantity = field.id === "quantity";
                                    const isQuantityDisabled = isQuantity && !availability;

                                    return (
                                        <div key={field.id} id={field.id}>
                                            <Input
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
                                                errorMessage={formErrors[field.id]}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </Container>

            {/* Checkout card - fixed untuk mobile, static untuk desktop */}
            <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto z-50 md:z-auto pb-safe md:pb-0 md:mt-4">
                <Container>
                    <div className="max-w-2xl mx-auto">
                        <div className="px-4 py-2 md:px-4 md:py-4 flex justify-between items-center border-t md:border border-secondary md:rounded-lg bg-primary dark:bg-gray-900 shadow-lg md:shadow-none">
                            <div>
                                <p className="text-sm font-medium text-tertiary uppercase tracking-widest font-mono">Biaya Pendaftaran {activePricingStage ? `(${activePricingStage.name})` : ""}</p>
                                <p className="text-xl md:text-3xl font-bold text-primary mt-1">Rp {calculatePrice().toLocaleString('id-ID')}</p>
                            </div>
                            <Button
                                size={isMounted && isMd ? "xl" : "md"}
                                color="primary"
                                iconLeading={ShoppingCart01}
                                onClick={handleAddToCart}
                                isLoading={isUploading || isNavigating}
                                isDisabled={isFetchingAvailability || (Object.keys(availabilityMap).length > 0 && (isOptionDisabled("subEvent", selectedSubEvent) || (formData.category && isOptionDisabled("category", formData.category)) || (formData.sesi && isOptionDisabled("sesi", formData.sesi))))}
                                className="w-fit sm:w-auto md:px-10"
                            >
                                {(Object.keys(availabilityMap).length > 0 && (isOptionDisabled("subEvent", selectedSubEvent) || (formData.category && isOptionDisabled("category", formData.category)) || (formData.sesi && isOptionDisabled("sesi", formData.sesi)))) ? "Penuh" : "Masukan"} <span className="hidden sm:inline">{(Object.keys(availabilityMap).length > 0 && (isOptionDisabled("subEvent", selectedSubEvent) || (formData.category && isOptionDisabled("category", formData.category)) || (formData.sesi && isOptionDisabled("sesi", formData.sesi)))) ? "" : "Keranjang"}</span>
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            {config && (
                <FloatingWhatsApp
                    cpName={config.cpName}
                    cpWhatsapp={config.cpWhatsapp}
                    cpDescription={config.cpDescription}
                    unitName={config.name}
                    className={cx(
                        "transition-all duration-300",
                        isPinned ? "bottom-20 md:bottom-6" : "bottom-6"
                    )}
                />
            )}

            <SharedModal
                isOpen={isReAuthModalOpen}
                onOpenChange={setIsReAuthModalOpen}
                title="Sesi Google Drive Berakhir"
                description="Sesi Anda telah berakhir atau kredensial tidak valid. Silakan login kembali untuk melanjutkan upload file pendukung."
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
        </Section>
    );
}
