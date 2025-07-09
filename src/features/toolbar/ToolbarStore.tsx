import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { DEMOObjectType } from "../DEMO_objects/types";

interface ToolbarState {
  selectedNodeType: DEMOObjectType | null;
  setSelectedNodeType: (type: DEMOObjectType | null) => void;
}

export const useToolbar = create<ToolbarState>()(
  devtools(
    persist(
      (set) => ({
        selectedNodeType: null,
        setSelectedNodeType: (nodeType) =>
          set(() => ({ selectedNodeType: nodeType })),
      }),
      {
        name: "toolbar-store",
      }
    )
  )
);
