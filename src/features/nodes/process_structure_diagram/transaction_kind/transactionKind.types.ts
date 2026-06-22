import type { Node } from "@xyflow/react";
import type { DEMONodeBaseData } from "../../nodes.types";

export type TransactionKindNode = Node<
  Omit<DEMONodeBaseData<"process_structure_diagram">, "handles">,
  "transaction_kind"
>;
