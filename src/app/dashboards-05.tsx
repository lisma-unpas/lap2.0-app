"use client";

import { useMemo, useState } from "react";
import { FilterLines, SearchLg } from "@untitledui/icons";
import type { Selection, SortDescriptor } from "react-aria-components";
import { Area, AreaChart, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis } from "recharts";
import { NavAccountCard } from "@/components/application/app-navigation/base-components/nav-account-card";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

// Helper functions for formatting
const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const lineData = [
    {
        date: "2025-01-01",
        A: 600,
        B: 400,
    },
    {
        date: "2025-02-01",
        A: 620,
        B: 405,
    },
    {
        date: "2025-03-01",
        A: 630,
        B: 400,
    },
    {
        date: "2025-04-01",
        A: 650,
        B: 410,
    },
    {
        date: "2025-05-01",
        A: 600,
        B: 320,
    },
    {
        date: "2025-06-01",
        A: 650,
        B: 430,
    },
    {
        date: "2025-07-01",
        A: 620,
        B: 400,
    },
    {
        date: "2025-08-01",
        A: 750,
        B: 540,
    },
    {
        date: "2025-09-01",
        A: 780,
        B: 490,
    },
    {
        date: "2025-10-01",
        A: 750,
        B: 450,
    },
    {
        date: "2025-11-01",
        A: 780,
        B: 480,
    },
    {
        date: "2025-12-01",
        A: 820,
        B: 500,
    },
];

const users = [
    {
        id: "user-01",
        name: "Lily-Rose Chedjou",
        email: "lilyrose@gmail.com",
        access: ["Admin", "Data export", "Data import"],
        lastActive: new Date(2025, 0, 16).getTime(),
        dateAdded: new Date(2024, 9, 10).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/lily-rose-chedjou?fm=webp&q=80",
    },
    {
        id: "user-02",
        name: "Caitlyn King",
        email: "hi@caitlynking.com",
        access: ["Admin", "Data export", "Data import"],
        lastActive: new Date(2025, 0, 16).getTime(),
        dateAdded: new Date(2024, 7, 2).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/caitlyn-king?fm=webp&q=80",
    },
    {
        id: "user-03",
        name: "Fleur Cook",
        email: "fleurcook@icloud.com",
        access: ["Data export", "Data import"],
        lastActive: new Date(2025, 0, 15).getTime(),
        dateAdded: new Date(2024, 6, 28).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/fleur-cook?fm=webp&q=80",
    },
    {
        id: "user-04",
        name: "Marco Kelly",
        email: "marco@marcokelly.co",
        access: ["Data export", "Data import"],
        lastActive: new Date(2025, 0, 14).getTime(),
        dateAdded: new Date(2024, 8, 4).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80",
    },
    {
        id: "user-05",
        name: "Lulu Meyers",
        email: "lulu@lulumeyers.com",
        access: ["Data export", "Data import"],
        lastActive: new Date(2025, 0, 14).getTime(),
        dateAdded: new Date(2024, 0, 18).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/lulu-meyers?fm=webp&q=80",
    },
    {
        id: "user-06",
        name: "Mikey Lawrence",
        email: "m.lawrence@gmail.com",
        access: ["Data export", "Data import"],
        lastActive: new Date(2025, 0, 14).getTime(),
        dateAdded: new Date(2024, 0, 14).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/mikey-lawrence?fm=webp&q=80",
    },
    {
        id: "user-07",
        name: "Freya Browning",
        email: "hey@freyabrowning.com",
        access: ["Data export", "Data import"],
        lastActive: new Date(2025, 0, 14).getTime(),
        dateAdded: new Date(2024, 11, 16).getTime(),
        avatarUrl: "https://www.untitledui.com/images/avatars/freya-browning?fm=webp&q=80",
    },
];

