import { type SVGAttributes } from "react";
import type { ActorNode } from "./actor/actor.types";
import type { TransactionNode } from "./transaction/transaction.types";
import type { TransactorNode } from "./transactor/transactor.types";

// Scope
export type Scope = "in" | "out";

export type CooperationModelShapeType =
  | "actor"
  | "transactor"
  | "transaction"
  | "self-activation"
  | "composite-ctar"
  | "elementary-actor-ctar"
  | "several-actors-ctar";

export type CooperationModelShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

export type CooperationModelShapeComponentProps =
  Partial<CooperationModelShapeProps> & {
    type: CooperationModelShapeType;
    ref?: React.RefObject<SVGSVGElement>;
  };

export type CooperationModelNode<T> =
  | ActorNode
  | TransactionNode
  | TransactorNode;
