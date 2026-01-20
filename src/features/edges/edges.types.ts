import type { Edge, EdgeTypes, MarkerType, XYPosition } from "@xyflow/react";
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

export type CenterData = XYPosition & {
  active?: boolean;
};

export type LinePath = "step" | "straight";

export type LineType = "solid" | "dashed";

export type CooperationModelEdge = Edge<
  { center?: CenterData; lineType: LineType; linePath: LinePath },
  "cooperation_model_edge"
>;

export type ObjectFactDiagramEdge = Edge<
  { center?: CenterData; markerMid?: MarkerType; linePath: LinePath },
  "object_fact_diagram_edge"
>;

export type ProcessStructureDiagramEdge = Edge<
  { center?: CenterData; linePath: LinePath },
  "process_structure_diagram_edge"
>;

export type GhostEdge = Edge<
  { center?: CenterData; linePath: LinePath },
  "ghost_edge"
>;

export type TransactionTimeEdge = Edge<{}, "transaction_time_edge">;

export type DEMOEdge =
  | CooperationModelEdge
  | ObjectFactDiagramEdge
  | ProcessStructureDiagramEdge
  | TransactionTimeEdge
  | GhostEdge;
