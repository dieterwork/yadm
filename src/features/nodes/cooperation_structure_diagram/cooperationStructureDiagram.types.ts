import { type SVGAttributes } from "react";
import type { ActorNode } from "./actor/actor.types";
import type { TransactionNode } from "./transaction/transaction.types";
import type { TransactorNode } from "./transactor/transactor.types";
import type { SelfActivationNode } from "./self_activation/selfActivation.types";
import type { CompositeNode } from "./composite/composite.types";
import type { ElementaryActorNode } from "./elementary_actor/elementaryActor.types";
import type { SeveralActorsNode } from "./several_actors/severalActors.types";

export type CooperationStructureDiagramShapeType =
  | "actor"
  | "transactor"
  | "transaction"
  | "self_activation"
  | "composite"
  | "elementary_actor"
  | "several_actors"
  | "multiple_transaction_kind";

export type CooperationStructureDiagramShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

export type CooperationStructureDiagramShapeComponentProps =
  Partial<CooperationStructureDiagramShapeProps> & {
    type: CooperationStructureDiagramShapeType;
    ref?: React.RefObject<SVGSVGElement>;
  };

export type CooperationStructureDiagramNode =
  | ActorNode
  | CompositeNode
  | ElementaryActorNode
  | SelfActivationNode
  | SeveralActorsNode
  | TransactionNode
  | TransactorNode;
