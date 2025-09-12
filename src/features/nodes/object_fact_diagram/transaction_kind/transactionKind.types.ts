import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type TransactionKindNode = Node<
  Omit<DEMONodeBaseData<"object_fact_diagram">, "handles">,
  "transaction_kind"
>;
