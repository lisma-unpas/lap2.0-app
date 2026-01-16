"use client";

import { Fragment } from "react";
import { PlusCircle, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";

const teams = [
    {
        title: "Layers",
        subtitle: "getlayers.io",
        src: "https://www.untitledui.com/logos/images/Layers.jpg",
    },
    {
        title: "Sisyphus",
        subtitle: "sisyphus.com",
        src: "https://www.untitledui.com/logos/images/Sisyphus.jpg",
    },
    {
        title: "Capsule",
        subtitle: "getcapsule.com",
        src: "https://www.untitledui.com/logos/images/Capsule.jpg",
    },
];

const teamMembers = [
    {
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
    },
    {
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
    },
    {
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
    },
    {
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
    },
    {
        name: "Candice Wu",
        email: "candice@untitledui.com",
    },
];

export const Settings08 = () => {
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
                subItems={[
                    { label: "My details", href: "#" },
                    { label: "Profile", href: "#" },
                    { label: "Password", href: "#" },
                    { label: "Team", href: "#", current: true },
                    { label: "Billing", href: "#" },
                    { label: "Notifications", href: "#" },
                ]}
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="mx-auto flex w-full max-w-160 flex-col gap-8 lg:gap-6">
                            <SectionHeader.Root>
                                <SectionHeader.Group>
                                    <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Teams</SectionHeader.Heading>
                                        <SectionHeader.Subheading>You're on the following teams. You can create a new team here.</SectionHeader.Subheading>
                                    </div>
                                    <SectionHeader.Actions>
                                        <Button color="secondary" size="md" iconLeading={<PlusCircle size={20} className="text-fg-quaternary" />}>
                                            Add team
                                        </Button>
                                    </SectionHeader.Actions>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            <div className="flex flex-col gap-8 lg:gap-6">
                                <div className="flex flex-col gap-5">
                                    <SectionLabel.Root size="sm" title="On teams" description="You're currently on these teams." />

                                    <ul className="flex flex-col gap-3 border-y border-secondary py-4">
                                        {teams.map((team) => (
                                            <Fragment key={team.title}>
                                                <li key={team.title} className="flex items-center justify-between">
                                                    <div className="group flex items-center gap-2">
                                                        <Avatar src={team.src} alt={team.title} />
                                                        <div>
                                                            <p className="text-sm font-semibold text-primary">{team.title}</p>
                                                            <p className="text-sm text-tertiary">{team.subtitle}</p>
                                                        </div>
                                                    </div>

                                                    <Button size="sm" color="link-gray">
                                                        Leave
                                                    </Button>
                                                </li>
                                                <li aria-hidden="true" className="last:hidden">
                                                    <hr className="h-px w-full border-none bg-border-secondary" />
                                                </li>
                                            </Fragment>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-6 lg:gap-5">
                                    <SectionLabel.Root size="sm" title="Your team" description="Manage your existing team and change roles/permissions." />

                                    <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                        <Table aria-label="Team members" selectionMode="none">
                                            <Table.Header>
                                                <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                                <Table.Head id="email" label="Email" />
                                                <Table.Head id="actions" />
                                            </Table.Header>

                                            <Table.Body items={teamMembers}>
                                                {(member) => (
                                                    <Table.Row id={member.email}>
                                                        <Table.Cell>
                                                            <div className="flex w-max items-center gap-3">
                                                                <Avatar
                                                                    src={member.avatarUrl}
                                                                    alt={member.name}
                                                                    size="md"
                                                                    initials={getInitials(member.name)}
                                                                />
                                                                <p className="text-sm font-medium whitespace-nowrap text-primary lg:whitespace-normal">
                                                                    {member.name}
                                                                </p>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>{member.email}</Table.Cell>
                                                        <Table.Cell>
                                                            <div className="flex gap-3">
                                                                <Button size="sm" color="link-gray">
                                                                    Delete
                                                                </Button>
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
