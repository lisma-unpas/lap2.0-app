"use client";

import { useState } from "react";
import { Mail01, Plus, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { InputBase, TextField } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";

const teamMembers = [
    {
        name: "Olivia Rhye",
        email: "olivia@untitledui.com",
        role: "Admin",
        avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
    },
    {
        name: "Phoenix Baker",
        email: "phoenix@untitledui.com",
        role: "Admin",
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
    },
    {
        name: "Lana Steiner",
        email: "lana@untitledui.com",
        role: "Read-only",
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
    },
    {
        name: "Demi Wilkinson",
        email: "demi@untitledui.com",
        role: "Read-only",
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
    },
    {
        name: "Candice Wu",
        role: "Read-only",
        email: "candice@untitledui.com",
    },
];

export const Settings07 = () => {
    const [invites, setInvites] = useState<number[]>(Array.from({ length: 3 }, (_, i) => i + 1));

    const addInvite = () => {
        setInvites((prev) => [...prev, prev.length + 1]);
    };

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
                        {/* Page header simple */}
                        <div className="relative flex flex-col gap-5 border-b border-secondary pb-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Team management</h1>
                                    <p className="text-md text-tertiary">Manage your team members and their account permissions here.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-8 px-4 lg:gap-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,560px)] lg:gap-16">
                            <SectionLabel.Root
                                size="sm"
                                title="Invite team members"
                                description="Get your projects up and running faster by inviting your team to collaborate."
                                tooltip="This is a tooltip"
                            />

                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = Object.fromEntries(new FormData(e.currentTarget));
                                    console.log("Form data:", data);
                                }}
                                className="flex w-full flex-col gap-4"
                            >
                                {invites.map((id) => (
                                    <div key={id} className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_minmax(160px,max-content)]">
                                        <TextField isRequired aria-label="Email address" name={`email-${id}`} type="email">
                                            <InputBase icon={Mail01} size="md" placeholder="you@example.com" />
                                        </TextField>

                                        <Select
                                            name={`access-${id}`}
                                            aria-label="Access"
                                            size="md"
                                            defaultSelectedKey="readonly"
                                            items={[
                                                {
                                                    id: "readonly",
                                                    label: "Read only",
                                                },
                                                {
                                                    id: "write",
                                                    label: "Write",
                                                },
                                            ]}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>
                                ))}

                                <SectionFooter.Root className="border-none pt-0!">
                                    <Button onClick={addInvite} color="link-gray" size="md" iconLeading={Plus}>
                                        Add another
                                    </Button>
                                    <SectionFooter.Actions>
                                        <Button type="submit" color="primary" size="md" iconLeading={Mail01}>
                                            Send invites
                                        </Button>
                                    </SectionFooter.Actions>
                                </SectionFooter.Root>
                            </Form>
                        </div>

                        <hr className="hidden h-px w-full border-none bg-border-secondary lg:block" />

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-16">
                            <SectionLabel.Root size="sm" title="Team members" description="Manage your existing team and change roles/permissions." />

                            <TableCard.Root className="-mx-4 rounded-none lg:mx-0 lg:rounded-xl">
                                <Table aria-label="Team members" selectionMode="multiple">
                                    <Table.Header>
                                        <Table.Head id="name" label="Name" isRowHeader className="w-full" />
                                        <Table.Head id="role" label="Role" />
                                        <Table.Head id="actions" />
                                    </Table.Header>

                                    <Table.Body items={teamMembers}>
                                        {(member) => (
                                            <Table.Row id={member.email}>
                                                <Table.Cell>
                                                    <div className="flex w-max items-center gap-3">
                                                        <Avatar src={member.avatarUrl} initials={getInitials(member.name)} alt={member.name} />
                                                        <div>
                                                            <p className="text-sm font-medium text-primary">{member.name}</p>
                                                            <p className="text-sm text-tertiary">{member.email}</p>
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap">{member.role}</Table.Cell>
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
            </main>
        </div>
    );
};
