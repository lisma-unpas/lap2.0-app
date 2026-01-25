"use client";

import type { SVGProps } from "react";
import { cx } from "@/utils/cx";
import { Circle } from "./circle";
import { Grid } from "./grid";
import { GridCheck } from "./grid-check";
import { Square } from "./square";

const patterns = {
    circle: Circle,
    square: Square,
    grid: Grid,
    "grid-check": GridCheck,
};

export interface BackgroundPatternProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
    size?: "xs" | "sm" | "md" | "lg";
    pattern: keyof typeof patterns;
}

export const BackgroundPattern = (props: BackgroundPatternProps) => {
    const { pattern, size, className, ...otherProps } = props;
    const Pattern = patterns[pattern];

    return <Pattern {...otherProps} size={size as any} className={cx("pointer-events-none", className)} />;
};
