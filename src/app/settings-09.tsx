"use client";

import { useState } from "react";
import { ArrowLeft, Edit01, HomeLine, Plus, Trash01 } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { NativeSelect } from "@/components/base/select/select-native";

// Helper function for formatting dates
const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const teamMembers = [
    {
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 14).getTime(),
    },
    {
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 12).getTime(),
    },
    {
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 12).getTime(),
    },
    {
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 14).getTime(),
    },
    {
        name: "Candice Wu",
        email: "candice@untitledui.com",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 13).getTime(),
    },
];

const users = [
    {
        name: "Natali Craig",
        email: "natali@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 14).getTime(),
    },
    {
        name: "Drew Cano",
        email: "drew@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 12).getTime(),
    },
    {
        name: "Orlando Diggs",
        email: "orlando@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 12).getTime(),
    },
    {
        name: "Andi Lane",
        email: "andi@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 14).getTime(),
    },
    {
        name: "Kate Morrison",
        email: "kate@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
        dateAdded: new Date(2025, 1, 22).getTime(),
        lastActive: new Date(2025, 2, 14).getTime(),
    },
];

export const Settings09 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("team");

    const getInitials = (name: string) => {
        const [firstName, lastName] = name.split(" ");
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    return (
        <div className="bg-primary">
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
            />

            <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple */}
                        <div className="relative flex flex-col gap-4">
                            <div className="max-lg:hidden">
                                <Breadcrumbs type="button">
                                    <Breadcrumbs.Item href="#" icon={HomeLine} />
                                    <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                                    <Breadcrumbs.Item href="#">Team</Breadcrumbs.Item>
                                </Breadcrumbs>
                            </div>

                            <div className="flex lg:hidden">
                                <Button href="#" color="link-gray" size="md" iconLeading={ArrowLeft}>
                                    Back
                                </Button>
                            </div>

                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Team members</h1>
                                    <p className="text-md text-tertiary">Manage your team members and their account permissions here.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Button color="secondary" size="md" iconLeading={Plus}>
                                        Add team member
                                    </Button>
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
                        <ButtonGroup className="hidden md:flex">
                            {tabs.map((tab) => (
                                <ButtonGroupItem key={tab.id} isSelected={tab.id === selectedTab} onClick={() => setSelectedTab(tab.id)}>
                                    {tab.label}
                                </ButtonGroupItem>
                            ))}
                        </ButtonGroup>

                        <hr className="h-px w-full border-none bg-border-secondary" />
                    </div>

                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="flex flex-col gap-8 lg:gap-5">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,280px)_1fr]">
                                <SectionLabel.Root
                                    size="sm"
                                    title="Admin users"
                                    description="Admins can add and remove users and manage organization-level settings."
                                />

                                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                    <Table aria-label="Admin users" selectedKeys="all" selectionMode="multiple">
                                        <Table.Header>
                                            <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                            <Table.Head id="dateAdded" label="Date added" />
                                            <Table.Head id="lastActive" label="Last active" />
                                            <Table.Head id="actions" />
                                        </Table.Header>

                                        <Table.Body items={teamMembers}>
                                            {(member) => (
                                                <Table.Row id={member.email} highlightSelectedRow={false} className="even:bg-secondary_subtle">
                                                    <Table.Cell>
                                                        <div className="flex w-max items-center gap-3">
                                                            <Avatar src={member.avatarUrl} initials={getInitials(member.name)} alt={member.name} />
                                                            <div>
                                                                <p className="text-sm font-medium text-primary">{member.name}</p>
                                                                <p className="text-sm text-tertiary">{member.email}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap">{formatDate(member.dateAdded)}</Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap">{formatDate(member.lastActive)}</Table.Cell>
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
                            </div>

                            <hr className="hidden h-px w-full border-none bg-border-secondary lg:block" />

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,280px)_1fr]">
                                <SectionLabel.Root
                                    size="sm"
                                    title="Account users"
                                    description="Account users can assess and review risks, questionnaires, data leaks and identify breaches."
                                />

                                <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                    <Table aria-label="Account users" selectionMode="multiple">
                                        <Table.Header>
                                            <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                            <Table.Head id="dateAdded" label="Date added" />
                                            <Table.Head id="lastActive" label="Last active" />
                                            <Table.Head id="actions" />
                                        </Table.Header>

                                        <Table.Body items={users}>
                                            {(user) => (
                                                <Table.Row id={user.email} highlightSelectedRow={false} className="even:bg-secondary_subtle">
                                                    <Table.Cell>
                                                        <div className="flex w-max items-center gap-3">
                                                            <Avatar src={user.avatarUrl} initials={getInitials(user.name)} alt={user.name} />
                                                            <div>
                                                                <p className="text-sm font-medium text-primary">{user.name}</p>
                                                                <p className="text-sm text-tertiary">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap">{formatDate(user.dateAdded)}</Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap">{formatDate(user.lastActive)}</Table.Cell>
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
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
