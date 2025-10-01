import type { Edge, EdgeTypes, XYPosition } from "@xyflow/react";
import TransactionTimeEdgeComponent from "./transaction_time_edge/TransactionTimeEdge";
import ObjectFactDiagramEdgeComponent from "./object_fact_diagram/ObjectFactDiagramEdge";
import ProcessStructureDiagramEdgeComponent from "./process_structure_diagram/ProcessStructureDiagramEdge";
import GhostEdgeComponent from "./ghost_edge/GhostEdge";
import CooperationModelEdgeComponent from "./cooperation_model/CooperationModelEdge";

export const edgeTypes = {
  cooperation_model_edge: CooperationModelEdgeComponent,
  object_fact_diagram_edge: ObjectFactDiagramEdgeComponent,
  process_structure_diagram_edge: ProcessStructureDiagramEdgeComponent,
  transaction_time_edge: TransactionTimeEdgeComponent,
  ghost_edge: GhostEdgeComponent,
} satisfies EdgeTypes;

export type ControlPointData = XYPosition & {
  active?: boolean;
};

export type CooperationModelEdge = Edge<
  { controlPoint: ControlPointData; lineType: "solid" | "dashed" },
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
