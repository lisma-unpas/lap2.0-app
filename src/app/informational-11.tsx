"use client";

import { Fragment, useState } from "react";
import { Edit05, PhoneCall01, SearchLg } from "@untitledui/icons";
import { ListBox, ListBoxItem, type ListBoxItemProps } from "react-aria-components";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ContentDivider } from "@/components/application/content-divider/content-divider";
import { MessageActionTextarea } from "@/components/application/messaging/message-action.demo";
import type { Message } from "@/components/application/messaging/messaging";
import { MessageItem } from "@/components/application/messaging/messaging";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Dot } from "@/components/foundations/dot-icon";
import { cx } from "@/utils/cx";

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

type ChatProps = {
    id: string;
    read: boolean;
    isCurrent?: boolean;
    author: {
        name: string;
        username: string;
        avatarUrl: string;
        status: "online" | "offline";
    };
    lastMessage: {
        text: string;
        me?: boolean;
    };
    supportingText: number;
};

const chats: ChatProps[] = [
    {
        id: "message-001",
        read: false,
        author: {
            name: "Phoenix Baker",
            username: "@phoenix",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            status: "online",
        },
        supportingText: Date.now() - 5 * 60 * 1000,
        lastMessage: {
            me: false,
            text: "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the...",
        },
    },
    {
        id: "message-002",
        read: true,
        isCurrent: true,
        author: {
            name: "Andi Lane",
            username: "@andi",
            avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
            status: "online",
        },
        supportingText: Date.now() - 20 * 60 * 1000,
        lastMessage: {
            me: true,
            text: "Sure thing, I'll have a look today. They're looking great!",
        },
    },
    {
        id: "message-003",
        read: false,
        author: {
            name: "Mollie Hall",
            username: "@mollie",
            avatarUrl: "https://www.untitledui.com/images/avatars/mollie-hall?fm=webp&q=80",
            status: "online",
        },
        supportingText: Date.now() - 60 * 60 * 1000,
        lastMessage: {
            me: false,
            text: "I've just published the site again. Looks like it fixed it. How weird! I'll keep an eye on it...",
        },
    },
    {
        id: "message-004",
        read: true,
        author: {
            name: "Rosalee Melvin",
            username: "@rosalee",
            avatarUrl: "https://www.untitledui.com/images/avatars/rosalee-melvin?fm=webp&q=80",
            status: "offline",
        },
        supportingText: Date.now() - 60 * 60 * 2 * 1000,
        lastMessage: {
            me: false,
            text: "Hey Liv—just wanted to say thanks for chasing up the release for me. Really...",
        },
    },
    {
        id: "message-005",
        read: true,
        author: {
            name: "Anaiah Whitten",
            username: "@analah",
            avatarUrl: "https://www.untitledui.com/images/avatars/anaiah-whitten?fm=webp&q=80",
            status: "offline",
        },
        supportingText: Date.now() - 60 * 60 * 2 * 1000,
        lastMessage: {
            me: false,
            text: "Good news!! Jack accepted the offer. I've sent over a contract for him to review but...",
        },
    },
    {
        id: "message-006",
        read: false,
        author: {
            name: "Koray Okumus",
            username: "@koray",
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            status: "online",
        },
        supportingText: Date.now() - 60 * 60 * 4 * 1000,
        lastMessage: {
            me: false,
            text: "Thanks! Looks great!",
        },
    },
    {
        id: "message-007",
        read: true,
        author: {
            name: "Eva Bond",
            username: "@eva",
            avatarUrl: "https://www.untitledui.com/images/avatars/eva-bond?fm=webp&q=80",
            status: "online",
        },
        supportingText: Date.now() - 60 * 60 * 4 * 1000,
        lastMessage: {
            me: false,
            text: "The press release went out! It's been picked up by a few people... Here's the link if you...",
        },
    },
];

