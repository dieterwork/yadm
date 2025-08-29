import type { Node } from "@xyflow/react";
import type { DEMOHandlesData } from "../../nodes.types";

export type CompositeState = "internal" | "external";

export type CompositeNode = Node<
  {
    state: CompositeState;
    content: string;
    color: string;
    handles: DEMOHandlesData;
  },
  "self_activation"
>;
