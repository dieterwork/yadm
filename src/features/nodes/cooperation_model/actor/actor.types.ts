import type { Node } from "@xyflow/react";
import type { Scope } from "../cooperationModel.types";
import type { DEMOHandle, DEMOHandlesData } from "../../nodes.types";

export type ActorState = "default" | "unclear" | "missing";

export type ActorNode = Node<
  {
    state: ActorState;
    scope: Scope;
    content: string;
    color: string;
    fontSize: number;
    handles: DEMOHandlesData;
  },
  "actor"
>;
