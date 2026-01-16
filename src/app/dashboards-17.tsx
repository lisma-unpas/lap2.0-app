"use client";

import { Plus, SearchLg, TrendDown01, TrendUp01 } from "@untitledui/icons";
import { Tab as AriaTab, TabList as AriaTabList, Tabs as AriaTabs } from "react-aria-components";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Pie,
    PieChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    XAxis,
} from "recharts";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ChartLegendContent, ChartTooltipContent, selectEvenlySpacedItems } from "@/components/application/charts/charts-base";
import { CustomRadarChartTick } from "@/components/application/charts/radar-charts.demo";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

interface Tab {
    label: string;
    value: string;
    trend: "positive" | "negative";
    change: string;
}

const LargeTab = ({ label, value, trend, change }: Tab) => {
    return (
        <AriaTab className="relative inline-flex min-w-36 flex-1 cursor-pointer pb-6 whitespace-nowrap focus:outline-hidden">
            {({ isSelected }) => (
                <>
                    <div className="flex w-full flex-col gap-2">
                        <p className="text-sm font-medium text-tertiary">{label}</p>
                        <div className="flex items-center gap-4">
                            <p className="text-display-xs font-semibold text-primary lg:text-display-sm">{value}</p>
                            <BadgeWithIcon
                                iconLeading={trend === "positive" ? TrendUp01 : TrendDown01}
                                type="color"
                                size="md"
                                color={trend === "positive" ? "success" : "error"}
                            >
                                {change}
                            </BadgeWithIcon>
                        </div>
                    </div>

                    {isSelected && <div className="absolute bottom-0 left-0 h-1 w-full bg-fg-brand-primary_alt"></div>}
                </>
            )}
        </AriaTab>
    );
};

