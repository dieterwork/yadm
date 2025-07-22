import { create } from "zustand";

interface PreviewNodeState {
  previewNode: { type: string } | null;
  updatePreviewNode: (data: {
    type: string;
    width: number;
    height: number;
  }) => void;
  resetPreviewNode: () => void;
  updatePosition: (pos: { x: number; y: number }) => void;
  position: { x: number; y: number };
}

export const usePreviewNode = create<PreviewNodeState>()((set) => ({
  previewNode: null,
  position: { x: 0, y: 0 },
  updatePosition: (position) => set(() => ({ position })),
  updatePreviewNode: (data) => set(() => ({ previewNode: data })),
  resetPreviewNode: () => set(() => ({ previewNode: null })),
}));
