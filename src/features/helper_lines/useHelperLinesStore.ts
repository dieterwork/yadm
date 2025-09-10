import { create } from "zustand";
import { temporal } from "zundo";
import type { DEMONode } from "../nodes/nodes.types";
import { getHelperLines } from "./helperLines.utils";
import type { NodeChange } from "@xyflow/react";

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
      if (
        isEnabled &&
        changes.length === 1 &&
        changes[0].type === "position" &&
        changes[0].dragging &&
        changes[0].position
      ) {
        const helperLines = getHelperLines({
          change: changes[0],
          nodes,
          filteredNodeTypes: [
            "actor",
            "derived_entity",
            "elementary_actor",
            "entity_class",
            "production_event",
            "transactor",
            "transaction_time",
            "transaction",
            "several_actors",
            "self_activation",
            "production_event",
            "c_act",
            "c_fact",
            "tk_execution",
            "initiation_fact",
            "text_node",
          ],
        });

        // if we have a helper line, we snap the node to the helper line position
        // this is being done by manipulating the node position inside the change object
        changes[0].position.x =
          helperLines.snapPosition.x ?? changes[0].position.x;
        changes[0].position.y =
          helperLines.snapPosition.y ?? changes[0].position.y;

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
