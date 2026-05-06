"use client";

import React from "react";
import { InfoCircle } from "@untitledui/icons";
import { Label } from "@/components/base/input/label";
import { RadioButton as RadioGroup } from "@/components/base/radio-groups/radio-groups";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import FileUploadWithUrl from "@/components/application/file-upload-with-url";

import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";

interface RegistrationFieldProps {
    field: any;
    formData: Record<string, any>;
    formErrors: Record<string, string>;
    handleInputChange: (id: string, value: any) => void;
    isOptionDisabled: (fieldId: string, optionValue: string) => boolean;
    fileAttachments: Record<string, any[]>;
    isConnected: boolean;
    isUploading: boolean;
    handleFileUpload: (id: string, file: File, isMultiple?: boolean) => Promise<void>;
    setFileAttachments: React.Dispatch<React.SetStateAction<Record<string, any[]>>>;
    availability?: { sold: number, limit: number, remaining: number } | null;
}

export default function RegistrationField({
    field,
    formData,
    formErrors,
    handleInputChange,
    isOptionDisabled,
    fileAttachments,
    isConnected,
    isUploading,
    handleFileUpload,
    setFileAttachments,
    availability
}: RegistrationFieldProps) {
    if (field.type === "info") {
        return (
            <div className="p-4 rounded-lg bg-utility-blue-50 border border-utility-blue-100 flex gap-3">
                <InfoCircle className="size-5 text-utility-blue-700 shrink-0 mt-0.5" />
                <p className="text-sm text-utility-blue-700 whitespace-pre-line leading-relaxed">{field.text}</p>
            </div>
        );
    }

    if (field.type === "radio") {
        return (
            <div id={field.id} className="space-y-1.5">
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
            <div id={field.id}>
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
            <div id={field.id}>
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
                id={field.id}
                label={field.label}
                isRequired={field.required}
                isConnected={isConnected}
                accept={field.accept}
                multiple={field.multiple}
                maxSize={field.maxSize}
                hint={field.hint}
                minFiles={field.minFiles}
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
            <div id={field.id} className="space-y-1.5">
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
        <div id={field.id}>
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
}
