import type { Edge, EdgeTypes, MarkerType, XYPosition } from "@xyflow/react";
import TransactionTimeEdgeComponent from "./transaction_time_edge/TransactionTimeEdge";
import ObjectFactDiagramEdgeComponent from "./object_fact_diagram/ObjectFactDiagramEdge";
import ProcessStructureDiagramEdgeComponent from "./process_structure_diagram/ProcessStructureDiagramEdge";
import GhostEdgeComponent from "./ghost_edge/GhostEdge";
import CooperationStructureDiagramEdgeComponent from "./cooperation_structure_diagram/CooperationStructureDiagramEdge";

export const edgeTypes = {
  cooperation_structure_diagram_edge: CooperationStructureDiagramEdgeComponent,
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

export type CooperationStructureDiagramEdge = Edge<
  { center?: CenterData; lineType: LineType; linePath: LinePath },
  "cooperation_structure_diagram_edge"
>;

export type CardinalityLabelData = {
  label: string;
  selected?: boolean;
  offset?: { x: number; y: number };
};

export const cardinalityFields = [
  "startLabel0",
  "startLabel1",
  "middleLabel0",
  "middleLabel1",
  "endLabel0",
  "endLabel1",
] as const;

export type CardinalityField = (typeof cardinalityFields)[number];

export type ObjectFactDiagramEdge = Edge<
  {
    center?: CenterData;
    markerMid?: MarkerType;
    linePath: LinePath;
    lineType: LineType;
    law: "exclusion" | "precedence";
    cardinality: Record<CardinalityField, CardinalityLabelData>;
  },
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type TransactionTimeEdge = Edge<{}, "transaction_time_edge">;

export type DEMOEdge =
  | CooperationStructureDiagramEdge
  | ObjectFactDiagramEdge
  | ProcessStructureDiagramEdge
  | TransactionTimeEdge
  | GhostEdge;
