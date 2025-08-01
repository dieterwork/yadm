import type { Node } from "@xyflow/react";

export type ElementaryActorState = "internal" | "external";

export type ElementaryActorNode = Node<
  { state: ElementaryActorState; content: string[]; color: string },
  "elementary_actor"
>;
