"use client";

import type { ComponentProps, ComponentPropsWithRef } from "react";
import { useId, useRef, useState } from "react";
import type { FileIcon } from "@untitledui/file-icons";
import { FileIcon as FileTypeIcon } from "@untitledui/file-icons";
import { CheckCircle, Trash01, UploadCloud02, XCircle, LogIn01 } from "@untitledui/icons";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/**
 * Returns a human-readable file size.
 * @param bytes - The size of the file in bytes.
 * @returns A string representing the file size in a human-readable format.
 */
export const getReadableFileSize = (bytes: number) => {
    if (bytes === 0) return "0 KB";

    const suffixes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return Math.floor(bytes / Math.pow(1024, i)) + " " + (suffixes as string[])[i];
};

interface FileUploadDropZoneProps {
    /** The class name of the drop zone. */
    className?: string;
    /**
     * A hint text explaining what files can be dropped.
     */
    hint?: string;
    /**
     * Disables dropping or uploading files.
     */
    isDisabled?: boolean;
    /**
     * Specifies the types of files that the server accepts.
     * Examples: "image/*", ".pdf,image/*", "image/*,video/mpeg,application/pdf"
     */
    accept?: string;
    /**
     * Allows multiple file uploads.
     */
    allowsMultiple?: boolean;
    /**
     * Maximum file size in bytes.
     */
    maxSize?: number;
    /**
     * Callback function that is called with the list of dropped files
     * when files are dropped on the drop zone.
     */
    onDropFiles?: (files: FileList) => void;
    /**
     * Callback function that is called with the list of unaccepted files
     * when files are dropped on the drop zone.
     */
    onDropUnacceptedFiles?: (files: FileList) => void;
    /**
     * Callback function that is called with the list of files that exceed
     * the size limit when files are dropped on the drop zone.
     */
    onSizeLimitExceed?: (files: FileList) => void;
    /** Whether the user is connected to Google Drive */
    isConnected?: boolean;
    /** The URL to redirect to for connection */
    connectUrl?: string;
    /** Whether the drop zone is in an invalid state */
    isInvalid?: boolean;
}

