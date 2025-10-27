"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useImperativeHandle } from "react";

interface TiptapEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    onCharacterCountChange?: (count: number) => void;
    fontSize?: "small" | "large" | "line";
    font?: string;
    containerRef?: React.RefObject<HTMLElement | null>;
}

export interface TiptapEditorHandle {
    focus: () => void;
}

const TiptapEditor = forwardRef<TiptapEditorHandle, TiptapEditorProps>(
    (
        {
            content = "",
            onChange,
            onCharacterCountChange,
            fontSize = "small",
            font = "Times New Roman",
            containerRef,
        },
        ref
    ) => {
        const editor = useEditor({
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: "Start typing...",
                }),
            ],
            content: content || "<p></p>",
            // Don't render immediately on the server to avoid SSR issues
            immediatelyRender: false,
            onUpdate: ({ editor }) => {
                if (onChange) {
                    onChange(editor.getHTML());
                }
                if (onCharacterCountChange) {
                    const characterCount =
                        editor.storage.characterCount?.characters() ||
                        editor.state.doc.textContent.length;
                    onCharacterCountChange(characterCount);
                }

                // Maintain cursor at fixed position for all modes
                if (containerRef?.current) {
                    requestAnimationFrame(() => {
                        const container = containerRef.current;
                        if (!container) return;

                        // Get the cursor position
                        const selection = window.getSelection();
                        if (!selection || selection.rangeCount === 0) return;

                        const range = selection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();

                        // Keep cursor at target position from bottom
                        const targetFromBottom = 350; // Distance from bottom to maintain
                        const viewportHeight = window.innerHeight;
                        const targetTop = viewportHeight - targetFromBottom;
                        const cursorTop = rect.top;

                        // Calculate how much to scroll
                        const scrollAdjustment = cursorTop - targetTop;

                        // Scroll up when cursor goes below target position
                        // This creates typewriter effect - content scrolls up as you type
                        if (scrollAdjustment > 0) {
                            container.scrollTop += scrollAdjustment;
                        }
                    });
                }
            },
            onCreate: ({ editor }) => {
                if (onCharacterCountChange) {
                    const characterCount = editor.state.doc.textContent.length;
                    onCharacterCountChange(characterCount);
                }
            },
            editorProps: {
                attributes: {
                    class: "tiptap prose dark:prose-invert max-w-none focus:outline-none",
                },
            },
        });

        // Expose focus method to parent component
        useImperativeHandle(ref, () => ({
            focus: () => {
                editor?.commands.focus();
            },
        }));

        const getFontSizeClass = () => {
            switch (fontSize) {
                case "small":
                    return "text-base leading-8";
                case "large":
                    return "text-2xl leading-10";
                case "line":
                    return "text-5xl leading-[1.5]";
                default:
                    return "text-base";
            }
        };

        return (
            <div
                className={`transition-all w-full h-full ${getFontSizeClass()}`}
                style={{ fontFamily: font }}
            >
                <EditorContent editor={editor} className="w-full h-full" />
            </div>
        );
    }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
