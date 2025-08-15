import type { Node } from "@xyflow/react";
import type { Scope } from "../cooperationModel.types";

export type ActorState = "default" | "unclear" | "missing";

export type ActorNode = Node<
  {
    state: ActorState;
    scope: Scope;
    content: string;
    color: string;
    fontSize: number;
  },
  "actor"
>;
