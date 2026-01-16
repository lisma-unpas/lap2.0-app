"use client";

import { useState } from "react";
import { Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { InlineCTAEmailField } from "@/components/application/inline-cta/inline-cta.demo";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
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

export const Settings18 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("notifications");

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
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple with search */}
                        <div className="relative flex flex-col gap-5 lg:border-b lg:border-secondary lg:pb-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
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

                    <div className="mx-auto flex w-full max-w-container gap-16 px-4 lg:px-8">
                        <Tabs
                            orientation="vertical"
                            className="hidden w-auto lg:flex"
                            selectedKey={selectedTab}
                            onSelectionChange={(value) => setSelectedTab(value as string)}
                        >
                            <TabList type="line" items={tabs} />
                        </Tabs>

                        <div className="flex flex-1 flex-col gap-6 lg:rounded-2xl lg:bg-secondary lg:p-8">
                            <SectionHeader.Root>
                                <SectionHeader.Group>
                                    <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Notification settings</SectionHeader.Heading>
                                        <SectionHeader.Subheading>
                                            We may still send you important notifications about your account outside of your notification settings.
                                        </SectionHeader.Subheading>
                                    </div>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,512px)] lg:gap-16">
                                    <SectionLabel.Root
                                        size="sm"
                                        title="Comments"
                                        description="These are notifications for comments on your posts and replies to your comments."
                                    />

                                    <div className="flex w-max flex-col gap-4">
                                        <Toggle defaultSelected label="Push" size="sm" />
                                        <Toggle defaultSelected label="Email" size="sm" />
                                        <Toggle label="SMS" size="sm" />
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,512px)] lg:gap-16">
                                    <SectionLabel.Root
                                        size="sm"
                                        title="Tags"
                                        description="These are notifications for when someone tags you in a comment, post or story."
                                    />

                                    <div className="flex w-max flex-col gap-4">
                                        <Toggle defaultSelected label="Push" size="sm" />
                                        <Toggle label="Email" size="sm" />
                                        <Toggle label="SMS" size="sm" />
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,512px)] lg:gap-16">
                                    <SectionLabel.Root
                                        size="sm"
                                        title="Reminders"
                                        description="These are notifications to remind you of updates you might have missed."
                                    />

                                    <div className="flex w-max flex-col gap-4">
                                        <Toggle label="Push" size="sm" />
                                        <Toggle label="Email" size="sm" />
                                        <Toggle label="SMS" size="sm" />
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(0,512px)] lg:gap-16">
                                    <SectionLabel.Root
                                        size="sm"
                                        title="More activity about you"
                                        description="These are notifications for posts on your profile, likes and other reactions to your posts, and more."
                                    />

                                    <div className="flex w-max flex-col gap-4">
                                        <Toggle label="Push" size="sm" />
                                        <Toggle label="Email" size="sm" />
                                        <Toggle label="SMS" size="sm" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 w-full lg:mt-0">
                                <InlineCTAEmailField />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
