"use client";

import { DateField as AriaDateField, DateInput as AriaDateInput, DateSegment as AriaDateSegment, I18nProvider, type DateValue, type DateFieldProps as AriaDateFieldProps } from "react-aria-components";
import { Label } from "@/components/base/input/label";
import { HintText } from "@/components/base/input/hint-text";
import { cx } from "@/utils/cx";
import { ReactNode } from "react";
import { Calendar } from "@untitledui/icons";

export interface DateFieldProps extends Omit<AriaDateFieldProps<DateValue>, "children"> {
    /** The label for the date field. */
    label?: string;
    /** The hint text for the date field. */
    hint?: ReactNode;
    /** The error message to display when the value is invalid. */
    errorMessage?: string;
}

const DateFieldComponent = AriaDateField as any;

export const DateField = ({ label, hint, className, isRequired, isDisabled, isInvalid, errorMessage, ...props }: DateFieldProps) => {
    return (
        <I18nProvider locale="en-GB">
            <DateFieldComponent
                {...props}
                isDisabled={isDisabled}
                isRequired={isRequired}
                isInvalid={isInvalid}
                className={(state: any) =>
                    cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
                }
                formatOptions={{
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }}
            >
                {(state: any) => (
                    <>
                        {label && <Label isRequired={state.isRequired}>{label}</Label>}

                        <div className={cx(
                            "relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset",
                            !isDisabled && "focus-within:ring-2 focus-within:ring-brand",
                            isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                            state.isInvalid && "ring-error_subtle"
                        )}>
                            <Calendar className="pointer-events-none absolute left-3 size-5 text-fg-quaternary" />

                            <AriaDateInput className="flex w-full items-center gap-0 bg-transparent pl-10 pr-3 py-2 text-md text-primary outline-hidden">
                                {(segment) => (
                                    <AriaDateSegment
                                        segment={segment}
                                        className={cx(
                                            "rounded tabular-nums outline-hidden focus:bg-brand-solid focus:text-white",
                                            segment.type !== "literal" ? "px-0.5" : "", // Apply px-0.5 only for non-literals
                                            segment.isPlaceholder && "text-placeholder",
                                            segment.type === "literal" && "text-fg-quaternary"
                                        )}
                                    >
                                        {s => {
                                            if (s.type !== 'literal') return s.text;
                                            if (s.text.includes(' ')) return ', ';
                                            if (s.text === '/' || s.text === ':') return s.text;
                                            return ''; // Return empty string for other literals
                                        }}
                                    </AriaDateSegment>
                                )}
                            </AriaDateInput>
                        </div>

                        {state.isInvalid ? (
                            <HintText isInvalid>{errorMessage || "Format input tidak valid"}</HintText>
                        ) : (
                            hint && <HintText>{hint}</HintText>
                        )}
                    </>
                )}
            </DateFieldComponent>
        </I18nProvider>
    );
};

DateField.displayName = "DateField";
