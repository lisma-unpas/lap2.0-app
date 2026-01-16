"use client";

import type { FC } from "react";
import { useMemo, useState } from "react";
import { Download02, FilterFunnel02, Monitor04, SearchLg, UserCheck01, UsersCheck } from "@untitledui/icons";
import { type SortDescriptor } from "react-aria-components";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { MetricChangeIndicator } from "@/components/application/metrics/metrics";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { Table, TableCard, TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import { Dot } from "@/components/foundations/dot-icon";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

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

const Metric = ({ icon, title, subtitle, className }: { title: string; subtitle: string; icon: FC<{ className?: string }>; className?: string }) => {
    return (
        <div className={cx("rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset", className)}>
            <div className="relative flex flex-col gap-4 px-4 py-5 md:gap-5 md:px-5">
                <FeaturedIcon color="gray" theme="modern-neue" icon={icon} size="lg" />

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-tertiary">{subtitle}</h3>

                    <div className="flex items-end gap-4">
                        <p className="flex-1 text-display-sm font-semibold text-primary">{title}</p>
                        <MetricChangeIndicator trend="positive" type="modern" value="100%" />
                    </div>
                </div>

                <div className="absolute top-4 right-4 md:top-5 md:right-5">
                    <TableRowActionsDropdown />
                </div>
            </div>
        </div>
    );
};

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "table", label: "Table" },
    { id: "list_view", label: "List view" },
    { id: "segment", label: "Segment" },
    { id: "custom", label: "Custom" },
];

export const Informational06 = () => {
    const [status, setStatus] = useState("paid");
    const [category, setCategory] = useState("all");
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
        <div className="flex flex-col bg-primary">
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
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="mx-auto flex w-full max-w-container flex-col gap-8 bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-5 px-4 lg:px-8">
                    <p className="text-xl font-semibold text-primary lg:text-display-xs">Customers</p>
                    <Tabs orientation="horizontal" selectedKey="overview" className="-mx-4 inline-flex pl-4">
                        <TabList size="sm" type="underline" items={tabs} />
                    </Tabs>
                </div>

                <div className="flex flex-col gap-x-6 gap-y-5 px-4 md:flex-row md:flex-wrap md:gap-y-6 lg:px-8">
                    <Metric icon={UsersCheck} title="2,420" subtitle="Total customers" className="flex-1 md:min-w-[320px]" />
                    <Metric icon={UserCheck01} title="1,210" subtitle="Members" className="flex-1 md:min-w-[320px]" />
                    <Metric icon={Monitor04} title="316" subtitle="Active now" className="flex-1 md:min-w-[320px]" />
                </div>

                <div className="flex flex-col gap-6 px-4 lg:px-8">
                    <SectionHeader.Root className="border-none pb-0">
                        <SectionHeader.Group>
                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                <SectionHeader.Heading>Customers</SectionHeader.Heading>
                                <SectionHeader.Subheading>Companies that have purchased a subscription.</SectionHeader.Subheading>
                            </div>

                            <SectionHeader.Actions className="hidden lg:flex">
                                <Button size="md" color="secondary" iconLeading={Download02}>
                                    Download all
                                </Button>
                            </SectionHeader.Actions>

                            <div className="absolute top-0 right-0 lg:static lg:hidden">
                                <TableRowActionsDropdown />
                            </div>
                        </SectionHeader.Group>
                    </SectionHeader.Root>

                    <div className="flex flex-col gap-3 lg:hidden">
                        <Input shortcut size="sm" aria-label="Search" placeholder="Search" icon={SearchLg} />
                        <Button size="md" color="secondary" iconLeading={FilterFunnel02}>
                            Filters
                        </Button>
                    </div>

                    <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                        <div className="hidden items-end justify-between border-b border-secondary px-6 py-5 lg:flex">
                            <div className="flex gap-3">
                                <Input
                                    shortcut
                                    label="Search for order"
                                    className="lg:max-w-xs lg:min-w-80"
                                    size="sm"
                                    aria-label="Search"
                                    placeholder="Search"
                                    icon={SearchLg}
                                />
                                <div className="w-48">
                                    <Select
                                        label="Status"
                                        selectedKey={status}
                                        placeholderIcon={<Dot className="size-2.5 shrink-0 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />}
                                        onSelectionChange={(value) => setStatus(value as string)}
                                        items={[
                                            {
                                                id: "all",
                                                label: "All",
                                                icon: <Dot className="size-2.5 shrink-0 text-fg-brand-secondary in-disabled:text-fg-disabled_subtle" />,
                                            },
                                            {
                                                id: "paid",
                                                label: "Paid",
                                                icon: <Dot className="size-2.5 shrink-0 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
                                            },
                                            {
                                                id: "churned",
                                                label: "Churned",
                                                icon: <Dot className="size-2.5 shrink-0 text-fg-quaternary in-disabled:text-fg-disabled_subtle" />,
                                            },
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                                <div className="w-48">
                                    <Select
                                        label="Category"
                                        selectedKey={category}
                                        placeholderIcon={<Dot className="size-2.5 shrink-0 text-fg-success-primary in-disabled:text-fg-disabled_subtle" />}
                                        onSelectionChange={(value) => setCategory(value as string)}
                                        items={[
                                            {
                                                id: "all",
                                                label: "All",
                                                icon: <Dot className="size-2.5 shrink-0 text-fg-brand-primary in-disabled:text-fg-disabled_subtle" />,
                                            },
                                            {
                                                id: "books",
                                                label: "Books",
                                                icon: <Dot className="size-2.5 shrink-0 text-fg-warning-secondary in-disabled:text-fg-disabled_subtle" />,
                                            },
                                            {
                                                id: "tech",
                                                label: "Tech",
                                                icon: <Dot className="size-2.5 shrink-0 text-fg-success-secondary in-disabled:text-fg-disabled_subtle" />,
                                            },
                                            {
                                                id: "legal",
                                                label: "Legal",
                                                icon: <Dot className="size-2.5 shrink-0 text-utility-blue-600 in-disabled:text-fg-disabled_subtle" />,
                                            },
                                        ]}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                            </div>
                            <Button size="md" color="secondary">
                                Clear all
                            </Button>
                        </div>
                        <Table aria-label="Trades" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                            <Table.Header className="bg-primary">
                                <Table.Head id="company" isRowHeader allowsSorting label="Company" className="w-full" />
                                <Table.Head id="status" label="Status" />
                                <Table.Head id="about" label="About" />
                                <Table.Head id="users" label="Users" />
                                <Table.Head id="license_use" label="License use" className="min-w-60" />
                                <Table.Head id="actions" />
                            </Table.Header>
                            <Table.Body items={sortedItems}>
                                {(customer) => (
                                    <Table.Row id={customer.id} className="odd:bg-secondary_subtle">
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
                                            <BadgeWithDot
                                                size="sm"
                                                type="modern"
                                                color={customer.status === "customer" ? "success" : "gray"}
                                                className="capitalize"
                                            >
                                                {customer.status}
                                            </BadgeWithDot>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                <p className="text-sm font-medium whitespace-nowrap text-primary">{customer.about.title}</p>
                                                <p className="text-sm whitespace-nowrap text-tertiary">{customer.about.description}</p>
                                            </div>
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
                                                        <span className="flex items-center justify-center text-xs font-semibold text-quaternary">+5</span>
                                                    }
                                                />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <ProgressBar labelPosition="right" min={0} max={100} value={customer.license_use} />
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
            </main>
        </div>
    );
};
