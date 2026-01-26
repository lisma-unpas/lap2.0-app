"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UNIT_IMAGES } from "@/constants/unit-images";
import { cx } from "@/utils/cx";

interface UnitImageProps {
    unitId: string;
    fallbackUrl: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    aspectRatio?: string;
}

export function UnitImage({
    unitId,
    fallbackUrl,
    alt,
    className,
    containerClassName,
    aspectRatio = "aspect-[4/3]"
}: UnitImageProps) {
    const images = UNIT_IMAGES[unitId.toLowerCase()] || [fallbackUrl];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setCurrentIndex(Math.floor(Math.random() * images.length));
    }, [images.length]);

    return (
        <div className={cx("relative overflow-hidden w-full", aspectRatio, containerClassName)}>
            <AnimatePresence mode="popLayout">
                {isMounted ? (
                    <motion.img
                        key={`${unitId}-${currentIndex}`}
                        src={images[currentIndex]}
                        alt={alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className={cx("absolute inset-0 w-full h-full object-cover", className)}
                    />
                ) : (
                    <img
                        src={images[0]} // Initial fallback to avoid flash
                        alt={alt}
                        className={cx("absolute inset-0 w-full h-full object-cover", className)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
