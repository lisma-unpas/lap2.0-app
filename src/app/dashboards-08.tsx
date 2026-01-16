"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, DownloadCloud02, Edit01, FilterLines, SearchLg, Settings03, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ChartLegendContent, ChartTooltipContent } from "@/components/application/charts/charts-base";
import { CustomRadarChartTick } from "@/components/application/charts/radar-charts.demo";
import { PaginationCardMinimal } from "@/components/application/pagination/pagination";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

// Helper functions for formatting
const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

const movements = [
    {
        id: "vendor-01",
        vendor: {
            name: "Ephemeral",
            website: "ephemeral.io",
            logoUrl: "https://www.untitledui.com/logos/images/Ephemeral.jpg",
        },
        rating: 60,
        change: "5%",
        changeTrend: "positive",
        lastAssessed: new Date(2025, 0, 22).getTime(),
        categories: ["Active", "Customer data", "Admin", "+4"],
    },
    {
        id: "vendor-02",
        vendor: {
            name: "Stack3d Lab",
            website: "stack3dlab.com",
            logoUrl: "https://www.untitledui.com/logos/images/Stack3d Lab.jpg",
        },
        rating: 72,
        change: "4%",
        changeTrend: "negative",
        lastAssessed: new Date(2025, 0, 20).getTime(),
        categories: ["Active", "Business data", "Admin", "+4"],
    },
    {
        id: "vendor-03",
        vendor: {
            name: "Warpspeed",
            website: "getwarpspeed.com",
            logoUrl: "https://www.untitledui.com/logos/images/Warpspeed.jpg",
        },
        rating: 78,
        change: "6%",
        changeTrend: "positive",
        lastAssessed: new Date(2025, 0, 24).getTime(),
        categories: ["Active", "Customer data", "Financials"],
    },
    {
        id: "vendor-04",
        vendor: {
            name: "CloudWatch",
            website: "cloudwatch.app",
            logoUrl: "https://www.untitledui.com/logos/images/CloudWatch.jpg",
        },
        rating: 38,
        change: "8%",
        changeTrend: "positive",
        lastAssessed: new Date(2025, 0, 26).getTime(),
        categories: ["Active", "Database access", "Admin"],
    },
    {
        id: "vendor-05",
        vendor: {
            name: "ContrastAI",
            website: "contrastai.com",
            logoUrl: "https://www.untitledui.com/logos/images/ContrastAI.jpg",
        },
        rating: 42,
        change: "1%",
        changeTrend: "negative",
        lastAssessed: new Date(2025, 0, 18).getTime(),
        categories: ["Active", "Salesforce", "Admin", "+4"],
    },
    {
        id: "vendor-06",
        vendor: {
            name: "Convergence",
            website: "convergence.io",
            logoUrl: "https://www.untitledui.com/logos/images/Convergence.jpg",
        },
        rating: 66,
        change: "6%",
        changeTrend: "negative",
        lastAssessed: new Date(2025, 0, 28).getTime(),
        categories: ["Active", "Business data", "Admin", "+4"],
    },
    {
        id: "vendor-07",
        vendor: {
            name: "Sisyphus",
            website: "sisyphus.com",
            logoUrl: "https://www.untitledui.com/logos/images/Sisyphus.jpg",
        },
        rating: 91,
        change: "2%",
        changeTrend: "positive",
        lastAssessed: new Date(2025, 0, 16).getTime(),
        categories: ["Inactive", "Customer data", "Financials"],
    },
];

const radarData = [
    {
        subject: "Tier 1",
        A: 800,
        B: 400,
        C: 600,
    },
    {
        subject: "Tier 2",
        A: 600,
        B: 1000,
        C: 800,
    },
    {
        subject: "Tier 3",
        A: 600,
        B: 200,
        C: 400,
    },
    {
        subject: "Tier 4",
        A: 200,
        B: 600,
        C: 800,
    },
    {
        subject: "Tier 5",
        A: 400,
        B: 200,
        C: 600,
    },
    {
        subject: "Tier 6",
        A: 1000,
        B: 800,
        C: 600,
    },
    {
        subject: "Tier 7",
        A: 400,
        B: 1000,
        C: 800,
    },
];

