import type { Node } from "@xyflow/react";
import type { DEMOHandlesData } from "../../nodes.types";

export type SelfActivationState = "internal" | "external";

export type SelfActivationNode = Node<
  {
    state: SelfActivationState;
    content: string;
    color: string;
    fontSize: number;
    handles: DEMOHandlesData;
  },
  "self_activation"
>;
