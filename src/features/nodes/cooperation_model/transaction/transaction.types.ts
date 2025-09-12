import type { Node } from "@xyflow/react";
import type { Scope } from "../cooperationModel.types";
import type { DEMOHandlesData, DEMONodeBaseData } from "../../nodes.types";

export type TransactionState = "default" | "unclear" | "missing" | "double";
export type TransactionNode = Node<
  {
    state: TransactionState;
    scope: Scope;
  } & DEMONodeBaseData<"cooperation_model">,
  "transaction"
>;
