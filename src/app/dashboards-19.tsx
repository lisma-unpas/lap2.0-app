"use client";

import { Fragment } from "react";
import { Edit01, SearchLg, Send01 } from "@untitledui/icons";
import { Area, AreaChart, CartesianGrid, Label, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { ContentDivider } from "@/components/application/content-divider/content-divider";
import type { Message } from "@/components/application/messaging/messaging";
import { MessageItem } from "@/components/application/messaging/messaging";
import { Table, TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
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

const lineData = [
    {
        month: "2",
        A: 600,
        B: 400,
    },
    {
        month: "4",
        A: 620,
        B: 405,
    },
    {
        month: "6",
        A: 630,
        B: 400,
    },
    {
        month: "8",
        A: 650,
        B: 410,
    },
    {
        month: "10",
        A: 600,
        B: 320,
    },
    {
        month: "12",
        A: 650,
        B: 430,
    },
    {
        month: "14",
        A: 620,
        B: 400,
    },
    {
        month: "16",
        A: 750,
        B: 540,
    },
    {
        month: "18",
        A: 780,
        B: 490,
    },
    {
        month: "20",
        A: 750,
        B: 450,
    },
    {
        month: "22",
        A: 780,
        B: 480,
    },
    {
        month: "24",
        A: 820,
        B: 500,
    },
    {
        month: "26",
        A: 620,
        B: 470,
    },
    {
        month: "28",
        A: 710,
        B: 510,
    },
    {
        month: "30",
        A: 780,
        B: 580,
    },
];

const biggestFans = [
    {
        id: "user-01",
        name: "Phoenix Baker",
        username: "@phoenix.baker",
        likes: 24,
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
    },
    {
        id: "user-02",
        name: "Lana Steiner",
        username: "@lanasteiner",
        likes: 22,
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
    },
    {
        id: "user-03",
        name: "Demi Wilkinson",
        username: "@demi_wilkinson",
        likes: 22,
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
    },
    {
        id: "user-04",
        name: "Candice Wu",
        username: "@candicewu",
        likes: 20,
        avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
    },
    {
        id: "user-05",
        name: "Natali Craig",
        username: "@nat.craig",
        likes: 18,
        avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
    },
    {
        id: "user-06",
        name: "Drew Cano",
        username: "@drewc",
        likes: 16,
        avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
    },
    {
        id: "user-07",
        name: "Orlando Diggs",
        username: "@orlando_diggs",
        likes: 12,
        avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
    },
];

const favoriteDesigners = [
    {
        id: "user-08",
        name: "Andi Lane",
        username: "@andilane",
        likes: 46,
        avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
    },
    {
        id: "user-09",
        name: "Kate Morrison",
        username: "@kmorrison",
        likes: 40,
        avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
    },
    {
        id: "user-10",
        name: "Koray Okumus",
        username: "@korayy",
        likes: 36,
        avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
    },
    {
        id: "user-11",
        name: "Ava Wright",
        username: "@avawright",
        likes: 34,
        avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
    },
    {
        id: "user-12",
        name: "Eve Leroy",
        username: "@eve.leroy",
        likes: 30,
        avatarUrl: "https://www.untitledui.com/images/avatars/eve-leroy?fm=webp&q=80",
    },
    {
        id: "user-13",
        name: "Zahir Mays",
        username: "@zahir_mays",
        likes: 28,
        avatarUrl: "https://www.untitledui.com/images/avatars/zahir-mays?fm=webp&q=80",
    },
    {
        id: "user-14",
        name: "Joshua Wilson",
        username: "@joshwilson",
        likes: 28,
        avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
    },
];

const messageGroups: Array<Array<Omit<Message, "sentAt"> & { sentAt: number }>> = [
    [
        {
            id: "msg-00",
            sentAt: new Date(2025, 6, 31, 11, 39).getTime(),
            user: {
                me: true,
            },
            text: "Hey Olivia. We're working on a dashboard prototype and love your work. Are you open to new projects?",
        },
        {
            id: "msg-01",
            sentAt: new Date(2025, 6, 31, 11, 40).getTime(),
            user: {
                me: true,
            },
            text: "Hey Anita, I have some capacity in a few weeks. Can you tell me a little more about the project?",
        },
        {
            id: "msg-02",
            sentAt: new Date(2025, 6, 31, 12, 14).getTime(),
            user: {
                name: "Anita Cruz",
                avatarUrl: "https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80",
                status: "online",
            },
            text: "Great! We've drafted an outline here. Let me know if you have any questions!",
        },
        {
            id: "msg-03",
            sentAt: new Date(2025, 6, 31, 12, 14).getTime(),
            user: {
                name: "Anita Cruz",
                avatarUrl: "https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80",
                status: "online",
            },
            attachment: {
                type: "pdf",
                name: "Dashboard Design Brief.pdf",
                size: "800 KB",
            },
        },
        {
            id: "msg-04",
            sentAt: new Date(2025, 6, 31, 12, 29).getTime(),
            user: {
                me: true,
            },
            text: "I'll have a more thorough read and get back to you by tomorrow. Is that okay?",
            reactions: [
                { content: "❤️‍🔥", count: 1 },
                { content: "👌", count: 1 },
            ],
        },
        {
            id: "msg-05",
            sentAt: new Date(2025, 6, 31, 12, 30).getTime(),
            user: {
                name: "Anita Cruz",
                avatarUrl: "https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80",
                status: "online",
            },
            text: "Sounds perfect, thanks!",
        },
    ],
    [
        {
            id: "msg-10",
            sentAt: Date.now() - 10 * 60 * 1000,
            user: {
                me: true,
            },
            text: "Hey Anita, I've had a read through and made some notes:https://docs.google.com/docu...",
        },
        {
            id: "msg-11",
            sentAt: Date.now() - 30 * 1000,
            user: {
                name: "Anita Cruz",
                avatarUrl: "https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80",
                status: "online",
            },
            text: "Thank you for the quick turnaround. Looking now.",
        },
    ],
];

const colors: Record<string, string> = {
    A: "text-utility-brand-600",
    B: "text-utility-brand-400",
    C: "text-utility-brand-700",
};

export const Dashboard19 = () => {
    return (
        <div className="bg-primary">
            <HeaderNavigationBase
                items={[
                    { label: "Home", href: "/" },
                    { label: "Dashboard", href: "/dashboard", current: true },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />

            <main className="hidden pt-8 pb-16 lg:block lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    {/* Page header */}
                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-4 lg:flex-row">
                            <p className="text-xl font-semibold text-primary lg:text-display-xs">Stats for Olivia Rhye</p>
                            <div className="flex gap-3">
                                <Button size="md" color="secondary">
                                    Messages
                                </Button>
                                <Button size="md">Edit</Button>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-5 lg:flex-row lg:items-center">
                            <p className="text-lg font-semibold text-primary">Profile views</p>
                            <ButtonGroup defaultSelectedKeys={["30-days"]}>
                                <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                            </ButtonGroup>
                        </div>
                        <div className="flex h-60 flex-col gap-2">
                            <ResponsiveContainer className="h-full">
                                <AreaChart
                                    data={lineData}
                                    className="text-tertiary [&_.recharts-text]:text-xs"
                                    margin={{
                                        left: 4,
                                        right: 4,
                                    }}
                                >
                                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                    <XAxis
                                        // fill="currentColor"
                                        // axisLine={false}
                                        // tickLine={false}
                                        // tickMargin={10}
                                        // interval="preserveStartEnd"
                                        hide
                                        dataKey="month"
                                    />

                                    <YAxis fill="currentColor" axisLine={false} tickLine={false} tickCount={6} interval="preserveStartEnd">
                                        <Label
                                            value="Profile views"
                                            fill="currentColor"
                                            className="!text-xs font-medium"
                                            style={{ textAnchor: "middle" }}
                                            angle={-90}
                                            position="insideLeft"
                                        />
                                    </YAxis>

                                    <RechartsTooltip
                                        content={<ChartTooltipContent />}
                                        labelFormatter={(value) => `${value} views`}
                                        cursor={{
                                            className: "stroke-utility-brand-600 stroke-2",
                                        }}
                                    />

                                    <Area
                                        isAnimationActive={false}
                                        className={cx(
                                            colors["A"],
                                            "[&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]",
                                        )}
                                        dataKey="A"
                                        name="2025"
                                        type="monotone"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        activeDot={{
                                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                        }}
                                    />

                                    <Area
                                        isAnimationActive={false}
                                        className={cx(
                                            colors["B"],
                                            "[&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]",
                                        )}
                                        dataKey="B"
                                        name="2024"
                                        type="monotone"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        // strokeDasharray="0.1 8"
                                        // strokeLinecap="round"
                                        activeDot={{
                                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>

                            <ul className="mt-auto flex justify-between px-2 lg:pr-6 lg:pl-21">
                                <li className="text-xs text-tertiary">2</li>
                                <li className="hidden text-xs text-tertiary md:block">4</li>
                                <li className="text-xs text-tertiary">6</li>
                                <li className="hidden text-xs text-tertiary md:block">8</li>
                                <li className="text-xs text-tertiary">10</li>
                                <li className="hidden text-xs text-tertiary md:block">12</li>
                                <li className="text-xs text-tertiary">14</li>
                                <li className="hidden text-xs text-tertiary md:block">16</li>
                                <li className="text-xs text-tertiary">18</li>
                                <li className="hidden text-xs text-tertiary md:block">20</li>
                                <li className="text-xs text-tertiary">22</li>
                                <li className="hidden text-xs text-tertiary md:block">24</li>
                                <li className="text-xs text-tertiary">26</li>
                                <li className="hidden text-xs text-tertiary md:block">28</li>
                                <li className="text-xs text-tertiary">30</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-8 px-4 lg:px-8 xl:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Biggest fans</p>
                                <TableRowActionsDropdown />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Table aria-label="Biggest fans">
                                    <Table.Header className="hidden">
                                        <Table.Head id="fan" isRowHeader className="w-full" />
                                        <Table.Head id="likes" />
                                        <Table.Head id="action" />
                                    </Table.Header>
                                    <Table.Body items={biggestFans} className="border-b border-secondary">
                                        {(item) => (
                                            <Table.Row id={item.id}>
                                                <Table.Cell className="w-full px-0">
                                                    <div className="flex gap-3">
                                                        <Avatar size="md" src={item.avatarUrl} alt={item.name} />
                                                        <div>
                                                            <h1 className="text-sm font-medium text-primary">{item.name}</h1>
                                                            <p className="text-sm text-tertiary">{item.username}</p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="text-sm text-nowrap text-tertiary">{item.likes} likes</Table.Cell>
                                                <Table.Cell className="pr-0 pl-4">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                                <div className="flex justify-end">
                                    <Button size="md" color="link-color">
                                        View all
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Favorite designers</p>
                                <TableRowActionsDropdown />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Table aria-label="Favorite designers">
                                    <Table.Header className="hidden">
                                        <Table.Head id="fan" isRowHeader className="w-full" />
                                        <Table.Head id="likes" />
                                        <Table.Head id="action" />
                                    </Table.Header>
                                    <Table.Body items={favoriteDesigners} className="border-b border-secondary">
                                        {(item) => (
                                            <Table.Row id={item.id}>
                                                <Table.Cell className="w-full px-0">
                                                    <div className="flex gap-3">
                                                        <Avatar size="md" src={item.avatarUrl} alt={item.name} />
                                                        <div>
                                                            <h1 className="text-sm font-medium text-primary">{item.name}</h1>
                                                            <p className="text-sm text-tertiary">{item.username}</p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="text-sm text-nowrap text-tertiary">{item.likes} likes</Table.Cell>
                                                <Table.Cell className="pr-0 pl-4">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                                <div className="flex justify-end">
                                    <Button size="md" color="link-color">
                                        View all
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="relative flex flex-col border-l border-secondary bg-secondary_subtle lg:hidden">
                <div className="sticky top-0 z-20 flex w-full flex-wrap items-start justify-between gap-4 border-b border-secondary bg-alpha-white/90 px-4 py-5 backdrop-blur lg:px-6">
                    <div className="flex gap-3">
                        <Avatar size="lg" src="https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80" alt="Anita Cruz" verified />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-primary">Anita Cruz</span>
                                <BadgeWithDot color="success" size="sm" type="modern">
                                    Online
                                </BadgeWithDot>
                            </div>
                            <p className="text-sm text-tertiary">Auckland, New Zealand</p>
                        </div>
                    </div>
                    <TableRowActionsDropdown />
                </div>
                <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto bg-primary px-4 py-6 lg:px-6">
                    {messageGroups.map((messages, index) => (
                        <Fragment key={`${index}-fragment`}>
                            {index !== 0 && (
                                <ContentDivider type="single-line" className="py-2">
                                    <span className="text-sm font-medium text-tertiary">Today</span>
                                </ContentDivider>
                            )}
                            {messages.map((msg) => (
                                <MessageItem
                                    key={msg.id}
                                    msg={{
                                        ...msg,
                                        sentAt: formatRelativeTime(msg.sentAt),
                                    }}
                                    className="max-w-78"
                                />
                            ))}
                        </Fragment>
                    ))}

                    {/* Typing status indicator */}
                    <div className="flex gap-3">
                        <Avatar src="https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80" alt="Anita Cruz" size="md" status="online" />
                        <div>
                            <p className="mb-1.5 text-sm font-medium text-secondary">Anita Cruz</p>
                            <div className="inline-flex gap-1 rounded-lg rounded-tl-none bg-secondary p-2.5 text-md text-primary ring-1 ring-secondary ring-inset">
                                <div className="size-1 animate-bounce rounded-full bg-fg-tertiary [animation-delay:-0.3s]" />
                                <div className="size-1 animate-bounce rounded-full bg-fg-quaternary [animation-delay:-0.15s]" />
                                <div className="size-1 animate-bounce rounded-full bg-fg-tertiary" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 z-20 flex gap-3 bg-primary px-6 pt-5 pb-6 ring-1 ring-secondary">
                    <Input placeholder="Message" size="md" />
                    <Button iconLeading={Send01} size="lg" />
                </div>
            </div>
        </div>
    );
};
