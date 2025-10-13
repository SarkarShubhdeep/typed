"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomScrollbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const updateScrollbar = () => {
            const scrollableElement = document.querySelector("main");
            if (!scrollableElement) return;

            const scrollHeight = scrollableElement.scrollHeight;
            const clientHeight = scrollableElement.clientHeight;
            const scrollTop = scrollableElement.scrollTop;

            // Calculate thumb height proportional to visible content
            const thumbHeightCalc = (clientHeight / scrollHeight) * clientHeight;
            setThumbHeight(thumbHeightCalc);

            // Calculate thumb position
            const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
            const thumbTopCalc = scrollPercentage * (clientHeight - thumbHeightCalc);
            setThumbTop(thumbTopCalc);

            // Show scrollbar
            setIsVisible(true);

            // Hide after 1 second of no scrolling
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 1000);
        };

        const scrollableElement = document.querySelector("main");
        if (scrollableElement) {
            scrollableElement.addEventListener("scroll", updateScrollbar);
            // Initial calculation
            updateScrollbar();
        }

        return () => {
            if (scrollableElement) {
                scrollableElement.removeEventListener("scroll", updateScrollbar);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={`custom-scrollbar ${isVisible ? "visible" : ""}`}>
            <div
                className="custom-scrollbar-thumb"
                style={{
                    height: `${thumbHeight}px`,
                    transform: `translateY(${thumbTop}px)`,
                }}
            />
        </div>
    );
}
