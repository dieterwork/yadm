import type { OnSelectionChangeFunc } from "@xyflow/react";
import type { DEMONode } from "../../nodes/nodes.types";
import type { DEMOEdge } from "../../edges/edges.types";
import { setNodes } from "../useDEMOModelerStore";

const onSelectionChange: OnSelectionChangeFunc<DEMONode, DEMOEdge> = ({
  nodes,
}) => {
  if (nodes.length < 2) return;
  // prevent selection if all nodes don't share parentId
  const parents = new Set(nodes.map((n) => n.parentId));
  if (parents.size < 2) {
    // filter out parent nodes
    if (nodes.every((node) => !node.parentId)) return;
    // deselect nodes with parent extent
    setNodes((nodes) =>
      nodes.map((node) =>
        node.extent === "parent" ? { ...node, selected: false } : node
      )
    );
  }
  // else, deselect all childNodes
  setNodes((nodes) =>
    nodes.map((node) => (node.parentId ? { ...node, selected: false } : node))
  );
};

export default onSelectionChange;
