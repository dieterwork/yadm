import type { BuiltInNode } from "@xyflow/react";
import ActorNode from "./cooperation_model/actor/ActorNode";
import TransactionNode from "./cooperation_model/transaction/TransactionNode";
import TransactorNode from "./cooperation_model/transactor/TransactorNode";
import type { CooperationModelNode } from "./cooperation_model/cooperation_model.types";

export const nodeTypes = {
  actor: ActorNode,
  transaction: TransactionNode,
  transactor: TransactorNode,
};

export type DEMONode<T> = BuiltInNode | CooperationModelNode<T>;

export type ColorType = "default" | string;
