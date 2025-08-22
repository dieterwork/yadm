import type { Edge, EdgeTypes, XYPosition } from "@xyflow/react";
import CooperationModelEdge from "./cooperation_model/CooperationModelEdge";

export const edgeTypes = {
  cooperation_model_edge: CooperationModelEdge,
} satisfies EdgeTypes;

export type ControlPoint = XYPosition & {
  id: string;
  active?: boolean;
};

export type DEMOEdge = Edge<
  { points: ControlPoint[] },
  "cooperation_model_edge"
>;
