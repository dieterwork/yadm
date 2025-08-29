import type { Node } from "@xyflow/react";
import type { DEMOHandlesData } from "../../nodes.types";

export type SeveralActorsState = "internal" | "external";

export type SeveralActorsNode = Node<
  {
    state: SeveralActorsState;
    content: string;
    color: string;
    handles: DEMOHandlesData;
  },
  "several_actors"
>;
