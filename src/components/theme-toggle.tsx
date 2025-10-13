"use client";

import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const cycleTheme = React.useCallback(() => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("system");
        } else {
            setTheme("light");
        }
    }, [theme, setTheme]);

    // Keyboard shortcut: Shift + Cmd + L (or Shift + Ctrl + L on Windows)
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.key === "l") {
                e.preventDefault();
                cycleTheme();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [cycleTheme]);

    if (!mounted) {
        return (
            <Button variant="outline" size="icon">
                <Sun />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={cycleTheme}
            title={`Current theme: ${theme}. Click or press Shift+Cmd+L to cycle.`}
        >
            {theme === "light" && <Sun className="transition-all" />}
            {theme === "dark" && <Moon className="transition-all" />}
            {theme === "system" && <SunMoon className="transition-all" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
