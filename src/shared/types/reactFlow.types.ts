import type { DEMOEdge } from "$/features/edges/edges.types";
import type { DEMONode } from "$/features/nodes/nodes.types";
import type { ReactFlowJsonObject } from "@xyflow/react";

export type DEMOModelJSON = ReactFlowJsonObject<DEMONode, DEMOEdge> & {
  version: string;
  isEnabled: boolean;
  fileName: string;
};

export const fullEmptyModel: DEMOModelJSON = {
  isEnabled: true,
  version: '1.0.0',
  fileName: '',
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 }
};
