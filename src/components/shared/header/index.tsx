"use client";

import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { useCart } from "@/context/cart-context";
import { LogIn01, ShoppingCart01 } from "@untitledui/icons";
import { ThemeSwitcher } from "../theme-switcher";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/base/avatar/avatar";
import { DialogTrigger, Button as AriaButton, Popover } from "react-aria-components";
import { GoogleUserMenu } from "./google-user-menu";
import { cx } from "@/utils/cx";
import { usePathname } from "next/navigation";
import { useGoogleAuth } from "@/hooks/use-google-auth";

export default function Header() {
    const { items } = useCart();
    const { user, loading, signOut } = useGoogleAuth();
    const pathname = usePathname();

    const isPathActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname?.startsWith(href);
    };

    const navItems = [
        { label: "Beranda", href: "/" },
        { label: "Main Event", href: "/main-event" },
        {
            label: "Unit LISMA",
            href: "/unit-lisma",
            items: [
                { label: "TESAS", href: "/tesas" },
                { label: "KDS", href: "/kds" },
                { label: "PSM", href: "/psm" },
                { label: "TAKRE", href: "/takre" },
                { label: "FG", href: "/fg" },
            ]
        },
        { label: "Info", href: "/info" },
        { label: "Cek Status", href: "/check-status" },
        { label: "Tentang Kami", href: "/about" },
    ].map(item => ({
        ...item,
        current: isPathActive(item.href)
    }));

    const cartButtonMobile = items.length > 0 ? (
        <div className="relative">
            <Button color="secondary" size="md" href="/checkout" iconLeading={ShoppingCart01} className="size-10 p-0" aria-label="Keranjang" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error-600 text-[10px] font-bold text-white ring-2 ring-primary">
                {items.length}
            </span>
        </div>
    ) : null;

    const connectButton = (
        <Button color="primary" size="md" href="/auth/google/login" target="_blank" iconLeading={LogIn01}>
            Login
        </Button>
    );

    const userDropdown = user ? (
        <DialogTrigger>
            <AriaButton
                className={({ isPressed, isFocused }) =>
                    cx(
                        "group relative inline-flex cursor-pointer",
                        (isPressed || isFocused) && "rounded-full outline-2 outline-offset-2 outline-focus-ring",
                    )
                }
            >
                <Avatar
                    alt={user.name}
                    src={user.picture}
                    size="md"
                    initials={user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                />
            </AriaButton>
            <Popover
                placement="bottom right"
                offset={8}
                className="z-50"
            >
                <GoogleUserMenu user={user} onSignOut={signOut} />
            </Popover>
        </DialogTrigger>
    ) : null;

    return (
        <HeaderNavigationBase
            items={navItems}
            mobileHeaderContent={
                <div className="flex items-center gap-2">
                    {cartButtonMobile}
                    {!loading && !user && (
                        <>
                            <Button
                                color="primary"
                                size="sm"
                                href="/auth/google/login"
                                target="_blank"
                                iconLeading={LogIn01}
                                className="hidden xs:flex"
                            >
                                Login
                            </Button>
                            <Button
                                color="primary"
                                size="sm"
                                href="/auth/google/login"
                                target="_blank"
                                iconLeading={LogIn01}
                                className="flex xs:hidden size-10 p-0 items-center justify-center"
                                aria-label="Login"
                            />
                        </>
                    )}
                    {user && userDropdown}
                </div>
            }
            mobileDrawerHeaderContent={
                <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                    {cartButtonMobile}
                    {!loading && !user && (
                        <Button color="primary" size="sm" href="/auth/google/login" target="_blank" iconLeading={LogIn01}>
                            Login
                        </Button>
                    )}
                </div>
            }
            trailingContent={
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                    {cartButtonMobile}
                    {!loading && !user && connectButton}
                </div>
            }
            showAvatarDropdown={!!user}
            avatarContent={userDropdown}
        />
    );
}

