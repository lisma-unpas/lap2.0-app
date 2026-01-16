"use client";

import { useMemo, useState } from "react";
import { Check, Download03, ReverseLeft, SearchLg, X } from "@untitledui/icons";
import { type SortDescriptor } from "react-aria-components";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

const orders = [
    {
        id: "order-01",
        invoice: "INV-3066",
        date: "Jan 6, 2025",
        status: "paid",
        customer: {
            name: "Olivia Rhye",
            email: "olivia@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
            initials: "OR",
        },
        purchase: "Monthly",
        progress: 60,
    },
    {
        id: "order-02",
        invoice: "INV-3065",
        date: "Jan 6, 2025",
        status: "paid",
        customer: {
            name: "Phoenix Baker",
            email: "phoenix@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            initials: "PB",
        },
        purchase: "Monthly",
        progress: 70,
    },
    {
        id: "order-03",
        invoice: "INV-3064",
        date: "Jan 6, 2025",
        status: "paid",
        customer: { name: "Lana Steiner", email: "lana@untitledui.com", avatarUrl: "", initials: "LS" },
        purchase: "Monthly",
        progress: 60,
    },
    {
        id: "order-04",
        invoice: "INV-3063",
        date: "Jan 5, 2025",
        status: "paid",
        customer: { name: "Demi Wilkinson", email: "demi@untitledui.com", avatarUrl: "", initials: "DW" },
        purchase: "Monthly",
        progress: 30,
    },
    {
        id: "order-05",
        invoice: "INV-3062",
        date: "Jan 5, 2025",
        status: "refunded",
        customer: {
            name: "Candice Wu",
            email: "candice@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            initials: "CW",
        },
        purchase: "Monthly",
        progress: 80,
    },
    {
        id: "order-06",
        invoice: "INV-3061",
        date: "Jan 5, 2025",
        status: "paid",
        customer: { name: "Natali Craig", email: "natali@untitledui.com", avatarUrl: "", initials: "NC" },
        purchase: "Monthly",
        progress: 20,
    },
    {
        id: "order-07",
        invoice: "INV-3060",
        date: "Jan 4, 2025",
        status: "cancelled",
        customer: {
            name: "Drew Cano",
            email: "drew@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            initials: "DC",
        },
        purchase: "Monthly",
        progress: 10,
    },
    {
        id: "order-08",
        invoice: "INV-3060",
        date: "Jan 4, 2025",
        status: "cancelled",
        customer: {
            name: "Orlando Diggs",
            email: "orlando@untitledui.com",
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
            initials: "OD",
        },
        purchase: "Monthly",
        progress: 40,
    },
];

export const Informational05 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "invoice",
        direction: "descending",
    });

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return orders;

        return orders.toSorted((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            // Handle date column (values like "Jan 6, 2025", "Jan 5, 2025")
            if (sortDescriptor.column === "date") {
                const firstDate = new Date(first as string);
                const secondDate = new Date(second as string);
                return sortDescriptor.direction === "descending" ? secondDate.getTime() - firstDate.getTime() : firstDate.getTime() - secondDate.getTime();
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
        <div className="flex flex-col bg-primary">
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
                            { label: "Analytics", href: "#" },
                            { label: "Saved reports", href: "#" },
                            { label: "Orders", href: "/dashboard/orders", current: true },
                            { label: "User reports", href: "#" },
                        ],
                    },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
            />
            <main className="mx-auto flex w-full max-w-container flex-1 flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="px-4 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 border-b border-secondary pb-4 lg:flex-row">
                        <div className="flex flex-col gap-0.5 lg:gap-1">
                            <p className="text-xl font-semibold text-primary lg:text-display-xs">Orders</p>
                            <p className="text-md text-tertiary">Manage your recent orders and invoices.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button size="md" iconLeading={Download03} color="secondary">
                                Download all
                            </Button>
                            <Button size="md">New order</Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5 px-4 lg:px-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                            <SectionLabel.Root size="sm" title="Order details" description="Review and manage recent orders." className="w-full max-w-70" />
                            <div className="flex flex-1 flex-col gap-5 lg:gap-6">
                                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:gap-6">
                                    <ButtonGroup size="md">
                                        <ButtonGroupItem isSelected>View all</ButtonGroupItem>
                                        <ButtonGroupItem>Paid</ButtonGroupItem>
                                        <ButtonGroupItem>Archive</ButtonGroupItem>
                                    </ButtonGroup>
                                    <Input className="lg:max-w-100" size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />
                                </div>
                                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl lg:shadow-xs lg:ring-1">
                                    <Table
                                        aria-label="Trades"
                                        selectionMode="multiple"
                                        sortDescriptor={sortDescriptor}
                                        onSortChange={setSortDescriptor}
                                        className="bg-primary"
                                    >
                                        <Table.Header>
                                            <Table.Head id="invoice" isRowHeader allowsSorting label="Invoice" className="w-full" />
                                            <Table.Head id="status" label="Status" />
                                            <Table.Head id="customer" label="Customer" />
                                            <Table.Head id="progress" label="Progress" className="min-w-55" />
                                            <Table.Head id="actions" />
                                        </Table.Header>
                                        <Table.Body items={sortedItems}>
                                            {(order) => (
                                                <Table.Row id={order.id} className="even:bg-secondary_subtle">
                                                    <Table.Cell className="text-sm font-medium whitespace-nowrap text-primary">
                                                        {order.invoice.replace("#", "INV-")}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <BadgeWithIcon
                                                            color={
                                                                order.status === "paid"
                                                                    ? "success"
                                                                    : order.status === "refunded"
                                                                      ? "gray"
                                                                      : order.status === "cancelled"
                                                                        ? "error"
                                                                        : "gray"
                                                            }
                                                            iconLeading={
                                                                order.status === "paid"
                                                                    ? Check
                                                                    : order.status === "refunded"
                                                                      ? ReverseLeft
                                                                      : order.status === "cancelled"
                                                                        ? X
                                                                        : Check
                                                            }
                                                            size="sm"
                                                            type="modern"
                                                            className="capitalize"
                                                        >
                                                            {order.status}
                                                        </BadgeWithIcon>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="group flex items-center gap-3 outline-hidden">
                                                            <Avatar
                                                                src={order.customer.avatarUrl}
                                                                alt={order.customer.name}
                                                                initials={order.customer.initials}
                                                                size="sm"
                                                            />
                                                            <div>
                                                                <p className="text-sm font-medium text-primary">{order.customer.name}</p>
                                                                <p className="text-sm text-tertiary">{order.customer.email}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <ProgressBar labelPosition="right" value={order.progress} />
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4!">
                                                        <div className="flex items-center justify-end">
                                                            <TableRowActionsDropdown />
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </TableCard.Root>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
