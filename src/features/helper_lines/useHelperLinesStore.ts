import { create } from "zustand";
import type { DEMONode } from "../nodes/nodes.types";
import type { NodeChange } from "@xyflow/react";
import { getNodeHelperLines } from "./utils/getNodeHelperLines";
import convertAbsoluteToRelativePosition from "../nodes/utils/convertAbsoluteToRelativePosition";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import type { HandleChange } from "./types/types";
import { getNodeHandleHelperLines } from "./utils/getNodeHandleHelperLines";
// import { getEdgeHelperLines } from "./utils/getEdgeHelperLines";

export interface HelperLinesState {
  isEnabled: boolean;
  horizontal: number | undefined;
  vertical: number | undefined;
}

export const useHelperLinesStore = create<HelperLinesState>()(() => ({
  isEnabled: true,
  horizontal: undefined,
  vertical: undefined,
}));

export const toggleHelperLines = (
  isEnabled: ReactStyleStateSetter<boolean>,
) => {
  useHelperLinesStore.setState((state) => ({
    isEnabled:
      typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
  }));
};

export const updateHelperLinesFromNodeChanges = (
  changes: NodeChange<DEMONode>[],
  nodes: DEMONode[],
) => {
  // reset the helper lines (clear existing lines, if any)
  useHelperLinesStore.setState(() => ({
    horizontal: undefined,
    vertical: undefined,
  }));

  const isEnabled = useHelperLinesStore.getState().isEnabled;

  // this will be true if it's a single node being dragged
  // inside we calculate the helper lines and snap position for the position where the node is being moved to
  const change = changes[0];

  if (
    isEnabled &&
    changes.length === 1 &&
    change.type === "position" &&
    change.dragging &&
    change.position
  ) {
    const changedNode = nodes.find((node) => node.id === change.id);
    const helperLines = getNodeHelperLines({
      change,
      nodes,
    });

    const helperLinesPosition =
      changedNode &&
      convertAbsoluteToRelativePosition(
        helperLines.snapPosition,
        changedNode,
        nodes,
      );

    change.position.x = helperLinesPosition?.x ?? change.position.x;
    change.position.y = helperLinesPosition?.y ?? change.position.y;

    // if helper lines are returned, we set them so that they can be displayed
    useHelperLinesStore.setState(() => ({
      horizontal: helperLines.horizontal,
      vertical: helperLines.vertical,
    }));
  }
  return changes;
};

export const updateHelperLinesFromHandleChanges = (
  change: HandleChange,
  nodes: DEMONode[],
) => {
  // reset the helper lines (clear existing lines, if any)
  useHelperLinesStore.setState(() => ({
    horizontal: undefined,
    vertical: undefined,
  }));

  const isEnabled = useHelperLinesStore.getState().isEnabled;

  if (isEnabled && change.isDragging) {
    const helperLines = getNodeHandleHelperLines({
      change,
      nodes,
    });

    change.offset = helperLines.snapOffset ?? change.offset;

    // if helper lines are returned, we set them so that they can be displayed
    useHelperLinesStore.setState(() => ({
      horizontal: helperLines.horizontal,
      vertical: helperLines.vertical,
    }));
  }
  console.log(change.offset);
  return change.offset;
};

export const helperLinesSelector = (state: HelperLinesState) => ({
  isEnabled: state.isEnabled,
  horizontal: state.horizontal,
  vertical: state.vertical,
});
