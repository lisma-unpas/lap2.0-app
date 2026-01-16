"use client";

import type { FC, ReactNode, Ref, RefAttributes } from "react";
import { createContext, isValidElement } from "react";
import { ChevronDown } from "@untitledui/icons";
import type { SelectProps as AriaSelectProps } from "react-aria-components";
import { Button as AriaButton, ListBox as AriaListBox, Select as AriaSelect, SelectValue as AriaSelectValue } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";
import { ComboBox } from "./combobox";
import { Popover } from "./popover";
import { SelectItem } from "./select-item";

export type SelectItemType = {
    id: string;
    label?: string;
    avatarUrl?: string;
    isDisabled?: boolean;
    supportingText?: string;
    icon?: FC | ReactNode;
};

export interface CommonProps {
    hint?: string;
    label?: string;
    tooltip?: string;
    size?: "sm" | "md";
    placeholder?: string;
}

interface SelectProps extends Omit<AriaSelectProps<SelectItemType>, "children" | "items">, RefAttributes<HTMLDivElement>, CommonProps {
    items?: SelectItemType[];
    popoverClassName?: string;
    placeholderIcon?: FC | ReactNode;
    isLoading?: boolean;
    children: ReactNode | ((item: SelectItemType) => ReactNode);
}

interface SelectValueProps {
    isOpen: boolean;
    size: "sm" | "md";
    isFocused: boolean;
    isDisabled: boolean;
    isLoading?: boolean;
    placeholder?: string;
    ref?: Ref<HTMLButtonElement>;
    placeholderIcon?: FC | ReactNode;
}

export const sizes = {
    sm: { root: "py-2 px-3", shortcut: "pr-2.5" },
    md: { root: "py-2.5 px-3.5", shortcut: "pr-3" },
};

const SelectValue = ({ isOpen, isFocused, isDisabled, isLoading, size, placeholder, placeholderIcon, ref }: SelectValueProps) => {
    return (
        <AriaButton
            ref={ref}
            isDisabled={isDisabled || isLoading}
            className={cx(
                "relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset",
                (isFocused || isOpen) && "ring-2 ring-brand",
                (isDisabled || isLoading) && "cursor-not-allowed bg-disabled_subtle text-disabled",
            )}
        >
            <AriaSelectValue<SelectItemType>
                className={cx(
                    "flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle",

                    // Icon styles
                    "*:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled",

                    sizes[size].root,
                )}
            >
                {(state) => {
                    const Icon = state.selectedItem?.icon || placeholderIcon;
                    return (
                        <>
                            {state.selectedItem?.avatarUrl ? (
                                <Avatar size="xs" src={state.selectedItem.avatarUrl} alt={state.selectedItem.label} />
                            ) : isReactComponent(Icon) ? (
                                <Icon data-icon aria-hidden="true" />
                            ) : isValidElement(Icon) ? (
                                Icon
                            ) : null}

                            {state.selectedItem ? (
                                <section className="flex w-full gap-2 truncate">
                                    <p className="truncate text-md font-medium text-primary">{state.selectedItem?.label}</p>
                                    {state.selectedItem?.supportingText && <p className="text-md text-tertiary">{state.selectedItem?.supportingText}</p>}
                                </section>
                            ) : (
                                <p className={cx("text-md text-placeholder", (isDisabled || isLoading) && "text-disabled")}>{placeholder}</p>
                            )}

                            {isLoading ? (
                                <div className="ml-auto shrink-0 flex items-center justify-center">
                                    <svg className="animate-spin size-4 text-fg-brand-primary" viewBox="0 0 32 32" fill="none">
                                        <circle className="text-bg-tertiary" cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="4" />
                                        <circle
                                            className="stroke-fg-brand-primary"
                                            cx="16"
                                            cy="16"
                                            r="14"
                                            fill="none"
                                            strokeWidth="4"
                                            strokeDashoffset="75"
                                            strokeDasharray="100"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <ChevronDown
                                    aria-hidden="true"
                                    className={cx("ml-auto shrink-0 text-fg-quaternary", size === "sm" ? "size-4 stroke-[2.5px]" : "size-5")}
                                />
                            )}
                        </>
                    );
                }}
            </AriaSelectValue>
        </AriaButton>
    );
};

export const SelectContext = createContext<{ size: "sm" | "md" }>({ size: "sm" });

const Select = ({ placeholder = "Select", placeholderIcon, size = "sm", isLoading, children, items, label, hint, tooltip, className, ...rest }: SelectProps) => {
    return (
        <SelectContext.Provider value={{ size }}>
            <AriaSelect
                {...rest}
                isDisabled={rest.isDisabled || isLoading}
                className={(state) => cx("flex flex-col gap-1.5", typeof className === "function" ? className(state) : className)}
            >
                {(state) => (
                    <>
                        {label && (
                            <Label isRequired={state.isRequired} tooltip={tooltip}>
                                {label}
                            </Label>
                        )}

                        <SelectValue {...state} {...{ size, placeholder, isLoading }} placeholderIcon={placeholderIcon} />

                        <Popover size={size} className={rest.popoverClassName}>
                            <AriaListBox items={items} className="size-full outline-hidden">
                                {children}
                            </AriaListBox>
                        </Popover>

                        {hint && <HintText isInvalid={state.isInvalid}>{hint}</HintText>}
                    </>
                )}
            </AriaSelect>
        </SelectContext.Provider>
    );
};

const _Select = Select as typeof Select & {
    ComboBox: typeof ComboBox;
    Item: typeof SelectItem;
};
_Select.ComboBox = ComboBox;
_Select.Item = SelectItem;

export { _Select as Select };
