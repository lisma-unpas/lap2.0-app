"use client";

import React, { useState } from "react";
import { InfoCircle } from "@untitledui/icons";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Tabs } from "@/components/application/tabs/tabs";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

interface FileUploadWithUrlProps {
    label: string;
    isRequired?: boolean;
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    hint?: string;
    value?: string | string[];
    onValueChange: (value: string | string[] | undefined) => void;
    attachments?: any[];
    onUpload: (file: File) => void;
    onDelete: (index: number) => void;
    onRetry?: (file: File) => void;
    isUploading?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
    isConnected?: boolean;
    className?: string;
    id?: string;
    minFiles?: number;
}

export default function FileUploadWithUrl({
    label,
    isRequired,
    accept,
    multiple,
    maxSize,
    hint,
    value,
    onValueChange,
    attachments = [],
    onUpload,
    onDelete,
    onRetry,
    isUploading,
    isInvalid,
    errorMessage,
    isConnected,
    className,
    id,
    minFiles
}: FileUploadWithUrlProps) {
    const [method, setMethod] = useState<'upload' | 'url'>('upload');

    const handleMethodChange = (newMethod: 'upload' | 'url') => {
        setMethod(newMethod);
        // Reset value when switching to avoid conflicts
        onValueChange(undefined);
    };

    const isUrl = method === 'url';

    return (
        <div className={cx("space-y-3", className)} id={id}>
            <Label isRequired={isRequired}>{label}</Label>
            
            <Tabs 
                selectedKey={method} 
                onSelectionChange={(key) => handleMethodChange(key as 'upload' | 'url')}
            >
                <Tabs.List type="button-minimal" className="mb-4">
                    <Tabs.Item id="upload">Upload File</Tabs.Item>
                    <Tabs.Item id="url">Input URL G drive</Tabs.Item>
                </Tabs.List>

                <Tabs.Panel id="upload" className="space-y-3">
                    <FileUpload.DropZone
                        isConnected={isConnected}
                        accept={accept || "image/*"}
                        allowsMultiple={multiple}
                        maxSize={maxSize || 5 * 1024 * 1024}
                        hint={hint || (accept?.startsWith("video/") 
                            ? `File Video (Maks. ${maxSize ? Math.round(maxSize / 1024 / 1024) : 100}MB)`
                            : `File Gambar (PNG, JPG) (Maks. 5MB${multiple ? ', bisa beberapa file' : ''})`
                        )}
                        onDropFiles={(files) => Array.from(files).forEach(f => onUpload(f))}
                        isDisabled={isUploading}
                        isInvalid={isInvalid}
                    />

                    {attachments.length > 0 && (
                        <FileUpload.List>
                            {attachments.map((att, index) => (
                                <FileUpload.ListItemProgressBar
                                    key={`${att.file.name}-${index}`}
                                    name={att.file.name}
                                    size={att.file.size}
                                    progress={att.progress}
                                    failed={att.status === 'error'}
                                    error={att.error}
                                    type={att.file.type.startsWith("video/") ? "video" : "image"}
                                    onDelete={() => onDelete(index)}
                                    onRetry={onRetry ? () => onRetry(att.file) : undefined}
                                />
                            ))}
                        </FileUpload.List>
                    )}
                </Tabs.Panel>

                <Tabs.Panel id="url">
                    <div className="space-y-2">
                        <Input
                            placeholder="https://drive.google.com/file/d/..."
                            value={typeof value === 'string' ? value : ""}
                            onChange={(val) => onValueChange(val)}
                            isInvalid={isInvalid}
                            errorMessage={errorMessage}
                        />
                        <div className="flex gap-2 p-3 rounded-lg bg-orange-50/50 border border-orange-100">
                            <InfoCircle className="size-4 text-orange-600 mt-0.5 shrink-0" />
                            <div className="space-y-1">
                                <p className="text-[10px] text-orange-800 leading-normal">
                                    <strong>Penting!</strong> Pastikan file di Google Drive Anda sudah diatur ke <strong>"Siapa saja yang memiliki link"</strong> (Public) agar pendaftaran lancar.
                                </p>
                                {minFiles && minFiles > 1 && (
                                    <p className="text-[10px] text-orange-800 leading-normal italic font-medium">
                                        * Pastikan link Drive tersebut berisi minimal {minFiles} gambar.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </Tabs.Panel>
            </Tabs>

            {method === 'upload' && errorMessage && (
                <p className="text-sm font-medium text-error-600">{errorMessage}</p>
            )}
        </div>
    );
}
