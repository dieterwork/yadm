import type { Node } from "@xyflow/react";
import type { Scope } from "../cooperation_model.types";

export type TransactionState = "default" | "unclear" | "missing" | "double";
export type TransactionNode = Node<
  { state: TransactionState; scope: Scope; content: string[]; color: string },
  "transaction"
>;
