import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type TransactionTimeNode = Node<
  DEMONodeBaseData<"process_structure_diagram">,
  "transaction_time"
>;
