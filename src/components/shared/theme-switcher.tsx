"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                color="secondary"
                size="md"
                className="size-10 p-0"
                aria-label="Toggle theme"
            >
                <div className="size-5" />
            </Button>
        );
    }

    return (
        <Button
            color="secondary"
            size="md"
            className="size-10 p-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            iconLeading={theme === "dark" ? Sun : Moon01}
        />
    );
}
