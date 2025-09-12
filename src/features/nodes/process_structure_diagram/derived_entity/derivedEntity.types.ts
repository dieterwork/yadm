import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type DerivedEntityNode = Node<
  DEMONodeBaseData<"process_structure_diagram">,
  "derived_entity"
>;
