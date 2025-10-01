import type {
  CooperationModelEdge,
  DEMOEdge,
  GhostEdge,
  ObjectFactDiagramEdge,
  ProcessStructureDiagramEdge,
  TransactionTimeEdge,
} from "$/features/edges/edges.types";

const getEdgeData = <T extends DEMOEdge>(edgeType: T["type"]): T["data"] => {
  if (!edgeType) return undefined;
  switch (edgeType) {
    case "cooperation_model_edge": {
      const data = {
        controlPoints: [],
        lineType: "solid",
      } satisfies CooperationModelEdge["data"];
      return data;
    }
    case "object_fact_diagram_edge": {
      const data = {
        controlPoints: [],
      } satisfies ObjectFactDiagramEdge["data"];
      return data;
    }
    case "process_structure_diagram_edge": {
      const data = {
        controlPoints: [],
      } satisfies ProcessStructureDiagramEdge["data"];
      return data;
    }
    default: {
      return {};
    }
  }
};

export default getEdgeData;
