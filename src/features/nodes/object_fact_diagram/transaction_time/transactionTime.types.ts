import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type TransactionTimeNode = Node<
  DEMONodeBaseData<"object_fact_diagram">,
  "transaction_time"
>;