export const Dashboard05 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["user-02", "user-03", "user-05"]));

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return users;

        return users.toSorted((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Handle numbers
            if (typeof first === "number" && typeof second === "number") {
                return sortDescriptor.direction === "ascending" ? first - second : second - first;
            }

            // Handle strings
            if (typeof first === "string" && typeof second === "string") {
                const result = first.localeCompare(second);
                return sortDescriptor.direction === "ascending" ? result : -result;
            }

            return 0;
        });
    }, [sortDescriptor]);

    return (
        <div className="bg-primary">
            <HeaderNavigationBase
                showAvatarDropdown={false}
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

            <main className="pt-8 pb-16 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container justify-between gap-4 px-4 lg:px-8">
                        {/* Page header */}
                        <div className="flex flex-col gap-4">
                            <div className="hidden items-center gap-1 lg:flex">
                                <img
                                    src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                    alt="Sienna Hewitt"
                                    className="size-7 rounded-md outline-[0.5px] -outline-offset-[0.5px] outline-avatar-contrast-border"
                                />

                                <Breadcrumbs type="button">
                                    <Breadcrumbs.Item href="#">Sienna Hewitt</Breadcrumbs.Item>
                                    <Breadcrumbs.Item href="#">Dashboard</Breadcrumbs.Item>
                                </Breadcrumbs>
                            </div>
                            <div className="flex flex-col gap-0.5 lg:gap-1">
                                <p className="text-xl font-semibold text-primary lg:text-display-xs">Welcome back, Sienna</p>
                                <p className="text-md text-tertiary">Here's an overview of your site traffic and recently active users.</p>
                            </div>
                        </div>
                        <div className="hidden w-64 lg:block">
                            <NavAccountCard popoverPlacement="bottom right" selectedAccountId="sienna" />
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 lg:flex-row">
                            <p className="flex h-7 items-center gap-1.5 text-xl font-semibold text-primary lg:h-8 lg:text-display-xs">
                                Site traffic <span className="text-success-primary">+104%</span>
                            </p>
                            <div className="flex gap-3">
                                <Tabs className="items-start">
                                    <TabList
                                        type="button-minimal"
                                        items={[
                                            {
                                                id: "12months",
                                                label: (
                                                    <>
                                                        <span className="max-md:hidden">12 months</span>
                                                        <span className="md:hidden">12m</span>
                                                    </>
                                                ),
                                            },
                                            {
                                                id: "30days",
                                                label: (
                                                    <>
                                                        <span className="max-md:hidden">30 days</span>
                                                        <span className="md:hidden">30d</span>
                                                    </>
                                                ),
                                            },
                                            {
                                                id: "7days",
                                                label: (
                                                    <>
                                                        <span className="max-md:hidden">7 days</span>
                                                        <span className="md:hidden">7d</span>
                                                    </>
                                                ),
                                            },
                                            {
                                                id: "24hours",
                                                label: (
                                                    <>
                                                        <span className="max-md:hidden">24 hours</span>
                                                        <span className="md:hidden">24h</span>
                                                    </>
                                                ),
                                            },
                                        ]}
                                    />
                                </Tabs>

                                <Button size="sm" color="secondary" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                            </div>
                        </div>

                        <div className="flex h-60 flex-col gap-2 lg:h-80">
                            <ResponsiveContainer className="h-full">
                                <AreaChart
                                    data={lineData}
                                    className="text-tertiary [&_.recharts-text]:text-xs"
                                    margin={{
                                        left: 5,
                                        right: 5,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="currentColor" className="text-utility-brand-500" stopOpacity="0.7" />
                                            <stop offset="95%" stopColor="currentColor" className="text-utility-brand-500" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                    <XAxis
                                        fill="currentColor"
                                        axisLine={false}
                                        tickLine={false}
                                        tickMargin={10}
                                        interval="preserveStartEnd"
                                        dataKey="date"
                                        tickFormatter={(value) => new Date(value).toLocaleString(undefined, { month: "short" })}
                                    />

                                    <RechartsTooltip
                                        content={<ChartTooltipContent />}
                                        labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                                        cursor={{
                                            className: "stroke-utility-brand-600 stroke-2",
                                        }}
                                    />

                                    <Area
                                        isAnimationActive={false}
                                        className="text-utility-brand-600 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                        dataKey="A"
                                        name="Current period"
                                        type="linear"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="url(#gradient)"
                                        fillOpacity={0.05}
                                        activeDot={{
                                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                        }}
                                    />

                                    <Area
                                        isAnimationActive={false}
                                        className="text-utility-brand-400 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                        dataKey="B"
                                        name="Previous period"
                                        type="linear"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeDasharray="0.1 8"
                                        strokeLinecap="round"
                                        fill="none"
                                        activeDot={{
                                            className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 lg:gap-5">
                        <div className="flex w-full flex-col justify-between gap-4 px-4 lg:flex-row lg:items-center lg:px-8">
                            <p className="text-lg font-semibold text-primary">Recently active</p>
                            <Input size="sm" type="search" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} className="lg:max-w-80" />
                        </div>

                        <div className="px-0 lg:px-8">
                            <Table
                                aria-label="Pages and screens"
                                selectionMode="multiple"
                                sortDescriptor={sortDescriptor}
                                onSortChange={setSortDescriptor}
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys}
                                className="bg-primary"
                            >
                                <Table.Header
                                    bordered={false}
                                    className="lg:bg-transparent lg:[&>tr>th]:bg-secondary lg:[&>tr>th:first-of-type]:rounded-l-xl lg:[&>tr>th:first-of-type]:pl-3 lg:[&>tr>th:last-of-type]:rounded-r-xl"
                                >
                                    <Table.Head id="name" isRowHeader allowsSorting className="w-full text-xs font-semibold text-brand-secondary">
                                        {selectedKeys instanceof Set ? selectedKeys.size : 0} selected
                                    </Table.Head>
                                    <Table.Head id="access" label="Access" allowsSorting className="max-lg:hidden" />
                                    <Table.Head id="lastActive" label="Last active" allowsSorting className="max-lg:hidden" />
                                    <Table.Head id="dateAdded" label="Date added" allowsSorting className="max-lg:hidden" />
                                    <Table.Head id="actions" />
                                </Table.Header>

                                <Table.Body items={sortedItems}>
                                    {(user) => (
                                        <Table.Row id={user.id} className="lg:[&>td:first-of-type]:pl-3">
                                            <Table.Cell className="text-nowrap">
                                                <div className="flex w-max items-center gap-3">
                                                    <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                                                    <div>
                                                        <p className="text-sm font-medium text-primary">{user.name}</p>
                                                        <p className="text-sm text-tertiary">{user.email}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap max-lg:hidden">
                                                <div className="flex gap-1">
                                                    {user.access.map((access) => (
                                                        <BadgeWithDot
                                                            key={access}
                                                            color={access === "Admin" ? "brand" : access === "Data export" ? "blue" : "success"}
                                                            type="modern"
                                                            size="sm"
                                                        >
                                                            {access}
                                                        </BadgeWithDot>
                                                    ))}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap max-lg:hidden">{formatDate(user.lastActive)}</Table.Cell>
                                            <Table.Cell className="text-nowrap max-lg:hidden">{formatDate(user.dateAdded)}</Table.Cell>

                                            <Table.Cell className="px-4 lg:px-3">
                                                <div className="flex items-center justify-end">
                                                    <TableRowActionsDropdown />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                            <PaginationPageMinimalCenter page={1} total={10} className="px-4 pt-3 lg:px-0" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
