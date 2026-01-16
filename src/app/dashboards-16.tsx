"use client";

import { useMemo, useState } from "react";
import { ArrowUp, CoinsStacked01, DownloadCloud02, Edit01, HomeSmile, RefreshCcw02, SearchLg, Umbrella03 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis } from "recharts";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { CarouselIndicator } from "@/components/application/carousel/carousel.demo";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { cx } from "@/utils/cx";

// Helper functions for formatting
const formatCurrency = (amount: number): string => {
    const formatted = Math.abs(amount).toLocaleString("en-US", { style: "currency", currency: "USD" });
    return amount >= 0 ? `+ ${formatted}` : `- ${formatted}`;
};

const formatDateTime = (timestamp: number): string =>
    new Date(timestamp).toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

const lineData = [
    {
        date: "2025-01-01",
        A: 600,
        B: 400,
        C: 100,
    },
    {
        date: "2025-02-01",
        A: 620,
        B: 405,
        C: 160,
    },
    {
        date: "2025-03-01",
        A: 630,
        B: 400,
        C: 170,
    },
    {
        date: "2025-04-01",
        A: 650,
        B: 410,
        C: 190,
    },
    {
        date: "2025-05-01",
        A: 600,
        B: 320,
        C: 200,
    },
    {
        date: "2025-06-01",
        A: 650,
        B: 430,
        C: 230,
    },
    {
        date: "2025-07-01",
        A: 620,
        B: 400,
        C: 200,
    },
    {
        date: "2025-08-01",
        A: 750,
        B: 540,
        C: 300,
    },
    {
        date: "2025-09-01",
        A: 780,
        B: 490,
        C: 390,
    },
    {
        date: "2025-10-01",
        A: 750,
        B: 450,
        C: 300,
    },
    {
        date: "2025-11-01",
        A: 780,
        B: 480,
        C: 340,
    },
    {
        date: "2025-12-01",
        A: 820,
        B: 500,
        C: 450,
    },
];

const transactions = [
    {
        id: "transaction-01",
        merchant: "Spotify",
        avatarUrl: "https://www.untitledui.com/application/spotify.webp",
        initials: "SP",
        amount: -18.99,
        dateTime: new Date(2025, 6, 7, 10, 0).getTime(),
        category: "Subscriptions",
        paymentMethod: {
            type: "Visa",
            last4: "1234",
            expiry: "06/2025",
            logo: <VisaIcon className="h-8 w-11.5" />,
        },
    },
    {
        id: "transaction-02",
        merchant: "A Coffee",
        initials: "AC",
        amount: -4.5,
        dateTime: new Date(2025, 6, 7, 7, 20).getTime(),
        category: "Food and dining",
        paymentMethod: {
            type: "Visa",
            last4: "1234",
            expiry: "06/2025",
            logo: <VisaIcon className="h-8 w-11.5" />,
        },
    },
    {
        id: "transaction-03",
        merchant: "Stripe",
        avatarUrl: "https://www.untitledui.com/application/stripe.webp",
        initials: "ST",
        amount: 88.0,
        dateTime: new Date(2025, 6, 7, 2, 45).getTime(),
        category: "Income",
        paymentMethod: {
            type: "Mastercard",
            last4: "1234",
            expiry: "06/2025",
            logo: <MastercardIcon className="h-8 w-11.5" />,
        },
    },
    {
        id: "transaction-04",
        merchant: "Figma",
        avatarUrl: "https://www.untitledui.com/application/figma.webp",
        initials: "FI",
        amount: -15.0,
        dateTime: new Date(2025, 6, 6, 18, 10).getTime(),
        category: "Subscriptions",
        paymentMethod: {
            type: "Visa",
            last4: "1234",
            expiry: "06/2025",
            logo: <VisaIcon className="h-8 w-11.5" />,
        },
    },
    {
        id: "transaction-05",
        merchant: "TBF Bakery",
        initials: "TB",
        amount: -12.5,
        dateTime: new Date(2025, 6, 6, 7, 52).getTime(),
        category: "Food and dining",
        paymentMethod: {
            type: "Visa",
            last4: "1234",
            expiry: "06/2025",
            logo: <VisaIcon className="h-8 w-11.5" />,
        },
    },
    {
        id: "transaction-06",
        merchant: "Fresh F&V",
        initials: "FV",
        amount: -40.2,
        dateTime: new Date(2025, 6, 6, 12, 15).getTime(),
        category: "Groceries",
        paymentMethod: {
            type: "Visa",
            last4: "1234",
            expiry: "06/2025",
            logo: <VisaIcon className="h-8 w-11.5" />,
        },
    },
    {
        id: "transaction-07",
        merchant: "Stripe",
        avatarUrl: "https://www.untitledui.com/application/stripe.webp",
        initials: "ST",
        amount: 88.0,
        dateTime: new Date(2025, 6, 6, 5, 40).getTime(),
        category: "Income",
        paymentMethod: {
            type: "Mastercard",
            last4: "1234",
            expiry: "06/2025",
            logo: <MastercardIcon className="h-8 w-11.5" />,
        },
    },
];

