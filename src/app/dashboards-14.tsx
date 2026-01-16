"use client";

import { Edit01, Plus, RefreshCcw02, SearchLg } from "@untitledui/icons";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
} from "recharts";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { Table, TableRowActionsDropdown } from "@/components/application/table/table";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dot } from "@/components/foundations/dot-icon";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

// Helper functions for formatting
const formatCurrency = (amount: number): string => {
    const formatted = Math.abs(amount).toLocaleString("en-US", { style: "currency", currency: "USD" });

    return amount >= 0 ? `+ ${formatted}` : `- ${formatted}`;
};

const formatDateTime = (date: number): string =>
    new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

const transactions = [
    {
        id: "transaction-01",
        merchant: "Spotify",
        amount: -18.99,
        dateTime: new Date(2025, 1, 5, 13, 0, 0).getTime(),
    },
    {
        id: "transaction-02",
        merchant: "A Coffee",
        amount: -4.5,
        dateTime: new Date(2025, 1, 5, 7, 20, 0).getTime(),
    },
    {
        id: "transaction-03",
        merchant: "Stripe",
        amount: 88.0,
        dateTime: new Date(2025, 1, 5, 2, 45, 0).getTime(),
    },
    {
        id: "transaction-04",
        merchant: "Figma",
        amount: -15.0,
        dateTime: new Date(2025, 1, 5, 18, 10, 0).getTime(),
    },
    {
        id: "transaction-05",
        merchant: "TBF Bakery",
        amount: -12.5,
        dateTime: new Date(2025, 1, 4, 7, 52, 0).getTime(),
    },
    {
        id: "transaction-06",
        merchant: "Fresh F&V",
        amount: -40.2,
        dateTime: new Date(2025, 1, 4, 12, 15, 0).getTime(),
    },
    {
        id: "transaction-07",
        merchant: "Stripe",
        amount: 88.0,
        dateTime: new Date(2025, 1, 4, 5, 40, 0).getTime(),
    },
    {
        id: "transaction-08",
        merchant: "Rosso Antico",
        amount: -80.0,
        dateTime: new Date(2025, 1, 2, 8, 10, 0).getTime(),
    },
    {
        id: "transaction-09",
        merchant: "P&Vs Wine",
        amount: -32.0,
        dateTime: new Date(2025, 1, 2, 7, 5, 0).getTime(),
    },
    {
        id: "transaction-10",
        merchant: "Cherry Moon",
        amount: -16.5,
        dateTime: new Date(2025, 1, 2, 12, 52, 0).getTime(),
    },
];

