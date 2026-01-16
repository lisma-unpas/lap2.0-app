"use client";

import { useState } from "react";
import { Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { NativeSelect } from "@/components/base/select/select-native";

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

const notificationTypes = [
    {
        id: "email",
        label: "Email",
    },
    {
        id: "in-app",
        label: "In-app",
    },
    {
        id: "push",
        label: "Push",
    },
];

export const Settings19 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("notifications");
    const [selectedNotificationType, setSelectedNotificationType] = useState<string>("email");

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
                    { label: "Team", href: "#" },
                    { label: "Billing", href: "#" },
                    { label: "Notifications", href: "#", current: true },
                ]}
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="flex flex-col gap-8 bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-5 px-4 lg:hidden lg:px-8">
                    {/* Page header simple */}
                    <div className="relative flex flex-col gap-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-0.5 lg:gap-1">
                                <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
                            </div>
                        </div>
                    </div>

                    <NativeSelect
                        aria-label="Page tabs"
                        value={selectedTab}
                        onChange={(event) => setSelectedTab(event.target.value)}
                        options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                    />
                </div>

                <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                    <div className="flex w-full flex-col gap-6 lg:mx-auto lg:max-w-160">
                        <SectionHeader.Root className="border-none pb-0">
                            <SectionHeader.Group>
                                <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                    <SectionHeader.Heading>Notifications</SectionHeader.Heading>
                                    <SectionHeader.Subheading>Choose when and how we contact you. </SectionHeader.Subheading>
                                </div>

                                <div className="absolute top-0 right-0 md:static">
                                    <TableRowActionsDropdown />
                                </div>
                            </SectionHeader.Group>
                        </SectionHeader.Root>

                        <Tabs
                            selectedKey={selectedNotificationType}
                            onSelectionChange={(value) => setSelectedNotificationType(value as string)}
                            className="w-auto self-start"
                        >
                            <TabList type="button-minimal" items={notificationTypes} />
                        </Tabs>

                        <div className="flex flex-col gap-5 lg:gap-6">
                            <div className="flex flex-col gap-5">
                                <SectionLabel.Root
                                    size="sm"
                                    title="Notifications from us"
                                    description="Receive the latest news, updates and industry tutorials from us."
                                />

                                <div className="flex w-max flex-col gap-4">
                                    <Checkbox defaultSelected name="newsAndUpdates" label="News and updates" hint="News about product and feature updates." />
                                    <Checkbox defaultSelected name="tipsAndTutorials" label="Tips and tutorials" hint="Tips on getting more out of Untitled." />
                                    <Checkbox
                                        label="User research"
                                        name="userResearch"
                                        hint={
                                            <span className="inline-block max-w-xs">
                                                Get involved in our beta testing program or participate in paid product user research.
                                            </span>
                                        }
                                    />
                                </div>
                            </div>

                            <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                            <div className="flex flex-col gap-5">
                                <SectionLabel.Root
                                    size="sm"
                                    title="Comments"
                                    description="These are notifications for comments on your posts and replies to your comments."
                                />

                                <RadioGroup aria-label="Comments" defaultValue="all" name="comments" className="gap-4">
                                    <RadioButton value="none" label="Do not notify me" />
                                    <RadioButton value="mentionsOnly" label="Mentions only" hint="Only notify me if I'm mentioned in a comment." />
                                    <RadioButton value="all" label="All comments" hint="Notify me for all comments on my posts." />
                                </RadioGroup>
                            </div>

                            <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                            <div className="flex flex-col gap-5">
                                <SectionLabel.Root
                                    size="sm"
                                    title="Reminders"
                                    description="These are notifications to remind you of updates you might have missed."
                                />

                                <RadioGroup aria-label="Reminders" defaultValue="all" name="reminders" className="gap-4">
                                    <RadioButton value="none" label="Do not notify me" />
                                    <RadioButton
                                        value="importantOnly"
                                        label="Important reminders only"
                                        hint="Only notify me if the reminder is tagged as important."
                                    />
                                    <RadioButton value="all" label="All reminders" hint="Notify me for all reminders." />
                                </RadioGroup>
                            </div>

                            <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                            <div className="flex flex-col gap-5">
                                <SectionLabel.Root
                                    size="sm"
                                    title="More activity about you"
                                    description="These are notifications for posts on your profile, likes and other reactions to your posts."
                                />

                                <RadioGroup aria-label="More activity about you" defaultValue="none" name="others" className="gap-4">
                                    <RadioButton value="none" label="Do not notify me" />
                                    <RadioButton value="all" label="All reminders" hint="Notify me for all other activity." />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
