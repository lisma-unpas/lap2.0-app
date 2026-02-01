"use client";

import type { DialogProps as AriaDialogProps, ModalOverlayProps as AriaModalOverlayProps } from "react-aria-components";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { cx } from "@/utils/cx";

export const DialogTrigger = AriaDialogTrigger;

export const ModalOverlay = (props: AriaModalOverlayProps) => {
    return (
        <AriaModalOverlay
            {...props}
            className={(state) =>
                cx(
                    "fixed inset-0 z-50 flex min-h-dvh w-full items-center justify-center overflow-y-auto bg-overlay/50 p-4 outline-none sm:p-8",
                    typeof props.className === "function" ? props.className(state) : props.className,
                )
            }
        />
    );
};

export const Modal = (props: AriaModalOverlayProps) => (
    <AriaModal
        {...props}
        className={(state) =>
            cx(
                "max-h-full w-full align-middle outline-none max-sm:overflow-y-auto max-sm:rounded-lg",
                typeof props.className === "function" ? props.className(state) : props.className,
            )
        }
    />
);

export const Dialog = (props: AriaDialogProps) => (
    <AriaDialog {...props} className={cx("flex w-full items-center justify-center outline-hidden", props.className)} />
);
