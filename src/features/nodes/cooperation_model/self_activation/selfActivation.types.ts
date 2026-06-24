import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeFocus } from "../../nodes.types";

export type SelfActivationNode = Node<
  {
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_model">,
  "self_activation"
>;
