import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type ElementaryActorState = "internal" | "external";

export type ElementaryActorNode = Node<
  {
    state: ElementaryActorState;
  } & DEMONodeBaseData<"cooperation_model">,
  "elementary_actor"
>;
