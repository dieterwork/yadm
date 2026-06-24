import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeFocus } from "../../nodes.types";

export type TransactionState = "default" | "unclear" | "missing" | "double";
export type TransactionNode = Node<
  {
    state: TransactionState;
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_model">,
  "transaction"
>;
