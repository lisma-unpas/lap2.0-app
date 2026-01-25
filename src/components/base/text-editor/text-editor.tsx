"use client";

import type { ComponentProps, HTMLAttributes, ReactNode, Ref } from "react";
import { createContext, useContext, useEffect, useId } from "react";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import type { Editor, EditorContentProps, EditorOptions } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { CharacterCount } from "./text-editor-character-count";
import { TextEditorToolbar } from "./text-editor-toolbar";
import { TextEditorTooltip } from "./text-editor-tooltip";
import { EditorContext, useEditorContext } from "./text-editor-context";
// import { LatexNode } from "./text-editor-latex-node";
// import { QuestionImageNode } from "./text-editor-question-image-node";

// Creates a data URL for an SVG resize handle with a given color.
const getResizeHandleBg = (color: string) => {
    return `url(data:image/svg+xml;base64,${btoa(`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 10" stroke="${color}" stroke-linecap="round"/><path d="M11 7L7 11" stroke="${color}" stroke-linecap="round"/></svg>`)})`;
};

// Redefining these is no longer needed since they are imported.

interface TextEditorRootProps extends Partial<EditorOptions> {
    className?: string;
    isDisabled?: boolean;
    limit?: number;
    placeholder?: string;
    isInvalid?: boolean;
    children?: ReactNode;
    inputClassName?: string;
    ref?: Ref<HTMLDivElement>;
    questionId?: string;
    examId?: string;
    images?: any[];
}

const TextEditorRoot = ({
    className,
    inputClassName,
    children,
    isInvalid,
    isDisabled,
    limit,
    placeholder = "Write something...",
    questionId,
    examId,
    images,
    ...editorOptions
}: TextEditorRootProps) => {
    const id = useId();
    const editorId = `editor-${id}`;

    const editor = useEditor({
        ...editorOptions,
        editable: !isDisabled,
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                blockquote: {
                    HTMLAttributes: {
                        class: "my-3.5 border-l-4 border-secondary pl-4",
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-7",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-7",
                    },
                },
                link: {
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: "https",
                    HTMLAttributes: {
                        class: "text-primary underline",
                    },
                },
            }),
            TextStyleKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            // QuestionImageNode,
            Image.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: {
                    class: "my-3",
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: "border-collapse table-auto w-full my-5 rounded-sm ring-1 ring-secondary overflow-hidden shadow-xs",
                },
            }),
            TableRow.configure({
                HTMLAttributes: {
                    class: "hover:bg-secondary/20 transition-colors last:[&>td]:border-b-0",
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: "bg-secondary/50 border-b border-r border-secondary px-5 py-3 text-xs font-semibold text-quaternary uppercase tracking-wider align-middle text-left [&:last-child]:border-r-0",
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: "px-5 py-3 text-sm text-tertiary border-b border-r border-secondary align-middle [&:last-child]:border-r-0",
                },
            }),
            /* 
            LatexNode.configure({
                HTMLAttributes: {
                    class: "inline-block align-middle",
                },
            }),
            */
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === "bulletList" || node.type.name === "orderedList") return "";
                    return placeholder;
                },
                emptyEditorClass:
                    "first:before:text-placeholder first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:absolute",
            }),
            CharacterCount,
        ],

        editorProps: {
            attributes: {
                id: editorId,
                ["aria-labelledby"]: `${editorId}-label`,
                ["aria-describedby"]: `${editorId}-hint`,
                style: `
                    --resize-handle-bg: ${getResizeHandleBg("#D5D7DA")};
                    --resize-handle-bg-dark: ${getResizeHandleBg("#373A41")};
                `,
                class: cx(
                    "w-full resize scroll-py-3 overflow-auto rounded-lg bg-primary p-5 text-md leading-[1.5] text-primary caret-fg-brand-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset selection:bg-fg-brand-primary/10 placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:ring-2 focus:ring-brand focus:outline-hidden",

                    // Custom Table Styles for Editor
                    "[&_table]:my-5 [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-sm [&_table]:ring-1 [&_table]:ring-secondary [&_table]:overflow-hidden [&_table]:shadow-xs",
                    "[&_th]:bg-secondary/50 [&_th]:border-b [&_th]:border-r [&_th]:border-secondary [&_th]:px-5 [&_th]:py-3 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-quaternary [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-left [&_th:last-child]:border-r-0",
                    "[&_td]:px-5 [&_td]:py-3 [&_td]:text-sm [&_td]:text-tertiary [&_td]:border-b [&_td]:border-r [&_td]:border-secondary [&_td]:align-middle [&_td:last-child]:border-r-0",
                    "[&_tr:last-child_td]:border-b-0",
                    "[&_tr]:hover:bg-secondary/20 [&_tr]:transition-colors",

                    // Tiptap Table Resizer Styles
                    "[&_.column-resizer]:absolute [&_.column-resizer]:right-0 [&_.column-resizer]:top-0 [&_.column-resizer]:bottom-0 [&_.column-resizer]:w-1 [&_.column-resizer]:bg-brand [&_.column-resizer]:cursor-col-resize [&_.column-resizer]:opacity-0 hover:[&_.column-resizer]:opacity-100",
                    "[&_.selectedCell]:bg-secondary/30 [&_.selectedCell]:border-2 [&_.selectedCell]:border-brand",

                    // Resize handle
                    "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)",

                    isDisabled && "cursor-not-allowed bg-disabled_subtle text-disabled ring-disabled",
                    isInvalid && "ring-error_subtle focus:ring-2 focus:ring-error",
                    inputClassName,
                ),
            },
        },
    });

    // Sync content if it changes from outside
    useEffect(() => {
        if (editor && editorOptions.content !== undefined && editorOptions.content !== editor.getHTML()) {
            editor.commands.setContent(editorOptions.content);
        }
    }, [editor, editorOptions.content]);

    useEffect(() => {
        const setLink = () => {
            if (!editor) return;

            const previousUrl = editor.getAttributes("link").href;
            const url = window.prompt("Please enter a link", previousUrl);

            // Cancelled.
            if (url === null) {
                return;
            }

            // If empty, remove link.
            if (url === "") {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();

                return;
            }

            // Update link.
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        };

        // Add a keyboard shortcut listener to handle link clicks
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey && event.key === "k") {
                setLink();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <EditorContext.Provider value={{ editor, isDisabled, limit, isInvalid, editorId, questionId, examId, images }}>
            <div className={cx("flex w-full flex-col gap-3", className)}>{children}</div>
        </EditorContext.Provider>
    );
};

