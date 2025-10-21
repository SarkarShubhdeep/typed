"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Document } from "../../types/document";
import { ProgressiveBlur } from "../ui/progressive-blur";
import { ThemeToggle } from "../theme-toggle";
import { Kbd, KbdGroup } from "../ui/kbd";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import TiptapEditor, { TiptapEditorHandle } from "../editor/tiptap-editor";

type FontSize = "small" | "large" | "line";

interface DocumentViewProps {
    document: Document;
}

export default function DocumentView({ document }: DocumentViewProps) {
    const router = useRouter();
    const [fontSize, setFontSize] = useState<FontSize>("small");
    const [clickSound, setClickSound] = useState<string>("Silence");
    const [font, setFont] = useState<string>("Times New Roman");
    const [content, setContent] = useState<string>("");
    const [characterCount, setCharacterCount] = useState<number>(0);
    const editorRef = useRef<TiptapEditorHandle>(null);
    const containerRef = useRef<HTMLElement>(null);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Keyboard shortcut handler for font size toggle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd/Ctrl + Shift + T to toggle font size
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "t") {
                e.preventDefault();
                setFontSize((current) => {
                    if (current === "small") return "large";
                    if (current === "large") return "line";
                    return "small";
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Handle content changes
    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    // Handle character count changes
    const handleCharacterCountChange = (count: number) => {
        setCharacterCount(count);
    };

    // Focus editor when clicking anywhere on the page
    const handlePageClick = () => {
        editorRef.current?.focus();
    };

    return (
        <div className="h-screen flex flex-col">
            <ProgressiveBlur position="top" height="80px" />

            <div className="fixed top-20 z-40 px-10 w-full flex justify-between items-start">
                {/* left side options */}
                <div className="flex flex-col items-start w-xs gap-2 bg-background/50 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => router.push("/")}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back</span>
                    </Button>
                    <h1 className="text-xl font-semibold mt-2">
                        {document.title}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        Last modified: {formatDate(document.lastModified)}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <Button variant="secondary" className="rounded-full">
                            Delete
                        </Button>
                        <Button variant="secondary" className="rounded-full">
                            Share
                        </Button>
                    </div>
                </div>

                {/* right side options */}
                <div className="flex flex-col items-end gap-2 w-fit bg-background/50 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
                    {/* Theme and Font Size */}
                    <div className="flex items-center justify-end gap-2 w-full">
                        <ThemeToggle />
                        <ToggleGroup
                            type="single"
                            value={fontSize}
                            onValueChange={(value) => {
                                if (value) setFontSize(value as FontSize);
                            }}
                            className="bg-secondary rounded-full "
                        >
                            <ToggleGroupItem
                                value="small"
                                className="rounded-full! px-3 py-2 text-xs data-[state=on]:bg-primary data-[state=on]:text-background hover:bg-background"
                            >
                                Small
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="large"
                                className="rounded-full! px-3 py-2 text-xs data-[state=on]:bg-primary data-[state=on]:text-background hover:bg-background"
                            >
                                Large
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="line"
                                className="rounded-full! px-3 py-2 text-xs data-[state=on]:bg-primary data-[state=on]:text-background hover:bg-background"
                            >
                                Line
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    {/* Font Type */}
                    <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Font" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Times New Roman">
                                Times New Roman
                            </SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Geist Mono">
                                Geist Mono
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Click Sound */}
                    <Select value={clickSound} onValueChange={setClickSound}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Click Sound" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Silence">Silence</SelectItem>
                            <SelectItem value="Beep Bop">Beep Bop</SelectItem>
                            <SelectItem value="Click">Click</SelectItem>
                            <SelectItem value="Tick">Tick</SelectItem>
                            <SelectItem value="Clack">Clack</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Document Content */}
            <main
                ref={containerRef}
                className="h-full flex flex-col overflow-auto scroll-smooth relative"
                onClick={handlePageClick}
            >
                {/* Adaptive Top padding */}
                <div className="flex-1 max-h-200 min-h-20 transition-all" />

                {/* Main editor */}
                <div className="max-w-4xl w-full mx-auto px-4 py-4 flex-1 transition-all">
                    <TiptapEditor
                        ref={editorRef}
                        content={content}
                        onChange={handleContentChange}
                        onCharacterCountChange={handleCharacterCountChange}
                        fontSize={fontSize}
                        font={font}
                        containerRef={containerRef}
                    />
                </div>

                {/* Adaptive Bottom padding */}
                <div className="flex-1 min-h-[40vh] transition-all" />

                {/* Character Count - Bottom Left */}
                <div className="fixed bottom-8 left-10 z-40">
                    <div className="bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border shadow-lg">
                        <span className="text-sm text-muted-foreground">
                            {characterCount.toLocaleString()} chars
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}
