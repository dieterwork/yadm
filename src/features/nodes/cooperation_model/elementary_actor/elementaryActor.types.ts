import type { Node } from "@xyflow/react";
import type { DEMOHandlesData } from "../../nodes.types";

export type ElementaryActorState = "internal" | "external";

export type ElementaryActorNode = Node<
  {
    state: ElementaryActorState;
    content: string;
    color: string;
    fontSize: number;
    handles: DEMOHandlesData;
  },
  "elementary_actor"
>;
