import type {
  CooperationModelEdge,
  DEMOEdge,
  ObjectFactDiagramEdge,
  ProcessStructureDiagramEdge,
} from "$/features/edges/edges.types";

const getEdgeData = <T extends DEMOEdge>(
  edgeType: T["type"],
  data?: T["data"]
): T["data"] => {
  if (!edgeType) return undefined;
  switch (edgeType) {
    case "cooperation_model_edge": {
      return {
        lineType:
          data && "lineType" in data && !!data.lineType
            ? data.lineType
            : "solid",
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
      } satisfies CooperationModelEdge["data"];
    }
    case "object_fact_diagram_edge": {
      return {
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
      } satisfies ObjectFactDiagramEdge["data"];
    }
    case "process_structure_diagram_edge": {
      return {
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
      } satisfies ProcessStructureDiagramEdge["data"];
    }
    case "ghost_edge": {
      return {
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
      } satisfies ProcessStructureDiagramEdge["data"];
    }
    default: {
      return {};
    }
  }
};

export default getEdgeData;
