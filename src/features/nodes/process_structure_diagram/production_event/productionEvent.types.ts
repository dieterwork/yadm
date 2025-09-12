import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type ProductionEventNode = Node<
  DEMONodeBaseData<"process_structure_diagram">,
  "production_event"
>;
