import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeFocus } from "../../nodes.types";

export type ActorState = "default" | "unclear" | "missing";

export type ActorNode = Node<
  {
    state: ActorState;
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_structure_diagram">,
  "actor"
>;
