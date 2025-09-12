import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type CompositeState = "internal" | "external";

export type CompositeNode = Node<
  {
    state: CompositeState;
  } & DEMONodeBaseData<"cooperation_model">,
  "composite"
>;
