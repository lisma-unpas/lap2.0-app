"use client";

import { useMemo, useState } from "react";
import { parseDate } from "@internationalized/date";
import { DownloadCloud02, FilterLines, Plus, SearchLg, Zap } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { PaginationCardDefault, PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

// Helper functions for formatting
const formatCurrency = (amount: number): string => amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const trades = [
    {
        id: "trade-001",
        label: "TSLA BUY",
        company: "Tesla, Inc.",
        amount: 30021.23,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "processing",
        author: {
            name: "Olivia Rhye",
            email: "olivia@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
            initials: "OR",
        },
    },
    {
        id: "trade-002",
        label: "MTCH SELL",
        company: "Match Group, Inc,",
        amount: 10045.0,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "success",
        author: {
            name: "Phoenix Baker",
            email: "phoenix@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            initials: "PB",
        },
    },
    {
        id: "trade-003",
        label: "DDOG BUY",
        company: "Datadog Inc",
        amount: 40132.16,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "success",
        author: { name: "Lana Steiner", email: "lana@untitledui.com", avatarUrl: "", initials: "LS" },
    },
    {
        id: "trade-004",
        label: "ARKG BUY",
        company: "ARK Genomic Revolution ETF",
        amount: 22665.12,
        deliveryDate: new Date(2025, 0, 13).getTime(),
        status: "declined",
        author: { name: "Demi Wilkinson", email: "demi@untitledui.com", avatarUrl: "", initials: "DW" },
    },
    {
        id: "trade-005",
        label: "SQ BUY",
        company: "Square, Inc.",
        amount: 18221.3,
        deliveryDate: new Date(2025, 0, 12).getTime(),
        status: "success",
        author: {
            name: "Candice Wu",
            email: "candice@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            initials: "CW",
        },
    },
    {
        id: "trade-006",
        label: "MSTR SELL",
        company: "MicroStrategy Inc.",
        amount: 24118.18,
        deliveryDate: new Date(2025, 0, 12).getTime(),
        status: "success",
        author: { name: "Natali Craig", email: "natali@untitledui.com", avatarUrl: "", initials: "NC" },
    },
];

export const Informational02 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "deliveryDate",
        direction: "descending",
    });

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return trades;

        return trades.toSorted((a, b) => {
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
        <div className="flex flex-col">
            <HeaderNavigationBase
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        current: true,
                        items: [
                            { label: "Overview", href: "#" },
                            { label: "Notifications", href: "#" },
                            { label: "Trade history", href: "#", current: true },
                            { label: "Saved reports", href: "#" },
                            { label: "Withdrawals", href: "#" },
                        ],
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
            <main className="min-w-0 flex-1 bg-secondary_subtle pt-8 pb-16 shadow-none lg:bg-primary lg:pt-12 lg:pb-24">
                <div className="mx-auto mb-8 flex max-w-container flex-col gap-5 px-4 lg:px-8">
                    {/* Page header simple */}
                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <p className="text-xl font-semibold text-primary md:text-display-xs">Trade history</p>
                                <p className="text-md text-tertiary">View your team's trades and transactions.</p>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Button iconLeading={DownloadCloud02} color="secondary" size="md">
                                        Download CSV
                                    </Button>
                                    <Button iconLeading={Plus} size="md">
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonGroup defaultSelectedKeys={["all"]} selectionMode="single" size="md">
                        <ButtonGroupItem id="all">All trades</ButtonGroupItem>
                        <ButtonGroupItem id="buy">Buy side</ButtonGroupItem>
                        <ButtonGroupItem id="sell">Sell side</ButtonGroupItem>
                    </ButtonGroup>
                </div>
                <div className="mx-auto flex max-w-container flex-col gap-6 px-4 lg:px-8">
                    <div className="hidden ring-1 ring-secondary ring-inset lg:block lg:rounded-xl lg:bg-secondary lg:px-4 lg:py-3">
                        <div className="relative flex flex-wrap items-center justify-between gap-x-3 gap-y-4 px-4 pb-6 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-secondary lg:flex-nowrap lg:px-0 lg:pb-0 lg:after:border-b-0">
                            <Input className="lg:max-w-100" size="sm" aria-label="Search for trades" placeholder="Search for trades" icon={SearchLg} shortcut />
                            <div className="flex gap-3">
                                <DateRangePicker
                                    defaultValue={{
                                        start: parseDate("2025-01-10"),
                                        end: parseDate("2025-01-16"),
                                    }}
                                />
                                <Button iconLeading={FilterLines} size="md" color="secondary" className="hidden lg:inline-flex">
                                    Filters
                                </Button>
                                <Button iconLeading={FilterLines} size="md" color="secondary" className="inline-flex lg:hidden" />
                            </div>
                        </div>
                    </div>
                    <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                        <Table
                            aria-label="Trades"
                            selectionMode="multiple"
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                            className="bg-primary"
                        >
                            <Table.Header className="bg-transparent">
                                <Table.Head id="trade" isRowHeader label="Trade" className="w-full" />
                                <Table.Head id="amount" label="Order amount" />
                                <Table.Head id="deliveryDate" label="Delivery date" allowsSorting />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="author" label="Executed by" />
                                <Table.Head id="actions" />
                            </Table.Header>
                            <Table.Body items={sortedItems}>
                                {(trade) => (
                                    <Table.Row id={trade.id}>
                                        <Table.Cell>
                                            <div>
                                                <p className="text-sm font-medium whitespace-nowrap text-primary">{trade.label}</p>
                                                <p className="text-sm whitespace-nowrap text-tertiary">{trade.company}</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{formatCurrency(trade.amount)}</Table.Cell>
                                        <Table.Cell>{formatDate(trade.deliveryDate)}</Table.Cell>
                                        <Table.Cell>
                                            <BadgeWithDot
                                                color={
                                                    trade.status === "success"
                                                        ? "success"
                                                        : trade.status === "processing"
                                                          ? "gray"
                                                          : trade.status === "declined"
                                                            ? "error"
                                                            : "gray"
                                                }
                                                size="sm"
                                                type="pill-color"
                                                className="capitalize"
                                            >
                                                {trade.status}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="group flex items-center gap-3 outline-hidden">
                                                <Avatar src={trade.author.avatarUrl} alt={trade.author.name} size="sm" initials={trade.author.initials} />
                                                <div>
                                                    <p className="text-sm font-medium text-primary">{trade.author.name}</p>
                                                    <p className="text-sm text-tertiary">{trade.author.email}</p>
                                                </div>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button size="sm" color="link-color">
                                                Edit
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                        <div className="max-lg:hidden">
                            <PaginationCardDefault page={1} total={10} />
                        </div>
                    </TableCard.Root>
                    <div className="lg:hidden">
                        <PaginationPageDefault page={1} total={10} />
                    </div>
                </div>
            </main>
        </div>
    );
};
