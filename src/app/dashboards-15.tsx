"use client";

import { FileIcon } from "@untitledui/file-icons";
import { DownloadCloud02, Edit01, Plus, SearchLg } from "@untitledui/icons";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label as RechartsLabel, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis } from "recharts";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Table, TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";

// Helper functions for formatting
const formatCurrency = (amount: number): string => amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

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

const receipts = [
    {
        id: "receipt-01",
        merchant: "Spotify",
        fileType: "pdf-simple",
        amount: 18.99,
        fileSize: "200 KB",
        category: (
            <BadgeWithDot size="sm" type="modern" color="blue">
                Subscriptions
            </BadgeWithDot>
        ),
        paymentMethod: {
            type: "Visa",
            logo: <VisaIcon className="h-8 w-11.5" />,
            cardType: "Debit card",
            last4: "1234",
        },
    },
    {
        id: "receipt-02",
        merchant: "A Coffee",
        fileType: "image",
        amount: 4.5,
        fileSize: "220 KB",
        category: (
            <BadgeWithDot size="sm" type="modern" color="pink">
                Dining
            </BadgeWithDot>
        ),
        paymentMethod: {
            type: "Visa",
            logo: <VisaIcon className="h-8 w-11.5" />,
            cardType: "Debit card",
            last4: "1234",
        },
    },
    {
        id: "receipt-03",
        merchant: "Rosso Antico",
        fileType: "image",
        amount: 88.0,
        fileSize: "192 KB",
        category: (
            <Badge size="sm" color="gray" type="modern">
                Uncategorized
            </Badge>
        ),
        paymentMethod: {
            type: "Mastercard",
            logo: <MastercardIcon className="h-8 w-11.5" />,
            cardType: "Credit card",
            last4: "5678",
        },
    },
    {
        id: "receipt-04",
        merchant: "Figma",
        fileType: "pdf-simple",
        amount: 15.0,
        fileSize: "216 KB",
        category: (
            <BadgeWithDot size="sm" type="modern" color="blue">
                Subscriptions
            </BadgeWithDot>
        ),
        paymentMethod: {
            type: "Visa",
            logo: <VisaIcon className="h-8 w-11.5" />,
            cardType: "Debit card",
            last4: "1234",
        },
    },
    {
        id: "receipt-05",
        merchant: "TBF Bakery",
        fileType: "image",
        amount: 12.5,
        fileSize: "420 KB",
        category: (
            <BadgeWithDot size="sm" type="modern" color="pink">
                Dining
            </BadgeWithDot>
        ),
        paymentMethod: {
            type: "Visa",
            logo: <VisaIcon className="h-8 w-11.5" />,
            cardType: "Debit card",
            last4: "1234",
        },
    },
    {
        id: "receipt-06",
        merchant: "Fresh F&V",
        fileType: "image",
        amount: 40.2,
        fileSize: "512 KB",
        category: (
            <BadgeWithDot size="sm" type="modern" color="indigo">
                Groceries
            </BadgeWithDot>
        ),
        paymentMethod: {
            type: "Visa",
            logo: <VisaIcon className="h-8 w-11.5" />,
            cardType: "Debit card",
            last4: "1234",
        },
    },
    {
        id: "receipt-07",
        merchant: "Webflow",
        fileType: "pdf-simple",
        amount: 192.0,
        fileSize: "196 KB",
        category: (
            <Badge size="sm" color="gray" type="modern">
                Uncategorized
            </Badge>
        ),
        paymentMethod: {
            type: "Mastercard",
            logo: <MastercardIcon className="h-8 w-11.5" />,
            cardType: "Credit card",
            last4: "5678",
        },
    },
];

const barChartColors: Record<string, string> = {
    A: "text-utility-brand-700",
    B: "text-utility-brand-500",
    C: "text-utility-gray-200",
};