export const FileUploadDropZone = ({
    className,
    hint,
    isDisabled,
    accept,
    allowsMultiple = true,
    maxSize,
    onDropFiles,
    onDropUnacceptedFiles,
    onSizeLimitExceed,
    isConnected = true,
    connectUrl = "/auth/google/login",
    isInvalid: isInvalidProp,
}: FileUploadDropZoneProps) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isInternalInvalid, setIsInternalInvalid] = useState(false);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const isInvalid = isInvalidProp || isInternalInvalid;

    const isFileTypeAccepted = (file: File): boolean => {
        if (!accept) return true;

        const fileName = (file.name || '').toLowerCase();
        const fileType = file.type || '';

        // Split the accept string into individual types
        const acceptedTypes = (accept.split(",") as string[]).map((type: string) => type.trim());

        const isAccepted = acceptedTypes.some((acceptedType: string) => {
            // Handle file extensions (e.g., .pdf, .doc)
            if (acceptedType.startsWith(".")) {
                const extension = `.${fileName.split(".").pop()}`;
                return extension === acceptedType.toLowerCase();
            }

            // Handle wildcards (e.g., image/*)
            if (acceptedType.endsWith("/*")) {
                const typePrefix = acceptedType.split("/")[0];
                return fileType.startsWith(`${typePrefix}/`);
            }

            // Handle exact MIME types (e.g., application/pdf)
            return fileType === acceptedType;
        });

        return isAccepted;
    };

    const handleDragIn = (event: React.DragEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(true);
    };

    const handleDragOut = (event: React.DragEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(false);
    };

    const processFiles = (files: File[]): void => {
        // Reset the internal invalid state when processing files.
        setIsInternalInvalid(false);

        const acceptedFiles: File[] = [];
        const unacceptedFiles: File[] = [];
        const oversizedFiles: File[] = [];

        // If multiple files are not allowed, only process the first file
        const filesToProcess = allowsMultiple ? files : (files as any).slice(0, 1);

        (filesToProcess as any[]).forEach((file: any) => {
            // Check file size first
            if (maxSize && file.size > maxSize) {
                oversizedFiles.push(file);
                return;
            }

            // Then check file type
            if (isFileTypeAccepted(file)) {
                acceptedFiles.push(file);
            } else {
                unacceptedFiles.push(file);
            }
        });

        // Handle oversized files
        if (oversizedFiles.length > 0 && typeof onSizeLimitExceed === "function") {
            const dataTransfer = new DataTransfer();
            (oversizedFiles as any[]).forEach((file: any) => dataTransfer.items.add(file));

            setIsInternalInvalid(true);
            onSizeLimitExceed(dataTransfer.files);
        }

        // Handle accepted files
        if (acceptedFiles.length > 0 && typeof onDropFiles === "function") {
            const dataTransfer = new DataTransfer();
            (acceptedFiles as any[]).forEach((file: any) => dataTransfer.items.add(file));
            onDropFiles(dataTransfer.files);
        }

        // Handle unaccepted files
        if (unacceptedFiles.length > 0 && typeof onDropUnacceptedFiles === "function") {
            const unacceptedDataTransfer = new DataTransfer();
            (unacceptedFiles as any[]).forEach((file: any) => unacceptedDataTransfer.items.add(file));

            setIsInternalInvalid(true);
            onDropUnacceptedFiles(unacceptedDataTransfer.files);
        }

        // Clear the input value to ensure the same file can be selected again
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        handleDragOut(event);
        processFiles(Array.from(event.dataTransfer.files));
    };

    const handleInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(Array.from(event.target.files || []));
    };

    if (!isConnected) {
        return (
            <div
                className={cx(
                    "relative flex flex-col items-center gap-4 rounded-xl bg-secondary_alt px-6 py-8 text-center ring-1 ring-secondary ring-inset",
                    className
                )}
            >
                <div className="max-w-xs">
                    <p className="text-sm font-semibold text-primary">Google Drive Tidak Terhubung</p>
                    <p className="text-xs text-tertiary mt-1">Anda harus menghubungkan Google Drive untuk dapat mengunggah file.</p>
                </div>
                <Button
                    color="primary"
                    size="md"
                    href={connectUrl}
                    target="_blank"
                    iconLeading={LogIn01}
                >
                    Hubungkan Sekarang
                </Button>
            </div>
        );
    }

    return (
        <div
            data-dropzone
            onDragOver={handleDragIn}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragEnd={handleDragOut}
            onDrop={handleDrop}
            onClick={() => !isDisabled && inputRef.current?.click()}
            className={cx(
                "relative flex flex-col items-center gap-3 rounded-xl bg-primary px-6 py-4 text-tertiary ring-1 ring-secondary transition duration-100 ease-linear ring-inset",
                !isDisabled && "cursor-pointer",
                isDraggingOver && "ring-2 ring-brand",
                isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled_subtle",
                isInvalid && "ring-2 ring-error border-error",
                className,
            )}
        >
            <FeaturedIcon color="gray" theme="modern" size="md">
                <UploadCloud02 className="size-5" />
            </FeaturedIcon>

            <div className="flex flex-col gap-1 text-center max-w-full">
                <div className="flex flex-wrap justify-center gap-1 text-center">
                    <input
                        ref={inputRef}
                        id={id}
                        type="file"
                        className="peer sr-only"
                        disabled={isDisabled}
                        accept={accept}
                        multiple={allowsMultiple}
                        onChange={handleInputFileChange}
                    />
                    <label htmlFor={id} className="flex cursor-pointer">
                        <Button
                            color="link-color"
                            size="md"
                            isDisabled={isDisabled}
                            onClick={() => inputRef.current?.click()}
                            className="h-auto whitespace-normal text-center"
                        >
                            Klik untuk unggah <span className="block md:inline">dan lampirkan berkas</span>
                        </Button>
                    </label>
                    <span className="text-sm max-md:hidden">atau seret dan lepas</span>
                </div>
                <p className={cx("text-xs transition duration-100 ease-linear", isInvalid && "text-error-primary")}>
                    {hint || "SVG, PNG, JPG atau GIF (maks. 800x400px)"}
                </p>
            </div>
        </div>
    );
};

export interface FileListItemProps {
    /** The name of the file. */
    name: string;
    /** The size of the file. */
    size: number;
    /** The upload progress of the file. */
    progress: number;
    /** Whether the file failed to upload. */
    failed?: boolean;
    /** The error message if failed. */
    error?: string;
    /** The type of the file. */
    type?: ComponentProps<typeof FileIcon>["type"];
    /** The class name of the file list item. */
    className?: string;
    /** The variant of the file icon. */
    fileIconVariant?: ComponentProps<typeof FileTypeIcon>["variant"];
    /** The function to call when the file is deleted. */
    onDelete?: () => void;
    /** The function to call when the file upload is retried. */
    onRetry?: () => void;
}

