import { type SVGAttributes } from "react";
import type { ActorNode } from "./actor/actor.types";
import type { TransactionNode } from "./transaction/transaction.types";
import type { TransactorNode } from "./transactor/transactor.types";
import type { SelfActivationNode } from "./self_activation/selfActivation.types";
import type { CompositeNode } from "./composite/composite.types";
import type { ElementaryActorNode } from "./elementary_actor/elementaryActor.types";
import type { SeveralActorsNode } from "./several_actors/severalActors.types";

export type CooperationModelShapeType =
  | "actor"
  | "transactor"
  | "transaction"
  | "self_activation"
  | "composite"
  | "elementary_actor"
  | "several_actors";

export type CooperationModelShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

export type CooperationModelShapeComponentProps =
  Partial<CooperationModelShapeProps> & {
    type: CooperationModelShapeType;
    ref?: React.RefObject<SVGSVGElement>;
  };

export type CooperationModelNode =
  | ActorNode
  | CompositeNode
  | ElementaryActorNode
  | SelfActivationNode
  | SeveralActorsNode
  | TransactionNode
  | TransactorNode
  | CompositeNode;
