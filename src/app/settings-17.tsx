"use client";

import { Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";

export const Settings17 = () => {
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

            <main className="bg-primary pt-8 pb-12 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple with search */}
                        <div className="relative flex flex-col gap-5 border-b border-secondary pb-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Notifications</h1>
                                    <p className="text-md text-tertiary">Select when and how you'll be notified.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-4 lg:px-8">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root
                                size="sm"
                                title="General notifications"
                                description="Select when you'll be notified when the following changes occur."
                            />

                            <ul className="flex flex-col gap-4 pb-4">
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">I'm mentioned in a message</p>

                                    <ButtonGroup aria-label="I'm mentioned in a message" defaultSelectedKeys={["in-app"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">Someone replies to any message</p>

                                    <ButtonGroup aria-label="Someone replies to any message" defaultSelectedKeys={["in-app"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">I'm assigned a task</p>

                                    <ButtonGroup aria-label="I'm assigned a task" defaultSelectedKeys={["in-app"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">A task is overdue</p>

                                    <ButtonGroup aria-label="A task is overdue" defaultSelectedKeys={["in-app"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">A task status is updated</p>

                                    <ButtonGroup aria-label="A task status is updated" defaultSelectedKeys={["email"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                            </ul>
                        </div>

                        <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-8">
                            <SectionLabel.Root
                                size="sm"
                                title="Summary notifications"
                                description="Select when you'll be notified when the following summaries or report are ready."
                            />

                            <ul className="flex flex-col gap-4 pb-4">
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">Daily summary</p>

                                    <ButtonGroup aria-label="Daily summary" defaultSelectedKeys={["email"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">Weekly summary</p>

                                    <ButtonGroup aria-label="Weekly summary" defaultSelectedKeys={["email"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">Monthly summary</p>

                                    <ButtonGroup aria-label="Monthly summary" defaultSelectedKeys={["email"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                                <li role="presentation">
                                    <hr className="h-px w-full border-none bg-border-secondary" aria-hidden="true" />
                                </li>
                                <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                                    <p className="flex-1 text-sm font-medium text-secondary">Quarterly summary</p>

                                    <ButtonGroup aria-label="Quarterly summary" defaultSelectedKeys={["email"]} selectionMode="single">
                                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                                    </ButtonGroup>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
