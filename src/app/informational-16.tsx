"use client";

import { Award02, Calendar, CurrencyDollar, FilterLines, Heart, Home02, List, MarkerPin02, SearchLg, Star01, Wifi } from "@untitledui/icons";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { RatingStars } from "@/components/foundations/rating-stars";

interface Listing {
    id: string;
    title: string;
    imageSrc: string;
    description: string;
    rating: number;
    reviewsCount: number;
    location: string;
    price: string;
    rare?: boolean;
}

const ListingListItem = (props: Listing) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset xl:flex-row xl:gap-5 xl:p-4">
            <div className="relative h-44 w-full overflow-hidden xl:h-36 xl:w-50 xl:rounded-lg">
                <img src={props.imageSrc} alt={props.title} className="h-full w-full object-cover" />
                {props.rare && (
                    <BadgeWithIcon iconLeading={Award02} size="sm" color="brand" type="pill-color" className="absolute bottom-2 left-2">
                        Rare find
                    </BadgeWithIcon>
                )}
                <Button iconLeading={Heart} size="sm" color="secondary" className="absolute right-2 bottom-2 block lg:hidden" />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-5 xl:p-0 xl:pt-0">
                <div className="flex items-end gap-2 xl:hidden">
                    <span className="text-xl font-semibold text-primary">{props.price}</span>
                    <span className="pb-0.5 text-md text-tertiary">AUD total</span>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <a href="#" className="text-sm font-semibold text-brand-secondary">
                            {props.title}
                        </a>
                        <p className="text-lg font-semibold text-primary">{props.description}</p>
                    </div>
                    <Button size="sm" color="secondary" iconLeading={Heart} className="hidden xl:inline-flex" />
                </div>
                <div className="flex items-center gap-2">
                    <RatingStars rating={props.rating} className="gap-1" />
                    <div className="flex items-center gap-2">
                        <span className="text-md font-medium text-primary">{props.rating}</span>
                        <span className="text-md text-tertiary">{props.reviewsCount} reviews</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MarkerPin02 size={20} className="text-fg-quaternary" />
                            <span className="text-md font-medium text-tertiary">{props.location}</span>
                        </div>
                        <div className="hidden items-center gap-2 xl:flex">
                            <Home02 size={20} className="text-fg-quaternary" />
                            <span className="text-md font-medium text-tertiary">1 bed</span>
                        </div>
                        <div className="hidden items-center gap-2 xl:flex">
                            <Wifi size={20} className="text-fg-quaternary" />
                            <span className="text-md font-medium text-tertiary">Wi-Fi</span>
                        </div>
                    </div>
                    <div className="hidden items-end gap-2 xl:flex">
                        <span className="text-xl font-semibold text-primary">{props.price}</span>
                        <span className="pb-0.5 text-md text-tertiary">AUD total</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const listings: Listing[] = [
    {
        id: "listing-001",
        title: "Entire apartment rental in Collingwood",
        description: "A Stylish Apt, 5 min walk to Queen Victoria Market",
        imageSrc: "https://www.untitledui.com/application/listing-01.webp",
        rating: 4.9,
        reviewsCount: 202,
        location: "Collingwood VIC",
        price: "$540",
        rare: true,
    },
    {
        id: "listing-002",
        title: "Entire loft in central business district",
        description: "Designer NY style loft",
        imageSrc: "https://www.untitledui.com/application/listing-02.webp",
        rating: 4.8,
        reviewsCount: 44,
        location: "Melbourne VIC",
        price: "$620",
    },
    {
        id: "listing-003",
        title: "Entire rental unit in Carlton",
        description: "5 minute walk from University of Melbourne",
        imageSrc: "https://www.untitledui.com/application/listing-03.webp",
        rating: 4.7,
        reviewsCount: 82,
        location: "Carlton VIC",
        price: "$490",
    },
    {
        id: "listing-004",
        title: "Entire apartment rental in Collingwood",
        description: "Magnificent apartment next to public transport",
        imageSrc: "https://www.untitledui.com/application/listing-04.webp",
        rating: 4.8,
        reviewsCount: 12,
        location: "Collingwood VIC",
        price: "$600",
    },
];

const cities = [
    {
        id: "melbourne",
        label: "Melbourne, AU",
        icon: () => <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australian flag" className="size-5" />,
    },
    {
        id: "canberra",
        label: "Canberra, AU",
        icon: () => <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australian flag" className="size-5" />,
    },
    {
        id: "brisbane",
        label: "Brisbane, AU",
        icon: () => <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australian flag" className="size-5" />,
    },
    {
        id: "sydney",
        label: "Sydney, AU",
        icon: () => <img src="https://www.untitledui.com/images/flags/AU.svg" alt="Australian flag" className="size-5" />,
    },
];

