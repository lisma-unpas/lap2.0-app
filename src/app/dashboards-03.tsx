"use client";

import { useMemo, useState } from "react";
import { parseDate } from "@internationalized/date";
import { SearchLg, Zap } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricChangeIndicator, MetricsChart04 } from "@/components/application/metrics/metrics";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { RatingStars } from "@/components/foundations/rating-stars";

// Helper functions for formatting
const formatCurrency = (amount: number): string => amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const lineData = [
    {
        date: new Date(2025, 0, 2),
        A: 156.77,
        B: 76.77,
    },
    {
        date: new Date(2025, 0, 4),
        A: 158.55,
        B: 78.55,
    },
    {
        date: new Date(2025, 0, 6),
        A: 159.99,
        B: 79.99,
    },
    {
        date: new Date(2025, 0, 8),
        A: 165.99,
        B: 85.99,
    },
    {
        date: new Date(2025, 0, 10),
        A: 160.66,
        B: 80.66,
    },
    {
        date: new Date(2025, 0, 12),
        A: 165.33,
        B: 85.33,
    },
    {
        date: new Date(2025, 0, 14),
        A: 175.88,
        B: 95.88,
    },
    {
        date: new Date(2025, 0, 16),
        A: 180.33,
        B: 100.33,
    },
    {
        date: new Date(2025, 0, 18),
        A: 195.44,
        B: 115.44,
    },
    {
        date: new Date(2025, 0, 20),
        A: 190.99,
        B: 110.99,
    },
    {
        date: new Date(2025, 0, 22),
        A: 200.77,
        B: 120.77,
    },
    {
        date: new Date(2025, 0, 24),
        A: 210.44,
        B: 130.44,
    },
    {
        date: new Date(2025, 0, 26),
        A: 220.05,
        B: 140.05,
    },
    {
        date: new Date(2025, 0, 28),
        A: 224.01,
        B: 144.01,
    },
    {
        date: new Date(2025, 0, 30),
        A: 222.15,
        B: 142.15,
    },
];

const orders = [
    {
        id: "#26678",
        date: new Date(2025, 0, 16).getTime(),
        status: "paid",
        amount: 100.14,
        rating: 5,
        customer: {
            name: "Sienna Hewitt",
            email: "hi@siennahewitt.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80",
        },
    },
    {
        id: "#26677",
        date: new Date(2025, 0, 16).getTime(),
        status: "paid",
        amount: 96.32,
        rating: 4.5,
        customer: {
            name: "Ammar Foley",
            email: "ammarfoley@gmail.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80",
        },
    },
    {
        id: "#26676",
        date: new Date(2025, 0, 15).getTime(),
        status: "paid",
        amount: 104.24,
        rating: 5,
        customer: {
            name: "Pippa Wilkinson",
            email: "pippa@pippaw.com",
        },
    },
    {
        id: "#26675",
        date: new Date(2025, 0, 14).getTime(),
        status: "paid",
        amount: 88.48,
        rating: 5,
        customer: {
            name: "Olly Schroeder",
            email: "olly_s@icloud.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80",
        },
    },
    {
        id: "#26674",
        date: new Date(2025, 0, 14).getTime(),
        status: "paid",
        amount: 96.32,
        rating: 4.5,
        customer: {
            name: "Mathilde Lewis",
            email: "mathilde@hey.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80",
        },
    },
    {
        id: "#26673",
        date: new Date(2025, 0, 14).getTime(),
        status: "paid",
        amount: 107.1,
        rating: 5,
        customer: {
            name: "Julius Vaughan",
            email: "juliusvaughan@gmail.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/julius-vaughan?fm=webp&q=80",
        },
    },
    {
        id: "#26672",
        date: new Date(2025, 0, 14).getTime(),
        status: "paid",
        amount: 82.04,
        rating: 3.0,
        customer: {
            name: "Zaid Schwartz",
            email: "zaid@zaidstudio.com",
        },
    },
];

