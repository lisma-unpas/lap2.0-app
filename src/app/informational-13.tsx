"use client";

import { ArrowLeft, Check, Copy01, Edit04, Plus, SearchLg, Share07, UserPlus01 } from "@untitledui/icons";
import { FeedItem, type FeedItemType } from "@/components/application/activity-feed/activity-feed";
import { NavItemButton } from "@/components/application/app-navigation/base-components/nav-item-button";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ContentDivider } from "@/components/application/content-divider/content-divider";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Select } from "@/components/base/select/select";
import { useClipboard } from "@/hooks/use-clipboard";

// Helper function for formatting relative time
const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

const formatRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const date = new Date(timestamp);
    const time = date
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .toLowerCase();

    if (diffInMinutes < 1) {
        return "Just now";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    } else if (diffInDays === 1) {
        return `Yesterday ${time}`;
    } else if (diffInDays <= 7) {
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

        return `${dayOfWeek} ${time}`;
    } else {
        return `${time} ${formatDate(timestamp)}`;
    }
};

const feed: Array<Omit<FeedItemType, "date"> & { date: number }> = [
    {
        id: "activity-001",
        unseen: true,
        date: Date.now() - 30 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            name: "Phoenix Baker",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "pdf",
            name: "Tech requirements.pdf",
            size: "720 KB",
        },
        action: {
            content: "Added a file to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-002",
        unseen: true,
        date: Date.now() - 2 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            name: "Lana Steiner",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Was invited to the team by",
            target: "Alina Hester",
            href: "#",
        },
    },
    {
        id: "activity-003",
        unseen: true,
        date: Date.now() - 5 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
            name: "Demi Wilkinson",
            href: "#",
            status: "online",
        },
        action: {
            content: "Was invited to the team by",
            target: "Alina Hester",
            href: "#",
        },
    },
    {
        id: "activity-004",
        unseen: true,
        date: Date.now() - 3 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Commented in",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-005",
        date: Date.now() - 3 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Was added to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-006",
        date: Date.now() - 6 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
        },
        action: {
            content: "Added 3 labels to the project",
            target: "Marketing site redesign",
            href: "#",
        },
        labels: [
            {
                name: "Design",
                color: "brand",
            },
            {
                name: "Product",
                color: "blue",
            },
            {
                name: "Marketing",
                color: "indigo",
            },
        ],
    },
    {
        id: "activity-007",
        date: Date.now() - 6 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Lana Steiner",
            href: "#",
        },
    },
    {
        id: "activity-008",
        date: Date.now() - 11 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
            name: "Orlando Diggs",
            href: "#",
            status: "online",
        },
        action: {
            content: "Created 7 tasks in",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-009",
        date: Date.now() - 12 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "txt",
            name: "Design brief and ideas.txt",
            size: "2.2 MB",
        },
        action: {
            content: "Added a file to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-010",
        date: Date.now() - 24 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
        },
        action: {
            content: "Created the project",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "activity-011",
        date: Date.now() - 2 * 24 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
            name: "Kate Morrison",
            href: "#",
            status: "online",
        },
        action: {
            content: "Sent you a message",
        },
        message: '"We should ask Oli about this today."',
    },
    {
        id: "activity-012",
        date: Date.now() - 3 * 24 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "mp4",
            name: "Prototype draft 03.mp4",
            size: "6.6 MB",
        },
        action: {
            content: "Sent you a file",
        },
    },
    {
        id: "activity-013",
        date: Date.now() - 8 * 24 * 60 * 60 * 1000,
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
        },
        action: {
            content: "Sent you a message",
        },
        message: "@olivia This is starting to look really good! I'll polish it up a bit and send it.",
    },
    {
        id: "activity-014",
        date: new Date(2025, 6, 28, 11, 45).getTime(),
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
            name: "Ava Wright",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Alisa Hester",
            href: "#",
        },
    },
    {
        id: "activity-015",
        unseen: true,
        date: new Date(2025, 6, 28, 11, 45).getTime(),
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/eve-leroy?fm=webp&q=80",
            name: "Eve Leroy",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Ava Wright",
            href: "#",
        },
    },
];

const ActivityFeedDivided = () => {
    return (
        <ul className="flex flex-col gap-4 divide-y divide-border-secondary">
            {feed.map((item) => (
                <li key={item.id} className="pb-4 last-of-type:pb-0">
                    <FeedItem {...item} connector={false} date={formatRelativeTime(item.date)} />
                </li>
            ))}
        </ul>
    );
};

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "project", label: "Project" },
    { id: "research", label: "Research" },
    { id: "team", label: "Team" },
    { id: "messages", label: "Messages", badge: 2 },
    { id: "billing", label: "Billing" },
    { id: "activity", label: "Activity" },
];

const tabs2 = [
    { id: "brief", label: "Project brief" },
    { id: "goals", label: "Goals" },
    { id: "timeline", label: "Timeline" },
    { id: "about", label: "About the client" },
    { id: "notes", label: "Notes" },
];

