import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type SelfActivationState = "internal" | "external";

export type SelfActivationNode = Node<
  {
    state: SelfActivationState;
  } & DEMONodeBaseData<"cooperation_model">,
  "self_activation"
>;
