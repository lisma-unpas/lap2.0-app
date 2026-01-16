"use client";

import { Fragment } from "react";
import { ArrowLeft, Link01, MarkerPin02, PhoneCall01, SearchLg, Send01, VideoRecorder } from "@untitledui/icons";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ContentDivider } from "@/components/application/content-divider/content-divider";
import { MessageActionAdvanced, MessageActionMinimal } from "@/components/application/messaging/message-action.demo";
import { type Message, MessageItem } from "@/components/application/messaging/messaging";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dot } from "@/components/foundations/dot-icon";

// Helper function for formatting relative time
const formatRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return "Just now";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} mins ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    } else if (diffInDays === 1) {
        // Yesterday - show time
        const date = new Date(timestamp);
        const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

        return `Yesterday ${time.toLowerCase()}`;
    } else if (diffInDays <= 7) {
        // Within a week - show day and time
        const date = new Date(timestamp);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

        return `${dayOfWeek} ${time.toLowerCase()}`;
    } else {
        return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    }
};

const messageGroups: Array<Array<Omit<Message, "sentAt"> & { sentAt: number }>> = [
    [
        {
            id: "msg-0",
            sentAt: new Date(2025, 6, 31, 11, 39).getTime(),
            user: {
                name: "Joshua Wilson",
                avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
                status: "online",
            },
            text: "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
        },
        {
            id: "msg-1",
            sentAt: new Date(2025, 6, 31, 11, 40).getTime(),
            user: {
                name: "Joshua Wilson",
                avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
                status: "online",
            },
            text: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        },
        {
            id: "msg-1.2",
            sentAt: new Date(2025, 6, 31, 11, 40).getTime(),
            user: {
                name: "Joshua Wilson",
                avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
                status: "online",
            },
            attachment: {
                type: "pdf",
                name: "Tech requirements.pdf",
                size: "1.2 MB",
            },
        },
        {
            id: "msg-2",
            sentAt: new Date(2025, 6, 31, 11, 41).getTime(),
            user: {
                me: true,
            },
            text: "Awesome! Thanks. I'll look at this today.",
        },
        {
            id: "msg-3",
            sentAt: new Date(2025, 6, 31, 11, 44).getTime(),
            user: {
                name: "Joshua Wilson",
                avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
                status: "online",
            },
            text: "No rush though—we still have to wait for Lana's designs.",
            reactions: [
                { content: "❤️‍🔥", count: 1 },
                { content: "👌", count: 1 },
            ],
        },
    ],
    [
        {
            id: "msg-4",
            sentAt: new Date(2025, 6, 31, 11, 44).getTime(),
            user: {
                name: "Joshua Wilson",
                avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
                status: "online",
            },
            text: "Hey Olivia, can you please review the latest design when you can?",
        },
        {
            id: "msg-5",
            sentAt: Date.now() - 30 * 1000,
            user: {
                me: true,
            },
            text: "Sure thing, I'll have a look today. They're looking great!",
        },
    ],
];

