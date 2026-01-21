import {
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

  const deleteNode = (nodeId?: string) => {
    const selectedNodes = nodes.filter((node) =>
      nodeId ? node.id === nodeId : node.selected
    );

    const childNodes = getChildNodes(selectedNodes, nodes).map((node) => ({
      ...node,
      deletable: true,
    }));

    const combinedSelectedNodes = selectedNodes
      .concat(childNodes)
      .filter((node) => !!node.deletable);

    const selectedEdges = getConnectedEdges(
      combinedSelectedNodes,
      edges
    ).filter((edge) => {
      const isExternalSource = combinedSelectedNodes.every(
        (n) => n.id !== edge.source
      );
      const isExternalTarget = combinedSelectedNodes.every(
        (n) => n.id !== edge.target
      );

      return !(isExternalSource || isExternalTarget);
    });

    if (!combinedSelectedNodes && !selectedEdges) return;

    setNodes((nodes) =>
      nodes.filter(
        (node) =>
          !combinedSelectedNodes.map((node) => node.id).includes(node.id)
      )
    );
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const deleteEdge = (edgeId?: string) => {
    const selectedEdges = edges
      .filter((edge) => (edgeId ? edge.id === edgeId : edge.selected))
      .filter((edge) => !!edge.deletable);
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
