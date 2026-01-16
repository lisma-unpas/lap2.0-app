"use client";

import { useState } from "react";
import { SearchLg, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { InlineCTAImage } from "@/components/application/inline-cta/inline-cta.demo";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { Toggle } from "@/components/base/toggle/toggle";

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team", badge: 4 },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const integrations = [
    {
        name: "Linear",
        description: "Streamline software projects, sprints, tasks, and bug tracking.",
        logo: "https://www.untitledui.com/logos/integrations/linear.svg",
        url: "https://linear.com",
        active: true,
    },
    {
        name: "GitHub",
        description: "Link pull requests and automate workflows.",
        logo: "https://www.untitledui.com/logos/integrations/github.svg",
        url: "https://github.com",
        active: true,
    },
    {
        name: "Figma",
        description: "Embed file previews in projects.",
        logo: "https://www.untitledui.com/logos/integrations/figma.svg",
        url: "https://figma.com",
        active: true,
    },
    {
        name: "Zapier",
        description: "Build custom automations and integrations with other apps.",
        logo: "https://www.untitledui.com/logos/integrations/zapier.svg",
        url: "https://zapier.com",
        active: true,
    },
    {
        name: "Notion",
        description: "Embed notion pages and notes in projects.",
        logo: "https://www.untitledui.com/logos/integrations/notion.svg",
        url: "https://notion.com",
        active: true,
    },
    {
        name: "Slack",
        description: "Send notifications to channels and create projects from messages.",
        logo: "https://www.untitledui.com/logos/integrations/slack.svg",
        url: "https://slack.com",
        active: false,
    },
];

export const Settings20 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("integrations");

    return (
        <div>
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
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:gap-6 lg:px-8">
                        {/* Page header simple with search */}
                        <div className="relative flex flex-col gap-5 lg:border-b lg:border-secondary lg:pb-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
                                    <p className="text-md text-tertiary">Manage your account settings and preferences here.</p>
                                </div>
                            </div>
                        </div>

                        <NativeSelect
                            aria-label="Page tabs"
                            className="lg:hidden"
                            value={selectedTab}
                            onChange={(event) => setSelectedTab(event.target.value)}
                            options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                        />
                    </div>

                    <div className="mx-auto flex w-full max-w-container gap-24 px-4 lg:px-8">
                        <Tabs
                            orientation="vertical"
                            className="hidden w-auto lg:flex"
                            selectedKey={selectedTab}
                            onSelectionChange={(value) => setSelectedTab(value as string)}
                        >
                            <TabList type="button-gray" items={tabs} />
                        </Tabs>

                        <div className="flex flex-1 flex-col gap-6">
                            <SectionHeader.Root className="border-none pb-0">
                                <SectionHeader.Group>
                                    <div className="flex flex-1 flex-col justify-center gap-0.5">
                                        <SectionHeader.Heading>Connected apps</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Supercharge your workflow and connect the tool you use every day.</SectionHeader.Subheading>
                                    </div>
                                    <div className="w-full md:w-80">
                                        <Input size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />
                                    </div>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            <ul className="flex flex-col gap-4 lg:gap-0">
                                {integrations.map((integration) => (
                                    <li
                                        key={integration.name}
                                        className="flex flex-col gap-4 border-b border-secondary py-4 last:border-none lg:flex-row lg:items-center"
                                    >
                                        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                                            <div className="flex items-center justify-between">
                                                <div className="w-max shrink-0 rounded-lg bg-white p-0.5 shadow-xs ring-1 ring-secondary ring-inset">
                                                    <img src={integration.logo} alt={integration.name} className="size-12 object-contain" />
                                                </div>
                                                <div className="lg:hidden">
                                                    <Toggle isSelected={integration.active} size="md" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-md font-semibold text-secondary">{integration.name}</p>
                                                <p className="text-sm text-tertiary">{integration.description}</p>
                                            </div>
                                        </div>
                                        <div className="-mt-1 flex items-center gap-4 lg:mt-0">
                                            <Button color="link-gray" size="md" href={integration.url} target="_blank">
                                                Learn more
                                            </Button>
                                            <div className="max-lg:hidden">
                                                <Toggle isSelected={integration.active} size="md" />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <InlineCTAImage />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
