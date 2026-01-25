"use client";

import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { cx } from "@/utils/cx";

interface EditorButtonProps extends ButtonProps {
    isActive?: boolean;
    isLoading?: boolean;
}

export const EditorButton = ({ isActive, isDisabled, isLoading, className, children, ...props }: EditorButtonProps) => {
    return (
        <AriaButton
            {...props}
            type="button"
            isDisabled={isDisabled || isLoading}
            className={(state) =>
                cx(
                    "flex size-8 cursor-pointer items-center justify-center rounded-lg p-0! text-fg-quaternary outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 pressed:bg-primary_hover pressed:outline-hidden",
                    isActive ? "bg-primary_hover text-fg-secondary" : "hover:bg-primary_hover hover:text-fg-quaternary_hover",
                    (isDisabled || isLoading) && "cursor-not-allowed opacity-50",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {isLoading ? (
                <svg className="animate-spin size-4 text-brand-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : children}
        </AriaButton>
    );
};