const chartData = [
    { A: 508, B: 448, date: "2025-01-03T18:54:25.108Z" },
    { A: 512, B: 452, date: "2025-01-06T14:48:50.217Z" },
    { A: 445, B: 385, date: "2025-01-09T10:43:15.325Z" },
    { A: 475, B: 415, date: "2025-01-12T06:37:40.434Z" },
    { A: 417, B: 357, date: "2025-01-15T02:32:05.542Z" },
    { A: 515, B: 455, date: "2025-01-17T22:26:30.651Z" },
    { A: 465, B: 405, date: "2025-01-20T18:20:55.759Z" },
    { A: 445, B: 385, date: "2025-01-23T14:15:20.868Z" },
    { A: 496, B: 436, date: "2025-01-26T10:09:45.976Z" },
    { A: 418, B: 358, date: "2025-01-29T06:04:11.085Z" },
    { A: 433, B: 373, date: "2025-02-01T01:58:36.193Z" },
    { A: 515, B: 455, date: "2025-02-03T21:53:01.302Z" },
    { A: 414, B: 354, date: "2025-02-06T17:47:26.410Z" },
    { A: 425, B: 365, date: "2025-02-09T13:41:51.519Z" },
    { A: 442, B: 382, date: "2025-02-12T09:36:16.627Z" },
    { A: 491, B: 431, date: "2025-02-15T05:30:41.736Z" },
    { A: 413, B: 353, date: "2025-02-18T01:25:06.844Z" },
    { A: 330, B: 330, date: "2025-02-20T21:19:31.953Z" },
    { A: 363, B: 303, date: "2025-02-23T17:13:57.062Z" },
    { A: 381, B: 321, date: "2025-02-26T13:08:22.170Z" },
    { A: 397, B: 337, date: "2025-03-01T09:02:47.279Z" },
    { A: 419, B: 359, date: "2025-03-04T04:57:12.387Z" },
    { A: 376, B: 316, date: "2025-03-07T00:51:37.496Z" },
    { A: 391, B: 331, date: "2025-03-09T20:46:02.604Z" },
    { A: 409, B: 349, date: "2025-03-12T16:40:27.713Z" },
    { A: 364, B: 304, date: "2025-03-15T12:34:52.821Z" },
    { A: 482, B: 422, date: "2025-03-18T08:29:17.930Z" },
    { A: 512, B: 452, date: "2025-03-21T04:23:43.038Z" },
    { A: 437, B: 377, date: "2025-03-24T00:18:08.147Z" },
    { A: 478, B: 418, date: "2025-03-26T20:12:33.255Z" },
    { A: 417, B: 357, date: "2025-03-29T16:06:58.364Z" },
    { A: 466, B: 406, date: "2025-04-01T12:01:23.472Z" },
    { A: 470, B: 410, date: "2025-04-04T07:55:48.581Z" },
    { A: 418, B: 358, date: "2025-04-07T03:50:13.689Z" },
    { A: 479, B: 419, date: "2025-04-09T23:44:38.798Z" },
    { A: 455, B: 385, date: "2025-04-12T19:39:03.906Z" },
    { A: 507, B: 437, date: "2025-04-15T15:33:29.015Z" },
    { A: 757, B: 457, date: "2025-04-18T11:27:54.124Z" },
    { A: 741, B: 441, date: "2025-04-21T07:22:19.232Z" },
    { A: 694, B: 394, date: "2025-04-24T03:16:44.341Z" },
    { A: 637, B: 337, date: "2025-04-26T23:11:09.449Z" },
    { A: 586, B: 286, date: "2025-04-29T19:05:34.558Z" },
    { A: 581, B: 281, date: "2025-05-02T14:59:59.666Z" },
    { A: 602, B: 302, date: "2025-05-05T10:54:24.775Z" },
    { A: 620, B: 320, date: "2025-05-08T06:48:49.883Z" },
    { A: 672, B: 372, date: "2025-05-11T02:43:14.992Z" },
    { A: 673, B: 373, date: "2025-05-13T22:37:40.100Z" },
    { A: 595, B: 295, date: "2025-05-16T18:32:05.209Z" },
    { A: 578, B: 278, date: "2025-05-19T14:26:30.317Z" },
    { A: 800, B: 370, date: "2025-05-19T14:26:30.317Z" },
    { A: 840, B: 410, date: "2025-05-22T10:20:55.426Z" },
    { A: 786, B: 356, date: "2025-05-25T06:15:20.534Z" },
    { A: 718, B: 288, date: "2025-05-28T02:09:45.643Z" },
    { A: 749, B: 319, date: "2025-05-30T22:04:10.751Z" },
    { A: 734, B: 304, date: "2025-06-02T17:58:35.860Z" },
    { A: 780, B: 350, date: "2025-06-05T13:53:00.968Z" },
    { A: 810, B: 380, date: "2025-06-08T09:47:26.077Z" },
    { A: 805, B: 375, date: "2025-06-11T05:41:51.186Z" },
    { A: 751, B: 321, date: "2025-06-14T01:36:16.294Z" },
    { A: 655, B: 225, date: "2025-06-16T21:30:41.403Z" },
    { A: 627, B: 197, date: "2025-06-19T17:25:06.511Z" },
    { A: 681, B: 251, date: "2025-06-22T13:19:31.620Z" },
    { A: 695, B: 265, date: "2025-06-25T09:13:56.728Z" },
    { A: 616, B: 186, date: "2025-06-28T05:08:21.837Z" },
    { A: 627, B: 197, date: "2025-07-01T01:02:46.945Z" },
    { A: 751, B: 321, date: "2025-07-03T20:57:12.054Z" },
    { A: 696, B: 266, date: "2025-07-06T16:51:37.162Z" },
    { A: 705, B: 275, date: "2025-07-09T12:46:02.271Z" },
    { A: 709, B: 279, date: "2025-07-12T08:40:27.379Z" },
    { A: 637, B: 207, date: "2025-07-15T04:34:52.488Z" },
    { A: 659, B: 229, date: "2025-07-18T00:29:17.596Z" },
    { A: 695, B: 265, date: "2025-07-20T20:23:42.705Z" },
    { A: 763, B: 333, date: "2025-07-23T16:18:07.813Z" },
    { A: 830, B: 400, date: "2025-07-26T12:12:32.922Z" },
    { A: 743, B: 313, date: "2025-07-29T08:06:58.031Z" },
    { A: 683, B: 253, date: "2025-08-01T04:01:23.139Z" },
    { A: 636, B: 196, date: "2025-08-03T23:55:48.248Z" },
    { A: 669, B: 229, date: "2025-08-06T19:50:13.356Z" },
    { A: 701, B: 261, date: "2025-08-09T15:44:38.465Z" },
    { A: 745, B: 305, date: "2025-08-12T11:39:03.573Z" },
    { A: 781, B: 261, date: "2025-08-15T07:33:28.682Z" },
    { A: 853, B: 333, date: "2025-08-18T03:27:53.790Z" },
    { A: 913, B: 393, date: "2025-08-20T23:22:18.899Z" },
    { A: 954, B: 434, date: "2025-08-23T19:16:44.007Z" },
    { A: 934, B: 414, date: "2025-08-26T15:11:09.116Z" },
    { A: 982, B: 462, date: "2025-08-29T11:05:34.224Z" },
    { A: 804, B: 414, date: "2025-09-01T06:59:59.333Z" },
    { A: 789, B: 399, date: "2025-09-04T02:54:24.441Z" },
    { A: 758, B: 368, date: "2025-09-06T22:48:49.550Z" },
    { A: 763, B: 373, date: "2025-09-09T18:43:14.658Z" },
    { A: 910, B: 520, date: "2025-09-12T14:37:39.767Z" },
    { A: 791, B: 401, date: "2025-09-15T10:32:04.875Z" },
    { A: 835, B: 445, date: "2025-09-18T06:26:29.984Z" },
    { A: 733, B: 343, date: "2025-09-21T02:20:55.093Z" },
    { A: 703, B: 313, date: "2025-09-23T22:15:20.201Z" },
    { A: 772, B: 382, date: "2025-09-26T18:09:45.310Z" },
    { A: 776, B: 386, date: "2025-09-29T14:04:10.418Z" },
    { A: 708, B: 318, date: "2025-10-02T09:58:35.527Z" },
    { A: 662, B: 272, date: "2025-10-05T05:53:00.635Z" },
    { A: 705, B: 395, date: "2025-10-08T01:47:25.744Z" },
    { A: 659, B: 349, date: "2025-10-10T21:41:50.852Z" },
    { A: 673, B: 363, date: "2025-10-13T17:36:15.961Z" },
    { A: 676, B: 366, date: "2025-10-16T13:30:41.069Z" },
    { A: 635, B: 325, date: "2025-10-19T09:25:06.178Z" },
    { A: 770, B: 460, date: "2025-10-22T05:19:31.286Z" },
    { A: 810, B: 500, date: "2025-10-25T01:13:56.395Z" },
    { A: 682, B: 372, date: "2025-10-27T21:08:21.503Z" },
    { A: 694, B: 384, date: "2025-10-30T17:02:46.612Z" },
    { A: 652, B: 342, date: "2025-11-02T12:57:11.720Z" },
    { A: 706, B: 396, date: "2025-11-05T08:51:36.829Z" },
    { A: 656, B: 346, date: "2025-11-08T04:46:01.937Z" },
    { A: 649, B: 339, date: "2025-11-11T00:40:27.046Z" },
    { A: 681, B: 371, date: "2025-11-13T20:34:52.155Z" },
    { A: 735, B: 425, date: "2025-11-16T16:29:17.263Z" },
    { A: 659, B: 349, date: "2025-11-19T12:23:42.372Z" },
    { A: 638, B: 328, date: "2025-11-22T08:18:07.480Z" },
    { A: 608, B: 298, date: "2025-11-25T04:12:32.589Z" },
    { A: 567, B: 257, date: "2025-11-28T00:06:57.697Z" },
    { A: 679, B: 369, date: "2025-11-30T20:01:22.806Z" },
    { A: 704, B: 394, date: "2025-12-03T15:55:47.914Z" },
    { A: 624, B: 314, date: "2025-12-06T11:50:13.023Z" },
    { A: 683, B: 373, date: "2025-12-09T07:44:38.131Z" },
    { A: 817, B: 507, date: "2025-12-12T03:39:03.240Z" },
    { A: 882, B: 572, date: "2025-12-14T23:33:28.348Z" },
    { A: 786, B: 476, date: "2025-12-17T19:27:53.457Z" },
    { A: 755, B: 445, date: "2025-12-20T15:22:18.565Z" },
    { A: 835, B: 525, date: "2025-12-23T11:16:43.674Z" },
    { A: 791, B: 481, date: "2025-12-26T07:11:08.782Z" },
    { A: 819, B: 509, date: "2025-12-29T03:05:33.891Z" },
    { A: 868, B: 558, date: "2025-12-31T22:59:59.000Z" },
];

