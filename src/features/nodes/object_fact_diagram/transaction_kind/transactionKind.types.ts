import type { Node } from "@xyflow/react";

export type TransactionKindNode = Node<
  { content: string; color: string; fontSize: number },
  "transaction_kind"
>;