export const FileListItemProgressBar = ({ name, size, progress, failed, error, type, fileIconVariant, onDelete, onRetry, className }: FileListItemProps) => {
    const isComplete = progress === 100;

    return (
        <motion.li
            layout="position"
            className={cx(
                "relative flex gap-3 rounded-xl bg-primary p-4 ring-1 ring-secondary transition-shadow duration-100 ease-linear ring-inset",
                failed && "ring-2 ring-error",
                className,
            )}
        >
            <FileTypeIcon className="size-10 shrink-0 dark:hidden" type={type ?? "empty"} theme="light" variant={fileIconVariant ?? "default"} />
            <FileTypeIcon className="size-10 shrink-0 not-dark:hidden" type={type ?? "empty"} theme="dark" variant={fileIconVariant ?? "default"} />

            <div className="flex min-w-0 flex-1 flex-col items-start">
                <div className="flex w-full max-w-full min-w-0 flex-1">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-secondary">{name}</p>

                        <div className="mt-0.5 flex items-center gap-2">
                            <p className="truncate text-sm whitespace-nowrap text-tertiary">{getReadableFileSize(size)}</p>

                            <hr className="h-3 w-px rounded-t-full rounded-b-full border-none bg-border-primary" />

                            <div className="flex items-center gap-1">
                                {isComplete && <CheckCircle className="size-4 stroke-[2.5px] text-fg-success-primary" />}
                                {isComplete && <p className="text-sm font-medium text-success-primary">Selesai</p>}

                                {!isComplete && !failed && <UploadCloud02 className="stroke-[2.5px size-4 text-fg-quaternary" />}
                                {!isComplete && !failed && <p className="text-sm font-medium text-quaternary">Mengunggah...</p>}

                                {failed && <XCircle className="size-4 text-fg-error-primary" />}
                                {failed && <p className="text-sm font-medium text-error-primary">{error || "Gagal"}</p>}
                            </div>
                        </div>
                    </div>

                    <ButtonUtility color="tertiary" tooltip="Hapus" icon={Trash01} size="xs" className="-mt-2 -mr-2 self-start" onClick={onDelete} />
                </div>

                {!failed && (
                    <div className="mt-1 w-full">
                        <ProgressBar labelPosition="right" max={100} min={0} value={progress} />
                    </div>
                )}

                {failed && (
                    <Button color="link-destructive" size="sm" onClick={onRetry} className="mt-1.5">
                        Coba lagi
                    </Button>
                )}
            </div>
        </motion.li>
    );
};

export const FileListItemProgressFill = ({ name, size, progress, failed, type, fileIconVariant, onDelete, onRetry, className }: FileListItemProps) => {
    const isComplete = progress === 100;

    return (
        <motion.li layout="position" className={cx("relative flex gap-3 overflow-hidden rounded-xl bg-primary p-4", className)}>
            {/* Progress fill. */}
            <div
                style={{ transform: `translateX(-${100 - progress}%)` }}
                className={cx("absolute inset-0 size-full bg-secondary transition duration-75 ease-linear", isComplete && "opacity-0")}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            />
            {/* Inner ring. */}
            <div
                className={cx(
                    "absolute inset-0 size-full rounded-[inherit] ring-1 ring-secondary transition duration-100 ease-linear ring-inset",
                    failed && "ring-2 ring-error",
                )}
            />
            <FileTypeIcon className="relative size-10 shrink-0 dark:hidden" type={type ?? "empty"} theme="light" variant={fileIconVariant ?? "solid"} />
            <FileTypeIcon className="relative size-10 shrink-0 not-dark:hidden" type={type ?? "empty"} theme="dark" variant={fileIconVariant ?? "solid"} />

            <div className="relative flex min-w-0 flex-1">
                <div className="relative flex min-w-0 flex-1 flex-col items-start">
                    <div className="w-full min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-secondary">{name}</p>

                        <div className="mt-0.5 flex items-center gap-2">
                            <p className="text-sm text-tertiary">{failed ? "Unggahan gagal, silakan coba lagi" : getReadableFileSize(size)}</p>

                            {!failed && (
                                <>
                                    <hr className="h-3 w-px rounded-t-full rounded-b-full border-none bg-border-primary" />
                                    <div className="flex items-center gap-1">
                                        {isComplete && <CheckCircle className="size-4 stroke-[2.5px] text-fg-success-primary" />}
                                        {!isComplete && <UploadCloud02 className="size-4 stroke-[2.5px] text-fg-quaternary" />}

                                        <p className="text-sm text-tertiary">{progress}%</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {failed && (
                        <Button color="link-destructive" size="sm" onClick={onRetry} className="mt-1.5">
                            Coba lagi
                        </Button>
                    )}
                </div>

                <ButtonUtility color="tertiary" tooltip="Hapus" icon={Trash01} size="xs" className="-mt-2 -mr-2 self-start" onClick={onDelete} />
            </div>
        </motion.li>
    );
};

const FileUploadRoot = (props: ComponentPropsWithRef<"div">) => (
    <div {...props} className={cx("flex flex-col gap-4", props.className)}>
        {props.children}
    </div>
);

const FileUploadList = (props: ComponentPropsWithRef<"ul">) => (
    <ul {...props} className={cx("flex flex-col gap-3", props.className)}>
        <AnimatePresence initial={false}>{props.children}</AnimatePresence>
    </ul>
);

export const FileUpload = {
    Root: FileUploadRoot,
    List: FileUploadList,
    DropZone: FileUploadDropZone,
    ListItemProgressBar: FileListItemProgressBar,
    ListItemProgressFill: FileListItemProgressFill,
};