const barData = [
    {
        date: "2025-01-01",
        A: 300,
        B: 200,
        C: 350,
    },
    {
        date: "2025-02-01",
        A: 320,
        B: 300,
        C: 300,
    },
    {
        date: "2025-03-01",
        A: 300,
        B: 200,
        C: 240,
    },
    {
        date: "2025-04-01",
        A: 240,
        B: 300,
        C: 280,
    },
    {
        date: "2025-05-01",
        A: 320,
        B: 280,
        C: 100,
    },
    {
        date: "2025-06-01",
        A: 330,
        B: 300,
        C: 130,
    },
    {
        date: "2025-07-01",
        A: 300,
        B: 200,
        C: 100,
    },
    {
        date: "2025-08-01",
        A: 350,
        B: 300,
        C: 200,
    },
    {
        date: "2025-09-01",
        A: 300,
        B: 200,
        C: 100,
    },
    {
        date: "2025-10-01",
        A: 200,
        B: 300,
        C: 280,
    },
    {
        date: "2025-11-01",
        A: 240,
        B: 300,
        C: 300,
    },
    {
        date: "2025-12-01",
        A: 200,
        B: 400,
        C: 350,
    },
];

const colors: Record<string, string> = {
    A: "text-utility-brand-600",
    B: "text-utility-brand-400",
    C: "text-utility-brand-700",
};

const barChartColors: Record<string, string> = {
    A: "text-utility-brand-700",
    B: "text-utility-brand-500",
    C: "text-utility-gray-200",
};

