import type {
  CooperationStructureDiagramEdge,
  DEMOEdge,
  ObjectFactDiagramEdge,
  ProcessStructureDiagramEdge,
} from "$/features/edges/edges.types";

const getEdgeData = <T extends DEMOEdge>(
  edgeType: T["type"],
  data?: T["data"],
): T["data"] => {
  if (!edgeType) return undefined;
  switch (edgeType) {
    case "cooperation_structure_diagram_edge": {
      return {
        ...data,
        lineType:
          data && "lineType" in data && !!data.lineType
            ? data.lineType
            : "solid",
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
      } satisfies CooperationStructureDiagramEdge["data"];
    }
    case "object_fact_diagram_edge": {
      return {
        ...data,
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
        lineType:
          data && "lineType" in data && !!data.lineType
            ? data.lineType
            : "solid",
        law: "precedence",
        cardinality:
          data && "cardinality" in data && !!data.cardinality
            ? data.cardinality
            : {
                startLabel0: { label: "0..*" },
                startLabel1: { label: "" },
                middleLabel0: { label: "" },
                middleLabel1: { label: "..." },
                endLabel0: { label: "1..1" },
                endLabel1: { label: "" },
              },
      } satisfies ObjectFactDiagramEdge["data"];
    }
    case "process_structure_diagram_edge": {
      return {
        ...data,
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
        lineType:
          data && "lineType" in data && !!data.lineType
            ? data.lineType
            : "solid",
      } satisfies ProcessStructureDiagramEdge["data"];
    }
    case "ghost_edge": {
      return {
        ...data,
        linePath:
          data && "linePath" in data && !!data.linePath
            ? data.linePath
            : "step",
      } satisfies ProcessStructureDiagramEdge["data"];
    }
    default: {
      return { ...data };
    }
  }
};

export default getEdgeData;
