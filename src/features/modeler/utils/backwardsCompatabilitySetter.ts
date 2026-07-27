import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode } from "$/features/nodes/nodes.types";

export const updateNodesForBackwardsCompatability = (
  nodes: DEMONode[],
): DEMONode[] => {
  return nodes.map((n) => ({
    ...n,
    type:
      n.type === "cooperation_model" ? "cooperation_structure_diagram" : n.type,
    data: n.data
      ? {
          ...n.data,
          subModel:
            "subModel" in n.data
              ? n.data.subModel === "cooperation_model"
                ? "cooperation_structure_diagram"
                : n.data.subModel
              : undefined,
        }
      : undefined,
  }));
};

export const updateEdgesForBackwardsCompatability = (
  edges: DEMOEdge[],
): DEMOEdge[] => {
  return edges.map((e) => ({
    ...e,
    type:
      e.type === "cooperation_model_edge"
        ? "cooperation_structure_diagram_edge"
        : e.type,
  }));
};
