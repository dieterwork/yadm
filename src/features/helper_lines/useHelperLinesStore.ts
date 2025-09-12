import { create } from "zustand";
import { temporal } from "zundo";
import type { DEMONode } from "../nodes/nodes.types";
import type { NodeChange } from "@xyflow/react";
import { getHelperLines } from "./utils/getHelperLines";
import convertAbsoluteToRelativePosition from "../nodes/utils/convertAbsoluteToRelativePosition";

export interface DEMOModelerState {
  isEnabled: boolean;
  horizontal: number | undefined;
  vertical: number | undefined;
  toggle: (isEnabled: boolean) => void;
  updateHelperLines: (
    changes: NodeChange<DEMONode>[],
    nodes: DEMONode[]
  ) => NodeChange<DEMONode>[];
}

export const useHelperLinesStore = create<DEMOModelerState>()(
  temporal((set, get) => ({
    isEnabled: true,
    horizontal: undefined,
    vertical: undefined,
    toggle: (isEnabled) => {
      set({ isEnabled });
    },
    updateHelperLines: (changes, nodes: DEMONode[]) => {
      // reset the helper lines (clear existing lines, if any)
      set({
        horizontal: undefined,
        vertical: undefined,
      });

      const isEnabled = get().isEnabled;

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
        const helperLines = getHelperLines({
          change,
          nodes,
        });

        const helperLinesRelativePosition = changedNode
          ? convertAbsoluteToRelativePosition(
              helperLines.snapPosition,
              changedNode,
              nodes
            )
          : undefined;

        // if we have a helper line, we snap the node to the helper line position
        // this is being done by manipulating the node position inside the change object
        change.position.x = helperLinesRelativePosition?.x
          ? helperLinesRelativePosition.x
          : change.position.x;
        change.position.y = helperLinesRelativePosition?.y
          ? helperLinesRelativePosition.y
          : change.position.y;

        // if helper lines are returned, we set them so that they can be displayed
        set({
          horizontal: helperLines.horizontal,
          vertical: helperLines.vertical,
        });
      }
      return changes;
    },
  }))
);
