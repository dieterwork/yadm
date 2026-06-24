import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeFocus } from "../../nodes.types";

export type SeveralActorsNode = Node<
  {
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_model">,
  "several_actors"
>;
