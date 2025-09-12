import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type TransactorState = "internal" | "external";

export type TransactorNode = Node<
  {
    state: TransactorState;
  } & DEMONodeBaseData<"cooperation_model">,
  "transactor"
>;
