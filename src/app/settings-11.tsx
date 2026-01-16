"use client";

import { useMemo, useState } from "react";
import { DownloadCloud02, LayersThree01, LayersTwo01, Zap } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard } from "@/components/application/table/table";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import * as RadioGroups from "@/components/base/radio-groups/radio-groups";

// Helper functions for formatting
const formatCurrency = (amount: number): string => `USD ${amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}`;

const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatInvoice = (planName: string, billingPeriod: number): string => {
    const date = new Date(billingPeriod);
    const monthYear = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
    return `${planName} – ${monthYear}`;
};

const invoices = [
    {
        id: "invoice-01",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 11, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 11, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-02",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 10, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 10, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-03",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 9, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 9, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-04",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 8, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 8, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-05",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 7, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 7, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-06",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 6, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 6, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-07",
        invoice: "Basic Plan",
        billingPeriod: new Date(2025, 5, 1).getTime(),
        amount: 10.0,
        date: new Date(2025, 5, 1).getTime(),
        status: "Paid",
    },
];

const plans = [
    {
        value: "basic",
        title: "Basic plan",
        secondaryTitle: "per month",
        price: "$10",
        description: "Includes up to 10 users, 20 GB individual data and access to all features.",
        icon: LayersTwo01,
        badge: "Limited time only",
    },
    {
        value: "business",
        title: "Business plan",
        secondaryTitle: "per month",
        price: "$20",
        description: "Includes up to 20 users, 40 GB individual data and access to all features.",
        icon: LayersThree01,
    },
    {
        value: "enterprise",
        title: "Enterprise plan",
        secondaryTitle: "per month",
        price: "$40",
        description: "Unlimited users, unlimited individual data and access to all features.",
        icon: Zap,
    },
];

export const Settings11 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "billingPeriod",
        direction: "descending",
    });

    const sortedItems = useMemo(() => {
        return invoices.toSorted((a, b) => {
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
        <div className="bg-secondary">
            <HeaderNavigationBase
                activeUrl="/settings-01"
                items={[
                    { label: "Home", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                subItems={[
                    { label: "My details", href: "#" },
                    { label: "Profile", href: "#" },
                    { label: "Password", href: "#" },
                    { label: "Team", href: "#" },
                    { label: "Billing", href: "#", current: true },
                    { label: "Notifications", href: "#" },
                ]}
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-secondary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        {/* Page header simple */}
                        <div className="relative flex flex-col gap-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Billing</h1>
                                    <p className="text-md text-tertiary">Manage your billing and payment details.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <RadioGroups.IconCard aria-label="Plans" defaultValue="basic" items={plans} className="lg:max-w-160" />
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <SectionHeader.Root className="border-none pb-0">
                            <SectionHeader.Group>
                                <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                    <SectionHeader.Heading>Billing history</SectionHeader.Heading>
                                </div>
                                <SectionHeader.Actions>
                                    <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                        Download all
                                    </Button>
                                </SectionHeader.Actions>
                            </SectionHeader.Group>
                        </SectionHeader.Root>

                        <TableCard.Root className="-mx-4 rounded-none bg-transparent shadow-none ring-0 lg:mx-0 lg:rounded-xl lg:bg-primary lg:shadow-xs lg:ring-1">
                            <Table
                                aria-label="Invoices"
                                selectionMode="multiple"
                                sortDescriptor={sortDescriptor}
                                onSortChange={setSortDescriptor}
                                className="bg-primary"
                            >
                                <Table.Header className="bg-primary">
                                    <Table.Head id="billingPeriod" isRowHeader label="Invoice" allowsSorting className="w-full" />
                                    <Table.Head id="amount" label="Amount" />
                                    <Table.Head id="date" label="Date" />
                                    <Table.Head id="status" label="Status" />
                                    <Table.Head id="actions" />
                                </Table.Header>
                                <Table.Body items={sortedItems}>
                                    {(invoice) => (
                                        <Table.Row id={invoice.id}>
                                            <Table.Cell className="font-semibold! text-nowrap">
                                                {formatInvoice(invoice.invoice, invoice.billingPeriod)}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">{formatCurrency(invoice.amount)}</Table.Cell>
                                            <Table.Cell className="text-nowrap">{formatDate(invoice.date)}</Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithDot
                                                    color={invoice.status === "Paid" ? "success" : invoice.status === "Failed" ? "error" : "gray"}
                                                    type="modern"
                                                    size="sm"
                                                >
                                                    {invoice.status}
                                                </BadgeWithDot>
                                            </Table.Cell>

                                            <Table.Cell className="px-4">
                                                <div className="flex justify-end gap-0.5">
                                                    <ButtonUtility size="xs" color="tertiary" tooltip="Download" icon={DownloadCloud02} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table>
                        </TableCard.Root>
                    </div>
                </div>
            </main>
        </div>
    );
};
