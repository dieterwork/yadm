import type { Node } from "@xyflow/react";

export type CompositeCTARState = "internal" | "external";

export type CompositeCTARNode = Node<
  { state: CompositeCTARState; content: string[]; color: string },
  "self-activation"
>;
