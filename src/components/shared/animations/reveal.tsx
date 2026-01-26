"use client";

import React from "react";
import { motion } from "motion/react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    scale?: number;
    once?: boolean;
}

export const Reveal = ({
    children,
    width = "100%",
    delay = 0,
    duration = 0.5,
    y = 20,
    x = 0,
    scale = 1,
    once = true
}: RevealProps) => {
    return (
        <motion.div
            style={{ width }}
            initial={{ opacity: 0, y, x, scale }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={{ once }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    );
};
