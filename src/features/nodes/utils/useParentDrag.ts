import { useEffect, useRef, type RefObject } from "react";
import { useStoreApi } from "@xyflow/react";
import { XYDrag, errorMessages, type XYDragInstance } from "@xyflow/system";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";

type StoreApi = ReturnType<typeof useStoreApi>;

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

export default function useParentDrag(
  parentId: string | undefined,
  nodeRef: RefObject<HTMLElement>,
  isEnabled: boolean = true,
) {
  const store = useStoreApi();
  const xyDrag = useRef<XYDragInstance | null>(null);
  const node = getNode(nodeRef.current);

  useEffect(() => {
    if (isEnabled) {
      xyDrag.current = XYDrag({
        getStoreItems: () => store.getState(),
        onNodeMouseDown: (id: string) => selectNode({ id, store, nodeRef }),
      });

      if (parentId && nodeRef.current && isEnabled) {
        xyDrag.current.update({
          domNode: nodeRef.current,
          nodeId: parentId,
          isSelectable: true,
          noDragClassName: "nodrag",
        });
      }
    }
    return () => xyDrag.current?.destroy();
  }, [parentId, store, XYDrag, selectNode, isEnabled]);
}
