"use client";

import type { FC, HTMLAttributes } from "react";
import { LogOut01, User01 } from "@untitledui/icons";
import { Dialog as AriaDialog } from "react-aria-components";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { cx } from "@/utils/cx";

export const GoogleUserMenu = ({
    user,
    className,
    onSignOut,
    ...dialogProps
}: {
    user: { name: string; email: string; picture?: string };
    className?: string;
    onSignOut?: () => void;
}) => {
    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleSignOut = async () => {
        onSignOut?.();
    };

    return (
        <AriaDialog
            {...dialogProps}
            className={cx("w-66 rounded-lg bg-secondary_alt shadow-lg ring ring-secondary_alt outline-hidden", className)}
        >
            <div className="rounded-lg bg-primary ring-1 ring-secondary overflow-hidden">
                <div className="px-3 py-4 border-b border-secondary">
                    <AvatarLabelGroup
                        size="md"
                        initials={initials}
                        src={user.picture}
                        title={<span className="truncate block max-w-[160px] font-semibold text-sm">{user.name}</span>}
                        subtitle={<span className="text-xs text-tertiary truncate block max-w-[160px]">{user.email}</span>}
                    />
                </div>
                <div className="flex flex-col gap-0.5 py-1.5 bg-secondary_alt">
                    <GoogleUserMenuItem
                        label="Sign out"
                        icon={LogOut01}
                        onClick={handleSignOut}
                    />
                </div>
            </div>
        </AriaDialog>
    );
};

const GoogleUserMenuItem = ({
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
