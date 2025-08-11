import type { Node } from "@xyflow/react";

export type SelfActivationState = "internal" | "external";

export type SelfActivationNode = Node<
  { state: SelfActivationState; content: string; color: string },
  "self_activation"
>;