export const Informational12 = () => {
    return (
        <div className="flex flex-col bg-secondary_subtle max-lg:h-dvh">
            <HeaderNavigationBase
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        items: [
                            { label: "Overview", href: "#", current: true },
                            { label: "Notifications", href: "#" },
                            { label: "Analytics", href: "#" },
                            { label: "Saved reports", href: "#" },
                            { label: "Scheduled reports", href: "#" },
                            { label: "User reports", href: "#" },
                        ],
                    },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    {
                        label: "Messages",
                        current: true,
                        href: "/messages",
                        icon: () => <Dot className="mr-2 size-2.5 text-fg-success-secondary" />,
                        badge: (
                            <Badge size="sm" type="modern" className="ml-3">
                                40
                            </Badge>
                        ),
                    },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="mx-auto flex w-full max-w-container flex-1 flex-col gap-x-8 max-lg:max-h-full max-lg:min-h-0 lg:flex-row lg:items-start lg:px-8 lg:pt-12 lg:pb-24">
                <div className="relative flex flex-1 flex-col overflow-hidden bg-primary ring-secondary lg:rounded-[20px] lg:shadow-xs lg:ring-1">
                    <div className="relative hidden flex-col gap-y-3 px-6 pt-6 pb-5 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-secondary lg:flex">
                        <div className="inline-flex">
                            <Button size="md" color="link-color" iconLeading={ArrowLeft}>
                                All messages
                            </Button>
                        </div>
                        <div className="flex items-center justify-between gap-x-4">
                            <p className="text-lg font-semibold text-primary">Conversation with Joshua</p>
                            <div className="flex gap-x-3">
                                <Button size="md" color="secondary" iconLeading={PhoneCall01} />
                                <Button size="md" color="secondary" iconLeading={VideoRecorder} />
                                <Button size="md" color="secondary" iconLeading={SearchLg} />
                            </div>
                        </div>
                    </div>
                    <div className="relative block pb-6 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-secondary lg:hidden">
                        <div className="px-2 pt-2">
                            <img src="https://www.untitledui.com/application/clouds.webp" alt="Clouds" className="h-36 w-full rounded-xl object-cover" />
                        </div>
                        <div className="-mt-12 flex flex-col gap-4 px-6 lg:px-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-end justify-between">
                                    <AvatarProfilePhoto
                                        src="https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80"
                                        alt="Joshua Wilson"
                                        size="md"
                                    />
                                    <div className="flex gap-3">
                                        <Button size="sm" color="secondary" iconLeading={PhoneCall01} />
                                        <Button size="sm" color="secondary" iconLeading={VideoRecorder} />
                                    </div>
                                </div>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold text-primary">Joshua Wilson</span>
                                            <VerifiedTick size="lg" />
                                        </div>
                                        <span className="text-sm text-tertiary">josh@untitledui.com</span>
                                    </div>
                                    <TableRowActionsDropdown />
                                </div>
                            </div>
                            <div className="hidden gap-3 lg:flex">
                                <Button size="md" color="secondary">
                                    Add to project
                                </Button>
                                <Button size="md">View projects</Button>
                            </div>
                        </div>
                    </div>

                    {/* Chat */}
                    <div className="overflow-hidden lg:max-h-240 lg:min-h-240">
                        <ul className="flex h-full flex-1 flex-col gap-y-4 overflow-y-auto bg-primary px-4 py-8 *:first:mt-auto lg:px-6">
                            {messageGroups.map((messages, index) => (
                                <Fragment key={index}>
                                    {index !== 0 && (
                                        <ContentDivider type="single-line" className="py-2">
                                            <span className="text-sm font-medium text-tertiary">Today</span>
                                        </ContentDivider>
                                    )}
                                    {messages.map((msg, index) => (
                                        <MessageItem key={index} msg={{ ...msg, sentAt: formatRelativeTime(msg.sentAt) }} className="max-w-78 lg:max-w-150" />
                                    ))}
                                </Fragment>
                            ))}

                            {/* Typing status indicator */}
                            <li className="flex gap-3">
                                <Avatar
                                    src="https://www.untitledui.com/images/avatars/katherine-moss?fm=webp&q=80"
                                    alt="Katherine Moss"
                                    size="md"
                                    status="online"
                                />
                                <div>
                                    <p className="mb-1.5 text-sm font-medium text-secondary">Joshua Wilson</p>
                                    <div className="inline-flex gap-1 rounded-lg rounded-tl-none bg-secondary p-2.5 text-md text-primary ring-1 ring-secondary ring-inset">
                                        <div className="size-1 animate-bounce rounded-full bg-fg-tertiary [animation-delay:-0.3s]"></div>
                                        <div className="size-1 animate-bounce rounded-full bg-fg-quaternary [animation-delay:-0.15s]"></div>
                                        <div className="size-1 animate-bounce rounded-full bg-fg-tertiary"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="sticky bottom-0 border-t border-secondary p-4 lg:border-none lg:p-6 lg:pt-0">
                        <MessageActionAdvanced
                            className="max-lg:hidden"
                            onSubmit={(message) => {
                                console.log("Message:", message);
                            }}
                        />
                        <MessageActionMinimal
                            className="w-full lg:hidden"
                            onSubmit={(message) => {
                                console.log("Message:", message);
                            }}
                        />
                    </div>
                </div>

                <div className="hidden w-90 flex-col gap-6 overflow-y-auto rounded-[20px] bg-primary pb-6 shadow-xs ring-1 ring-secondary ring-inset lg:flex">
                    {/* Heading */}
                    <div className="pb-6">
                        <div className="px-2 lg:pt-2">
                            <img
                                src="https://www.untitledui.com/application/clouds.webp"
                                alt="Clouds"
                                className="h-22 w-full rounded-xl object-cover lg:h-36"
                            />
                        </div>
                        <div className="-mt-12 flex flex-col gap-4 px-4 lg:px-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-end justify-between">
                                    <AvatarProfilePhoto
                                        src="https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80"
                                        alt="Joshua Wilson"
                                        size="md"
                                    />
                                    <div className="flex gap-3">
                                        <Button size="sm" color="secondary" iconLeading={PhoneCall01} />
                                        <Button size="sm" color="secondary" iconLeading={VideoRecorder} />
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <div className="max-w-50 min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                            <p className="truncate text-lg font-semibold text-primary">Joshua Wilson</p>
                                            <VerifiedTick size="lg" />
                                        </div>
                                        <p className="truncate text-sm text-tertiary">josh@untitledui.com</p>
                                    </div>
                                    <dl className="flex items-center gap-4">
                                        <div className="flex flex-col gap-0.5">
                                            <dt className="text-xs font-medium text-quaternary">Followers</dt>
                                            <dd className="text-md font-semibold text-primary">32,086</dd>
                                        </div>

                                        <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                        <div className="flex flex-col gap-0.5">
                                            <dt className="text-xs font-medium text-quaternary">Following</dt>
                                            <dd className="text-md font-semibold text-primary">4,698</dd>
                                        </div>

                                        <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                        <div className="flex flex-col gap-0.5">
                                            <dt className="text-xs font-medium text-quaternary">Posts</dt>
                                            <dd className="text-md font-semibold text-primary">128</dd>
                                        </div>

                                        <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                        <div className="flex flex-col gap-0.5">
                                            <dt className="text-xs font-medium text-quaternary">Collections</dt>
                                            <dd className="text-md font-semibold text-primary">24</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div className="hidden gap-3 lg:flex">
                                <Button size="md" color="secondary" iconLeading={Send01}>
                                    Message
                                </Button>
                                <Button size="md">View projects</Button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden flex-col gap-6 px-6 lg:flex">
                        <div className="flex flex-col">
                            <p className="text-sm font-semibold text-primary">About</p>
                            <p className="mt-1 text-sm text-tertiary">
                                I'm a Designer based in Melbourne. I co-founded{" "}
                                <a
                                    href="#"
                                    className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    Layers Studio™
                                </a>{" "}
                                where we help early stage founders and startups take their product from 0→1.
                            </p>
                            <ul className="mt-4 flex flex-col gap-2">
                                <li className="flex gap-2 text-sm text-tertiary">
                                    <MarkerPin02 className="size-5 text-fg-quaternary" />
                                    Melbourne, Australia
                                </li>
                                <li className="flex gap-2 text-sm text-tertiary">
                                    <Link01 className="size-5 text-fg-quaternary" />
                                    layers.studio
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-semibold text-primary">Work experience</p>
                            <span className="flex w-full flex-row items-start gap-3">
                                <Avatar src="https://www.untitledui.com/logos/images/Layers.jpg" size="lg" contrastBorder />
                                <span className="flex flex-col gap-2">
                                    <span className="flex flex-col">
                                        <p className="text-sm font-semibold text-secondary">Founder</p>
                                        <p className="text-sm text-tertiary">Layers Studio™</p>
                                    </span>
                                    <p className="text-sm text-tertiary">May 2020 – Present</p>
                                </span>
                            </span>
                            <span className="flex w-full flex-row items-start gap-3">
                                <Avatar src="https://www.untitledui.com/logos/images/Sisyphus.jpg" size="lg" contrastBorder />
                                <span className="flex flex-col gap-2">
                                    <span className="flex flex-col">
                                        <p className="text-sm font-semibold text-secondary">UX Designer</p>
                                        <p className="text-sm text-tertiary">Sisyphus</p>
                                    </span>
                                    <p className="text-sm text-tertiary">Jan 2018 – May 2020</p>
                                </span>
                            </span>
                            <span className="flex w-full flex-row items-start gap-3">
                                <Avatar src="https://www.untitledui.com/logos/images/Catalog.jpg" size="lg" contrastBorder />
                                <span className="flex flex-col gap-2">
                                    <span className="flex flex-col">
                                        <p className="text-sm font-semibold text-secondary">Visual Designer</p>
                                        <p className="text-sm text-tertiary">Catalog</p>
                                    </span>
                                    <p className="text-sm text-tertiary">Mar 2017 – Jan 2018</p>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
