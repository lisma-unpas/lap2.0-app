"use client";

import { useState } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { ArrowLeft, FilterLines, HomeLine, SearchLg, Share03, UserPlus01 } from "@untitledui/icons";
import { type SortDescriptor } from "react-aria-components";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

// Helper functions for formatting
const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const attachedFiles = [
    {
        file: { name: "Tech requirements.pdf", type: "pdf", size: "200 KB" },
        uploadedAt: new Date(2025, 0, 4).getTime(),
        lastUpdatedAt: new Date(2025, 0, 4).getTime(),
        uploadedBy: {
            name: "Olivia Rhye",
            email: "olivia@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        },
    },
    {
        file: { name: "Dashboard screenshot.jpg", type: "jpg", size: "720 KB" },
        uploadedAt: new Date(2025, 0, 4).getTime(),
        lastUpdatedAt: new Date(2025, 0, 4).getTime(),
        uploadedBy: {
            name: "Phoenix Baker",
            email: "phoenix@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        },
    },
    {
        file: { name: "Dashboard prototype recording.mp4", type: "mp4", size: "16 MB" },
        uploadedAt: new Date(2025, 0, 2).getTime(),
        lastUpdatedAt: new Date(2025, 0, 2).getTime(),
        uploadedBy: {
            name: "Lana Steiner",
            email: "lana@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        },
    },
    {
        file: { name: "Dashboard prototype FINAL.fig", type: "fig", size: "4.2 MB" },
        uploadedAt: new Date(2025, 0, 6).getTime(),
        lastUpdatedAt: new Date(2025, 0, 6).getTime(),
        uploadedBy: {
            name: "Demi Wilkinson",
            email: "demi@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
        },
    },
    {
        file: { name: "UX Design Guidelines.docx", type: "docx", size: "400 KB" },
        uploadedAt: new Date(2025, 0, 8).getTime(),
        lastUpdatedAt: new Date(2025, 0, 8).getTime(),
        uploadedBy: {
            name: "Candice Wu",
            email: "candice@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
        },
    },
    {
        file: { name: "Dashboard interaction.aep", type: "aep", size: "12 MB" },
        uploadedAt: new Date(2025, 0, 6).getTime(),
        lastUpdatedAt: new Date(2025, 0, 6).getTime(),
        uploadedBy: {
            name: "Natali Craig",
            email: "natali@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
        },
    },
    {
        file: { name: "Briefing call recording.mp3", type: "mp3", size: "800 KB" },
        uploadedAt: new Date(2025, 0, 4).getTime(),
        lastUpdatedAt: new Date(2025, 0, 4).getTime(),
        uploadedBy: {
            name: "Drew Cano",
            email: "drew@untitledui.com",
            avatarSrc: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        },
    },
];

type UploadedFile = { name: string; size: number; progress: number; type?: string; failed?: boolean };

export const Informational03 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "deliveryDate",
        direction: "ascending",
    });

    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        { name: "Tech design requirements.pdf", type: "pdf", progress: 100, failed: false, size: 210000 },
        { name: "Dashboard prototype.mp4", type: "mp4", progress: 70, failed: false, size: 17000000 },
        { name: "Dashboard prototype FINAL.fig", type: "fig", progress: 70, failed: false, size: 4200000 },
    ]);

    const uploadFile = (file: File, onProgress: (progress: number) => void) => {
        // Replace this with your own upload logic
        let progress = 0;

        const interval = setInterval(() => {
            onProgress(++progress);
            if (progress === 100) {
                clearInterval(interval);
            }
        }, 100);
    };

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);

        setUploadedFiles(
            newFiles
                .map(
                    (file) =>
                        ({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            progress: 0,
                        }) as UploadedFile,
                )
                .concat(uploadedFiles),
        );

        newFiles.forEach((file) => {
            uploadFile(file, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.name === file.name ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    return (
        <div className="flex flex-col bg-primary">
            <HeaderNavigationBase
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        items: [
                            { label: "Overview", href: "#" },
                            { label: "Notifications", href: "#" },
                            { label: "Analytics", href: "#" },
                            { label: "Saved reports", href: "#" },
                            { label: "Scheduled reports", href: "#" },
                            { label: "User reports", href: "#" },
                        ],
                    },
                    { label: "Projects", href: "/projects", current: true },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="mx-auto flex w-full max-w-container flex-col gap-y-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
                {/* Page header */}
                <div className="flex flex-col gap-y-4 px-4 lg:px-8">
                    <div className="max-lg:hidden">
                        <Breadcrumbs type="button">
                            <Breadcrumbs.Item href="#" icon={HomeLine} />
                            <Breadcrumbs.Item href="#">Projects</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Dashboard UI</Breadcrumbs.Item>
                            <Breadcrumbs.Item href="#">Files and assets</Breadcrumbs.Item>
                        </Breadcrumbs>
                    </div>
                    <Button size="md" color="link-gray" iconLeading={ArrowLeft} className="inline-flex lg:hidden">
                        Back to project
                    </Button>
                    <div className="flex flex-col justify-between gap-4 lg:flex-row">
                        <div className="flex flex-col gap-y-0.5 lg:gap-y-1">
                            <p className="text-xl font-semibold text-primary lg:text-display-xs">Files and assets</p>
                            <p className="text-md text-tertiary">Documents and attachments that have been uploaded as part of this project.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button iconLeading={Share03} size="md" color="secondary">
                                Share
                            </Button>
                            <Button iconLeading={UserPlus01} size="md">
                                Invite team
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-6 px-4 lg:px-8">
                    <FileUpload.Root>
                        <FileUpload.DropZone onDropFiles={handleDropFiles} />

                        <FileUpload.List className="hidden lg:flex">
                            {uploadedFiles.map((file) => (
                                <FileUpload.ListItemProgressFill
                                    key={file.name}
                                    name={file.name}
                                    type={file.type}
                                    progress={file.progress}
                                    failed={file.failed}
                                    size={file.size}
                                />
                            ))}
                        </FileUpload.List>
                    </FileUpload.Root>

                    <TableCard.Root className="-mx-4 border-secondary max-lg:rounded-none max-lg:border-b max-lg:ring-0 lg:mx-0">
                        <div className="flex items-start justify-between border-secondary px-4 max-lg:mb-6 lg:border-b lg:px-6 lg:py-5">
                            <div className="flex flex-col gap-y-0.5">
                                <p className="text-lg font-semibold text-primary">Attached files</p>
                                <p className="text-sm text-tertiary">Files and assets that have been attached to this project.</p>
                            </div>
                            <TableRowActionsDropdown />
                        </div>
                        <div className="flex flex-col justify-between gap-y-4 border-b border-secondary px-4 max-lg:pb-6 lg:flex-row lg:px-6 lg:py-3">
                            <ButtonGroup size="md">
                                <ButtonGroupItem isSelected>View all</ButtonGroupItem>
                                <ButtonGroupItem>Your files</ButtonGroupItem>
                                <ButtonGroupItem>Shared files</ButtonGroupItem>
                            </ButtonGroup>
                            <div className="order-first flex gap-x-3 lg:order-none">
                                <Input shortcut className="lg:min-w-80" size="sm" placeholder="Search for trades" icon={SearchLg} />
                                <Button size="md" iconLeading={FilterLines} color="secondary" className="hidden lg:inline-flex">
                                    Filters
                                </Button>
                                <Button size="md" iconLeading={FilterLines} color="secondary" className="inline-flex lg:hidden" />
                            </div>
                        </div>
                        <Table
                            aria-label="Trades"
                            selectionMode="multiple"
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                            className="bg-primary"
                        >
                            <Table.Header>
                                <Table.Head id="name" isRowHeader label="File name" className="w-full max-lg:min-w-80" />
                                <Table.Head id="size" label="File size" />
                                <Table.Head id="uploadedAt" label="Date uploaded" />
                                <Table.Head id="lastUpdated" label="Last updated" />
                                <Table.Head id="uploadedBy" label="Uploaded by" />
                                <Table.Head id="actions" />
                            </Table.Header>
                            <Table.Body items={attachedFiles}>
                                {(file) => (
                                    <Table.Row id={file.file.name}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-x-3">
                                                <FileIcon type={file.file.type} theme="light" className="size-10 dark:hidden" />
                                                <FileIcon type={file.file.type} theme="dark" className="size-10 not-dark:hidden" />

                                                <div>
                                                    <p className="text-sm font-medium whitespace-nowrap text-primary">{file.file.name}</p>
                                                    <p className="text-sm whitespace-nowrap text-tertiary">{file.file.size}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{file.file.size}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{formatDate(file.uploadedAt)}</Table.Cell>
                                        <Table.Cell className="whitespace-nowrap">{formatDate(file.lastUpdatedAt)}</Table.Cell>
                                        <Table.Cell>
                                            <div className="group flex items-center gap-3 outline-hidden">
                                                <Avatar src={file.uploadedBy.avatarSrc} alt={file.uploadedBy.name} size="sm" initials="LS" />
                                                <div>
                                                    <p className="text-sm font-medium text-primary">{file.uploadedBy.name}</p>
                                                    <p className="text-sm text-tertiary">{file.uploadedBy.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex gap-x-3">
                                                <Button size="sm" color="link-gray">
                                                    Delete
                                                </Button>
                                                <Button size="sm" color="link-color">
                                                    Edit
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </TableCard.Root>
                </div>
            </main>
        </div>
    );
};
