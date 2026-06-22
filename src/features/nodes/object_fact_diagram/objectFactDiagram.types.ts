import type { DEMONodeBaseData } from "../nodes.types";
import type { Node } from "@xyflow/react";

export type AttributeNode = Node<
  DEMONodeBaseData<"object_fact_diagram">,
  "attribute"
>;

export type SetNode = Node<DEMONodeBaseData<"object_fact_diagram">, "set">;

export type ProductionEventNode = Node<
  DEMONodeBaseData<"object_fact_diagram">,
  "production_event"
>;

export type EntityTypeNode = Node<
  DEMONodeBaseData<"object_fact_diagram">,
  "entity_type"
>;

export type ObjectFactDiagramNode =
  | AttributeNode
  | EntityTypeNode
  | SetNode
  | ProductionEventNode;
