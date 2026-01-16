"use client";

import { useState } from "react";
import { Plus, SearchLg, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
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
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

const integrations = [
    {
        name: "Linear",
        description: "Streamline software projects, sprints, and bug tracking.",
        logo: "https://www.untitledui.com/logos/integrations/linear.svg",
        active: true,
    },
    {
        name: "GitHub",
        description: "Link pull requests and automate workflows.",
        logo: "https://www.untitledui.com/logos/integrations/github.svg",
        active: true,
    },
    {
        name: "Figma",
        description: "Embed file previews in projects.",
        logo: "https://www.untitledui.com/logos/integrations/figma.svg",
        active: true,
    },
    {
        name: "Zapier",
        description: "Build custom automations and integrations with apps.",
        logo: "https://www.untitledui.com/logos/integrations/zapier.svg",
        active: false,
    },
    {
        name: "Notion",
        description: "Embed notion pages and notes in projects.",
        logo: "https://www.untitledui.com/logos/integrations/notion.svg",
        active: true,
    },
    {
        name: "Slack",
        description: "Send notifications to channels and create projects.",
        logo: "https://www.untitledui.com/logos/integrations/slack.svg",
        active: true,
    },
    {
        name: "Zendesk",
        description: "Link and automate Zendesk tickets.",
        logo: "https://www.untitledui.com/logos/integrations/zendesk.svg",
        active: true,
    },
    {
        name: "Atlassian JIRA",
        description: "Plan, track, and release great software.",
        logo: "https://www.untitledui.com/logos/integrations/jira.svg",
        active: false,
    },
    {
        name: "Dropbox",
        description: "Everything you need for work.",
        logo: "https://www.untitledui.com/logos/integrations/dropbox.svg",
        active: true,
    },
    {
        name: "Google Chrome",
        description: "Link your Google account to share bookmarks across your entire team.",
        logo: "https://www.untitledui.com/logos/integrations/chrome.svg",
        active: true,
    },
    {
        name: "Discord",
        description: "Keep in touch with your customers without leaving the app.",
        logo: "https://www.untitledui.com/logos/integrations/discord.svg",
        active: true,
    },
    {
        name: "Google Drive",
        description: "Link your Google account to share files across your entire team.",
        logo: "https://www.untitledui.com/logos/integrations/google_drive.svg",
        active: false,
    },
];

const categories = [
    {
        id: "all",
        label: "View all",
    },
    {
        id: "developer-tools",
        label: "Developer tools",
    },
    {
        id: "communication",
        label: "Communication",
    },
    {
        id: "productivity",
        label: "Productivity",
    },
    {
        id: "browser-tools",
        label: "Browser tools",
    },
    {
        id: "marketplace",
        label: "Marketplace",
    },
];

export const Settings21 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("integrations");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    return (
        <div>
            <HeaderNavigationBase
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

            <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:gap-6 lg:px-8">
                        {/* Page header simple with search */}
                        <div className="relative flex flex-col gap-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
                                </div>
                                <div className="flex flex-col gap-4 lg:flex-row">
                                    <Input className="lg:w-80" size="sm" shortcut aria-label="Search" placeholder="Search" icon={SearchLg} />
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
                            <TabList type="button-minimal" className="w-full" items={tabs} />
                        </Tabs>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <SectionHeader.Root className="border-none pb-0">
                            <SectionHeader.Group>
                                <div className="flex flex-1 flex-col justify-center gap-0.5">
                                    <SectionHeader.Heading>Integrations and connected apps</SectionHeader.Heading>
                                    <SectionHeader.Subheading>Supercharge your workflow and connect the tool you use every day.</SectionHeader.Subheading>
                                </div>
                                <SectionHeader.Actions>
                                    <Button color="secondary" size="md" iconLeading={Plus}>
                                        Request integration
                                    </Button>
                                </SectionHeader.Actions>
                            </SectionHeader.Group>
                        </SectionHeader.Root>

                        <div className="flex gap-16">
                            <Tabs
                                orientation="vertical"
                                className="hidden w-auto lg:flex"
                                selectedKey={selectedCategory}
                                onSelectionChange={(value) => setSelectedCategory(value as string)}
                            >
                                <TabList type="line" items={categories} />
                            </Tabs>

                            <div className="flex flex-1 flex-col gap-6">
                                <ul className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                                    {integrations.map((integration) => (
                                        <li
                                            key={integration.name}
                                            className="w-full flex-1 rounded-xl bg-primary_alt shadow-xs ring-1 ring-secondary ring-inset"
                                        >
                                            <div className="flex flex-col gap-6 px-4 py-5 lg:px-5">
                                                <div className="flex gap-2">
                                                    <div className="flex flex-1 items-center gap-3">
                                                        <div className="w-max shrink-0 rounded-lg bg-white p-0.5 shadow-xs ring-1 ring-secondary ring-inset">
                                                            <img src={integration.logo} alt={integration.name} className="size-12 object-contain" />
                                                        </div>
                                                        <p className="text-md font-medium text-primary lg:text-md lg:font-semibold">{integration.name}</p>
                                                    </div>
                                                    <Toggle isSelected={integration.active} size="sm" />
                                                </div>
                                                <p className="text-sm text-tertiary">{integration.description}</p>
                                            </div>

                                            <SectionFooter.Root isCard className="px-6 py-4">
                                                <SectionFooter.Actions>
                                                    <Button color="link-color" size="md">
                                                        View integration
                                                    </Button>
                                                </SectionFooter.Actions>
                                            </SectionFooter.Root>
                                        </li>
                                    ))}
                                </ul>
                                <PaginationPageDefault />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
