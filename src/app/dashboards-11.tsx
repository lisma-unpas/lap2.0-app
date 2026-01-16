"use client";

import { FilterLines, SearchLg, Zap } from "@untitledui/icons";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis } from "recharts";
import { FeedItem } from "@/components/application/activity-feed/activity-feed";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ChartLegendContent, ChartTooltipContent } from "@/components/application/charts/charts-base";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { MetricsChart03 } from "@/components/application/metrics/metrics";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useBreakpoint } from "@/hooks/use-breakpoint";

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

const feedItems = [
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
        name: "Demi Wilkinson",
        title: "Webflow 101",
        unseen: true,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/aliah-lane?fm=webp&q=80",
        name: "Aliah Lane",
        title: "SEO Masterclass",
        unseen: true,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        name: "Lana Steiner",
        title: "Figma Mockups",
        unseen: true,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
        name: "Candice Wu",
        title: "Webflow 101",
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
        name: "Ava Wright",
        title: "SEO Masterclass",
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
        name: "Koray Okumus",
        title: "SEO Masterclass",
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
        name: "Andi Lane",
        title: "The Guide to Backlinks",
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        name: "Drew Cano",
        title: "The Figma Dashboard Bundle",
        date: Date.now() - 3 * 60 * 60 * 1000,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/zahir-mays?fm=webp&q=80",
        name: "Zahir Mays",
        title: "The Figma Dashboard Bundle",
        date: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/rene-wells?fm=webp&q=80",
        name: "Rene Wells",
        title: "The Design Handbook",
        date: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
        name: "Joshua Wilson",
        title: "Phone 13 Mockups",
        date: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/lori-bryson?fm=webp&q=80",
        name: "Lori Bryson",
        title: "SEO Masterclass",
        date: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/loki-bright?fm=webp&q=80",
        name: "Loki Bright",
        title: "Figma Mockups",
        date: Date.now() - 5 * 60 * 60 * 1000,
    },
    {
        avatarUrl: "https://www.untitledui.com/images/avatars/anita-cruz?fm=webp&q=80",
        name: "Anita Cruz",
        title: "The Guide to Backlinks",
        date: Date.now() - 6 * 60 * 60 * 1000,
    },
];

const colors: Record<string, string> = {
    A: "text-utility-brand-700",
    B: "text-utility-brand-500",
    C: "text-utility-gray-200",
};

