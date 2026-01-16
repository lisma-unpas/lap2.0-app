"use client";

import { ArrowUpRight, DotsHorizontal, SearchLg } from "@untitledui/icons";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Dribbble, Figma, GitHub, LinkedIn, X } from "@/components/foundations/social-icons";

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

export const Informational18 = () => {
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
            <main className="flex flex-1 flex-col gap-8 pb-12 lg:gap-12 lg:pb-24">
                {/* PageHeaderBannerAvatar - Page header */}
                <div className="relative flex flex-col bg-primary">
                    <div className="px-1">
                        <img
                            src="https://www.untitledui.com/application/color-pattern-light.webp"
                            alt="Color Pattern Light"
                            className="h-40 w-full rounded-xl object-cover lg:h-60"
                        />
                    </div>
                    <div className="m-auto -mt-12 flex w-full max-w-container flex-col gap-4 px-4 lg:-mt-10 lg:flex-row lg:gap-5 lg:px-8">
                        <AvatarProfilePhoto
                            className="lg:hidden"
                            size="md"
                            src="https://www.untitledui.com/images/avatars/riley-moore?fm=webp&q=80"
                            alt="Riley O'Moore"
                            verified
                        />
                        <AvatarProfilePhoto
                            className="hidden lg:flex"
                            size="lg"
                            src="https://www.untitledui.com/images/avatars/riley-moore?fm=webp&q=80"
                            alt="Riley O'Moore"
                            verified
                        />
                        <div className="flex flex-1 flex-col justify-between gap-4 lg:flex-row lg:pt-16">
                            <div className="flex flex-1 flex-col gap-0.5 lg:gap-1">
                                <p className="text-xl font-semibold text-primary lg:text-display-xs">Riley O'Moore</p>
                                <p className="text-md text-tertiary">riley@untitledui.com</p>
                            </div>
                            <div className="flex gap-3">
                                <Button iconLeading={DotsHorizontal} size="md" color="secondary" className="max-lg:hidden" />
                                <Button size="md" color="secondary">
                                    View portfolio
                                </Button>
                                <Button size="md">Follow</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex w-full max-w-container flex-col gap-y-6 px-4 lg:gap-y-8 lg:px-8">
                    <div className="flex min-w-70 flex-col gap-6 lg:hidden">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-tertiary">Location</p>
                            <div className="flex items-center gap-2">
                                <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australia" className="size-5 rounded-full" />
                                <p className="text-md font-medium text-secondary">Melbourne, Australia</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-tertiary">Portfolio</p>
                            <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                rileyomoore.com
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-tertiary">Portfolio</p>
                            <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                @riley
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium text-tertiary">Email</p>
                            <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                hello@rileyomoore.com
                            </Button>
                        </div>
                    </div>
                    <hr className="h-px w-full border-none bg-border-secondary" />

                    <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
                        <div className="min-w-70">
                            <p className="text-md font-medium text-secondary lg:text-md lg:font-semibold">About me</p>
                        </div>
                        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 lg:gap-8">
                            <div className="flex flex-col gap-4 lg:gap-y-8">
                                <div className="flex flex-col justify-between gap-x-16 gap-y-6 lg:flex-row">
                                    <div className="flex flex-col gap-y-5">
                                        <div className="flex flex-col gap-4">
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
                                        <div className="flex">
                                            <Button size="md" color="link-color">
                                                Read more
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-4 pr-9">
                                        <a href="#" className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                            <X size={20} className="text-fg-quaternary" />
                                        </a>
                                        <a href="#" className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                            <LinkedIn size={20} className="text-fg-quaternary" />
                                        </a>
                                        <a href="#" className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                            <GitHub size={20} className="text-fg-quaternary" />
                                        </a>
                                        <a href="#" className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                            <Dribbble size={20} className="text-fg-quaternary" />
                                        </a>
                                        <a href="#" className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                            <Figma size={20} className="text-fg-quaternary" />
                                        </a>
                                    </div>
                                </div>
                                <dl className="hidden w-full gap-14 overflow-auto rounded-xl bg-secondary px-6 py-5 ring-1 ring-secondary lg:flex">
                                    <div className="flex flex-col gap-2 whitespace-nowrap">
                                        <dt className="text-sm font-medium text-tertiary">Location</dt>
                                        <dd className="flex items-center gap-2">
                                            <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australia" className="size-5 rounded-full" />
                                            <p className="text-md font-medium text-secondary">Melbourne, Australia</p>
                                        </dd>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <dt className="text-sm font-medium text-tertiary">Website</dt>
                                        <dd>
                                            <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                                rileyomoore.com
                                            </Button>
                                        </dd>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <dt className="text-sm font-medium text-tertiary">Portfolio</dt>
                                        <dd>
                                            <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                                @riley
                                            </Button>
                                        </dd>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <dt className="text-sm font-medium text-tertiary">Email</dt>
                                        <dd>
                                            <Button size="lg" iconTrailing={ArrowUpRight} color="link-color">
                                                hello@rileyomoore.com
                                            </Button>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <hr className="h-px w-full border-none bg-border-secondary" />
                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                        <div className="hidden min-w-70 flex-col gap-0.5 lg:flex lg:gap-0">
                            <p className="text-lg font-semibold text-secondary lg:text-md">Experience</p>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                            <JobCard
                                imageSrc="https://www.untitledui.com/logos/images/Polymath.jpg"
                                title="Lead Product Designer"
                                subtitle="Polymath"
                                description="May 2020 – Present"
                            />
                            <JobCard
                                imageSrc="https://www.untitledui.com/logos/images/Spherule.jpg"
                                title="Product Designer"
                                subtitle="Spherule"
                                description="Jan 2018 – May 2020"
                            />
                            <JobCard
                                imageSrc="https://www.untitledui.com/logos/images/Acme Group.jpg"
                                title="UX Designer"
                                subtitle="Acme Group"
                                description="Mar 2017 – Jan 2018"
                            />
                            <JobCard
                                imageSrc="https://www.untitledui.com/logos/images/CloudWatch.jpg"
                                title="Visual Designer"
                                subtitle="CloudWatch"
                                description="Mar 2017 – Jan 2018"
                            />
                        </div>
                    </div>
                    <hr className="hidden h-px w-full border-none bg-border-secondary lg:block" />
                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                        <div className="mt-3 flex min-w-70 flex-col lg:mt-0 lg:gap-0">
                            <p className="text-lg font-semibold text-secondary lg:text-md">Projects</p>
                            <p className="text-sm text-tertiary lg:hidden">Some of my recent work.</p>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                            <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                <img
                                    src="https://www.untitledui.com/application/project-05.webp"
                                    alt="Project 05"
                                    className="h-60 w-full object-cover lg:h-82"
                                />
                            </a>
                            <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                <img
                                    src="https://www.untitledui.com/application/project-06.webp"
                                    alt="Project 06"
                                    className="h-60 w-full object-cover lg:h-82"
                                />
                            </a>
                            <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                <img
                                    src="https://www.untitledui.com/application/project-07.webp"
                                    alt="Project 07"
                                    className="h-60 w-full object-cover lg:h-82"
                                />
                            </a>
                            <a href="#" className="outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                <img
                                    src="https://www.untitledui.com/application/project-08.webp"
                                    alt="Project 08"
                                    className="h-60 w-full object-cover lg:h-82"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
