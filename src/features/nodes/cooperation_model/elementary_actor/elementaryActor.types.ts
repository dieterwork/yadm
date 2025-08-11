import type { Node } from "@xyflow/react";

export type ElementaryActorState = "internal" | "external";

export type ElementaryActorNode = Node<
  {
    state: ElementaryActorState;
    content: string;
    color: string;
    fontSize: number;
  },
  "elementary_actor"
>;
