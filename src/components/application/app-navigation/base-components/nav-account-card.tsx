"use client";

import type { FC, HTMLAttributes } from "react";
import { LogOut01, Settings01, User01 } from "@untitledui/icons";
import { Dialog as AriaDialog } from "react-aria-components";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { cx } from "@/utils/cx";

export const NavAccountCard = ({
    email = "admin@lisma-unpas.com",
}: {
    email?: string;
}) => {
    const initials = email
        .split('@')[0]
        .split('.')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="relative flex items-center gap-3 rounded-lg p-3 ring-1 ring-secondary ring-inset">
            <AvatarLabelGroup
                size="md"
                src="/avatar-default.webp"
                title={<span className="truncate block max-w-[160px] font-semibold text-sm">{email}</span>}
                subtitle={<span className="text-xs text-tertiary">Admin</span>}
                status="online"
            />
        </div>
    );
};

export const NavAccountMenu = ({
    className,
    ...dialogProps
}: any) => {
    return (
        <AriaDialog
            {...dialogProps}
            className={cx("w-66 rounded-lg bg-secondary_alt shadow-lg ring ring-secondary_alt outline-hidden", className)}
        >
            <div className="rounded-lg bg-primary ring-1 ring-secondary overflow-hidden">
                <div className="flex flex-col gap-0.5 py-1.5 border-b border-secondary">
                    <NavAccountCardMenuItem label="View profile" icon={User01} />
                    <NavAccountCardMenuItem label="Account settings" icon={Settings01} />
                </div>
                <div className="flex flex-col gap-0.5 py-1.5 bg-secondary_alt">
                    <NavAccountCardMenuItem label="Sign out" icon={LogOut01} onClick={() => window.location.href = '/admin/login'} />
                </div>
            </div>
        </AriaDialog>
    );
};

const NavAccountCardMenuItem = ({
    icon: Icon,
    label,
    ...buttonProps
}: {
    icon?: FC<{ className?: string }>;
    label: string;
} & HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...buttonProps} className={cx("group/item w-full cursor-pointer px-1.5 focus:outline-hidden", buttonProps.className)}>
            <div
                className={cx(
                    "flex w-full items-center justify-between gap-3 rounded-lg p-2 hover:bg-primary_hover",
                    "outline-focus-ring group-focus-visible/item:outline-2 group-focus-visible/item:outline-offset-2",
                )}
            >
                <div className="flex gap-2 text-sm font-semibold text-secondary">
                    {Icon && <Icon className="size-5 text-fg-quaternary" />} {label}
                </div>
            </div>
        </button>
    );
};
