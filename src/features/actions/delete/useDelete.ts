import {
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useShallow } from "zustand/react/shallow";
import { getConnectedEdges } from "@xyflow/react";
import getChildNodes from "$/features/nodes/utils/getChildNodes";
import getNodeHandle from "$/features/connection_handles/utils/getHandle";
import type { DEMONode } from "$/features/nodes/nodes.types";

const useDelete = () => {
  const { nodes, edges } = useDEMOModelerStore(
    useShallow((state) => ({ nodes: state.nodes, edges: state.edges })),
  );

  const deleteNode = (nodeId?: string) => {
    const selectedNodes = nodes.filter((node) =>
      nodeId ? node.id === nodeId : node.selected,
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
      edges,
    ).filter((edge) => {
      const isExternalSource = combinedSelectedNodes.every(
        (n) => n.id !== edge.source,
      );
      const isExternalTarget = combinedSelectedNodes.every(
        (n) => n.id !== edge.target,
      );

      return !(isExternalSource || isExternalTarget);
    });

    if (!combinedSelectedNodes.length && !selectedEdges.length) return;

    const deletedNodeIds = new Set(combinedSelectedNodes.map((n) => n.id));
    const postDeleteEdges = edges.filter(
      (edge) =>
        !deletedNodeIds.has(edge.source) && !deletedNodeIds.has(edge.target),
    );

    setNodes((nodes) =>
      nodes
        .filter(
          (node) =>
            !combinedSelectedNodes.map((node) => node.id).includes(node.id),
        )
        .map((node) => {
          if (!("handles" in node.data) || !node.data.handles) return node;

          let handles = node.data.handles;
          let changed = false;

          for (const pos of ["top", "bottom", "left", "right"] as const) {
            const group = handles[pos];
            if (!group?.handles) continue;

            const newHandles = group.handles.map((h) => {
              if (!h.derivation || h.derivation === "none") return h;
              const stillConnected = postDeleteEdges.some(
                (edge) => edge.target === node.id && edge.targetHandle === h.id,
              );
              if (stillConnected) return h;
              changed = true;
              return { ...h, derivation: "none" };
            });

            handles = { ...handles, [pos]: { ...group, handles: newHandles } };
          }

          if (!changed) return node;
          return { ...node, data: { ...node.data, handles } } as DEMONode;
        }),
    );
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const deleteEdge = (edgeId?: string) => {
    const selectedEdges = edges
      .filter((edge) => (edgeId ? edge.id === edgeId : edge.selected))
      .filter((edge) => !!edge.deletable);
    if (!selectedEdges.length) return;

    const remainingEdges = edges.filter(
      (edge) => !selectedEdges.includes(edge),
    );

    setEdges(remainingEdges);

    setNodes((nodes) => {
      const filteredNodes = nodes.filter((node) => {
        const isGhost = node.type === "ghost";
        const isTarget = selectedEdges.some((edge) => edge.target === node.id);
        return !(isGhost && isTarget);
      });

      return filteredNodes.map((node) => {
        if (!("handles" in node.data) || !node.data.handles) return node;

        const affectedHandleIds = selectedEdges
          .filter((edge) => edge.target === node.id && edge.targetHandle)
          .map((edge) => edge.targetHandle as string);

        if (!affectedHandleIds.length) return node;

        let handles = node.data.handles;

        for (const handleId of affectedHandleIds) {
          const stillConnected = remainingEdges.some(
            (edge) => edge.target === node.id && edge.targetHandle === handleId,
          );
          if (stillConnected) continue;

          const found = getNodeHandle(node, handleId);
          if (!found || found.handle.derivation === "none") continue;

          const group = handles[found.position];
          handles = {
            ...handles,
            [found.position]: {
              ...group,
              handles: group?.handles?.map((h) =>
                h.id === handleId ? { ...h, derivation: "none" } : h,
              ),
            },
          };
        }

        return { ...node, data: { ...node.data, handles } } as DEMONode;
      });
    });
  };

  return { deleteNode, deleteEdge };
};

export default useDelete;
