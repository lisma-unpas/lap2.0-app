"use client";

import { useMemo, useState } from "react";
import { FileIcon } from "@untitledui/file-icons";
import { ArrowUpRight, Check, DownloadCloud02, Zap } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { InlineCTAPaymentMethod } from "@/components/application/inline-cta/inline-cta.demo";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

// Helper functions for formatting
const formatCurrency = (amount: number): string => amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatInvoice = (invoiceNumber: number, billingPeriod: number): string => {
    const date = new Date(billingPeriod);
    const monthYear = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
    return `Invoice #${invoiceNumber.toString().padStart(3, "0")} – ${monthYear}`;
};

const invoices = [
    {
        id: "invoice-01",
        invoice: 7,
        billingPeriod: new Date(2025, 11, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 11, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-02",
        invoice: 6,
        billingPeriod: new Date(2025, 10, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 10, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-03",
        invoice: 5,
        billingPeriod: new Date(2025, 9, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 9, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-04",
        invoice: 4,
        billingPeriod: new Date(2025, 8, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 8, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-05",
        invoice: 3,
        billingPeriod: new Date(2025, 7, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 7, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-06",
        invoice: 2,
        billingPeriod: new Date(2025, 6, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 6, 1).getTime(),
        status: "Paid",
    },
    {
        id: "invoice-07",
        invoice: 1,
        billingPeriod: new Date(2025, 5, 1).getTime(),
        plan: "Basic plan",
        amount: 10.0,
        date: new Date(2025, 5, 1).getTime(),
        status: "Paid",
    },
];

export const Settings13 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "date",
        direction: "ascending",
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
        <div className="bg-primary">
            <HeaderNavigationBase
                activeUrl="/settings-01"
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        items: [
                            { label: "My details", href: "#" },
                            { label: "Profile", href: "#", current: true },
                            { label: "Password", href: "#" },
                            { label: "Team", href: "#" },
                            { label: "Billing", href: "#" },
                            { label: "Notifications", href: "#" },
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

            <main className="bg-secondary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple */}
                        <div className="relative flex flex-col gap-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Billing</h1>
                                    <p className="text-md text-tertiary">Manage your billing and payment details.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-5 px-4 lg:grid-cols-2 lg:gap-6 lg:px-8">
                        <div className="w-full flex-1 rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset">
                            <div className="flex flex-col gap-6 p-6 pb-8 lg:pb-6">
                                <div className="flex items-center justify-between gap-8">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-primary">Basic plan</h3>
                                            <Badge color="brand" type="pill-color">
                                                Monthly
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-tertiary">Our most popular plan for small teams.</p>
                                    </div>

                                    <div className="hidden items-end gap-1 lg:flex">
                                        <div className="pb-2.5 text-display-md font-semibold text-primary">$</div>
                                        <div className="text-display-lg font-semibold text-primary">10</div>
                                        <div className="pb-[7px] text-md font-medium text-tertiary">per month</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm font-medium text-primary">14 of 20 users</p>
                                    <ProgressBar value={75} />
                                </div>
                            </div>
                            <SectionFooter.Root isCard>
                                <SectionFooter.Actions>
                                    <Button color="link-color" size="md" iconTrailing={ArrowUpRight}>
                                        Upgrade plan
                                    </Button>
                                </SectionFooter.Actions>
                            </SectionFooter.Root>
                        </div>

                        <InlineCTAPaymentMethod />
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <SectionHeader.Root className="border-none pb-0">
                            <SectionHeader.Group>
                                <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                    <SectionHeader.Heading>Billing and invoicing</SectionHeader.Heading>
                                    <SectionHeader.Subheading>Pick an account plan that fits your workflow.</SectionHeader.Subheading>
                                </div>
                                <SectionHeader.Actions>
                                    <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                        Download all
                                    </Button>
                                </SectionHeader.Actions>
                                <div className="absolute top-0 right-0 md:static">
                                    <TableRowActionsDropdown />
                                </div>
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
                                    <Table.Head id="invoice" isRowHeader label="Invoice" className="w-full min-w-64" />
                                    <Table.Head id="date" label="Billing date" allowsSorting />
                                    <Table.Head id="status" label="Status" />
                                    <Table.Head id="amount" label="Amount" />
                                    <Table.Head id="plan" label="Plan" />
                                    <Table.Head id="actions" />
                                </Table.Header>
                                <Table.Body items={sortedItems}>
                                    {(invoice) => (
                                        <Table.Row id={invoice.id}>
                                            <Table.Cell className="text-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <FileIcon type="pdf" variant="solid" className="size-10" />
                                                    <span className="text-sm font-medium text-primary">
                                                        {formatInvoice(invoice.invoice, invoice.billingPeriod)}
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">{formatDate(invoice.date)}</Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithIcon
                                                    iconLeading={Check}
                                                    color={invoice.status === "Paid" ? "success" : invoice.status === "Failed" ? "error" : "gray"}
                                                    type="pill-color"
                                                    size="sm"
                                                >
                                                    {invoice.status}
                                                </BadgeWithIcon>
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">{formatCurrency(invoice.amount)}</Table.Cell>
                                            <Table.Cell className="text-nowrap">{invoice.plan}</Table.Cell>
                                            <Table.Cell>
                                                <div className="flex gap-0.5">
                                                    <Button size="sm" color="link-color">
                                                        Edit
                                                    </Button>
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
