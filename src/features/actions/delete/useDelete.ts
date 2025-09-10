import { useState, useCallback, useEffect, useRef } from "react";
import {
  type Node,
  useReactFlow,
  getConnectedEdges,
  type Edge,
  type XYPosition,
  useStore,
} from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";
import {
  getChildNodes,
  getDisabledNodes,
  showDisabledNodesError,
} from "../copy_paste/utils";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { useDEMOModeler } from "$/features/modeler/useDEMOModeler";
import useShortcut from "$/features/keyboard/useShortcut";

interface UseDeleteParams {
  disabledNodeTypes?: DEMONode["type"][];
}

const useDelete = ({ disabledNodeTypes }: UseDeleteParams = {}) => {
  const { nodes, edges, setNodes, setEdges } = useDEMOModeler(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }))
  );

  const deleteElement = () => {
    const selectedNodes = nodes.filter((node) => node.selected);

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

    if (!combinedSelectedNodes && !selectedEdges) return;

    // A delete action needs to remove the copied nodes and edges from the graph.
    setNodes((nodes) => nodes.filter((node) => !selectedNodes.includes(node)));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  useShortcut(["Meta+d", "Control+d"], deleteElement);

  return { deleteElement };
};

export default useDelete;
