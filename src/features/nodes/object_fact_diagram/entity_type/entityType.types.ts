import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type EntityTypeNode = Node<
  DEMONodeBaseData<"object_fact_diagram">,
  "derived_entity"
>;