const dates = [
    {
        id: "dec-6-dec-13",
        label: "Dec 6 - Dec 13",
        icon: Calendar,
    },
    {
        id: "jan-6-jan-13",
        label: "Jan 6 – Jan 13",
        icon: Calendar,
    },
    {
        id: "feb-6-feb-13",
        label: "Feb 6 - Feb 13",
        icon: Calendar,
    },
    {
        id: "mar-6-mar-13",
        label: "Mar 6 - Mar 13",
        icon: Calendar,
    },
];

const prices = [
    {
        id: "100",
        label: "< $100",
        icon: CurrencyDollar,
    },
    {
        id: "200",
        label: "< $250",
        icon: CurrencyDollar,
    },
    {
        id: "300",
        label: "< $500",
        icon: CurrencyDollar,
    },
    {
        id: "400",
        label: "< $1000",
        icon: CurrencyDollar,
    },
];

export const Informational16 = () => {
    return (
        <div className="flex flex-col bg-primary">
            <HeaderNavigationBase
                items={[
                    { label: "Home", href: "/" },
                    {
                        label: "Bookings",
                        href: "/Bookings",
                        current: true,
                    },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="mx-auto flex w-full max-w-container flex-1 flex-col gap-y-8">
                <div className="relative flex flex-1 flex-col gap-y-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
                    {/* Page header simple */}
                    <div className="px-4 lg:px-8">
                        <div className="flex flex-col gap-4 border-b border-secondary pb-4 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-0.5 md:gap-1">
                                <p className="text-xl font-semibold text-primary md:text-display-xs">232 stays in Melbourne</p>
                                <p className="text-md text-tertiary">Book your next stay at one of our properties.</p>
                            </div>
                            <div className="flex flex-row gap-3">
                                <Button color="secondary" size="md">
                                    Share
                                </Button>
                                <Button iconLeading={Star01} size="md">
                                    Save search
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 px-4 lg:gap-6 lg:px-8">
                        <div className="flex flex-col gap-y-3 lg:gap-y-4">
                            <div className="flex flex-wrap justify-between gap-3">
                                <div className="hidden gap-3 lg:flex">
                                    <div className="w-50">
                                        <Select aria-label="Cities" size="md" items={cities} defaultSelectedKey={cities[0].id}>
                                            {(item) => (
                                                <Select.Item id={item.id} icon={item.icon}>
                                                    {item.label}
                                                </Select.Item>
                                            )}
                                        </Select>
                                    </div>
                                    <div className="w-50">
                                        <Select aria-label="Dates" size="md" items={dates} defaultSelectedKey={dates[0].id}>
                                            {(item) => (
                                                <Select.Item id={item.id} icon={item.icon}>
                                                    {item.label}
                                                </Select.Item>
                                            )}
                                        </Select>
                                    </div>
                                    <div className="w-42.5">
                                        <Select
                                            aria-label="Prices"
                                            size="md"
                                            items={prices}
                                            placeholderIcon={CurrencyDollar}
                                            placeholder="Any price"
                                            defaultSelectedKey={prices[0].id}
                                        >
                                            {(item) => (
                                                <Select.Item id={item.id} icon={item.icon}>
                                                    {item.label}
                                                </Select.Item>
                                            )}
                                        </Select>
                                    </div>
                                </div>
                                <Button size="md" color="secondary" iconLeading={FilterLines} className="w-full lg:w-auto">
                                    <span className="hidden lg:inline">More filters</span>
                                    <span className="inline lg:hidden">2 filters applied</span>
                                </Button>
                            </div>
                            <div className="order-first flex gap-3 lg:order-none">
                                <Input icon={SearchLg} shortcut aria-label="Search" placeholder="Search" size="md" />
                                <Button size="lg" color="secondary" className="hidden lg:inline-flex">
                                    Clear
                                </Button>
                                <Button size="lg" className="hidden lg:inline-flex">
                                    Search
                                </Button>
                            </div>
                        </div>

                        <div className="order-first h-90 w-full lg:order-none">
                            <iframe
                                title="Our address"
                                src="https://snazzymaps.com/embed/451871"
                                className="h-full w-full rounded-lg border-none ring-1 ring-secondary"
                                data-chromatic="ignore"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 px-4 lg:px-8">
                        <div className="flex justify-between">
                            <ButtonGroup defaultSelectedKeys={["date"]} selectionMode="single" size="md">
                                <ButtonGroupItem id="date">Sort by date</ButtonGroupItem>
                                <ButtonGroupItem id="price">Sort by price</ButtonGroupItem>
                            </ButtonGroup>
                            <ButtonGroup defaultSelectedKeys={["list"]} selectionMode="single" size="md">
                                <ButtonGroupItem id="list" aria-label="List view" iconLeading={List} />
                                <ButtonGroupItem id="map" aria-label="Map view" iconLeading={MarkerPin02} />
                            </ButtonGroup>
                        </div>
                        <div className="flex flex-col gap-4">
                            {listings.map((listing) => (
                                <ListingListItem key={listing.id} {...listing} />
                            ))}
                        </div>
                        <PaginationPageDefault rounded page={1} total={10} />
                    </div>
                </div>
            </main>
        </div>
    );
};
