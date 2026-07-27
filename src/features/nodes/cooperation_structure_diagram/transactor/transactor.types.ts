import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeFocus } from "../../nodes.types";

export type TransactorNode = Node<
  {
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_structure_diagram">,
  "transactor"
>;