interface TextEditorContentProps extends Omit<EditorContentProps, "editor"> {
    ref?: Ref<HTMLDivElement>;
}

const TextEditorContent = ({ ...props }: TextEditorContentProps) => {
    const { editor, isDisabled } = useEditorContext();
    return <EditorContent disabled={isDisabled} {...props} editor={editor} />;
};

interface TextEditorLabelProps extends ComponentProps<typeof Label> { }

const TextEditorLabel = ({ children, ...props }: TextEditorLabelProps) => {
    const { editor, editorId } = useEditorContext();

    return (
        <Label
            {...props}
            id={`${editorId}-label`}
            onClick={() => {
                editor.chain().focus().run();
            }}
        >
            {children}
        </Label>
    );
};

interface TextEditorHintTextProps extends HTMLAttributes<HTMLElement> { }

const TextEditorHintText = ({ children, ...props }: TextEditorHintTextProps) => {
    const { editor, editorId, limit, isInvalid } = useEditorContext();

    if (!children && !limit) return null;

    const charactersLeft = typeof limit === "number" ? limit - editor.storage?.characterCount?.characters() : 0;
    const exceedsLimit = charactersLeft < 0;

    return (
        <HintText {...props} id={`${editorId}-hint`} isInvalid={isInvalid || exceedsLimit} className={cx(limit && "tabular-nums", props.className)}>
            {children || `${charactersLeft.toLocaleString()} character${charactersLeft === 1 ? "" : "s"} left`}
        </HintText>
    );
};

export const TextEditor = {
    Root: TextEditorRoot,
    Toolbar: TextEditorToolbar,
    Tooltip: TextEditorTooltip,
    Content: TextEditorContent,
    Label: TextEditorLabel,
    HintText: TextEditorHintText,
};
