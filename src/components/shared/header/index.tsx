"use client";

import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart01 } from "@untitledui/icons";

export default function Header() {
    const { items } = useCart();

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
            trailingContent={
                <div className="flex items-center gap-3">
                    {items.length > 0 && (
                        <Button color="secondary" size="md" href="/checkout" iconLeading={ShoppingCart01}>
                            <span className="hidden sm:inline">Keranjang</span> ({items.length})
                        </Button>
                    )}
                    <Button color="primary" size="md" href="/#units">
                        Daftar Sekarang
                    </Button>
                </div>
            }
            showAvatarDropdown={false}
        />
    );
}
