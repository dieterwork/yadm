import type { BuiltInNode } from "@xyflow/react";
import ActorNode from "./cooperation_model/actor/ActorNode";
import TransactionNode from "./cooperation_model/transaction/TransactionNode";
import TransactorNode from "./cooperation_model/transactor/TransactorNode";
import type { CooperationModelNode } from "./cooperation_model/cooperation_model.types";
import SelfActivationNode from "./cooperation_model/self-activation/SelfActivationNode";
import CompositeCTARNode from "./cooperation_model/composite-ctar/CompositeCTARNode";
import ElementaryActorCTARNode from "./cooperation_model/elementary-actor/ElementaryActorCTARNode";
import SeveralActorsNode from "./cooperation_model/several-actors/SeveralActorsNode";

export const nodeTypes = {
  actor: ActorNode,
  transaction: TransactionNode,
  transactor: TransactorNode,
  "self-activation": SelfActivationNode,
  "composite-ctar": CompositeCTARNode,
  "elementary-actor": ElementaryActorCTARNode,
  "several-actors": SeveralActorsNode,
};

export type DEMONode<T> = BuiltInNode | CooperationModelNode<T>;

export type ColorType = "default" | string;
