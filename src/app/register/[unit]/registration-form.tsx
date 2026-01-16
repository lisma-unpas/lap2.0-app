"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart01, InfoCircle, CheckCircle, Upload01 } from "@untitledui/icons";
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

interface RegistrationFormProps {
    unit: string;
    subEvents: any[];
}

export default function RegistrationForm({ unit, subEvents }: RegistrationFormProps) {
    const config = UNIT_CONFIG[unit.toLowerCase()];
    const { addToCart, userIdentity, updateUserIdentity } = useCart();

    if (!config) return null;

    const [selectedSubEvent, setSelectedSubEvent] = useState<string>(subEvents[0]?.name || "");
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const subEventConfig = config?.subEventConfigs?.[selectedSubEvent];
    const fields = subEventConfig?.fields || config?.formFields || [];

    useEffect(() => {
        if (userIdentity) {
            setFormData(prev => ({
                ...prev,
                fullName: userIdentity.fullName,
                phoneNumber: userIdentity.phoneNumber,
                email: userIdentity.email
            }));
        }
    }, [userIdentity, selectedSubEvent]);

    const handleInputChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileUpload = async (id: string, file: File) => {
        setIsUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await uploadImage(fd);
            if (res.success) {
                handleInputChange(id, res.url);
            }
        } catch (err) {
            alert("Gagal upload gambar.");
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
            email: formData.email || userIdentity?.email || ""
        });

        addToCart(item);
        setIsAddedToCart(true);
    };

    if (isAddedToCart) {
        return (
            <Section className="flex-1 flex items-center justify-center">
                <Container>
                    <div className="max-w-md mx-auto text-center p-8 rounded-3xl border border-secondary shadow-xl bg-primary">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-600">
                            <CheckCircle className="size-10" />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-primary">Masuk Keranjang!</h2>
                        <p className="mt-2 text-tertiary">
                            Pendaftaran {config.name} telah ditambahkan ke keranjang. Kamu bisa mendaftar di unit lain atau langsung checkout.
                        </p>
                        <div className="mt-8 flex flex-col gap-3">
                            <Button className="w-full" color="primary" href="/checkout" size="lg">
                                Lanjut ke Checkout
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

    return (
        <Section>
            <Container>
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
                                            "p-4 rounded-xl border text-sm font-bold transition-all text-left shadow-xs",
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
                                    <div key={field.id} className="p-4 rounded-xl bg-utility-blue-50 border border-utility-blue-100 flex gap-3">
                                        <InfoCircle className="size-5 text-utility-blue-700 shrink-0 mt-0.5" />
                                        <p className="text-sm text-utility-blue-700 whitespace-pre-line leading-relaxed">{field.text}</p>
                                    </div>
                                );
                            }

                            if (field.type === "radio") {
                                return (
                                    <div key={field.id} className="space-y-4">
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
                                return (
                                    <div key={field.id} className="space-y-4">
                                        <Label isRequired={field.required}>{field.label}</Label>
                                        <div className="relative">
                                            <label className={cx(
                                                "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all",
                                                formData[field.id] ? "border-brand-solid bg-brand-primary/5" : "border-secondary hover:bg-bg-secondary"
                                            )}>
                                                <div className="flex flex-col items-center justify-center">
                                                    <Upload01 className={cx("size-8 mb-2", formData[field.id] ? "text-brand-secondary" : "text-tertiary")} />
                                                    <p className="text-sm font-medium text-secondary">
                                                        {formData[field.id] ? "Dokumen Terunggah" : "Klik untuk Upload"}
                                                    </p>
                                                    <p className="text-xs text-tertiary mt-1">PNG, JPG atau PDF (Max. 5MB)</p>
                                                </div>
                                                <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(field.id, e.target.files[0])} />
                                            </label>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Input
                                    key={field.id}
                                    type={field.type === "url" ? "url" : field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}
                                    label={field.label}
                                    isRequired={field.required}
                                    placeholder={field.placeholder || `Masukkan ${field.label}...`}
                                    value={formData[field.id] || (field.type === "number" ? (field.defaultValue?.toString() || "") : "")}
                                    onChange={(val) => handleInputChange(field.id, val)}
                                    size="md"
                                    errorMessage={field.type === "email" ? "Format email tidak valid" : field.type === "url" ? "Format URL tidak valid" : undefined}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-12 p-8 rounded-3xl bg-secondary_alt border border-secondary flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-tertiary uppercase tracking-widest font-mono">Biaya Pendaftaran</p>
                            <p className="text-3xl font-bold text-primary mt-1">Rp {calculatePrice().toLocaleString('id-ID')}</p>
                        </div>
                        <Button
                            size="xl"
                            color="primary"
                            iconLeading={ShoppingCart01}
                            onClick={handleAddToCart}
                            isLoading={isUploading}
                            className="w-full sm:w-auto px-10"
                        >
                            Daftar & Checkout
                        </Button>
                    </div>
                </div>
            </Container>

            {config && (
                <FloatingWhatsApp
                    cpName={config.cpName}
                    cpWhatsapp={config.cpWhatsapp}
                    cpDescription={config.cpDescription}
                    unitName={config.name}
                />
            )}
        </Section>
    );
}
