import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeScope } from "../../nodes.types";

export type TransactionState = "default" | "unclear" | "missing" | "double";
export type TransactionNode = Node<
  {
    state: TransactionState;
    scope: NodeScope;
  } & DEMONodeBaseData<"cooperation_model">,
  "transaction"
>;
