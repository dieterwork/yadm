import type { Node } from "@xyflow/react";
import type { Scope } from "../cooperationModel.types";
import type { DEMONodeBaseData } from "../../nodes.types";

export type ActorState = "default" | "unclear" | "missing";

export type ActorNode = Node<
  {
    state: ActorState;
    scope: Scope;
  } & DEMONodeBaseData<"cooperation_model">,
  "actor"
>;