export const Informational13 = () => {
    const { copy, copied } = useClipboard();

    return (
        <div className="flex flex-col bg-primary">
            <HeaderNavigationBase
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
                    { label: "Projects", href: "/projects", current: true },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={<NavItemButton size="md" icon={SearchLg} label="Search" href="#" className="-mr-3" tooltipPlacement="bottom" />}
            />
            <main className="mx-auto flex w-full max-w-container flex-1 flex-col gap-8 pt-8 pb-12 lg:pt-12 lg:pb-24">
                {/* Page header simple */}
                <div className="flex flex-col gap-8 px-4 lg:gap-5 lg:px-8">
                    <div className="relative flex flex-col gap-5 border-secondary lg:border-b lg:pb-4">
                        <div className="flex items-start justify-between">
                            <Button href="#" color="link-color" size="md" iconLeading={ArrowLeft}>
                                Back to all projects
                            </Button>
                            <div className="hidden w-100 lg:block">
                                <InputGroup
                                    isReadOnly
                                    aria-label="Project URL"
                                    size="md"
                                    value="app.untitledui.com/marketing-site"
                                    trailingAddon={
                                        <Button
                                            size="md"
                                            color="secondary"
                                            iconLeading={copied ? Check : Copy01}
                                            onClick={() => copy("app.untitledui.com/marketing-site")}
                                        >
                                            Copy
                                        </Button>
                                    }
                                >
                                    <InputBase />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <p className="text-xl font-semibold text-primary md:text-display-xs">Marketing site redesign</p>
                            <div className="flex flex-col gap-4 lg:flex-row">
                                <div className="flex items-start gap-3">
                                    <Button iconLeading={UserPlus01} color="secondary" size="md" className="hidden lg:inline-flex">
                                        Add team
                                    </Button>
                                    <Button iconLeading={Copy01} color="secondary" size="md" className="inline-flex lg:hidden">
                                        Copy
                                    </Button>
                                    <Button iconLeading={Share07} color="secondary" size="md">
                                        Share
                                    </Button>
                                    <Button iconLeading={Edit04} size="md">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Select aria-label="Tabs" size="md" selectedKey="overview" items={tabs.map((tab) => ({ ...tab, id: tab.id }))} className="block lg:hidden">
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                </div>

                <div className="flex gap-16 px-4 lg:px-8">
                    <div className="hidden max-w-31.5 min-w-31.5 lg:block">
                        <Tabs orientation="vertical" selectedKey="overview">
                            <TabList size="sm" type="button-gray" items={tabs} />
                        </Tabs>
                    </div>
                    <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:gap-8">
                        <SectionHeader.Root className="border-none pb-0">
                            <SectionHeader.Group>
                                <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                    <SectionHeader.Heading>Project overview</SectionHeader.Heading>
                                    <SectionHeader.Subheading>A overview of the project, goals and outcomes.</SectionHeader.Subheading>
                                </div>

                                <div className="absolute top-0 right-0 md:static">
                                    <TableRowActionsDropdown />
                                </div>
                            </SectionHeader.Group>

                            <Tabs orientation="horizontal" selectedKey="brief" className="w-full">
                                <TabList size="sm" type="underline" className="w-full" items={tabs2} />
                            </Tabs>
                        </SectionHeader.Root>

                        <div className="flex max-w-180 flex-col gap-8">
                            <p className="rounded-lg bg-secondary p-4 text-md font-medium text-secondary ring-1 ring-secondary ring-inset">
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
                                quis montes, sit sit. Tellus aliquam enim urna, etiam.
                            </p>
                            <div className="flex flex-col gap-3">
                                <p className="text-md font-medium text-primary">About the company</p>
                                <div className="prose max-w-180 text-md">
                                    <p>
                                        Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac
                                        vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisi in eleifend sed nisi.
                                        Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.
                                    </p>
                                    <ul>
                                        <li>
                                            Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.Diam elit, orci, tincidunt aenean tempus.
                                            Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
                                        </li>
                                        <li>Non pellentesque congue eget consectetur turpis.</li>
                                        <li>
                                            Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed
                                            vel, congue felis elit erat nam nibh orci.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                                <img
                                    src="https://www.untitledui.com/application/man-and-laptop.webp"
                                    alt="Content image 001"
                                    className="h-51.5 w-full object-cover lg:h-44"
                                />
                                <img
                                    src="https://www.untitledui.com/marketing/spirals.webp"
                                    alt="Content image 002"
                                    className="h-51.5 w-full object-cover lg:h-44"
                                />
                                <img
                                    src="https://www.untitledui.com/application/plants.webp"
                                    alt="Content image 003"
                                    className="h-51.5 w-full object-cover lg:h-44"
                                />
                                <FileUpload.DropZone className="hidden justify-center lg:flex" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-md font-medium text-primary">Target audience</p>
                                <div className="prose max-w-180 text-md">
                                    <p>
                                        Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur
                                        turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus.
                                        Sed vel, congue felis elit erat nam nibh orci.
                                    </p>
                                    <p>
                                        Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac
                                        vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
                                    </p>
                                    <p>
                                        Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum
                                        enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate
                                        posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu
                                        vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-md font-medium text-primary">What does success look like?</p>
                                <div className="prose max-w-180 text-md">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tellus vel pretium posuere. Id maecenas a tristique
                                        in fusce hendrerit. Amet, mattis in vitae, est urna, diam. Ante fringilla nulla at sed tincidunt. Et aliquam neque cras
                                        mauris non bibendum. Hac ut ridiculus enim urna felis amet. Dolor aliquam diam suspendisse non elit faucibus id orci,
                                        mi.
                                    </p>
                                    <p>
                                        Pharetra nam gravida commodo accumsan sapien aliquet bibendum purus nunc. Quam cursus at eu, aliquam integer. Accumsan,
                                        nisi ultricies ut pulvinar fames neque risus. Eu et, elementum leo amet bibendum gravida ridiculus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ContentDivider type="single-line">
                                <Button iconLeading={Plus} color="secondary" size="md">
                                    Add section
                                </Button>
                            </ContentDivider>
                        </div>
                    </div>
                    <div className="hidden w-90 flex-col gap-6 rounded-2xl bg-secondary p-6 ring-1 ring-secondary ring-inset lg:flex">
                        <div className="flex items-start justify-between gap-4">
                            <p className="text-lg font-semibold text-primary">Recent activity</p>
                            <TableRowActionsDropdown />
                        </div>
                        <ActivityFeedDivided />
                    </div>
                </div>
            </main>
        </div>
    );
};