const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");

    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const Dashboard03 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("custom");
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return orders;

        return orders.toSorted((a, b) => {
            let first = a[sortDescriptor.column as keyof typeof a];
            let second = b[sortDescriptor.column as keyof typeof b];
            if (typeof first === "object" && first && "name" in first) {
                first = first.name;
            }
            if (typeof second === "object" && second && "name" in second) {
                second = second.name;
            }

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
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        current: true,
                    },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple with avatar */}
                        <div className="relative flex flex-col gap-5 bg-primary">
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex flex-1 items-center gap-3 lg:gap-4">
                                    <Avatar size="xl" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" />
                                    <div>
                                        <h1 className="text-xl font-semibold text-primary">Welcome back, Olivia</h1>
                                        <p className="text-md text-tertiary">16 January, 2025</p>
                                    </div>
                                </div>
                                <Input className="md:w-80" size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />
                            </div>
                        </div>

                        <div className="flex justify-between gap-6">
                            <Tabs selectedKey={selectedTab} onSelectionChange={(value) => setSelectedTab(value as string)} className="w-auto">
                                <TabList
                                    type="button-minimal"
                                    items={[
                                        { id: "custom", label: "Custom" },
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

                            <div className="max-lg:hidden">
                                <DateRangePicker
                                    defaultValue={{
                                        start: parseDate("2025-01-10"),
                                        end: parseDate("2025-01-16"),
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 md:flex-row md:flex-wrap lg:gap-6 lg:px-8">
                        <MetricsChart04
                            title="$2,114.40"
                            subtitle="Sales"
                            className="flex-1 md:min-w-[320px]"
                            type="simple"
                            change="2.4%"
                            changeTrend="positive"
                            chartColor="text-fg-brand-secondary"
                            chartAreaFill="none"
                            chartData={[{ value: 4 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 4 }, { value: 5 }, { value: 4 }]}
                        />
                        <MetricsChart04
                            title="24"
                            subtitle="Orders"
                            className="flex-1 md:min-w-[320px]"
                            type="simple"
                            change="8.6%"
                            changeTrend="positive"
                            chartColor="text-fg-brand-secondary"
                            chartAreaFill="none"
                            chartData={[
                                { value: 2 },
                                { value: 2 },
                                { value: 1 },
                                { value: 2 },
                                { value: 3 },
                                { value: 3 },
                                { value: 4 },
                                { value: 6 },
                                { value: 5 },
                            ]}
                        />
                        <MetricsChart04
                            title="$88.10"
                            subtitle="Average order value"
                            className="flex-1 md:min-w-[320px]"
                            type="simple"
                            change="6.0%"
                            changeTrend="positive"
                            chartColor="text-fg-brand-secondary"
                            chartAreaFill="none"
                            chartData={[
                                { value: 4 },
                                { value: 3 },
                                { value: 5 },
                                { value: 4 },
                                { value: 5 },
                                { value: 4 },
                                { value: 6 },
                            ]}
                        />
                    </div>

                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="flex flex-col gap-0.5 rounded-xl bg-secondary_subtle shadow-xs ring-1 ring-secondary ring-inset">
                            <div className="flex gap-4 px-5 pt-3 pb-2">
                                <p className="text-sm font-semibold text-primary">Sales</p>
                            </div>
                            <div className="flex flex-col gap-5 rounded-xl bg-primary p-5 ring-1 ring-secondary ring-inset">
                                <div className="flex flex-col items-start gap-4 lg:flex-row">
                                    <div className="flex flex-1 flex-col gap-3">
                                        <p className="text-display-sm font-semibold text-primary">$8,422.60</p>
                                        <div className="flex gap-2">
                                            <MetricChangeIndicator value="3.2%" trend="positive" type="simple" />
                                            <p className="text-sm font-medium text-tertiary">vs last 30 days</p>
                                        </div>
                                    </div>

                                    <Tabs defaultSelectedKey="30days" className="w-auto">
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
                                </div>

                                <div className="flex h-54 w-full flex-col gap-2 lg:h-60">
                                    <ResponsiveContainer className="h-full">
                                        <AreaChart data={lineData} className="text-tertiary [&_.recharts-text]:text-xs">
                                            <defs>
                                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="currentColor" className="text-utility-gray-500" stopOpacity="0.7" />
                                                    <stop offset="95%" stopColor="currentColor" className="text-utility-gray-500" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>

                                            <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                            <Area
                                                isAnimationActive={false}
                                                className="text-utility-brand-600 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                                dataKey="A"
                                                name="Series A"
                                                type="monotone"
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
                                                className="text-utility-gray-400 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                                dataKey="B"
                                                name="Series B"
                                                type="monotone"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                fill="none"
                                                activeDot={{
                                                    className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    <ul className="mt-auto flex justify-between px-2 lg:px-6">
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
                        </div>
                    </div>
                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <TableCard.Root className="bg-secondary_subtle shadow-xs lg:rounded-xl">
                            <div className="flex gap-4 px-5 pt-3 pb-2.5">
                                <p className="text-sm font-semibold text-primary">Orders</p>
                            </div>

                            <div className="flex flex-col items-start gap-4 rounded-t-xl border-b border-secondary bg-primary p-5 ring-1 ring-secondary lg:flex-row">
                                <div className="flex flex-1 flex-col gap-3">
                                    <p className="text-display-sm font-semibold text-primary">24</p>
                                    <div className="flex gap-2">
                                        <MetricChangeIndicator value="8.6%" trend="positive" type="simple" />
                                        <p className="text-sm font-medium text-tertiary">vs last 30 days</p>
                                    </div>
                                </div>

                                <Tabs defaultSelectedKey="all" className="w-auto">
                                    <TabList
                                        type="button-minimal"
                                        items={[
                                            { id: "all", label: "All orders" },
                                            { id: "paid", label: "Paid" },
                                            { id: "refunded", label: "Refunded" },
                                        ]}
                                    />
                                </Tabs>
                            </div>

                            <Table
                                aria-label="Pages and screens"
                                selectionMode="multiple"
                                sortDescriptor={sortDescriptor}
                                onSortChange={setSortDescriptor}
                                className="bg-primary"
                            >
                                <Table.Header className="bg-primary">
                                    <Table.Head id="id" label="Order" allowsSorting isRowHeader className="w-full" />
                                    <Table.Head id="date" label="Date" allowsSorting />
                                    <Table.Head id="status" label="Status" allowsSorting className="max-md:hidden" />
                                    <Table.Head id="amount" label="Amount" allowsSorting className="max-md:hidden" />
                                    <Table.Head id="rating" label="Rating" allowsSorting className="max-md:hidden" />
                                    <Table.Head id="customer" label="Customer" allowsSorting className="max-md:hidden" />
                                    <Table.Head id="actions" />
                                </Table.Header>

                                <Table.Body items={sortedItems}>
                                    {(order) => (
                                        <Table.Row id={order.id}>
                                            <Table.Cell className="font-medium! text-primary">{order.id}</Table.Cell>
                                            <Table.Cell className="text-nowrap">{formatDate(order.date)}</Table.Cell>
                                            <Table.Cell className="max-md:hidden">
                                                <BadgeWithDot
                                                    color={order.status === "paid" ? "success" : order.status === "failed" ? "error" : "gray"}
                                                    type="modern"
                                                    size="sm"
                                                    className="capitalize"
                                                >
                                                    {order.status}
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell className="max-md:hidden">{formatCurrency(order.amount)}</Table.Cell>
                                            <Table.Cell className="max-md:hidden">
                                                <RatingStars rating={order.rating} className="gap-1" />
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap max-md:hidden">
                                                <div className="flex w-max items-center gap-3">
                                                    <Avatar
                                                        src={order.customer.avatarUrl}
                                                        initials={getInitials(order.customer.name)}
                                                        alt={order.customer.name}
                                                        size="md"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-primary">{order.customer.name}</p>
                                                        <p className="text-sm text-tertiary">{order.customer.email}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="px-4">
                                                <div className="flex items-center justify-end">
                                                    <TableRowActionsDropdown />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                            <PaginationCardMinimal align="right" page={1} total={4} className="bg-primary" />
                        </TableCard.Root>
                    </div>
                </div>
            </main>
        </div>
    );
};
