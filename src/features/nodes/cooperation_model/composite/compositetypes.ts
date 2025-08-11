import type { Node } from "@xyflow/react";

export type CompositeState = "internal" | "external";

export type CompositeNode = Node<
  { state: CompositeState; content: string; color: string },
  "self_activation"
>;
