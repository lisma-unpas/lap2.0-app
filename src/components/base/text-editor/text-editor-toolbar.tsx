"use client";

import { type RefAttributes } from "react";
import { Tooltip } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";
import {
    TextEditorAlignCenter,
    TextEditorAlignLeft,
    TextEditorBold,
    TextEditorBulletList,
    TextEditorColor,
    TextEditorFontFamily,
    TextEditorFontSize,
    TextEditorGenerate,
    TextEditorImage,
    TextEditorItalic,
    TextEditorLink,
    TextEditorUnderline,
} from "./text-editor-extensions";

interface TextEditorToolbarProps extends RefAttributes<HTMLDivElement> {
    className?: string;
    type?: "simple" | "advanced";
    floating?: boolean;
    hideFontSize?: boolean;
}

export const TextEditorToolbar = ({ className, ref, type = "simple", floating = false, hideFontSize }: TextEditorToolbarProps) => {
    if (type === "simple") {
        return (
            <div
                className={cx(
                    "flex flex-wrap gap-0.5",
                    floating && "rounded-lg bg-primary p-1 shadow-lg ring-1 ring-secondary_alt",
                    className,
                )}
            >
                <Tooltip title="Bold ⌘B">
                    <TextEditorBold />
                </Tooltip>
                <Tooltip title="Italic ⌘I">
                    <TextEditorItalic />
                </Tooltip>
                <Tooltip title="Underline ⌘U">
                    <TextEditorUnderline />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <TextEditorColor />

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Left align">
                    <TextEditorAlignLeft />
                </Tooltip>
                <Tooltip title="Center align">
                    <TextEditorAlignCenter />
                </Tooltip>
                <Tooltip title="Bullet list">
                    <TextEditorBulletList />
                </Tooltip>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={cx(
                "flex flex-col items-start justify-center gap-3",
                floating && "rounded-lg bg-primary p-3 shadow-lg ring-1 ring-secondary_alt",
                className,
            )}
        >
            {!floating && (
                <div className="flex flex-wrap gap-2 w-full">
                    <TextEditorFontFamily className="w-full md:w-auto flex-1 min-w-[140px]" />
                    {!hideFontSize && <TextEditorFontSize className="w-full md:w-auto" />}
                </div>
            )}

            <div className="flex flex-wrap gap-0.5">
                <Tooltip title="Bold ⌘B">
                    <TextEditorBold />
                </Tooltip>
                <Tooltip title="Italic ⌘I">
                    <TextEditorItalic />
                </Tooltip>
                <Tooltip title="Underline ⌘U">
                    <TextEditorUnderline />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <TextEditorColor />

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Left align">
                    <TextEditorAlignLeft />
                </Tooltip>
                <Tooltip title="Center align">
                    <TextEditorAlignCenter />
                </Tooltip>
                <Tooltip title="Bullet list">
                    <TextEditorBulletList />
                </Tooltip>

                <div className="p-1.5">
                    <div className="h-full w-px rounded-full bg-border-primary" />
                </div>

                <Tooltip title="Link ⌘K">
                    <TextEditorLink />
                </Tooltip>
                <Tooltip title="Insert image">
                    <TextEditorImage />
                </Tooltip>
            </div>
        </div>
    );
};
