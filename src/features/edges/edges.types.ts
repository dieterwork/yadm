import type { EdgeTypes } from "@xyflow/react";
import CooperationModelEdge from "./cooperation_model/CooperationModelEdge";

export const edgeTypes = {
  // Add your custom edge types here!
  cooperation_model_edge: CooperationModelEdge,
} satisfies EdgeTypes;
