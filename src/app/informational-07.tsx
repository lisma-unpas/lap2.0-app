"use client";

import { useMemo, useState } from "react";
import { Edit01, FilterLines, PlusCircle, SearchLg, Trash01, Upload04, XClose, Zap } from "@untitledui/icons";
import { type SortDescriptor } from "react-aria-components";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { MetricsSimple } from "@/components/application/metrics/metrics";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithButton } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

const horizontalTabs = [
    { id: "overview", label: "Overview" },
    { id: "table", label: "Table" },
    { id: "list_view", label: "List view" },
    { id: "segment", label: "Segment" },
    { id: "custom", label: "Custom" },
];

const verticalTabs = [
    { id: "all", label: "All customers" },
    { id: "current", label: "Current" },
    { id: "churned", label: "Churned" },
    { id: "reports", label: "Reporst" },
];

const customers = [
    {
        id: "customer-01",
        company: {
            name: "Ephemeral",
            website: "ephemeral.io",
            imageUrl: "https://www.untitledui.com/logos/images/Ephemeral.jpg",
        },
        about: {
            title: "Content curating app",
            description: "Brings all your news into one place",
        },
        license_use: 70,
        status: "customer",
    },
    {
        id: "customer-02",
        company: {
            name: "Stack3d Lab",
            website: "stack3dlab.com",
            imageUrl: "https://www.untitledui.com/logos/images/Stack3d Lab.jpg",
        },
        about: {
            title: "Design software",
            description: "Super lightweight design app",
        },
        license_use: 60,
        status: "churned",
    },
    {
        id: "customer-03",
        company: {
            name: "Warpspeed",
            website: "getwarpspeed.com",
            imageUrl: "https://www.untitledui.com/logos/images/Warpspeed.jpg",
        },
        about: {
            title: "Data prediction",
            description: "AI and machine learning data",
        },
        license_use: 30,
        status: "customer",
    },
    {
        id: "customer-04",
        company: {
            name: "CloudWatch",
            website: "cloudwatch.app",
            imageUrl: "https://www.untitledui.com/logos/images/CloudWatch.jpg",
        },
        about: {
            title: "Productivity app",
            description: "Time management and productivity",
        },
        license_use: 80,
        status: "customer",
    },
    {
        id: "customer-05",
        company: {
            name: "ContrastAI",
            website: "contrastai.com",
            imageUrl: "https://www.untitledui.com/logos/images/ContrastAI.jpg",
        },
        about: {
            title: "Web app integrations",
            description: "Connect web apps seamlessly",
        },
        license_use: 20,
        status: "churned",
    },
    {
        id: "customer-06",
        company: {
            name: "Convergence",
            website: "convergence.io",
            imageUrl: "https://www.untitledui.com/logos/images/Convergence.jpg",
        },
        about: {
            title: "Sales CRM",
            description: "Web-based sales doc management",
        },
        license_use: 10,
        status: "customer",
    },
    {
        id: "customer-07",
        company: {
            name: "Sisyphus",
            website: "sisyphus.com",
            imageUrl: "https://www.untitledui.com/logos/images/Sisyphus.jpg",
        },
        about: {
            title: "Automation and workflow",
            description: "Time tracking, invoicing and expenses",
        },
        license_use: 40,
        status: "customer",
    },
];