const lineData = [
    {
        date: "2025-01-01",
        A: 600,
        B: 350,
    },
    {
        date: "2025-02-01",
        A: 620,
        B: 370,
    },
    {
        date: "2025-03-01",
        A: 630,
        B: 380,
    },
    {
        date: "2025-04-01",
        A: 650,
        B: 400,
    },
    {
        date: "2025-05-01",
        A: 600,
        B: 350,
    },
    {
        date: "2025-06-01",
        A: 650,
        B: 400,
    },
    {
        date: "2025-07-01",
        A: 620,
        B: 370,
    },
    {
        date: "2025-08-01",
        A: 750,
        B: 500,
    },
    {
        date: "2025-09-01",
        A: 780,
        B: 530,
    },
    {
        date: "2025-10-01",
        A: 750,
        B: 500,
    },
    {
        date: "2025-11-01",
        A: 780,
        B: 530,
    },
    {
        date: "2025-12-01",
        A: 820,
        B: 570,
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

const radialData = [
    {
        name: "Current period",
        value: 774,
        className: "text-utility-brand-600",
    },
    {
        name: "Previous period",
        value: 866,
        className: "text-utility-brand-700",
    },
];

const size = {
    innerRadius: 80,
    outerRadius: 122,

    titleDY: "1.2em",
    subtitleDY: "-1.6em",

    title: "text-display-sm font-semibold",
    subtitle: "text-sm font-medium",
};

const barChartColors: Record<string, string> = {
    A: "text-utility-brand-700",
    B: "text-utility-brand-500",
    C: "text-utility-gray-200",
};

export const Dashboard14 = () => {
    const isDesktop = useBreakpoint("lg");

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

            <main className="pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    {/* Page header */}
                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-4 lg:flex-row">
                            <div className="flex flex-col gap-0.5 lg:gap-1">
                                <p className="text-xl font-semibold text-primary lg:text-display-xs">Your cards</p>
                                <p className="text-md text-tertiary">Welcome back, Olivia!</p>
                            </div>
                            <div className="flex gap-3">
                                <Button size="md" color="secondary" iconLeading={RefreshCcw02}>
                                    Sync accounts
                                </Button>
                                <Button size="md">Add card</Button>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-x-16 gap-y-8 px-4 lg:flex-row lg:gap-y-12 lg:px-8">
                        <div className="flex flex-col gap-8 lg:w-100">
                            <div className="relative flex h-53.5 lg:h-58">
                                <div className="absolute top-6 left-6 z-1 lg:top-14 lg:left-18">
                                    <CreditCard width={316} type="transparent-gradient" cardHolder="OLIVIA RHYE" className="lg:hidden" />
                                    <CreditCard width={272} type="transparent-gradient" cardHolder="OLIVIA RHYE" className="max-lg:hidden" />
                                </div>
                                <div className="absolute z-0 lg:bottom-[33px] lg:left-4.5 lg:rotate-[345deg]">
                                    <CreditCard width={316} type="gradient-strip" cardHolder="OLIVIA RHYE" className="lg:hidden" />
                                    <CreditCard width={272} type="gradient-strip" cardHolder="OLIVIA RHYE" className="max-lg:hidden" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 lg:gap-5">
                                <div className="flex items-start justify-between">
                                    <p className="text-lg font-semibold text-primary">Recent transactions</p>
                                    <TableRowActionsDropdown />
                                </div>
                                <div className="relative flex flex-col gap-4 after:pointer-events-none after:absolute after:inset-0 after:border-t after:border-secondary">
                                    <Table aria-label="Recent transactions">
                                        <Table.Header className="hidden">
                                            <Table.Head id="merchant" isRowHeader className="w-full" />
                                            <Table.Head id="date" />
                                            <Table.Head id="action" />
                                        </Table.Header>
                                        <Table.Body items={transactions} className="border-b border-secondary">
                                            {(item) => (
                                                <Table.Row id={item.id}>
                                                    <Table.Cell className="w-full px-0">
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-medium text-nowrap text-primary">{item.merchant}</p>
                                                            <p className={cx("text-sm text-nowrap text-tertiary", item.amount > 0 && "text-success-primary")}>
                                                                {formatCurrency(item.amount)}
                                                            </p>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="text-sm text-nowrap text-tertiary">{formatDateTime(item.dateTime)}</Table.Cell>
                                                    <Table.Cell className="pr-0 pl-4">
                                                        <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                    <div className="flex justify-end">
                                        <Button size="md" color="link-color">
                                            View all transactions
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-5 lg:flex-row lg:items-center">
                                    <p className="text-lg font-semibold text-primary">Monthly spending</p>
                                    <ButtonGroup defaultSelectedKeys={["this-month"]} className="hidden lg:flex">
                                        <ButtonGroupItem
                                            id="this-month"
                                            iconLeading={<Dot className="mx-[3px] size-2 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}
                                        >
                                            This month
                                        </ButtonGroupItem>
                                        <ButtonGroupItem id="last-month">Last month</ButtonGroupItem>
                                        <ButtonGroupItem id="custom" iconLeading={Plus} className="gap-x-2">
                                            Custom
                                        </ButtonGroupItem>
                                    </ButtonGroup>
                                    <ButtonGroup defaultSelectedKeys={["this-month"]} className="lg:hidden">
                                        <ButtonGroupItem
                                            id="this-month"
                                            iconLeading={<Dot className="mx-[3px] size-2 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}
                                        >
                                            This month
                                        </ButtonGroupItem>
                                        <ButtonGroupItem id="last-month">Last month</ButtonGroupItem>
                                        <ButtonGroupItem id="custom" iconLeading={Plus} className="inline-flex lg:hidden" aria-label="Custom" />
                                    </ButtonGroup>
                                </div>
                                <div className="flex flex-col flex-wrap gap-6 lg:flex-row lg:items-center lg:gap-8">
                                    <div className="h-60 w-60">
                                        <ResponsiveContainer>
                                            <RadialBarChart
                                                data={radialData}
                                                accessibilityLayer
                                                innerRadius={size.innerRadius}
                                                outerRadius={size.outerRadius}
                                                // This is needed to start the chart at the top and go clockwise
                                                startAngle={90}
                                                endAngle={360 + 90}
                                                className="font-medium text-tertiary [&_.recharts-polar-grid]:text-utility-gray-100 [&_.recharts-text]:text-sm"
                                            >
                                                <PolarAngleAxis tick={false} domain={[0, 1000]} type="number" reversed />

                                                <RechartsTooltip
                                                    content={<ChartTooltipContent isRadialChart />}
                                                    formatter={(value) =>
                                                        value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
                                                    }
                                                />

                                                <RadialBar
                                                    isAnimationActive={false}
                                                    dataKey="value"
                                                    cornerRadius={99}
                                                    fill="currentColor"
                                                    background={{
                                                        className: "fill-utility-gray-100",
                                                    }}
                                                />

                                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x="50%" dy={size.subtitleDY} className={cx("fill-current text-tertiary", size.subtitle)}>
                                                        Total
                                                    </tspan>
                                                    <tspan x="50%" dy={size.titleDY} className={cx("fill-current text-primary", size.title)}>
                                                        $2,280
                                                    </tspan>
                                                </text>
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <dl className="grid grid-cols-2 gap-x-2 gap-y-6 lg:grid-cols-[repeat(3,auto)] lg:gap-8">
                                        <div className="flex gap-2">
                                            <span className="mt-1 size-2.5 rounded-full bg-blue-500"></span>
                                            <div className="flex flex-col gap-1">
                                                <dt className="text-sm font-medium text-tertiary">Subscriptions</dt>
                                                <dd className="text-display-xs font-semibold text-primary">$148.40</dd>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="mt-1 size-2.5 rounded-full bg-indigo-500"></span>
                                            <div className="flex flex-col gap-1">
                                                <dt className="text-sm font-medium text-tertiary">Groceries</dt>
                                                <dd className="text-display-xs font-semibold text-primary">$642.48</dd>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="mt-1 size-2.5 rounded-full bg-pink-500"></span>
                                            <div className="flex flex-col gap-1">
                                                <dt className="text-sm font-medium text-tertiary">Food and dining</dt>
                                                <dd className="text-display-xs font-semibold text-primary">$614.16</dd>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="mt-1 size-2.5 rounded-full bg-success-500"></span>
                                            <div className="flex flex-col gap-1">
                                                <dt className="text-sm font-medium text-tertiary">Investing</dt>
                                                <dd className="text-display-xs font-semibold text-primary">$290.00</dd>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="mt-1 size-2.5 rounded-full bg-warning-500"></span>
                                            <div className="flex flex-col gap-1">
                                                <dt className="text-sm font-medium text-tertiary">Mortgage</dt>
                                                <dd className="text-display-xs font-semibold text-primary">$824.28</dd>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="mt-1 size-2.5 rounded-full bg-gray-blue-500"></span>
                                            <div className="flex flex-col gap-1">
                                                <dt className="text-sm font-medium text-tertiary">Other</dt>
                                                <dd className="text-display-xs font-semibold text-primary">$48.44</dd>
                                            </div>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-5 lg:flex-row lg:items-center">
                                    <p className="text-lg font-semibold text-primary">Balance over time</p>
                                    <ButtonGroup defaultSelectedKeys={["12-months"]}>
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
                                                left: 5,
                                                right: 5,
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="currentColor" className="text-utility-gray-500" stopOpacity="0.8" />
                                                    <stop offset="80%" stopColor="currentColor" className="text-utility-gray-500" stopOpacity="0" />
                                                </linearGradient>

                                                <pattern id="verticalLines" width="8" height="100%" fill="url(#gradient)" patternUnits="userSpaceOnUse">
                                                    <line
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="100%"
                                                        stroke="currentColor"
                                                        className="text-utility-gray-200"
                                                        strokeWidth="1.5"
                                                    />
                                                    <rect width="100%" height="100%" fill="url(#gradient)" fillOpacity={0.15} />
                                                </pattern>
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
                                                className="text-utility-brand-600 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                                dataKey="A"
                                                name="Cash"
                                                type="monotone"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                fill="url(#verticalLines)"
                                                activeDot={{
                                                    className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                                }}
                                            />

                                            <Area
                                                isAnimationActive={false}
                                                className="text-utility-brand-400 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                                dataKey="B"
                                                name="Savings"
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
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-5 lg:flex-row lg:items-center">
                                    <p className="text-lg font-semibold text-primary">Spending over time</p>
                                    <ButtonGroup defaultSelectedKeys={["12-months"]}>
                                        <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                        <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                        <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                                    </ButtonGroup>
                                </div>
                                <ResponsiveContainer className="h-60!">
                                    <BarChart
                                        data={barData}
                                        className="text-tertiary [&_.recharts-text]:text-xs"
                                        margin={{
                                            left: 0,
                                            right: 0,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                        <XAxis
                                            fill="currentColor"
                                            axisLine={false}
                                            tickLine={false}
                                            tickMargin={10}
                                            interval="preserveStartEnd"
                                            dataKey="date"
                                            tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short" })}
                                        />

                                        <RechartsTooltip
                                            content={<ChartTooltipContent />}
                                            formatter={(value) =>
                                                value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
                                            }
                                            labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                                            cursor={{
                                                className: "fill-utility-gray-200/20",
                                            }}
                                        />

                                        <Bar
                                            isAnimationActive={false}
                                            className={barChartColors["A"]}
                                            dataKey="A"
                                            name="Subscriptions"
                                            type="monotone"
                                            stackId="a"
                                            fill="currentColor"
                                            maxBarSize={isDesktop ? 32 : 16}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            className={barChartColors["B"]}
                                            dataKey="B"
                                            name="Groceries"
                                            type="monotone"
                                            stackId="a"
                                            fill="currentColor"
                                            maxBarSize={isDesktop ? 32 : 16}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            className={barChartColors["C"]}
                                            dataKey="C"
                                            name="Food and dining"
                                            type="monotone"
                                            stackId="a"
                                            fill="currentColor"
                                            maxBarSize={isDesktop ? 32 : 16}
                                            radius={isDesktop ? [6, 6, 0, 0] : [4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
