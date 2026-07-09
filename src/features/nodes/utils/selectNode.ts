import type { RefObject } from "react";
import { useStoreApi } from "@xyflow/react";
import { errorMessages } from "@xyflow/system";

type StoreApi = ReturnType<typeof useStoreApi>;

/**
 * Mirrors React Flow's internal `handleNodeClick` so a node can be selected
 * programmatically. Shared by the parent-drag and parent-selection helpers.
 */
const selectNode = ({
  id,
  store,
  unselect = false,
  nodeRef,
}: {
  id: string;
  store: StoreApi;
  unselect?: boolean;
  nodeRef: RefObject<HTMLElement>;
}) => {
  const {
    addSelectedNodes,
    unselectNodesAndEdges,
    multiSelectionActive,
    nodeLookup,
    onError,
  } = store.getState();
  const node = nodeLookup.get(id);

  if (!node) {
    onError?.("012", errorMessages["error012"](id));
    return;
  }

  store.setState({ nodesSelectionActive: false });

  if (!node.selected) {
    addSelectedNodes([id]);
  } else if (unselect || (node.selected && multiSelectionActive)) {
    unselectNodesAndEdges({ nodes: [node], edges: [] });

    requestAnimationFrame(() => nodeRef?.current?.blur());
  }
};

export default selectNode;
