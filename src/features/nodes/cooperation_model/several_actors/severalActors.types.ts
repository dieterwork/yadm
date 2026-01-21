import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type SeveralActorsState = "internal" | "external";

export type SeveralActorsNode = Node<
  {
    state: SeveralActorsState;
  } & DEMONodeBaseData<"cooperation_model">,
  "several_actors"
>;
