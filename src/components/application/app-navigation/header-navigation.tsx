"use client";

import type { FC, ReactNode } from "react";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cx } from "@/utils/cx";
import { MobileNavigationHeader } from "./base-components/mobile-header";
import { NavAccountMenu } from "./base-components/nav-account-card";
import { NavItemBase } from "./base-components/nav-item";
import { NavList } from "./base-components/nav-list";

type NavItem = {
    /** Label text for the nav item. */
    label: string;
    /** URL to navigate to when the nav item is clicked. */
    href: string;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Badge to display. */
    badge?: ReactNode;
    /** List of sub-items to display. */
    items?: NavItem[];
};

interface HeaderNavigationBaseProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: NavItem[];
    /** List of sub-items to display. */
    subItems?: NavItem[];
    /** Content to display in the mobile header (next to hamburger). */
    mobileHeaderContent?: ReactNode;
    /** Content to display in the mobile drawer header (next to logo). */
    mobileDrawerHeaderContent?: ReactNode;
    /** Content to display at the end of the desktop header. */
    trailingContent?: ReactNode;
    /** Whether to show the avatar dropdown. */
    showAvatarDropdown?: boolean;
    /** Custom avatar content. */
    avatarContent?: ReactNode;
    /** Whether to hide the bottom border. */
    hideBorder?: boolean;
}


export const HeaderNavigationBase = ({
    activeUrl,
    items,
    subItems,
    trailingContent,
    mobileHeaderContent,
    mobileDrawerHeaderContent,
    showAvatarDropdown = true,
    avatarContent,
    hideBorder = false,
}: HeaderNavigationBaseProps) => {
    const activeSubNavItems = subItems || items.find((item) => item.current && item.items && item.items.length > 0)?.items;

    const showSecondaryNav = activeSubNavItems && activeSubNavItems.length > 0;

    return (
        <>
            <MobileNavigationHeader mobileContent={mobileHeaderContent}>
                <aside className="flex h-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:pt-6">
                    <div className="flex flex-col px-4 lg:px-5">
                        <UntitledLogo className="h-8 mb-4" />
                        <div className="flex items-center gap-2">
                            {mobileDrawerHeaderContent}
                        </div>
                    </div>

                    <NavList items={items} />

                    <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                        {/* Mobile admin links removed */}
                    </div>
                </aside>
            </MobileNavigationHeader>

            <header className="max-lg:hidden sticky top-0 z-50">
                <section
                    className={cx(
                        "flex h-16 w-full items-center justify-center bg-primary md:h-18",
                        (!hideBorder || showSecondaryNav) && "border-b border-secondary",
                    )}
                >
                    <div className="flex w-full max-w-container justify-between pr-3 pl-4 md:px-8">
                        <div className="flex flex-1 items-center gap-4">
                            <a
                                aria-label="Go to homepage"
                                href="/"
                                className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <UntitledLogo className="h-8" />
                            </a>

                            <nav className="h-full">
                                <ul className="flex items-center gap-0.5 h-full">
                                    {items.map((item) => (
                                        <li key={item.label} className="h-full">
                                            <NavItemBase icon={item.icon} href={item.href} current={item.current} badge={item.badge} type="link" variant="header">
                                                {item.label}
                                            </NavItemBase>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            {trailingContent}

                            {/* Removed Settings and Notifications for public view */}

                            {showAvatarDropdown && (
                                avatarContent || (
                                    <DialogTrigger>
                                        <AriaButton
                                            className={({ isPressed, isFocused }) =>
                                                cx(
                                                    "group relative inline-flex cursor-pointer",
                                                    (isPressed || isFocused) && "rounded-full outline-2 outline-offset-2 outline-focus-ring",
                                                )
                                            }
                                        >
                                            <Avatar alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?bg=%23E0E0E0" size="md" />
                                        </AriaButton>
                                        <Popover
                                            placement="bottom right"
                                            offset={8}
                                            className={({ isEntering, isExiting }) =>
                                                cx(
                                                    "will-change-transform",
                                                    isEntering &&
                                                    "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                                    isExiting &&
                                                    "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                                )
                                            }
                                        >
                                            <NavAccountMenu />
                                        </Popover>
                                    </DialogTrigger>
                                )
                            )}
                        </div>
                    </div>
                </section>
            </header>
        </>
    );
};
