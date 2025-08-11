import { create } from "zustand";

interface PreviewNodeState {
  previewNode: {
    type: string;
    width: number;
    height: number;
    isDisabled: boolean;
    position: { x: number; y: number };
    content?: string[];
  } | null;
  createNode: ({
    type,
    width,
    height,
    isDisabled,
    position,
    content,
  }: {
    type: string;
    width: number;
    height: number;
    isDisabled?: boolean;
    position: { x: number; y: number };
    content?: string[];
  }) => void;
  updateDimensions: (dimensions: { width?: number; height?: number }) => void;
  updateType: (type: string) => void;
  updateContent: (content: string[]) => void;
  updateDisabled: (isDisabled: boolean) => void;
  updatePosition: (pos: { x: number; y: number }) => void;
  reset: () => void;
}

export const usePreviewNode = create<PreviewNodeState>()((set, get) => ({
  previewNode: null,
  createNode: ({ type, height, width, position, content, isDisabled }) =>
    set(() => {
      return {
        previewNode: {
          type,
          width,
          height,
          position,
          content,
          isDisabled: isDisabled ? isDisabled : false,
        },
      };
    }),
  updateDimensions: (dimensions) =>
    set((state) => {
      if (!state.previewNode) return { previewNode: null };
      return {
        previewNode: {
          ...state.previewNode,
          width: dimensions?.width ?? state.previewNode?.width,
          height: dimensions?.height ?? state.previewNode?.height,
        },
      };
    }),
  updateType: (type) =>
    set((state) => {
      if (!state.previewNode) return { previewNode: null };
      return { previewNode: { ...state.previewNode, type } };
    }),
  updateDisabled: (isDisabled) =>
    set((state) => {
      if (!state.previewNode) return { previewNode: null };
      return { previewNode: { ...state.previewNode, isDisabled } };
    }),
  updatePosition: (position) =>
    set((state) => {
      if (!state.previewNode) return { previewNode: null };
      return { previewNode: { ...state.previewNode, position } };
    }),
  updateContent: (content) =>
    set((state) => {
      if (!state.previewNode) return { previewNode: null };
      return { previewNode: { ...state.previewNode, content } };
    }),
  reset: () => set(() => ({ previewNode: null })),
}));
