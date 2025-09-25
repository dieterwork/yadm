import type { Edge, EdgeTypes, XYPosition } from "@xyflow/react";
import CooperationModelEdge from "./cooperation_model/CooperationModelEdge";
import TransactionTimeEdge from "./transaction_time_edge/TransactionTimeEdge";
import ObjectFactDiagramEdge from "./object_fact_diagram/ObjectFactDiagramEdge";
import ProcessStructureDiagramEdge from "./process_structure_diagram/ProcessStructureDiagramEdge";
import GhostEdge from "./ghost_edge/GhostEdge";

export const edgeTypes = {
  cooperation_model_edge: CooperationModelEdge,
  object_fact_diagram_edge: ObjectFactDiagramEdge,
  process_structure_diagram_edge: ProcessStructureDiagramEdge,
  transaction_time_edge: TransactionTimeEdge,
  ghost_edge: GhostEdge,
} satisfies EdgeTypes;

export type ControlPointData = XYPosition & {
  active?: boolean;
};

export type CooperationModelEdge = Edge<
  { controlPoint: ControlPointData },
  "cooperation_model_edge"
>;

export type ObjectFactDiagramEdge = Edge<
  { controlPoint: ControlPointData },
  "object_fact_diagram_edge"
>;

export type ProcessStructureDiagramEdge = Edge<
  { controlPoint: ControlPointData },
  "process_structure_diagram_edge"
>;

export type GhostEdge = Edge<{ controlPoint: ControlPointData }, "ghost_edge">;

export type TransactionTimeEdge = Edge<{}, "transaction_time_edge">;

export type DEMOEdge =
  | CooperationModelEdge
  | ObjectFactDiagramEdge
  | ProcessStructureDiagramEdge
  | TransactionTimeEdge
  | GhostEdge;
