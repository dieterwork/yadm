import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode } from "$/features/nodes/nodes.types";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import { create } from "zustand";

interface CopyPasteState {
  bufferedNodes: DEMONode[];
  bufferedEdges: DEMOEdge[];
  bufferedText: string | null;
}

export const useCopyPasteStore = create<CopyPasteState>()(() => ({
  bufferedNodes: [],
  bufferedEdges: [],
  bufferedText: null,
}));

export const setCopyPasteBufferedNodes = (
  newNodes: ReactStyleStateSetter<DEMONode[]>,
) => {
  useCopyPasteStore.setState((state) => ({
    bufferedNodes: Array.isArray(newNodes)
      ? newNodes
      : newNodes(state.bufferedNodes),
  }));
};

export const setCopyPasteBufferedEdges = (
  newEdges: ReactStyleStateSetter<DEMOEdge[]>,
) => {
  useCopyPasteStore.setState((state) => ({
    bufferedEdges: Array.isArray(newEdges)
      ? newEdges
      : newEdges(state.bufferedEdges),
  }));
};

export const setCopyPasteBufferedText = (
  newText: ReactStyleStateSetter<string | null>,
) => {
  useCopyPasteStore.setState((state) => ({
    bufferedText:
      newText === null || typeof newText === "string"
        ? newText
        : newText(state.bufferedText),
  }));
};
