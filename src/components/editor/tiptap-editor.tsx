"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
            extensions: [StarterKit],
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

                // Maintain cursor at fixed position from bottom (80px)
                if (containerRef?.current) {
                    requestAnimationFrame(() => {
                        const container = containerRef.current;
                        if (!container) return;

                        // Get the cursor position
                        const selection = window.getSelection();
                        if (!selection || selection.rangeCount === 0) return;

                        const range = selection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        
                        // Target position: 80px from bottom of viewport
                        const targetFromBottom = 80;
                        const viewportHeight = window.innerHeight;
                        const targetTop = viewportHeight - targetFromBottom;
                        
                        // Calculate how much to scroll
                        const cursorTop = rect.top;
                        const scrollAdjustment = cursorTop - targetTop;
                        
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
                    class: "prose dark:prose-invert max-w-none focus:outline-none",
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
                    return "text-5xl leading-20";
                default:
                    return "text-base";
            }
        };

        return (
            <div
                className={`w-full transition-all h-full ${getFontSizeClass()}`}
                style={{ fontFamily: font }}
            >
                <EditorContent editor={editor} className="w-full h-full" />
            </div>
        );
    }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
