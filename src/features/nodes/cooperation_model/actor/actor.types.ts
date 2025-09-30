import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeScope } from "../../nodes.types";

export type ActorState = "default" | "unclear" | "missing";

export type ActorNode = Node<
  {
    state: ActorState;
    scope: NodeScope;
  } & DEMONodeBaseData<"cooperation_model">,
  "actor"
>;
