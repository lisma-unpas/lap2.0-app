"use client";

import { createContext, useContext } from "react";
import type { Editor } from "@tiptap/react";

export type EditorContextType = {
    editor: Editor;
    editorId: string;
    isDisabled?: boolean;
    limit?: number;
    isInvalid?: boolean;
    questionId?: string;
    examId?: string;
    images?: any[];
};

export const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditorContext must be used within a EditorProvider");
    }
    return context;
};
