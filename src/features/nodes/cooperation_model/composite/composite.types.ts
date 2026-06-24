import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type CompositeNode = Node<
  {
    focus: "in" | "out";
  } & DEMONodeBaseData<"cooperation_model">,
  "composite"
>;
