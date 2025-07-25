import type { Node } from "@xyflow/react";

export type ElementaryActorCTARState = "internal" | "external";

export type ElementaryActorCTARNode = Node<
  { state: ElementaryActorCTARState; content: string[]; color: string },
  "elementary-actor"
>;
