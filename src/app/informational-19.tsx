"use client";

import { type SVGProps, useState } from "react";
import { ArrowLeft, BookClosed, ChevronRight, Edit01, Edit04, Link01, Link03, MarkerPin02, Plus, SearchLg, Share04 } from "@untitledui/icons";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";

type UploadedFile = { name: string; size: number; progress: number; type?: string; failed?: boolean };

const StarIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
            <g clipPath="url(#clip0_9315_555775)">
                <path
                    d="M7.63067 1.288C7.76731 0.95948 8.23269 0.959479 8.36933 1.288L10.0222 5.26198C10.0798 5.40047 10.21 5.4951 10.3596 5.50709L14.6498 5.85103C15.0045 5.87947 15.1483 6.32207 14.8781 6.55354L11.6094 9.35354C11.4954 9.45112 11.4457 9.60423 11.4805 9.75014L12.4791 13.9367C12.5617 14.2828 12.1852 14.5563 11.8816 14.3709L8.2085 12.1274C8.0805 12.0492 7.9195 12.0492 7.7915 12.1274L4.11845 14.3709C3.81481 14.5563 3.43831 14.2828 3.52086 13.9367L4.51951 9.75014C4.55431 9.60423 4.50456 9.45112 4.39065 9.35354L1.12193 6.55354C0.851716 6.32207 0.995526 5.87947 1.35019 5.85103L5.64044 5.50709C5.78995 5.4951 5.9202 5.40047 5.9778 5.26198L7.63067 1.288Z"
                    fill="#F5F5F5"
                />
                <g clipPath="url(#clip1_9315_555775)">
                    <path
                        d="M7.63067 1.288C7.76731 0.95948 8.23269 0.959479 8.36933 1.288L10.0222 5.26198C10.0798 5.40047 10.21 5.4951 10.3596 5.50709L14.6498 5.85103C15.0045 5.87947 15.1483 6.32207 14.8781 6.55354L11.6094 9.35354C11.4954 9.45112 11.4457 9.60423 11.4805 9.75014L12.4791 13.9367C12.5617 14.2828 12.1852 14.5563 11.8816 14.3709L8.2085 12.1274C8.0805 12.0492 7.9195 12.0492 7.7915 12.1274L4.11845 14.3709C3.81481 14.5563 3.43831 14.2828 3.52086 13.9367L4.51951 9.75014C4.55431 9.60423 4.50456 9.45112 4.39065 9.35354L1.12193 6.55354C0.851716 6.32207 0.995526 5.87947 1.35019 5.85103L5.64044 5.50709C5.78995 5.4951 5.9202 5.40047 5.9778 5.26198L7.63067 1.288Z"
                        fill="#FDB022"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_9315_555775">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
                <clipPath id="clip1_9315_555775">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const Divider = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="100%" height="2" {...props}>
            <line x1="1" y1="1" x2="100%" y2="1" className="stroke-border-primary" stroke="black" strokeWidth="2" strokeDasharray="0,6" strokeLinecap="round" />
        </svg>
    );
};