const messageGroups: Array<Array<Omit<Message, "sentAt"> & { sentAt: number }>> = [
    [
        {
            id: "msg-0",
            sentAt: new Date(2025, 6, 31, 11, 39).getTime(),
            user: {
                name: "Andi Lane",
                avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
                status: "online",
            },
            text: "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
        },
        {
            id: "msg-1",
            sentAt: new Date(2025, 6, 31, 11, 40).getTime(),
            user: {
                name: "Andi Lane",
                avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
                status: "online",
            },
            text: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        },
        {
            id: "msg-1.2",
            sentAt: new Date(2025, 6, 31, 11, 40).getTime(),
            user: {
                name: "Andi Lane",
                avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
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
                name: "Andi Lane",
                avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
                status: "online",
            },
            text: "No rush though—we still have to wait for Lana's designs.",
        },
    ],
    [
        {
            id: "msg-4",
            sentAt: new Date(2025, 6, 31, 11, 44).getTime(),
            user: {
                name: "Andi Lane",
                avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
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
            reactions: [
                { content: "❤️‍🔥", count: 1 },
                { content: "👌", count: 1 },
            ],
        },
    ],
];

const ChatItem = ({ value, className, ...otherProps }: ListBoxItemProps<ChatProps>) => {
    if (!value) return null;

    return (
        <ListBoxItem
            href={`/messages/${value.id}`}
            textValue={`${value.author.name} – ${value.lastMessage.text}`}
            {...otherProps}
            className={(state) =>
                cx(
                    "relative flex flex-col gap-4 border-b border-secondary py-4 pr-4 pl-3 select-none",
                    state.isFocused && "outline-2 -outline-offset-2 outline-focus-ring",
                    state.isSelected && "bg-secondary",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            <div className="flex justify-between gap-4">
                <div className="flex items-center">
                    <div className="flex h-full w-5 items-center">{!value.read && <span className="size-2 rounded-full bg-fg-brand-secondary"></span>}</div>
                    <AvatarLabelGroup
                        status={value.author.status}
                        size="md"
                        src={value.author.avatarUrl}
                        alt={value.author.name}
                        title={value.author.name}
                        subtitle={value.author.username}
                    />
                </div>
                <span className="text-sm text-tertiary">{formatRelativeTime(value.supportingText)}</span>
            </div>
            <div className="pl-5">
                <p className="text-sm text-tertiary">
                    {value.lastMessage.me && <span className="text-sm font-medium text-tertiary">You: </span>}
                    {value.lastMessage.text}
                </p>
            </div>
        </ListBoxItem>
    );
};

export const Informational11 = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(chats[1].id);

    return (
        <div className="flex flex-col bg-primary">
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
            <div className="mx-auto mt-12 mb-8 hidden w-full max-w-container px-8 lg:flex">
                <h2 className="text-display-xs font-semibold text-primary">All messages</h2>
            </div>
            <div className="mx-auto mb-0 w-full max-w-container lg:mb-24 lg:px-8">
                <div className="flex max-h-[calc(100vh-64px)] overflow-hidden ring-secondary lg:max-h-252 lg:rounded-xl lg:shadow-sm lg:ring-1">
                    <div className="relative hidden w-90 flex-col overflow-hidden border-r border-secondary bg-primary lg:flex">
                        <div className="flex items-start justify-between gap-4 bg-primary px-6 py-5">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-primary">Messages</span>
                                <BadgeWithDot size="sm" type="modern" color="success">
                                    40
                                </BadgeWithDot>
                            </div>
                            <Button iconLeading={Edit05} color="secondary" size="md" />
                        </div>
                        <div className="px-4 pb-3">
                            <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="sm" />
                        </div>
                        <ListBox
                            aria-label="Chats"
                            selectionMode="single"
                            items={chats}
                            selectedKeys={selectedChatId ? [selectedChatId] : []}
                            onSelectionChange={(keys) => setSelectedChatId(Array.from(keys).at(0) as string)}
                            className="flex-1 overflow-y-auto"
                        >
                            {(item) => <ChatItem id={item.id} key={item.id} value={item} />}
                        </ListBox>
                    </div>
                    <div className="relative flex flex-1 flex-col overflow-hidden lg:max-h-252">
                        <div className="sticky top-0 z-50 flex w-full flex-wrap items-start gap-4 border-b border-secondary bg-primary px-4 pt-5 pb-[21px] lg:min-h-[97px] lg:px-6">
                            <div className="flex flex-1 gap-3">
                                <Avatar
                                    src="https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80"
                                    alt="Andi Lane"
                                    size="xl"
                                    verified
                                    className="hidden lg:inline-flex"
                                />
                                <Avatar
                                    src="https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80"
                                    alt="Andi Lane"
                                    size="lg"
                                    verified
                                    className="inline-flex lg:hidden"
                                />
                                <div className="min-w-60">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold text-primary">Andi Lane</span>
                                        <BadgeWithDot color="success" size="sm" type="modern">
                                            Online
                                        </BadgeWithDot>
                                    </div>
                                    <p className="text-sm text-tertiary">@andi</p>
                                </div>
                            </div>
                            <div className="hidden gap-3 lg:flex">
                                <Button iconLeading={PhoneCall01} color="secondary" size="md">
                                    Call
                                </Button>
                                <Button color="secondary" size="md">
                                    Archive
                                </Button>
                                <Button size="md">View profile</Button>
                            </div>
                            <TableRowActionsDropdown />
                        </div>
                        <ul className="flex flex-1 flex-col gap-y-4 overflow-y-auto bg-primary px-4 py-8 *:first:mt-auto lg:px-6">
                            {messageGroups.map((messages, index) => (
                                <Fragment key={index}>
                                    {index !== 0 && (
                                        <ContentDivider type="single-line" className="py-2">
                                            <span className="text-sm font-medium text-tertiary">Today</span>
                                        </ContentDivider>
                                    )}
                                    {messages.map((msg) => (
                                        <MessageItem
                                            key={msg.id}
                                            msg={{ ...msg, sentAt: formatRelativeTime(msg.sentAt) }}
                                            className={cx("lg:max-w-150", msg.user?.me && "pl-[71px] lg:pl-0")}
                                        />
                                    ))}
                                </Fragment>
                            ))}

                            {/* Typing status indicator */}
                            <li className="flex gap-3">
                                <Avatar src="https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80" alt="Andi Lane" size="md" status="online" />
                                <div>
                                    <p className="mb-1.5 text-sm font-medium text-secondary">Andi Lane</p>
                                    <div className="inline-flex gap-1 rounded-lg rounded-tl-none bg-secondary p-2.5 text-md text-primary ring-1 ring-secondary ring-inset">
                                        <div className="size-1 animate-bounce rounded-full bg-fg-tertiary [animation-delay:-0.3s]"></div>
                                        <div className="size-1 animate-bounce rounded-full bg-fg-quaternary [animation-delay:-0.15s]"></div>
                                        <div className="size-1 animate-bounce rounded-full bg-fg-tertiary"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="sticky bottom-0 bg-primary px-4 pb-4 lg:px-6 lg:pb-6">
                            <MessageActionTextarea
                                onSubmit={(message) => {
                                    console.log("Message:", message);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