export const Dashboard11 = () => {
    const isDesktop = useBreakpoint("lg");

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

            <main className="pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between gap-4">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <p className="text-xl font-semibold text-primary lg:text-display-xs">Welcome back, Olivia</p>
                                    <p className="text-md text-tertiary">Your current sales summary and activity.</p>
                                </div>
                                <div className="hidden w-80 lg:flex">
                                    <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="sm" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-4 lg:flex-row">
                            {/* Desktop */}
                            <ButtonGroup defaultSelectedKeys={["12-months"]} className="hidden lg:inline-flex">
                                <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
                                <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
                                <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
                                <ButtonGroupItem id="24-hours">24 hours</ButtonGroupItem>
                            </ButtonGroup>

                            {/* Mobile */}
                            <ButtonGroup defaultSelectedKeys={["12-months"]} className="inline-flex lg:hidden">
                                <ButtonGroupItem id="12-months">12m</ButtonGroupItem>
                                <ButtonGroupItem id="30-days">30d</ButtonGroupItem>
                                <ButtonGroupItem id="7-days">7d</ButtonGroupItem>
                                <ButtonGroupItem id="24-hours">24h</ButtonGroupItem>
                            </ButtonGroup>

                            <div className="flex gap-3">
                                <DateRangePicker />
                                <Button size="md" color="secondary" iconLeading={FilterLines}>
                                    Filters
                                </Button>
                                <Button size="md" color="secondary" iconLeading={SearchLg} className="inline-flex lg:hidden" />
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto grid w-full max-w-container px-4 lg:px-8">
                        <ResponsiveContainer className="min-h-60">
                            <BarChart
                                data={barData}
                                margin={{
                                    left: 0,
                                    right: 0,
                                }}
                                className="text-tertiary [&_.recharts-text]:text-xs"
                            >
                                <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-gray-100" />

                                {isDesktop ? (
                                    <Legend verticalAlign="top" align="right" layout="vertical" content={<ChartLegendContent reversed />} />
                                ) : (
                                    <Legend verticalAlign="top" align="right" layout="horizontal" content={<ChartLegendContent reversed />} />
                                )}

                                <XAxis
                                    fill="currentColor"
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={12}
                                    interval="preserveStartEnd"
                                    dataKey="date"
                                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short" })}
                                />

                                <RechartsTooltip
                                    content={<ChartTooltipContent />}
                                    formatter={(value) => value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}
                                    labelFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "long" })}
                                    cursor={{
                                        className: "fill-utility-gray-200/20",
                                    }}
                                />

                                <Bar
                                    isAnimationActive={false}
                                    className={colors["A"]}
                                    dataKey="A"
                                    name="2023"
                                    type="monotone"
                                    stackId="a"
                                    fill="currentColor"
                                    maxBarSize={isDesktop ? 32 : 16}
                                />
                                <Bar
                                    isAnimationActive={false}
                                    className={colors["B"]}
                                    dataKey="B"
                                    name="2024"
                                    type="monotone"
                                    stackId="a"
                                    fill="currentColor"
                                    maxBarSize={isDesktop ? 32 : 16}
                                />
                                <Bar
                                    isAnimationActive={false}
                                    className={colors["C"]}
                                    dataKey="C"
                                    name="2025"
                                    type="monotone"
                                    stackId="a"
                                    fill="currentColor"
                                    maxBarSize={isDesktop ? 32 : 16}
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 md:flex-row md:flex-wrap lg:gap-6 lg:px-8">
                        <MetricsChart03
                            title="$1,280"
                            subtitle="Today's revenue"
                            className="flex-1 md:min-w-[320px]"
                            change="15%"
                            changeTrend="positive"
                            changeDescription="last mth"
                            chartCurveType="linear"
                            chartData={[10, 15, 20, 15, 20, 25, 30, 40, 45, 35, 40, 35, 59, 50, 55, 45, 50, 55, 60, 55, 50, 55, 70, 90].map((value) => ({
                                value,
                            }))}
                        />
                        <MetricsChart03
                            title="14"
                            subtitle="Today's orders"
                            className="flex-1 md:min-w-[320px]"
                            change="10%"
                            changeTrend="negative"
                            changeDescription="last mth"
                            chartCurveType="linear"
                            chartData={[50, 60, 50, 54, 45, 50, 60, 65, 50, 49, 52, 25, 30, 34, 30, 45, 42, 46, 50, 45, 41, 38, 40, 10].map((value) => ({
                                value,
                            }))}
                        />
                        <MetricsChart03
                            title="$91.42"
                            subtitle="Avg. order value"
                            className="flex-1 md:min-w-[320px]"
                            change="20%"
                            changeTrend="positive"
                            changeDescription="last mth"
                            chartCurveType="linear"
                            chartData={[4, 3, 4, 5, 6, 7, 6, 7, 6, 7, 8, 9, 8, 7].map((value) => ({
                                value,
                            }))}
                        />
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-5 lg:flex-row lg:items-center">
                            <p className="text-lg font-semibold text-primary">Recent activity</p>
                            <div className="flex gap-3">
                                <Button size="md" color="secondary">
                                    Download
                                </Button>
                                <Button size="md">View all</Button>
                            </div>
                        </div>
                        <div className="lg:hidden">
                            {feedItems.map((item, index) => (
                                <FeedItem
                                    id={index}
                                    key={index}
                                    size="md"
                                    unseen={item.unseen}
                                    user={{ avatarUrl: item.avatarUrl, href: "#", name: item.name, status: "online" }}
                                    action={{ href: "#", content: "Purchased", target: item.title }}
                                    connector={index !== feedItems.length - 1}
                                />
                            ))}
                        </div>
                        <div className="hidden grid-cols-2 gap-x-16 lg:grid">
                            <div>
                                {feedItems.slice(0, feedItems.length / 2).map((item, index) => (
                                    <FeedItem
                                        id={index}
                                        key={index}
                                        size="md"
                                        unseen={item.unseen}
                                        user={{ avatarUrl: item.avatarUrl, href: "#", name: item.name, status: "online" }}
                                        action={{ href: "#", content: "Purchased", target: item.title }}
                                        connector={index !== feedItems.length / 2 - 1}
                                    />
                                ))}
                            </div>
                            <div>
                                {feedItems.slice(feedItems.length / 2).map((item, index) => (
                                    <FeedItem
                                        id={index}
                                        key={index}
                                        size="md"
                                        unseen={item.unseen}
                                        date={item.date ? formatRelativeTime(item.date) : undefined}
                                        user={{ avatarUrl: item.avatarUrl, href: "#", name: item.name, status: "online" }}
                                        action={{ href: "#", content: "Purchased", target: item.title }}
                                        connector={index !== feedItems.length / 2 - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
