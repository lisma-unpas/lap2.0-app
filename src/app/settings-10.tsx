"use client";

import { useMemo, useState } from "react";
import { DownloadCloud02, Edit01, Plus, Trash01, Zap } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import type { BadgeColors } from "@/components/base/badges/badge-types";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { NativeSelect } from "@/components/base/select/select-native";

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team", badge: 48 },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const teamMembers = [
    {
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        username: "@olivia",
        avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        status: "Active",
        teams: [
            { name: "Design", value: "design" },
            { name: "Product", value: "product" },
        ],
    },
    {
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        username: "@phoenix",
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        status: "Active",
        teams: [
            { name: "Product", value: "product" },
            { name: "Software Engineering", value: "software_engineering" },
        ],
    },
    {
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        username: "@lana",
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        status: "Offline",
        teams: [
            { name: "Operations", value: "operations" },
            { name: "Product", value: "product" },
        ],
    },
    {
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        username: "@demi",
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
        status: "Active",
        teams: [
            { name: "Design", value: "design" },
            { name: "Product", value: "product" },
            { name: "Software Engineering", value: "software_engineering" },
        ],
    },
    {
        name: "Candice Wu",
        email: "candice@untitledui.com",
        username: "@candice",
        status: "Offline",
        teams: [
            { name: "Operations", value: "operations" },
            { name: "Finance", value: "finance" },
        ],
    },
    {
        name: "Natali Craig",
        email: "natali@untitledui.com",
        username: "@natali",
        avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
        status: "Active",
        teams: [
            { name: "Design", value: "design" },
            { name: "Finance", value: "finance" },
        ],
    },
    {
        name: "Drew Cano",
        email: "drew@untitledui.com",
        username: "@drew",
        avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        status: "Active",
        teams: [
            { name: "Customer Success", value: "customer_success" },
            { name: "Operations", value: "operations" },
            { name: "Finance", value: "finance" },
        ],
    },
    {
        name: "Orlando Diggs",
        email: "orlando@untitledui.com",
        username: "@orlando",
        avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
        status: "Active",
        teams: [
            { name: "Product", value: "product" },
            { name: "Software Engineering", value: "software_engineering" },
        ],
    },
];

export const Settings10 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("team");
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const teamsToBadgeColorsMap: Record<string, BadgeColors> = {
        design: "brand",
        product: "blue",
        software_engineering: "success",
        operations: "pink",
        finance: "purple",
        customer_success: "indigo",
    };

    const getInitials = (name: string) => {
        const [firstName, lastName] = name.split(" ");
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    const sortedItems = useMemo(() => {
        if (!sortDescriptor) return teamMembers;

        return teamMembers.toSorted((a, b) => {
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
                            { label: "Profile", href: "#" },
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

            <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple  */}
                        <div className="relative flex flex-col gap-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
                                </div>
                            </div>
                        </div>

                        <NativeSelect
                            aria-label="Page tabs"
                            className="md:hidden"
                            value={selectedTab}
                            onChange={(event) => setSelectedTab(event.target.value)}
                            options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                        />
                        <Tabs className="hidden w-full md:flex" selectedKey={selectedTab} onSelectionChange={(value) => setSelectedTab(value as string)}>
                            <TabList type="underline" className="w-full" items={tabs} />
                        </Tabs>
                    </div>

                    <div className="mx-auto w-full max-w-container border-t border-secondary lg:border-none lg:px-8">
                        <TableCard.Root className="rounded-none bg-transparent shadow-none ring-0 lg:rounded-xl lg:bg-primary lg:shadow-xs lg:ring-1">
                            <TableCard.Header
                                title="Team members"
                                description="Manage your team members and their account permissions here."
                                className="pb-5"
                                badge={
                                    <Badge color="gray" type="modern" size="sm">
                                        48 users
                                    </Badge>
                                }
                                contentTrailing={
                                    <div className="flex gap-3">
                                        <Button color="secondary" size="md" iconLeading={DownloadCloud02}>
                                            Download CSV
                                        </Button>
                                        <Button size="md" iconLeading={Plus}>
                                            Add user
                                        </Button>
                                    </div>
                                }
                            />
                            <Table
                                aria-label="Team members"
                                selectionMode="multiple"
                                sortDescriptor={sortDescriptor}
                                onSortChange={setSortDescriptor}
                                className="bg-primary"
                            >
                                <Table.Header className="bg-primary">
                                    <Table.Head id="name" isRowHeader label="Name" className="w-full" />
                                    <Table.Head id="status" label="Status" allowsSorting />
                                    <Table.Head id="email" label="Email address" />
                                    <Table.Head id="teams" label="Teams" />
                                    <Table.Head id="actions" />
                                </Table.Header>
                                <Table.Body items={sortedItems}>
                                    {(member) => (
                                        <Table.Row id={member.email} className="odd:bg-secondary_subtle">
                                            <Table.Cell>
                                                <div className="flex w-max items-center gap-3">
                                                    <Avatar src={member.avatarUrl} initials={getInitials(member.name)} alt={member.name} />
                                                    <div>
                                                        <p className="text-sm font-medium text-primary">{member.name}</p>
                                                        <p className="text-sm text-tertiary">{member.username}</p>
                                                    </div>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <BadgeWithDot
                                                    color={member.status === "Active" ? "success" : member.status === "Offline" ? "gray" : "gray"}
                                                    size="sm"
                                                    type="modern"
                                                >
                                                    {member.status}
                                                </BadgeWithDot>
                                            </Table.Cell>
                                            <Table.Cell>{member.email}</Table.Cell>
                                            <Table.Cell>
                                                <div className="flex gap-1">
                                                    {member.teams.map((team) => (
                                                        <Badge key={team.value} color={teamsToBadgeColorsMap[team.value]} type="color" size="sm">
                                                            {team.name}
                                                        </Badge>
                                                    ))}
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
                            <PaginationCardDefault page={1} total={6} />
                        </TableCard.Root>
                    </div>
                </div>
            </main>
        </div>
    );
};
