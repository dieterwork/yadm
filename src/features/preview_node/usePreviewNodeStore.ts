import { create } from "zustand";
import type { DEMONode } from "../nodes/nodes.types";
import type { XYPosition } from "@xyflow/react";

interface PreviewNode {
  type: Omit<DEMONode["type"], "ghost">;
  width: number;
  height: number;
  position: XYPosition;
  content?: string;
}

interface PreviewNodeState {
  previewNode: PreviewNode | null;
}

export const usePreviewNodeStore = create<PreviewNodeState>()(() => ({
  previewNode: null,
}));

export const updatePreviewNodePosition = (position: XYPosition) => {
  usePreviewNodeStore.setState((state) => ({
    previewNode: state.previewNode && { ...state.previewNode, position },
  }));
};

export const resetPreviewNode = () =>
  usePreviewNodeStore.setState(() => ({ previewNode: null }));

export const updatePreviewNode = (newPreviewNode: Partial<PreviewNode>) => {
  usePreviewNodeStore.setState((state) => ({
    previewNode: state.previewNode && {
      ...state.previewNode,
      ...newPreviewNode,
    },
  }));
};

export const setPreviewNode = (newPreviewNode: PreviewNode) => {
  usePreviewNodeStore.setState(() => ({ previewNode: newPreviewNode }));
};
