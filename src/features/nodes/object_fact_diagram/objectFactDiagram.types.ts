import type { CActNode } from "./c_act/cAct.types";
import type { CFactNode } from "./c_fact/cFact.types";
import type { InitiationFactNode } from "./initiation_fact/initiationFact.types";
import type { TKExecutionNode } from "./tk_execution/tkExecution.types";
import type { TransactionKindNode } from "./transaction_kind/transactionKind.types";
import type { TransactionTimeNode } from "./transaction_time/transactionTime.types";
import type { TransactionTimeInnerNode } from "./transaction_time_inner/transactionTimeInner.types";

export type ObjectFactDiagramNode =
  | CActNode
  | CFactNode
  | InitiationFactNode
  | TKExecutionNode
  | TransactionKindNode
  | TransactionTimeNode
  | TransactionTimeInnerNode;
