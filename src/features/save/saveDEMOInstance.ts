import type { Edge, ReactFlowInstance } from "@xyflow/react";
import type { DEMONode } from "../nodes/nodes.types";

export const saveDEMOInstance = (
  instance: ReactFlowInstance<DEMONode, Edge> | null
) => {
  if (!instance) return;
  const jsonModel = JSON.stringify(instance.toObject());
  localStorage.setItem("demo-model", jsonModel);
};