const barData = [
    {
        date: "2025-01-01",
        A: 30,
        B: 20,
        C: 35,
    },
    {
        date: "2025-02-01",
        A: 32,
        B: 30,
        C: 30,
    },
    {
        date: "2025-03-01",
        A: 30,
        B: 20,
        C: 24,
    },
    {
        date: "2025-04-01",
        A: 24,
        B: 30,
        C: 28,
    },
    {
        date: "2025-05-01",
        A: 32,
        B: 28,
        C: 10,
    },
    {
        date: "2025-06-01",
        A: 33,
        B: 30,
        C: 13,
    },
    {
        date: "2025-07-01",
        A: 30,
        B: 20,
        C: 10,
    },
    {
        date: "2025-08-01",
        A: 35,
        B: 30,
        C: 20,
    },
    {
        date: "2025-09-01",
        A: 30,
        B: 20,
        C: 10,
    },
    {
        date: "2025-10-01",
        A: 20,
        B: 30,
        C: 28,
    },
    {
        date: "2025-11-01",
        A: 24,
        B: 30,
        C: 30,
    },
    {
        date: "2025-12-01",
        A: 20,
        B: 40,
        C: 35,
    },
];

const colors: Record<string, string> = {
    A: "text-utility-gray-200",
    B: "text-utility-brand-500",
    C: "text-utility-brand-700",
};

