"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy01, PlusCircle, SearchLg } from "@untitledui/icons";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { useClipboard } from "@/hooks/use-clipboard";

const JobCard = ({ imageSrc, title, subtitle, description }: { imageSrc: string; title: string; subtitle: string; description: string }) => {
    return (
        <div className="flex flex-col rounded-xl shadow-xs ring-1 ring-secondary ring-inset lg:pb-2">
            <div className="flex flex-col gap-6 border-b border-secondary px-4 py-5 lg:px-5">
                <div className="flex items-center gap-3">
                    <Avatar src={imageSrc} alt="ContrastAI" size="lg" />
                    <div className="flex flex-col">
                        <p className="text-md font-semibold text-primary">{title}</p>
                        <p className="text-sm text-tertiary">{subtitle}</p>
                    </div>
                </div>
                <p className="text-sm text-tertiary">{description}</p>
            </div>
            <div className="flex justify-end px-4 py-3 lg:px-6 lg:py-4">
                <Button size="sm" color="secondary">
                    View project
                </Button>
            </div>
        </div>
    );
};

const tabs = [
    { id: "all", label: "View all" },
    { id: "web", label: "Web design" },
    { id: "product", label: "Product design" },
    { id: "branding", label: "Branding" },
];

export const Informational17 = () => {
    const { copy, copied } = useClipboard();
    const [selectedTab, setSelectedTab] = useState("all");

    return (
        <div className="flex flex-col bg-primary">
            <HeaderNavigationBase
                hideBorder
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Dashboard",
                        href: "/dashboard",
                        items: [
                            { label: "Overview", href: "#" },
                            { label: "Notifications", href: "#" },
                            { label: "Analytics", href: "#" },
                            { label: "Saved reports", href: "#" },
                            { label: "Scheduled reports", href: "#" },
                            { label: "User reports", href: "#" },
                        ],
                    },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Designers", href: "/designers", current: true },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="flex flex-1 flex-col gap-8 pb-12 lg:gap-12">
                {/* PageHeaderBannerAvatar - Page header */}
                <div className="relative flex flex-col bg-primary">
                    <div className="px-1">
                        <img src="https://www.untitledui.com/application/spirals.webp" alt="Plants" className="h-40 w-full rounded-xl object-cover lg:h-60" />
                    </div>
                    <div className="m-auto -mt-12 flex w-full max-w-270 flex-col items-center gap-4 px-4 lg:-mt-16 lg:gap-5 lg:px-0">
                        <AvatarProfilePhoto
                            className="lg:hidden"
                            size="md"
                            src="https://www.untitledui.com/images/avatars/caitlyn-king?fm=webp&q=80"
                            alt="Caitlyn King"
                            verified
                        />
                        <AvatarProfilePhoto
                            className="hidden lg:flex"
                            size="lg"
                            src="https://www.untitledui.com/images/avatars/caitlyn-king?fm=webp&q=80"
                            alt="Caitlyn King"
                            verified
                        />
                        <div className="flex w-full flex-1 flex-col items-center gap-y-5">
                            <div className="flex flex-1 flex-col items-center gap-0.5 lg:gap-1">
                                <p className="text-xl font-semibold text-primary lg:text-display-xs">Caitlyn King</p>
                                <p className="text-md text-tertiary">@caitlyn</p>
                            </div>
                            <div className="grid w-full grid-cols-2 gap-x-3 lg:w-auto">
                                <Button size="md" color="secondary" className="w-full">
                                    View portfolio
                                </Button>
                                <Button size="md" iconLeading={PlusCircle} className="w-full">
                                    Follow
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex w-full max-w-container flex-col gap-x-16 gap-y-12 px-4 lg:flex-row lg:px-8">
                    <div className="flex flex-1 flex-col gap-y-8 lg:gap-y-12">
                        <div className="flex flex-col gap-y-8">
                            <div className="flex flex-col gap-6">
                                <SectionHeader.Root>
                                    <SectionHeader.Group>
                                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                            <SectionHeader.Heading>Experience</SectionHeader.Heading>
                                            <SectionHeader.Subheading className="truncate">
                                                I specialize in UX/UI design, brand strategy, and Webflow development.
                                            </SectionHeader.Subheading>
                                        </div>

                                        <div className="absolute top-0 right-0 md:static">
                                            <TableRowActionsDropdown />
                                        </div>
                                    </SectionHeader.Group>
                                </SectionHeader.Root>
                                <div className="flex flex-col gap-y-3">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-md font-medium text-primary">About me</p>
                                        <div className="flex max-w-160 flex-col gap-4">
                                            <p className="text-md text-tertiary">
                                                I'm a Product Designer based in Melbourne, Australia. I enjoy working on product design, design systems, and
                                                Webflow projects, but I don't take myself too seriously.
                                            </p>
                                            <p className="text-md text-tertiary">
                                                I've worked with some of the world's most exciting companies, including Coinbase, Stripe, and Linear. I'm
                                                passionate about helping startups grow, improve their UX and customer experience, and to raise venture capital
                                                through good design.
                                            </p>
                                            <p className="text-md text-tertiary">
                                                My work has been featured on Typewolf, Mindsparkle Magazine, Webflow, Fonts In Use, CSS Winner, httpster,
                                                Siteinspire, and Best Website Gallery.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button size="md" color="link-color">
                                            Read more
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-6 rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary lg:hidden">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-tertiary">Location</p>
                                    <div className="flex items-center gap-2">
                                        <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australia" className="size-5 rounded-full" />
                                        <p className="text-md font-medium text-secondary">Melbourne, Australia</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-tertiary">Website</p>
                                    <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                        caitlynking.com
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-tertiary">Portfolio</p>
                                    <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                        @caitlyn
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium text-tertiary">Email</p>
                                    <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                        hi@caitlynking.com
                                    </Button>
                                </div>
                                <div>
                                    <InputGroup
                                        aria-label="Project URL"
                                        value="untitledui.com/@caitlyn"
                                        trailingAddon={
                                            <Button color="secondary" iconLeading={copied ? Check : Copy01} onClick={() => copy("untitledui.com/@caitlyn")}>
                                                Copy
                                            </Button>
                                        }
                                    >
                                        <InputBase />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 lg:gap-6 xl:grid-cols-2">
                                <JobCard
                                    imageSrc="https://www.untitledui.com/logos/images/ContrastAI.jpg"
                                    title="Lead Product Designer"
                                    subtitle="ContrastAI"
                                    description="May 2020 – Present"
                                />
                                <JobCard
                                    imageSrc="https://www.untitledui.com/logos/images/Sisyphus.jpg"
                                    title="Product Designer"
                                    subtitle="Sisyphus"
                                    description="Jan 2018 – May 2020"
                                />
                                <JobCard
                                    imageSrc="https://www.untitledui.com/logos/images/Ephemeral.jpg"
                                    title="UX Designer"
                                    subtitle="Ephemeral"
                                    description="Mar 2017 – Jan 2018"
                                />
                                <JobCard
                                    imageSrc="https://www.untitledui.com/logos/images/Convergence.jpg"
                                    title="Visual Designer"
                                    subtitle="Convergence"
                                    description="Apr 2015 – Mar 2017"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-8">
                            <SectionHeader.Root className="border-none pb-0">
                                <SectionHeader.Group>
                                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Projects</SectionHeader.Heading>
                                    </div>

                                    <div className="absolute top-0 right-0 md:static">
                                        <TableRowActionsDropdown />
                                    </div>
                                </SectionHeader.Group>

                                <NativeSelect
                                    aria-label="Page tabs"
                                    className="md:hidden"
                                    value={selectedTab}
                                    onChange={(event) => setSelectedTab(event.target.value)}
                                    options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                                />
                                <Tabs
                                    orientation="horizontal"
                                    selectedKey={selectedTab}
                                    onSelectionChange={(value) => setSelectedTab(value as string)}
                                    className="hidden w-full md:flex"
                                >
                                    <TabList size="sm" type="underline" className="w-full" items={tabs} />
                                </Tabs>
                            </SectionHeader.Root>
                            <div className="gap-cols-1 grid gap-5 lg:grid-cols-2 lg:gap-6">
                                <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <img
                                        src="https://www.untitledui.com/application/project-01.webp"
                                        alt="Project image 001"
                                        className="h-60 w-full object-cover lg:h-74"
                                    />
                                </a>
                                <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <img
                                        src="https://www.untitledui.com/application/project-02.webp"
                                        alt="Project image 002"
                                        className="h-60 w-full object-cover lg:h-74"
                                    />
                                </a>
                                <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <img
                                        src="https://www.untitledui.com/application/project-03.webp"
                                        alt="Project image 003"
                                        className="h-60 w-full object-cover lg:h-74"
                                    />
                                </a>
                                <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <img
                                        src="https://www.untitledui.com/application/project-04.webp"
                                        alt="Project image 004"
                                        className="h-60 w-full object-cover lg:h-74"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden max-w-90 min-w-90 lg:block">
                        <div className="flex flex-col gap-y-6 rounded-xl bg-primary p-6 shadow-xs ring-1 ring-secondary">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-tertiary">Location</p>
                                <div className="flex items-center gap-2">
                                    <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australia" className="size-5 rounded-full" />
                                    <p className="text-md font-medium text-secondary">Melbourne, Australia</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-tertiary">Website</p>
                                <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                    caitlynking.com
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-tertiary">Portfolio</p>
                                <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                    @caitlyn
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-tertiary">Email</p>
                                <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                    hi@caitlynking.com
                                </Button>
                            </div>
                            <div>
                                <InputGroup
                                    isReadOnly
                                    aria-label="Project URL"
                                    value="untitledui.com/@caitlyn"
                                    trailingAddon={
                                        <Button color="secondary" iconLeading={copied ? Check : Copy01} onClick={() => copy("untitledui.com/@caitlyn")}>
                                            Copy
                                        </Button>
                                    }
                                >
                                    <InputBase />
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