export const Dashboard16 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return transactions;

        return transactions.toSorted((a, b) => {
            let first = a[sortDescriptor.column as keyof typeof a];
            let second = b[sortDescriptor.column as keyof typeof b];

            if (typeof first === "object" && first && "type" in first) {
                first = first.type;
            }

            if (typeof second === "object" && second && "type" in second) {
                second = second.type;
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
                    { label: "Dashboard", href: "/dashboard", current: true },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />

            <main className="mx-auto flex max-w-container flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
                {/* Page header */}
                <div className="mx-auto flex w-full flex-col justify-between gap-4 border-b border-secondary px-4 pb-4 lg:flex-row lg:px-8">
                    <p className="text-xl font-semibold text-primary lg:text-display-xs">Welcome back, Olivia</p>
                    <div className="flex gap-3">
                        <Button size="md" color="secondary">
                            Messages
                        </Button>
                        <Button size="md" iconLeading={RefreshCcw02}>
                            Sync
                        </Button>
                    </div>
                </div>

                <div className="flex gap-16 px-4 lg:px-8">
                    <div className="hidden max-w-98 min-w-98 flex-col gap-8 lg:flex">
                        <div className="shrink-0 overflow-x-clip rounded-xl bg-brand-700 p-6 shadow-xs">
                            <Carousel.Root className="flex flex-col gap-5">
                                <Carousel.Content overflowHidden={false} className="gap-6">
                                    <Carousel.Item className="basis-auto">
                                        <CreditCard width={344} type="transparent" />
                                    </Carousel.Item>
                                    <Carousel.Item className="basis-auto">
                                        <CreditCard width={344} type="transparent-gradient" />
                                    </Carousel.Item>
                                    <Carousel.Item className="basis-auto">
                                        <CreditCard width={344} type="transparent" />
                                    </Carousel.Item>
                                </Carousel.Content>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between gap-4">
                                            <p className="text-sm font-medium text-white">This month</p>
                                            <span className="text-sm text-white">$1,240.40</span>
                                        </div>
                                        <ProgressBar value={58} className="bg-brand-secondary" progressClassName="bg-fg-brand-secondary" />
                                    </div>
                                    <CarouselIndicator size="lg" framed={false} isBrand />
                                </div>
                            </Carousel.Root>
                        </div>

                        <div className="flex flex-col gap-6 lg:gap-6">
                            <Tabs selectedKey="overview">
                                <TabList
                                    type="underline"
                                    items={[
                                        { id: "overview", label: "Overview" },
                                        { id: "budget", label: "Budget" },
                                        { id: "spending", label: "Spending" },
                                        { id: "rewards", label: "Rewards" },
                                    ]}
                                />
                            </Tabs>
                            <dl className="flex flex-col gap-4">
                                {[
                                    { label: "Current balance", value: "$1,240.40" },
                                    { label: "Current limit", value: "$15,000.00" },
                                    { label: "Budget this month", value: "$2,400.00" },
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between gap-4">
                                        <dt className="text-sm font-medium text-tertiary">{item.label}</dt>
                                        <dd className="text-display-xs font-semibold text-primary">{item.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="relative flex flex-col gap-4 border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Balances over time</p>
                                <ButtonGroup defaultSelectedKeys={["12-months"]}>
                                    <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                    <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                    <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                                </ButtonGroup>
                            </div>
                            <ResponsiveContainer className="h-60!">
                                <BarChart
                                    data={barData}
                                    margin={{
                                        left: 0,
                                        right: 0,
                                    }}
                                    className="text-tertiary [&_.recharts-text]:text-xs"
                                >
                                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                    <XAxis
                                        fill="currentColor"
                                        axisLine={false}
                                        tickLine={false}
                                        tickMargin={10}
                                        interval="preserveStartEnd"
                                        dataKey="date"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short" })}
                                    />

                                    <RechartsTooltip
                                        content={<ChartTooltipContent />}
                                        formatter={(value) => value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}
                                        labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                                        cursor={{
                                            className: "fill-utility-gray-200/20",
                                        }}
                                    />

                                    <Bar
                                        isAnimationActive={false}
                                        className={barChartColors["A"]}
                                        dataKey="A"
                                        name="Cash"
                                        type="monotone"
                                        stackId="a"
                                        fill="currentColor"
                                        maxBarSize={16}
                                    />
                                    <Bar
                                        isAnimationActive={false}
                                        className={barChartColors["B"]}
                                        dataKey="B"
                                        name="Savings"
                                        type="monotone"
                                        stackId="a"
                                        fill="currentColor"
                                        maxBarSize={16}
                                    />
                                    <Bar
                                        isAnimationActive={false}
                                        className={barChartColors["C"]}
                                        dataKey="C"
                                        name="Other"
                                        type="monotone"
                                        stackId="a"
                                        fill="currentColor"
                                        maxBarSize={16}
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="border-t border-secondary pt-4 lg:pt-5">
                                <Button size="md" color="secondary">
                                    View full report
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-8">
                        <div className="mx-auto w-full">
                            <div className="flex flex-col gap-6 rounded-xl ring-secondary ring-inset lg:gap-5 lg:p-6 lg:shadow-xs lg:ring-1">
                                <div className="flex flex-col gap-4 lg:gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-lg font-semibold text-primary">Total balance</p>
                                        <Button size="md" color="secondary">
                                            View report
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-display-sm font-semibold text-primary">$107,843.82</p>
                                        <BadgeWithIcon type="pill-color" color="success" iconLeading={ArrowUp}>
                                            7.2%
                                        </BadgeWithIcon>
                                    </div>
                                </div>
                                <div className="flex h-60 flex-col gap-2">
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
                                                    <stop offset="5%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0.7" />
                                                    <stop offset="95%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0" />
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
                                                formatter={(value) =>
                                                    value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
                                                }
                                                labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
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
                                                name="Cash"
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
                                                className={cx(
                                                    colors["B"],
                                                    "[&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]",
                                                )}
                                                dataKey="B"
                                                name="Savings"
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
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto flex w-full flex-col gap-4 md:flex-row md:flex-wrap lg:gap-6">
                            {[
                                { label: "Home deposit", value: "$64,240.60", icon: HomeSmile },
                                { label: "Holiday", value: "$2,220.42", icon: Umbrella03 },
                                { label: "Savings", value: "$41,382.80", icon: CoinsStacked01 },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="relative flex min-w-[216px] flex-1 flex-col gap-6 rounded-xl p-5 shadow-xs ring-1 ring-secondary ring-inset"
                                >
                                    <FeaturedIcon size="md" color="gray" theme="modern" icon={item.icon} className="hidden lg:inline-flex" />
                                    <div className="absolute top-5 right-4">
                                        <TableRowActionsDropdown />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-medium text-tertiary">{item.label}</p>
                                            <p className="text-display-xs font-semibold text-primary">{item.value}</p>
                                        </div>
                                        <ProgressBar value={57} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-6 overflow-x-clip lg:hidden">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Your cards</p>
                                <TableRowActionsDropdown />
                            </div>
                            <div className="shrink-0 overflow-x-clip rounded-xl bg-brand-700 p-5 shadow-xs">
                                <Carousel.Root className="flex flex-col gap-5">
                                    <Carousel.Content overflowHidden={false} className="gap-5">
                                        <Carousel.Item className="basis-auto">
                                            <CreditCard width={302} type="transparent" />
                                        </Carousel.Item>
                                        <Carousel.Item className="basis-auto">
                                            <CreditCard width={302} type="transparent-gradient" />
                                        </Carousel.Item>
                                        <Carousel.Item className="basis-auto">
                                            <CreditCard width={302} type="transparent" />
                                        </Carousel.Item>
                                    </Carousel.Content>

                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between gap-4">
                                                <p className="text-sm font-medium text-white">This month</p>
                                                <span className="text-sm text-white">$1,240.40</span>
                                            </div>
                                            <ProgressBar value={58} className="bg-brand-secondary" progressClassName="bg-fg-brand-secondary" />
                                        </div>
                                        <CarouselIndicator size="lg" framed={false} isBrand />
                                    </div>
                                </Carousel.Root>
                            </div>
                        </div>
                        <div className="mx-auto w-full">
                            <TableCard.Root className="shadow-none ring-0 lg:shadow-xs lg:ring-1">
                                <TableCard.Header
                                    title="Recent transactions"
                                    badge={
                                        <Badge type="modern" size="sm" className="max-xl:hidden">
                                            7 transactions
                                        </Badge>
                                    }
                                    contentTrailing={
                                        <div className="flex gap-3">
                                            <Button size="md" color="secondary" iconLeading={DownloadCloud02}>
                                                Download
                                            </Button>
                                            <Button size="md" color="secondary">
                                                View report
                                            </Button>
                                        </div>
                                    }
                                    className="px-0 pt-0 pb-6 md:px-6 md:pt-5 lg:pb-5"
                                />
                                <div className="hidden justify-between gap-3 border-b border-secondary py-3 lg:flex lg:px-4">
                                    <ButtonGroup defaultSelectedKeys={["all"]}>
                                        <ButtonGroupItem id="all">View all</ButtonGroupItem>
                                        <ButtonGroupItem id="monitored">Monitored</ButtonGroupItem>
                                        <ButtonGroupItem id="unmonitored">Unmonitored</ButtonGroupItem>
                                    </ButtonGroup>
                                    <Input size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} className="max-w-80" />
                                </div>
                                <div className="-mx-6 lg:-mx-0">
                                    <Table aria-label="Recent transactions" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                                        <Table.Header className="bg-transparent max-lg:hidden">
                                            <Table.Head id="merchant" label="Transaction" allowsSorting isRowHeader className="w-full" />
                                            <Table.Head id="amount" label="Amount" allowsSorting />
                                            <Table.Head id="dateTime" label="Date" allowsSorting className="max-lg:hidden" />
                                            <Table.Head id="paymentMethod" label="Account" className="min-w-55 max-lg:hidden" />
                                            <Table.Head id="action" />
                                        </Table.Header>
                                        <Table.Body items={sortedItems}>
                                            {(item) => (
                                                <Table.Row id={item.id}>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar size="md" src={item.avatarUrl} alt={item.merchant} initials={item.initials} />
                                                            <p className="text-sm font-medium text-nowrap text-primary">{item.merchant}</p>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className={cx("text-nowrap", item.amount > 0 && "text-success-primary")}>
                                                        {formatCurrency(item.amount)}
                                                    </Table.Cell>
                                                    <Table.Cell className="text-nowrap max-lg:hidden">{formatDateTime(item.dateTime)}</Table.Cell>
                                                    <Table.Cell className="max-lg:hidden">
                                                        <div className="flex items-center gap-3">
                                                            {item.paymentMethod.logo}
                                                            <div className="flex flex-col">
                                                                <p className="text-sm font-medium text-primary">
                                                                    {item.paymentMethod.type} {item.paymentMethod.last4}
                                                                </p>
                                                                <p className="text-sm text-nowrap text-tertiary">Expiry {item.paymentMethod.expiry}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4">
                                                        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </div>
                            </TableCard.Root>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
