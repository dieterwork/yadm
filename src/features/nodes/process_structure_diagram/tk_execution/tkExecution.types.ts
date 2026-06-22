import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type TKExecutionNode = Node<
  DEMONodeBaseData<"process_structure_diagram">,
  "tk_execution"
>;
