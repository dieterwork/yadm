import {
  getNode,
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import { getConnectedEdges } from "@xyflow/react";
import getChildNodes from "$/features/nodes/utils/getChildNodes";

const useDelete = () => {
  const { nodes, edges } = useDEMOModelerStore(
    useShallow((state) => ({ nodes: state.nodes, edges: state.edges }))
  );

  const deleteNode = () => {
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

    setNodes((nodes) => nodes.filter((node) => !selectedNodes.includes(node)));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const deleteEdge = () => {
    const selectedEdges = edges.filter((edge) => edge.selected);
    if (!selectedEdges) return;

    // find edge source and target
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
    setNodes((nodes) => {
      return nodes.filter((node) => {
        const isGhost = node.type === "ghost";
        const isTarget = selectedEdges.some((edge) => edge.target === node.id);
        return !(isGhost && isTarget);
      });
    });
  };

  return { deleteNode, deleteEdge };
};

export default useDelete;
