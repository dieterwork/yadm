import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode } from "$/features/nodes/nodes.types";
import type { ReactFlowJsonObject } from "@xyflow/react";

export type DEMOModelJSON = ReactFlowJsonObject<DEMONode, DEMOEdge> & {
  version: string;
};
