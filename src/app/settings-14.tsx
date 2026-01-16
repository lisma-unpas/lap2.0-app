"use client";

import { useState } from "react";
import { Mail01, Plus, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input, InputBase, TextField } from "@/components/base/input/input";
import { PaymentInput } from "@/components/base/input/input-payment";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { NativeSelect } from "@/components/base/select/select-native";
import { countriesOptions } from "@/utils/countries";

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

export const Settings14 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("billing");

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
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple with search */}
                        <div className="relative flex flex-col gap-5 lg:border-b lg:border-secondary lg:pb-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
                                    <p className="text-md text-tertiary">Manage your team and preferences here.</p>
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
                            <TabList type="button-brand" items={tabs} />
                        </Tabs>

                        <div className="flex min-w-0 flex-1 flex-col gap-6">
                            <SectionHeader.Root>
                                <SectionHeader.Group>
                                    <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Payment method</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Update your billing details and address.</SectionHeader.Subheading>
                                    </div>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            <Form
                                className="flex flex-col gap-5"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = Object.fromEntries(new FormData(e.currentTarget));
                                    console.log("Form data:", data);
                                }}
                            >
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="Card details" />

                                    <div className="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-[1fr_112px]">
                                        <Input isRequired size="md" label="Name on card" defaultValue="Olivia Rhye" className="order-first max-sm:col-span-2" />
                                        <Input isRequired size="md" label="Expiry" defaultValue="06 / 2025" className="order-3 col-span-1 sm:order-2" />
                                        <PaymentInput
                                            isRequired
                                            size="md"
                                            label="Card number"
                                            defaultValue="1234 1234 1234 1234"
                                            className="order-2 col-span-1 max-sm:col-span-2 sm:order-3"
                                        />
                                        <Input isRequired size="md" type="password" label="CVV" defaultValue="123" className="order-last col-span-1" />
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="Email address" description="Invoices will be sent to this email address." />

                                    <div className="flex flex-col gap-4">
                                        <TextField isRequired aria-label="Email address" name="email" type="email" defaultValue="billing@untitledui.com">
                                            <InputBase icon={Mail01} size="md" />
                                        </TextField>

                                        <div className="flex gap-3">
                                            <Button color="link-gray" size="md" iconLeading={Plus}>
                                                Add another
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="Street address" className="max-lg:hidden" />

                                    <TextField isRequired name="streetAddress" defaultValue="100 Smith Street">
                                        <Label className="lg:hidden">Street address</Label>
                                        <InputBase size="md" />
                                    </TextField>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="City" className="max-lg:hidden" />

                                    <TextField isRequired name="city" defaultValue="Collingwood">
                                        <Label className="lg:hidden">City</Label>
                                        <InputBase size="md" />
                                    </TextField>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="State / Province" className="max-lg:hidden" />

                                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-[148px_148px]">
                                        <TextField isRequired name="state" defaultValue="VIC">
                                            <Label className="lg:hidden">State / Province</Label>
                                            <InputBase size="md" />
                                        </TextField>
                                        <TextField isRequired name="postcode" defaultValue="3066">
                                            <Label className="lg:hidden">Postcode</Label>
                                            <InputBase size="md" />
                                        </TextField>
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="Country" className="max-lg:hidden" />

                                    <Select
                                        isRequired
                                        name="country"
                                        label="Country"
                                        size="md"
                                        defaultSelectedKey="AU"
                                        className="lg:label:hidden"
                                        items={countriesOptions}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
