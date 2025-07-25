import type { Node } from "@xyflow/react";

export type SeveralActorsState = "internal" | "external";

export type SeveralActorsNode = Node<
  { state: SeveralActorsState; content: string[]; color: string },
  "several-actors"
>;
