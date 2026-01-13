import type {
  CooperationModelEdge,
  DEMOEdge,
  GhostEdge,
  ObjectFactDiagramEdge,
  ProcessStructureDiagramEdge,
  TransactionTimeEdge,
} from "$/features/edges/edges.types";

const getEdgeData = <T extends DEMOEdge>(
  edgeType: T["type"],
  data?: T["data"]
): T["data"] => {
  if (!edgeType) return undefined;
  switch (edgeType) {
    case "cooperation_model_edge": {
      return {
        controlPoints: [],
        lineType:
          data && "lineType" in data && !!data.lineType
            ? data.lineType
            : "solid",
      } satisfies CooperationModelEdge["data"];
    }
    case "object_fact_diagram_edge": {
      return {
        controlPoints: [],
      } satisfies ObjectFactDiagramEdge["data"];
    }
    case "process_structure_diagram_edge": {
      return {
        controlPoints: [],
      } satisfies ProcessStructureDiagramEdge["data"];
    }
    default: {
      return {};
    }
  }
};

export default getEdgeData;
