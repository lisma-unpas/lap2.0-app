"use client";

import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart01 } from "@untitledui/icons";
import { ThemeSwitcher } from "../theme-switcher";
export default function Header() {
    const { items } = useCart();

    const cartButtonMobile = items.length > 0 ? (
        <div className="relative">
            <Button color="secondary" size="md" href="/checkout" iconLeading={ShoppingCart01} className="size-10 p-0" aria-label="Keranjang" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error-600 text-[10px] font-bold text-white ring-2 ring-primary">
                {items.length}
            </span>
        </div>
    ) : null;

    return (
        <HeaderNavigationBase
            items={[
                { label: "Beranda", href: "/" },
                {
                    label: "Unit Event",
                    href: "/#units",
                    items: [
                        { label: "TESAS", href: "/tesas" },
                        { label: "KDS", href: "/kds" },
                        { label: "PSM", href: "/psm" },
                        { label: "TAKRE", href: "/tari" },
                        { label: "FG", href: "/fg" },
                    ]
                },
                { label: "Main Event", href: "/main-event" },
                { label: "Info", href: "/info" },
                { label: "Cek Status", href: "/check-status" },
                { label: "Tentang Kami", href: "/#about" },
            ]}
            mobileHeaderContent={cartButtonMobile}
            mobileDrawerHeaderContent={
                <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                    {cartButtonMobile}
                </div>
            }
            trailingContent={
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                    {cartButtonMobile}
                    <Button color="primary" size="md" href="/#units">
                        Daftar Sekarang
                    </Button>
                </div>
            }
            showAvatarDropdown={false}
        />
    );
}
