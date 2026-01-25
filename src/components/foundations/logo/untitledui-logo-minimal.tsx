"use client";

import type { SVGProps } from "react";
import { useId } from "react";
import { cx } from "@/utils/cx";

export const UntitledLogoMinimal = (props: SVGProps<SVGSVGElement>) => {
    const id = useId();

    return (
        <img src="/logo.png" alt="Logo LAP 2.0" className={cx("h-12 w-12", props.className)} />
    );
};
