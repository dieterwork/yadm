import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData, NodeFocus } from "../../nodes.types";

export type ElementaryActorNode = Node<
  {
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_structure_diagram">,
  "elementary_actor"
>;