export const Informational07 = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return customers;

        return customers.toSorted((a, b) => {
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
        <div className="flex flex-col">
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
                            { label: "Saved reports", href: "#" },
                            { label: "Scheduled reports", href: "#" },
                            { label: "Customers", href: "#", current: true },
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
            <main className="flex w-full flex-col gap-8 bg-primary pt-8 pb-12 shadow-none lg:pt-12 lg:pb-24">
                <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                    {/* Page header simple */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <p className="text-xl font-semibold text-primary lg:text-display-xs">Customers</p>
                            </div>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Button iconLeading={Upload04} color="secondary" size="md">
                                        Import
                                    </Button>
                                    <Button iconLeading={PlusCircle} color="primary" size="md">
                                        Add customer
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Tabs orientation="horizontal" selectedKey="overview" className="-mx-4 pl-4">
                            <TabList size="sm" type="underline" items={horizontalTabs} />
                        </Tabs>
                    </div>
                </div>
                <div className="mx-auto flex w-full max-w-container gap-16 px-4 lg:px-8">
                    <Tabs orientation="vertical" selectedKey="all" className="w-auto max-lg:hidden">
                        <TabList size="sm" type="line" items={verticalTabs} className="items-start" />
                    </Tabs>
                    <div className="mx-auto flex w-full min-w-0 flex-1 flex-col lg:gap-6">
                        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
                            <MetricsSimple title="2,420" subtitle="Total customers" change="100%" type="modern" trend="positive" />
                            <MetricsSimple title="1,210" subtitle="Members" change="100%" type="modern" trend="positive" />
                            <MetricsSimple title="316" subtitle="Active now" change="100%" type="modern" trend="positive" />
                        </div>
                        <div className="flex w-full flex-col gap-6">
                            <div className="hidden justify-between gap-4 lg:flex">
                                <div className="flex gap-3">
                                    <Button iconTrailing={XClose} size="md" color="secondary">
                                        All time
                                    </Button>
                                    <Button iconTrailing={XClose} size="md" color="secondary">
                                        US, AU, +4
                                    </Button>
                                    <Button iconLeading={FilterLines} size="md" color="secondary">
                                        More filters
                                    </Button>
                                </div>
                                <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="sm" className="w-80" />
                            </div>
                            <div className="mt-8 flex flex-col gap-3 lg:hidden">
                                <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="sm" />
                                <Button iconLeading={FilterLines} size="md" color="secondary">
                                    More filters
                                </Button>
                                <div className="flex gap-3">
                                    <BadgeWithButton color="brand" size="md" type="pill-color" buttonLabel="Clear" onButtonClick={() => {}}>
                                        All time
                                    </BadgeWithButton>
                                    <BadgeWithButton color="brand" size="md" type="pill-color" buttonLabel="Clear" onButtonClick={() => {}}>
                                        US, AU, +4
                                    </BadgeWithButton>
                                </div>
                            </div>

                            <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                <Table
                                    aria-label="Trades"
                                    selectionMode="multiple"
                                    defaultSelectedKeys={["customer-01", "customer-02", "customer-03", "customer-06", "customer-07"]}
                                    sortDescriptor={sortDescriptor}
                                    onSortChange={setSortDescriptor}
                                >
                                    <Table.Header>
                                        <Table.Head id="company" isRowHeader allowsSorting label="Company" className="w-full" />
                                        <Table.Head id="status" label="Status" />
                                        <Table.Head id="users" label="Users" />
                                        <Table.Head id="license_use" label="License use" className="min-w-50" />
                                        <Table.Head id="actions" />
                                    </Table.Header>
                                    <Table.Body items={sortedItems}>
                                        {(customer) => (
                                            <Table.Row id={customer.id} className="selected:bg-primary">
                                                <Table.Cell>
                                                    <div className="group flex items-center gap-3 outline-hidden">
                                                        <Avatar src={customer.company.imageUrl} alt={customer.company.name} size="md" />
                                                        <div>
                                                            <p className="text-sm font-medium text-primary">{customer.company.name}</p>
                                                            <p className="text-sm text-tertiary">{customer.company.website}</p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Badge
                                                        size="sm"
                                                        type="pill-color"
                                                        color={customer.status === "customer" ? "success" : "gray"}
                                                        className="capitalize"
                                                    >
                                                        {customer.status}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex -space-x-1">
                                                        <Avatar
                                                            className="ring-[1.5px] ring-bg-primary"
                                                            size="xs"
                                                            src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                                            alt="Olivia Rhye"
                                                        />
                                                        <Avatar
                                                            className="ring-[1.5px] ring-bg-primary"
                                                            size="xs"
                                                            src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
                                                            alt="Phoenix Baker"
                                                        />
                                                        <Avatar
                                                            className="ring-[1.5px] ring-bg-primary"
                                                            size="xs"
                                                            src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
                                                            alt="Lana Steiner"
                                                        />
                                                        <Avatar
                                                            className="ring-[1.5px] ring-bg-primary"
                                                            size="xs"
                                                            src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                                                            alt="Demi Wilkinson"
                                                        />

                                                        <Avatar
                                                            className="ring-[1.5px] ring-bg-primary"
                                                            size="xs"
                                                            src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                                            alt="Candice Wu"
                                                        />
                                                        <Avatar
                                                            size="xs"
                                                            className="ring-[1.5px] ring-bg-primary"
                                                            placeholder={
                                                                <span className="flex items-center justify-center text-xs font-semibold text-quaternary">
                                                                    +5
                                                                </span>
                                                            }
                                                        />
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <ProgressBar min={0} max={100} value={customer.license_use} />
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
                            </TableCard.Root>
                            <PaginationPageMinimalCenter />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
