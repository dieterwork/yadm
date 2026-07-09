import { useEffect, useRef, type RefObject } from "react";
import { useStoreApi } from "@xyflow/react";
import { XYDrag, type XYDragInstance } from "@xyflow/system";
import selectNode from "./selectNode";

export default function useParentDrag(
  parentId: string | undefined,
  nodeRef: RefObject<HTMLElement>,
  isEnabled: boolean = true,
) {
  const store = useStoreApi();
  const xyDrag = useRef<XYDragInstance | null>(null);

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
  }, [parentId, store, isEnabled]);
}
