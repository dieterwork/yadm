import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DragAndDropState {
  dragAndDropData: string | null;
  setDragAndDropData: (data: string) => void;
}

export const useDragAndDrop = create<DragAndDropState>()(
  devtools(
    persist(
      (set) => ({
        dragAndDropData: null,
        setDragAndDropData: (data) => set(() => ({ dragAndDropData: data })),
      }),
      {
        name: "drag-and-drop-store",
      }
    )
  )
);