export const Informational19 = () => {
    const [content, setContent] = useState(
        "<p>No aspect of nature on this beach is more mysterious to me than the flights of these shore-bird constellations. The constellation forms, as I have hinted, in an instant of time, and in that same instant develops its own will.</p><p><br></p><p>Birds which have been feeding yards away from each other, each one individually busy for his individual body’s sake, suddenly fuse into this new volition and, flying, rise as one, coast as one, tilt their dozen bodies as one, and as one wheel off on the course which the new group will has determined.</p><p><br></p><p>There is no such thing, I may add, as a lead bird or guide. Had I more space I should like nothing better than to discuss this new will and its instant of origin, but I do not want to crowd this part of my chapter, and must therefore leave the problem to all who study the psychic relations between the individual and a surrounding many.</p><p><br></p><p>My special interest is rather the instant and synchronous obedience of each speeding body to the new volition. By what means, by what methods of communication does this will so suffuse the living constellation that its dozen or more tiny brains know it and obey it in such an instancy of time?</p><p>Are we to believe that these birds, all of them, are machina, as Descartes long ago insisted, mere mechanisms of flesh and bone so exquisitely alike that each cogwheel brain, encountering the same environmental forces, synchronously lets slip the same mechanic ratchet? or is there some psychic relation between these creatures? Does some current flow through them and between them as they fly?</p><p>Schools of fish, I am told, make similar mass changes of direction. I saw such a thing once, but of that more anon.</p><p><br></p><p>The afternoon sun sinks red as fire; the tide climbs the beach, its foam a strange crimson; miles out, a freighter goes north, emerging from the shoals.</p><p><br></p><p>We need another and a wiser and perhaps a more mystical concept of animals. Remote from universal nature, and living by complicated artifice, man in civilization surveys the creature through the glass of his knowledge and sees thereby a feather magnified and the whole image in distortion.</p><p><br></p><p>We patronize them for their incompleteness, for their tragic fate of having taken form so far below ourselves. And therein we err, and greatly err. For the animal shall not be measured by man.</p><p><br></p><p>In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear. They are not brethren, they are not underlings; they are other nations, caught with ourselves in the net of life and time, fellow prisoners of the splendour and travail of the earth.</p>",
    );

    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        { name: "The Outermost House – Henry Beston (1928).upub", type: "document", progress: 100, failed: false, size: 648000 },
        { name: "The Outermost House – Henry Beston (1928).mobi", type: "document", progress: 100, failed: false, size: 862000 },
        { name: "The Outermost House – Henry Beston (1928).pdf", type: "document", progress: 80, failed: false, size: 1800000 },
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
                    { label: "CMS", href: "/cms" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Designers", href: "/designers", current: true },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="mx-auto flex w-full max-w-container flex-1 flex-col pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="mb-8 flex flex-col gap-5 px-4 lg:px-8">
                    {/* Page header simple */}
                    <div className="relative flex flex-col gap-4">
                        <div className="max-lg:hidden">
                            <Breadcrumbs type="button" maxVisibleItems={3}>
                                <Breadcrumbs.Item href="#">Authors</Breadcrumbs.Item>
                                <Breadcrumbs.Item href="#">Henry Beston</Breadcrumbs.Item>
                                <Breadcrumbs.Item href="#">The Outermost House</Breadcrumbs.Item>
                            </Breadcrumbs>
                        </div>
                        <div className="flex lg:hidden">
                            <Button href="#" color="link-gray" size="md" iconLeading={ArrowLeft}>
                                Back
                            </Button>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <p className="text-xl font-semibold text-primary md:text-display-xs">The Outermost House</p>
                                <p className="text-md text-tertiary">Henry Beston (1928)</p>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Button color="secondary" size="md">
                                        Save as draft
                                    </Button>
                                    <Button size="md">Publish changes</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-4 lg:gap-6 lg:px-8">
                    <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                        <div className="flex min-w-0 flex-1 flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <SectionHeader.Root className="border-b-0 pb-0">
                                    <SectionHeader.Group>
                                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                            <SectionHeader.Heading>Featured excerpt</SectionHeader.Heading>
                                            <SectionHeader.Subheading>
                                                This will be displayed on the both the author’s profile and individual book pages.
                                            </SectionHeader.Subheading>
                                        </div>

                                        <div className="absolute top-0 right-0 md:static">
                                            <TableRowActionsDropdown />
                                        </div>
                                    </SectionHeader.Group>
                                </SectionHeader.Root>

                                <TextEditor.Root
                                    content={content}
                                    onUpdate={({ editor }) => setContent(editor.getHTML())}
                                    className="w-full max-xl:gap-2"
                                    inputClassName="lg:h-255 h-260 w-full max-lg:p-4 rounded-lg lg:rounded-xl resize-y"
                                >
                                    <TextEditor.Toolbar floating type="simple" className="xl:hidden" />
                                    <TextEditor.Toolbar floating type="advanced" className="max-xl:hidden" />

                                    <TextEditor.Content />
                                </TextEditor.Root>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                    <SectionHeader.Heading>Attach files</SectionHeader.Heading>
                                    <SectionHeader.Subheading>Upload ebooks associated with this work.</SectionHeader.Subheading>
                                </div>
                                <FileUpload.Root>
                                    <FileUpload.DropZone onDropFiles={handleDropFiles} />

                                    <FileUpload.List className="flex">
                                        {uploadedFiles.map((file) => (
                                            <FileUpload.ListItemProgressFill
                                                key={file.name}
                                                name={file.name}
                                                type={file.type}
                                                progress={file.progress}
                                                failed={file.failed}
                                                size={file.size}
                                                fileIconVariant="default"
                                            />
                                        ))}
                                    </FileUpload.List>
                                </FileUpload.Root>
                            </div>
                        </div>
                        <div className="flex w-full shrink-0 flex-col gap-6 self-start overflow-y-auto rounded-t-[20px] rounded-b-xl bg-primary pb-6 shadow-xs ring-1 ring-secondary ring-inset lg:w-80">
                            {/* Heading */}
                            <div>
                                <div className="px-2 pt-2">
                                    <img
                                        src="https://www.untitledui.com/application/landscape.webp"
                                        alt="Landscape"
                                        className="h-30 w-full rounded-xl object-cover"
                                    />
                                </div>

                                <div className="-mt-12 flex flex-col gap-4 px-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-end justify-between">
                                            <AvatarProfilePhoto
                                                src="https://www.untitledui.com/images/avatars/transparent/eduard-franz?fm=webp&q=80&bg=%23E5DDCE"
                                                alt="Joshua Wilson"
                                                size="md"
                                            />
                                            <div className="flex gap-1 pb-3">
                                                <ButtonUtility tooltip="Preview" size="xs" color="tertiary" icon={Share04} />
                                                <ButtonUtility tooltip="Edit" size="xs" color="tertiary" icon={Edit01} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="flex max-w-50 min-w-0 flex-1 flex-col gap-0.5">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="truncate text-lg font-semibold text-primary">Henry Beston</p>
                                                    <StarIcon />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-tertiary">Author</span>
                                                    <hr className="h-3 w-px border-none bg-border-primary" />
                                                    <span className="text-sm text-tertiary">1888-1968</span>
                                                </div>
                                            </div>
                                            <dl className="flex items-center gap-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Works</dt>
                                                    <dd className="flex items-center gap-1.5">
                                                        <BookClosed className="size-4 text-fg-quaternary" />
                                                        <span className="text-md font-semibold text-primary">18</span>
                                                    </dd>
                                                </div>

                                                <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Reviews</dt>
                                                    <dd className="flex items-center gap-1.5">
                                                        <Edit04 className="size-4 text-fg-quaternary" />
                                                        <span className="text-md font-semibold text-primary">806</span>
                                                    </dd>
                                                </div>

                                                <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Favorites</dt>
                                                    <dd className="flex items-center gap-1.5">
                                                        <StarIcon className="size-4" />
                                                        <span className="text-md font-semibold text-primary">12,087</span>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button size="sm" color="secondary" iconLeading={Link03}>
                                            Copy link
                                        </Button>
                                        <Button size="sm" color="secondary">
                                            Author page
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 px-6 lg:mt-6">
                                    <Divider />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 px-6">
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-primary">About</p>
                                    <p className="mt-1 text-sm text-tertiary">
                                        Henry Beston (1888-1968) was the author of many books, including White Pine and Blue Water, Northern Farm, and The St.
                                        Lawrence. His Cape Cod house was proclaimed a National Literary Landmark in 1964.
                                    </p>
                                    <ul className="mt-4 flex flex-col gap-2">
                                        <li className="flex gap-2 text-sm text-tertiary">
                                            <MarkerPin02 className="size-5 text-fg-quaternary" />
                                            Quincy, Massachusetts
                                        </li>
                                        <li className="flex gap-2 text-sm text-tertiary">
                                            <Link01 className="size-5 text-fg-quaternary" />
                                            henrybeston.com
                                        </li>
                                    </ul>
                                    <div className="mt-4 flex flex-wrap gap-1">
                                        <Badge size="sm" type="modern" color="gray">
                                            Author
                                        </Badge>
                                        <Badge size="sm" type="modern" color="gray">
                                            Naturalist
                                        </Badge>
                                        <Badge size="sm" type="modern" color="gray">
                                            Non-fiction
                                        </Badge>
                                        <Tooltip title="Add more">
                                            <TooltipTrigger className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <Badge size="sm" type="modern" color="gray" className="p-[5px]">
                                                    <Plus className="size-3 stroke-3 text-utility-gray-500" />
                                                </Badge>
                                            </TooltipTrigger>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="text-sm font-semibold text-primary">Notable works</p>

                                    <ul className="flex flex-col gap-3">
                                        {[
                                            {
                                                title: "The Outermost House",
                                                author: "Henry Beston",
                                                year: "1928",
                                                image: "https://www.untitledui.com/application/the-outermost-house.webp",
                                                link: "#",
                                            },
                                            {
                                                title: "Northern Farm",
                                                author: "Henry Beston",
                                                year: "1972",
                                                image: "https://www.untitledui.com/application/northern-farm.webp",
                                                link: "#",
                                            },
                                            {
                                                title: "Herbs and the Earth",
                                                author: "Henry Beston",
                                                year: "1935",
                                                image: "https://www.untitledui.com/application/herbs-and-the-earth.webp",
                                                link: "#",
                                            },
                                            {
                                                title: "The St. Lawrence",
                                                author: "Henry Beston",
                                                year: "1942",
                                                image: "https://www.untitledui.com/application/the-st-lawrence.webp",
                                                link: "#",
                                            },
                                            {
                                                title: "White Pine and Blue Water",
                                                author: "Henry Beston",
                                                year: "1974",
                                                image: "https://www.untitledui.com/application/white-pine-and-blue-water.webp",
                                                link: "#",
                                            },
                                        ].map((work) => (
                                            <li key={work.title} className="contents">
                                                <Divider />
                                                <a
                                                    href={work.link}
                                                    className="flex w-full flex-row items-center gap-3 rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                                >
                                                    <div className="shrink-0 rounded-md bg-primary p-1 ring-1 ring-primary ring-inset">
                                                        <img
                                                            src={work.image}
                                                            alt={work.title}
                                                            className="aspect-[0.66] w-8 rounded-[2px] object-cover shadow-lg outline-1 -outline-offset-1 outline-secondary_alt"
                                                        />
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 flex-col">
                                                        <div className="flex items-center">
                                                            <p className="flex-1 truncate text-sm font-semibold text-secondary">{work.title}</p>
                                                            <ChevronRight className="size-4 text-fg-quaternary" />
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-tertiary">
                                                            <p className="truncate">{work.author}</p>
                                                            <hr className="h-3 w-px rounded-full border-none bg-border-primary" />
                                                            <p>{work.year}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                        <Divider />
                                    </ul>

                                    <Button href="#" color="link-gray" size="sm" iconTrailing={ChevronRight} className="self-start">
                                        See all works (18)
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
