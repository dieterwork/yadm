import { useEffect, type RefObject } from "react";
import { useStoreApi } from "@xyflow/react";

import selectNode from "./selectNode";

export default function useParentSelection(
  parentId: string | undefined,
  nodeRef: RefObject<HTMLElement>,
  isEnabled: boolean = true,
) {
  const store = useStoreApi();

  useEffect(() => {
    const domNode = nodeRef.current;

    const handleClick = (event: MouseEvent) => {
      if (!isEnabled || !parentId || !domNode) return;
      const target = event.target as HTMLElement;
      if (
        target.closest(".react-flow__handle, .nodrag, [contenteditable='true']")
      )
        return;

      const { nodeLookup } = store.getState();
      const parent = nodeLookup.get(parentId);
      if (!parent) return;

      let isGroupSelected = !!parent.selected;
      if (!isGroupSelected) {
        for (const node of nodeLookup.values()) {
          if (node.parentId === parentId && node.selected) {
            isGroupSelected = true;
            break;
          }
        }
      }

      if (!isGroupSelected) {
        // Keep the click from React Flow so it selects the parent, not the child.
        event.stopPropagation();
        selectNode({ id: parentId, store, nodeRef });
      }
    };

    domNode?.addEventListener("click", handleClick);
    return () => domNode?.removeEventListener("click", handleClick);
  }, [parentId, store, isEnabled, nodeRef]);
}