export const Dashboard08 = () => {
    const isDesktop = useBreakpoint("lg");

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return movements;

        return movements.toSorted((a, b) => {
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
                    <div className="mx-auto flex w-full max-w-container flex-col justify-between gap-4 px-4 lg:flex-row lg:px-8">
                        <p className="text-xl font-semibold text-primary lg:text-display-xs">Organization overview</p>
                        <div className="flex gap-3">
                            <Button size="md" color="tertiary" iconLeading={SearchLg} className="hidden lg:inline-flex" />
                            <Button size="md" color="secondary" iconLeading={FilterLines} className="hidden lg:inline-flex">
                                Filters
                            </Button>
                            <Button size="md" color="secondary" iconLeading={Settings03}>
                                Customize
                            </Button>
                            <Button size="md" color="secondary" iconLeading={DownloadCloud02}>
                                Export
                            </Button>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:flex-row lg:px-8">
                        <div className="flex flex-col rounded-xl shadow-xs ring-1 ring-secondary ring-inset lg:w-110">
                            <div className="flex flex-col gap-1 px-4 py-5 lg:p-6">
                                <div className="flex items-start justify-between pb-5">
                                    <p className="text-md font-semibold text-primary lg:text-lg">Vendor breakdown</p>
                                    <TableRowActionsDropdown />
                                </div>
                                <ResponsiveContainer className="relative min-h-[295.13px] lg:min-h-93">
                                    <RadarChart
                                        cy="54%"
                                        outerRadius="86%"
                                        data={radarData}
                                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                        className="font-medium text-tertiary [&_.recharts-polar-grid]:text-utility-gray-100 [&_.recharts-text]:text-sm"
                                    >
                                        <PolarGrid stroke="currentColor" className="text-utility-gray-100" />
                                        <PolarAngleAxis
                                            dataKey="subject"
                                            stroke="currentColor"
                                            tick={({ x, y, textAnchor, index, payload, ...props }) => (
                                                <text
                                                    x={x}
                                                    y={index === 0 ? (y as number) - 14 : index === 3 || index === 4 ? (y as number) + 10 : (y as number)}
                                                    textAnchor={textAnchor}
                                                    {...props}
                                                    className={cx("recharts-text recharts-polar-angle-axis-tick-value", props.className)}
                                                >
                                                    <tspan dy="0em" className="fill-utility-gray-700 text-xs font-medium lg:text-sm">
                                                        {payload.value}
                                                    </tspan>
                                                </text>
                                            )}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <PolarRadiusAxis
                                            textAnchor="middle"
                                            tick={(props) => <CustomRadarChartTick {...props} />}
                                            tickCount={6}
                                            axisLine={false}
                                            angle={90}
                                            domain={[0, 1000]}
                                        />

                                        <RechartsTooltip
                                            content={<ChartTooltipContent />}
                                            cursor={{
                                                className: "stroke-utility-brand-600  stroke-2",
                                                style: {
                                                    transform: "translateZ(0)",
                                                },
                                            }}
                                        />

                                        <Radar
                                            isAnimationActive={false}
                                            className="text-utility-brand-600"
                                            dataKey="A"
                                            name="Series 1"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            fill="currentColor"
                                            fillOpacity={0.2}
                                            activeDot={{
                                                className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                            }}
                                        />
                                        <Radar
                                            isAnimationActive={false}
                                            className="text-utility-pink-500"
                                            dataKey="B"
                                            name="Series 2"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            fill="currentColor"
                                            fillOpacity={0.2}
                                            activeDot={{
                                                className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                            }}
                                        />
                                        <Radar
                                            isAnimationActive={false}
                                            className="text-utility-blue-light-500"
                                            dataKey="C"
                                            name="Series 3"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinejoin="round"
                                            fill="currentColor"
                                            fillOpacity={0.2}
                                            activeDot={{
                                                className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                            }}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-end border-t border-secondary px-4 py-3 lg:px-6 lg:py-4">
                                <Button size="md" color="secondary">
                                    View full report
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-1 rounded-xl px-4 py-5 shadow-xs ring-1 ring-secondary ring-inset lg:p-6">
                            <div className="flex items-start justify-between pb-5">
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-md font-semibold text-primary lg:text-lg">Average vendor rating</p>
                                    <p className="text-sm text-tertiary">Track how your rating compares to your industry average.</p>
                                </div>
                                <TableRowActionsDropdown />
                            </div>
                            <ResponsiveContainer className="min-h-70.5">
                                <BarChart
                                    data={barData}
                                    margin={{
                                        left: 4,
                                        right: 0,
                                        bottom: isDesktop ? 16 : 0,
                                    }}
                                    className="text-tertiary [&_.recharts-text]:text-xs"
                                >
                                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                    <Legend
                                        itemSorter="dataKey"
                                        verticalAlign="top"
                                        align="right"
                                        layout="horizontal"
                                        content={({ payload, ...props }) => <ChartLegendContent {...props} payload={payload} />}
                                    />

                                    <XAxis
                                        fill="currentColor"
                                        axisLine={false}
                                        tickLine={false}
                                        tickMargin={2}
                                        interval="preserveStartEnd"
                                        dataKey="date"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short" })}
                                    >
                                        {isDesktop && <Label value="Month" fill="currentColor" className="!text-xs font-medium" position="bottom" />}
                                    </XAxis>

                                    <YAxis hide={!isDesktop} domain={[0, 100]} fill="currentColor" axisLine={false} tickLine={false}>
                                        <Label
                                            value="Security rating"
                                            fill="currentColor"
                                            className="!text-xs font-medium"
                                            style={{ textAnchor: "middle" }}
                                            angle={-90}
                                            position="insideLeft"
                                        />
                                    </YAxis>

                                    <RechartsTooltip
                                        content={<ChartTooltipContent />}
                                        labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                                        cursor={{
                                            className: "fill-utility-gray-200/20",
                                        }}
                                    />

                                    <Bar
                                        isAnimationActive={false}
                                        className={colors["C"]}
                                        dataKey="C"
                                        name="Your rating"
                                        type="monotone"
                                        stackId="a"
                                        fill="currentColor"
                                        maxBarSize={isDesktop ? 32 : 16}
                                    />
                                    <Bar
                                        isAnimationActive={false}
                                        className={colors["B"]}
                                        dataKey="B"
                                        name="Industry Average"
                                        type="monotone"
                                        stackId="a"
                                        fill="currentColor"
                                        maxBarSize={isDesktop ? 32 : 16}
                                    />
                                    <Bar
                                        isAnimationActive={false}
                                        className={colors["A"]}
                                        dataKey="A"
                                        name="Other"
                                        type="monotone"
                                        stackId="a"
                                        fill="currentColor"
                                        maxBarSize={isDesktop ? 32 : 16}
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-4 px-4 lg:gap-6 lg:px-8">
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-lg font-semibold text-primary">Vendor movements</p>
                                <p className="text-sm text-tertiary">Keep track of vendors and their security ratings.</p>
                            </div>
                            <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="sm" className="hidden w-80 lg:inline-flex" />
                        </div>
                        <div className="flex flex-col gap-3 lg:hidden">
                            <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="sm" />
                            <Button iconLeading={FilterLines} size="md" color="secondary">
                                Filters
                            </Button>
                        </div>

                        <TableCard.Root className="-mx-4 mt-2 rounded-none lg:mx-0 lg:mt-0 lg:rounded-xl">
                            <Table
                                aria-label="Trades"
                                selectionMode="multiple"
                                defaultSelectedKeys={["vendor-01", "vendor-02", "vendor-03", "vendor-06", "vendor-07"]}
                                sortDescriptor={sortDescriptor}
                                onSortChange={setSortDescriptor}
                            >
                                <Table.Header className="bg-primary">
                                    <Table.Head id="vendor" isRowHeader allowsSorting label="Vendor" className="w-full" />
                                    <Table.Head id="rating" label="Rating" className="min-w-30 lg:min-w-70 lg:pl-3" />
                                    <Table.Head id="change" />
                                    <Table.Head id="lastAssessed" label="Last assessed" />
                                    <Table.Head id="categories" label="Categories" />
                                    <Table.Head id="actions" />
                                </Table.Header>
                                <Table.Body items={sortedItems}>
                                    {(movement) => (
                                        <Table.Row id={movement.id} highlightSelectedRow={false}>
                                            <Table.Cell className="lg:px-0">
                                                <div className="group flex items-center gap-3">
                                                    <Avatar src={movement.vendor.logoUrl} alt={movement.vendor.name} size="md" />
                                                    <div>
                                                        <p className="text-sm font-medium text-primary">{movement.vendor.name}</p>
                                                        <p className="text-sm text-tertiary">{movement.vendor.website}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="lg:pl-3">
                                                <div className="flex items-center gap-3">
                                                    <ProgressBar min={0} max={100} value={movement.rating} />
                                                    <span className="hidden text-sm font-medium text-secondary lg:inline">{movement.rating}</span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithIcon
                                                    iconLeading={movement.changeTrend === "positive" ? ArrowUp : ArrowDown}
                                                    size="sm"
                                                    type="pill-color"
                                                    color={movement.changeTrend === "positive" ? "success" : "error"}
                                                >
                                                    {movement.change}
                                                </BadgeWithIcon>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">{formatDate(movement.lastAssessed)}</Table.Cell>
                                            <Table.Cell>
                                                <div className="flex gap-1">
                                                    {movement.categories.map((category) =>
                                                        category === "Active" || category === "Inactive" ? (
                                                            <BadgeWithDot
                                                                key={category}
                                                                size="sm"
                                                                type="pill-color"
                                                                color={category === "Active" ? "success" : "gray"}
                                                                className="capitalize"
                                                            >
                                                                {category}
                                                            </BadgeWithDot>
                                                        ) : (
                                                            <Badge
                                                                key={category}
                                                                size="sm"
                                                                type="pill-color"
                                                                color={
                                                                    category === "Customer data"
                                                                        ? "blue"
                                                                        : category === "Admin"
                                                                          ? "indigo"
                                                                          : category === "Business data"
                                                                            ? "brand"
                                                                            : category === "Financials"
                                                                              ? "pink"
                                                                              : "gray"
                                                                }
                                                            >
                                                                {category}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="px-4">
                                                <div className="flex justify-end gap-0.5">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                            <PaginationCardMinimal page={1} total={10} align="center" />
                        </TableCard.Root>
                    </div>
                </div>
            </main>
        </div>
    );
};