const radarData = [
    {
        subject: "Mon",
        A: 800,
        B: 400,
        C: 600,
    },
    {
        subject: "Tue",
        A: 600,
        B: 1000,
        C: 800,
    },
    {
        subject: "Wed",
        A: 600,
        B: 200,
        C: 400,
    },
    {
        subject: "Thu",
        A: 200,
        B: 600,
        C: 800,
    },
    {
        subject: "Fri",
        A: 400,
        B: 200,
        C: 600,
    },
    {
        subject: "Sat",
        A: 1000,
        B: 800,
        C: 600,
    },
    {
        subject: "Sun",
        A: 400,
        B: 1000,
        C: 800,
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

const pieChartData = [
    {
        name: "USA",
        value: 200,
        className: "text-utility-brand-600",
    },
    {
        name: "India",
        value: 350,
        className: "text-utility-brand-500",
    },
    {
        name: "UK",
        value: 100,
        className: "text-utility-brand-400",
    },
    {
        name: "Australia",
        value: 120,
        className: "text-utility-brand-300",
    },
    {
        name: "Canada",
        value: 230,
        className: "text-utility-gray-200",
    },
];

const tabs: Tab[] = [
    { label: "Users", value: "8.8k", trend: "positive", change: "7.4%" },
    { label: "Sessions", value: "10.2k", trend: "positive", change: "7.4%" },
    { label: "Bounce rate", value: "46.2%", trend: "negative", change: "0.2%" },
    { label: "Session duration", value: "4m 4s", trend: "positive", change: "10.8%" },
];

export const Dashboard17 = () => {
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
                    <div className="mx-auto flex w-full max-w-container flex-col justify-between gap-4 px-4 lg:flex-row lg:px-8">
                        <p className="text-xl font-semibold text-primary lg:text-display-xs">Website analytics</p>
                        <Input size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} className="lg:max-w-80" />
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-8 px-4 lg:flex-row lg:gap-12 lg:px-8">
                        <div className="flex w-full flex-col gap-6 lg:gap-5">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Overview</p>
                                <TableRowActionsDropdown />
                            </div>

                            <AriaTabs className="-mx-4 overflow-hidden">
                                <AriaTabList className="flex gap-4 overflow-x-auto px-4 whitespace-nowrap">
                                    {tabs.map((tab, index) => (
                                        <LargeTab key={index} {...tab} />
                                    ))}
                                </AriaTabList>
                            </AriaTabs>

                            <div className="flex flex-col gap-5">
                                <div className="flex h-60 flex-col gap-2 lg:h-57">
                                    <ResponsiveContainer className="h-full">
                                        <AreaChart
                                            data={chartData}
                                            className="text-tertiary [&_.recharts-text]:text-xs"
                                            margin={{
                                                left: 5,
                                                right: 5,
                                            }}
                                        >
                                            <defs>
                                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="currentColor" className="text-utility-gray-500" stopOpacity="0.7" />
                                                    <stop offset="95%" stopColor="currentColor" className="text-utility-gray-500" stopOpacity="0" />
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
                                                ticks={selectEvenlySpacedItems(chartData, 12).map((item) => item.date)}
                                            />

                                            <RechartsTooltip
                                                content={<ChartTooltipContent />}
                                                labelFormatter={(value) =>
                                                    new Date(value).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
                                                }
                                                cursor={{
                                                    className: "stroke-utility-brand-600 stroke-2",
                                                }}
                                            />

                                            <Area
                                                isAnimationActive={false}
                                                className="text-utility-brand-600 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                                dataKey="A"
                                                name="Mobile"
                                                type="linear"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                fill="url(#gradient)"
                                                fillOpacity={0.1}
                                                activeDot={{
                                                    className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                                                }}
                                            />

                                            <Area
                                                isAnimationActive={false}
                                                className="text-utility-gray-500 [&_.recharts-area-area]:translate-y-[6px] [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]"
                                                dataKey="B"
                                                name="Desktop"
                                                type="linear"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                fill="none"
                                                activeDot={{
                                                    className: "fill-bg-primary stroke-utility-gray-400 stroke-2",
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between gap-4 border-t border-secondary pt-4 lg:pt-5">
                                    {/* Desktop */}
                                    <ButtonGroup defaultSelectedKeys={["12-months"]} className="hidden lg:inline-flex">
                                        <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                        <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                        <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                                        <ButtonGroupItem iconLeading={Plus} className="gap-x-2">
                                            Custom
                                        </ButtonGroupItem>
                                    </ButtonGroup>
                                    {/* Mobile */}
                                    <ButtonGroup defaultSelectedKeys={["12-months"]} className="lg:hidden">
                                        <ButtonGroupItem id="12-months">12m</ButtonGroupItem>
                                        <ButtonGroupItem id="30-days">30d</ButtonGroupItem>
                                        <ButtonGroupItem id="7-days">7d</ButtonGroupItem>
                                        <ButtonGroupItem iconLeading={Plus} />
                                    </ButtonGroup>
                                    <Button size="md" color="secondary">
                                        <span className="hidden lg:inline">Audience overview</span>
                                        <span className="lg:hidden">Overview</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 lg:max-w-98 lg:min-w-98 lg:gap-5">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Traffic sources</p>
                                <TableRowActionsDropdown />
                            </div>

                            <ResponsiveContainer className="relative min-h-[325px] lg:max-h-100">
                                <RadarChart
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
                                                y={index === 0 ? y - 14 : index === 3 || index === 4 ? y + 10 : y}
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
                                        name="Direct"
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
                                        name="Organic"
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
                                        name="Paid"
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
                    </div>

                    <div className="max-lg:hidden lg:px-8">
                        <div className="h-px w-full bg-border-secondary"></div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-8 px-4 lg:flex-row lg:gap-12 lg:px-8">
                        <div className="flex w-full flex-col gap-6 lg:gap-5">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">How do you acquire users?</p>
                                <TableRowActionsDropdown />
                            </div>

                            <Tabs selectedKey="traffic-channel" className="inline-flex">
                                <TabList
                                    size="sm"
                                    type="underline"
                                    items={[
                                        { id: "traffic-channel", label: "Traffic channel" },
                                        { id: "source", label: "Source" },
                                        { id: "referrals", label: "Referrals" },
                                    ]}
                                />
                            </Tabs>

                            <div className="flex flex-col gap-5">
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

                                        <Legend
                                            itemSorter="dataKey"
                                            verticalAlign="top"
                                            align="right"
                                            layout="horizontal"
                                            content={<ChartLegendContent reversed />}
                                        />

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
                                            className="text-utility-brand-700"
                                            dataKey="A"
                                            name="Referral"
                                            stackId="a"
                                            fill="currentColor"
                                            maxBarSize={isDesktop ? 32 : 16}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            className="text-utility-brand-500"
                                            dataKey="B"
                                            name="Organic search"
                                            stackId="a"
                                            fill="currentColor"
                                            maxBarSize={isDesktop ? 32 : 16}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            className="text-utility-gray-200"
                                            dataKey="C"
                                            name="Direct"
                                            stackId="a"
                                            fill="currentColor"
                                            maxBarSize={isDesktop ? 32 : 16}
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>

                                <div className="flex justify-between gap-4 border-t border-secondary pt-4 lg:pt-5">
                                    {/* Desktop */}
                                    <ButtonGroup defaultSelectedKeys={["12-months"]} className="hidden lg:inline-flex">
                                        <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                        <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                        <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                                        <ButtonGroupItem id="custom" iconLeading={Plus} className="gap-x-2">
                                            Custom
                                        </ButtonGroupItem>
                                    </ButtonGroup>

                                    {/* Mobile */}
                                    <ButtonGroup defaultSelectedKeys={["12-months"]} className="lg:hidden">
                                        <ButtonGroupItem id="12-months">12m</ButtonGroupItem>
                                        <ButtonGroupItem id="30-days">30d</ButtonGroupItem>
                                        <ButtonGroupItem id="7-days">7d</ButtonGroupItem>
                                        <ButtonGroupItem id="custom" iconLeading={Plus} aria-label="Custom" />
                                    </ButtonGroup>

                                    <Button size="md" color="secondary">
                                        <span className="hidden lg:inline">Audience overview</span>
                                        <span className="lg:hidden">Overview</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 lg:max-w-98 lg:min-w-98 lg:gap-5">
                            <div className="flex items-start justify-between border-b border-secondary pb-5">
                                <p className="text-lg font-semibold text-primary">Sessions by country</p>
                                <TableRowActionsDropdown />
                            </div>

                            <div className="h-60 w-82.5 lg:h-70 lg:w-92.5">
                                <ResponsiveContainer>
                                    <PieChart
                                        margin={{
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <Legend itemSorter="dataKey" verticalAlign="top" align="right" layout="vertical" content={<ChartLegendContent />} />
                                        <RechartsTooltip content={<ChartTooltipContent isPieChart />} />

                                        <Pie
                                            isAnimationActive={false}
                                            startAngle={-270}
                                            endAngle={-630}
                                            stroke="none"
                                            data={pieChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            fill="currentColor"
                                            // innerRadius={isDesktop ? 106 : 90}
                                            outerRadius={isDesktop ? 140 : 120}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
