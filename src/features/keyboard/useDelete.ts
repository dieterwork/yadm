import { useState, useCallback, useEffect, useRef } from "react";
import {
  type Node,
  useReactFlow,
  getConnectedEdges,
  type Edge,
  type XYPosition,
  useStore,
} from "@xyflow/react";
import useShortcut from "../keyboard/useShortcut";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import type { DEMONode } from "../nodes/nodes.types";
import { getChildNodes } from "../actions/copy_paste/utils";

interface UseDeleteParams {
  disabledNodeTypes?: DEMONode["type"][];
  nodeId?: string;
}
const useDelete = ({ disabledNodeTypes }: UseDeleteParams = {}) => {
  const { nodes, edges, setNodes, setEdges, getNode } = useDEMOModeler(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      getNode: state.getNode,
    }))
  );

  const deleteElement = (nodeId: string) => {
    const node = getNode(nodeId ?? "");
    const selectedNodes = node ? [node] : nodes.filter((node) => node.selected);

    const childNodes = getChildNodes(selectedNodes, nodes);

    const combinedSelectedNodes = selectedNodes.concat(childNodes);

    const selectedEdges = getConnectedEdges(selectedNodes, edges).filter(
      (edge) => {
        const isExternalSource = selectedNodes.every(
          (n) => n.id !== edge.source
        );
        const isExternalTarget = selectedNodes.every(
          (n) => n.id !== edge.target
        );

        return !(isExternalSource || isExternalTarget);
      }
    );

    // A delete action needs to remove the copied nodes and edges from the graph.
    if (combinedSelectedNodes) {
      setNodes((nodes) =>
        nodes.filter((node) => !combinedSelectedNodes.includes(node))
      );
    }
    if (selectedEdges) {
      setEdges((edges) =>
        edges.filter((edge) => !selectedEdges.includes(edge))
      );
    }
  };

  useShortcut(["Meta+d", "Control+d"], deleteElement);

  return { deleteElement };
};

export default useDelete;