export const Dashboard15 = () => {
    return (
        <div className="bg-primary">
            <HeaderNavigationBase
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        current: true,
                        items: [
                            { label: "Overview", href: "#", current: true },
                            { label: "Notifications", href: "#" },
                            { label: "Analytics", href: "#" },
                            { label: "Your cards", href: "#", current: true },
                            { label: "Scheduled reports", href: "#" },
                            { label: "User reports", href: "#" },
                        ],
                    },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
            />

            <main className="pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    {/* Page header */}
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 border-secondary lg:flex-row lg:border-b lg:pb-4">
                            <div className="flex flex-col gap-0.5 lg:gap-1">
                                <p className="text-xl font-semibold text-primary lg:text-display-xs">Your cards</p>
                                <p className="text-md text-tertiary">Welcome back, Olivia!</p>
                            </div>
                            <Input size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} className="lg:hidden" />
                        </div>
                    </div>

                    <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-8 px-4 lg:grid-cols-[auto_auto_1fr] lg:px-8">
                        <div className="flex w-full flex-1 flex-col gap-8 lg:w-87">
                            <div className="hidden flex-col gap-0.5 border-b border-secondary pb-5 lg:flex">
                                <p className="text-lg font-semibold text-primary">Overview</p>
                                <p className="text-sm text-tertiary">Manage and track your card spending.</p>
                            </div>
                            <div className="relative flex h-75.5 w-full items-center justify-center rounded-2xl bg-quaternary md:rounded-[20px]">
                                <div className="absolute top-4 right-3">
                                    <TableRowActionsDropdown />
                                </div>

                                <div className="translate-y-3 -space-y-[179px] lg:-space-y-[183px]">
                                    <div
                                        className="relative z-4"
                                        style={{
                                            transform: "rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)",
                                        }}
                                    >
                                        <CreditCard width={374} type="transparent-gradient" cardHolder="Lana Steiner" className="w-93.5 lg:hidden" />
                                        <CreditCard width={382} type="transparent-gradient" cardHolder="Lana Steiner" className="max-lg:hidden" />
                                    </div>
                                    <div
                                        className="relative z-3"
                                        style={{
                                            transform: "rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)",
                                        }}
                                    >
                                        <CreditCard width={374} type="salmon-strip-vertical" cardHolder="Olivia Rhye" className="lg:hidden" />
                                        <CreditCard width={382} type="salmon-strip-vertical" cardHolder="Olivia Rhye" className="max-lg:hidden" />
                                    </div>
                                    <div
                                        className="relative z-1"
                                        style={{
                                            transform: "rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)",
                                        }}
                                    >
                                        <CreditCard width={374} type="gray-dark" cardHolder="Phoenix Baker" className="lg:hidden" />
                                        <CreditCard width={382} type="gray-dark" cardHolder="Phoenix Baker" className="max-lg:hidden" />
                                    </div>
                                    <div
                                        className="relative z-0"
                                        style={{
                                            transform: "rotateX(63deg) rotateY(1deg) rotateZ(51deg) skewX(14deg)",
                                        }}
                                    >
                                        <div className="h-56 w-93.5 rounded-2xl bg-gray-900 opacity-15 blur-md lg:h-57.5 lg:w-95.5"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px w-full"></div>
                            <div className="flex flex-col gap-6 lg:gap-5">
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
                                        { label: "Current balance", value: "$1,440.40" },
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
                                <div className="flex flex-col gap-4 border-b border-secondary pb-5">
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
                                            radius={[6, 6, 0, 0]}
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

                        <div className="hidden h-full w-px bg-border-secondary lg:block"></div>

                        <div className="hidden flex-col gap-8 lg:flex">
                            <div className="flex flex-col gap-6">
                                <div className="relative flex flex-col items-start gap-4 border-b border-secondary pb-5 xl:flex-row">
                                    <div className="flex flex-1 flex-col gap-0.5">
                                        <p className="text-lg font-semibold text-primary">Balance over time</p>
                                        <p className="text-sm text-tertiary">Compare spending over time.</p>
                                    </div>
                                    <ButtonGroup defaultSelectedKeys={["12-months"]}>
                                        <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                        <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                        <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                                    </ButtonGroup>
                                    <div className="top-0 right-0 lg:absolute xl:static">
                                        <TableRowActionsDropdown />
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
                                            >
                                                <RechartsLabel value="Month" fill="currentColor" className="text-xs font-medium" position="bottom" />
                                            </XAxis>

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
                                                name="This month"
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
                                                name="Last month"
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
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between gap-4 border-b border-secondary pb-5">
                                    <p className="text-lg font-semibold text-primary">Receipts</p>
                                    <div className="flex gap-3">
                                        <Button size="md" color="secondary" iconLeading={DownloadCloud02}>
                                            Export
                                        </Button>
                                        <Button size="md" iconLeading={Plus}>
                                            Add
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <FileUpload.Root>
                                        <FileUpload.DropZone />
                                    </FileUpload.Root>
                                    <div>
                                        <Table aria-label="Receipts">
                                            <Table.Header className="bg-primary">
                                                <Table.Head id="merchant" label="Merchant" isRowHeader className="w-full min-w-43 px-0" />
                                                <Table.Head id="amount" label="Amount" />
                                                <Table.Head id="category" label="Category" tooltip="Auto-scanned" className="max-xl:hidden" />
                                                <Table.Head id="account" label="Account" tooltip="Auto-scanned" className="max-xl:hidden" />
                                                <Table.Head id="action" />
                                            </Table.Header>
                                            <Table.Body items={receipts}>
                                                {(item) => (
                                                    <Table.Row id={item.id}>
                                                        <Table.Cell className="w-full px-0">
                                                            <div className="flex items-center gap-3">
                                                                <FileIcon type={item.fileType} variant="solid" className="size-10" />
                                                                <div className="flex flex-col">
                                                                    <p className="text-sm font-medium text-nowrap text-primary">{item.merchant}</p>
                                                                    <p className="text-sm text-nowrap text-tertiary">{item.fileSize}</p>
                                                                </div>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell className="text-sm text-nowrap text-tertiary">{formatCurrency(item.amount)}</Table.Cell>
                                                        <Table.Cell className="max-xl:hidden">{item.category}</Table.Cell>
                                                        <Table.Cell className="max-xl:hidden">
                                                            <div className="flex items-center gap-3">
                                                                {item.paymentMethod.logo}
                                                                <div className="flex flex-col">
                                                                    <p className="text-sm font-medium text-nowrap text-primary">
                                                                        {item.paymentMethod.cardType}
                                                                    </p>
                                                                    <p className="text-sm text-nowrap text-tertiary">Ends in {item.paymentMethod.last4}</p>
                                                                </div>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell className="pr-0 pl-4">
                                                            <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )}
                                            </Table.Body>
                                        </Table>
                                        <div className="border-t border-secondary pt-5">
                                            <Button size="md" color="secondary">
                                                View full report
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
