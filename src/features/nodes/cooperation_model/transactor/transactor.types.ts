import type { Node } from "@xyflow/react";

export type TransactorState = "internal" | "external";

export type TransactorNode = Node<
  { state: TransactorState; content: string[]; color: string },
  "transactor"
>;
