import type { Node } from "@xyflow/react";
import type { Scope } from "../cooperation_model.types";

export type ActorState = "default" | "unclear" | "missing";

export type ActorNode = Node<
  { state: ActorState; scope: Scope; content: string; color: string },
  "actor"
>;
