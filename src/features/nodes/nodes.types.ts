import ActorNode from "./cooperation_model/actor/ActorNode";
import TransactionNode from "./cooperation_model/transaction/TransactionNode";
import TransactorNode from "./cooperation_model/transactor/TransactorNode";
import type { CooperationModelNode } from "./cooperation_model/cooperationModel.types";
import SelfActivationNode from "./cooperation_model/self_activation/SelfActivationNode";
import CompositeNode from "./cooperation_model/composite/CompositeNode";
import ElementaryActorNode from "./cooperation_model/elementary_actor/ElementaryActorNode";
import SeveralActorsNode from "./cooperation_model/several_actors/SeveralActorsNode";
import EntityClassNode from "./process_structure_diagram/entity_class/EntityClassNode";
import ProductionEventNode from "./process_structure_diagram/production_event/ProductionEventNode";
import DerivedEntityNode from "./process_structure_diagram/derived_entity/DerivedEntityNode";
import TransactionKindNode from "./object_fact_diagram/transaction_kind/TransactionKindNode";
import CFactNode from "./object_fact_diagram/c_fact/CFactNode";
import InitiationFactNode from "./object_fact_diagram/initiation_fact/InitiationFactNode";
import CActNode from "./object_fact_diagram/c_act/CActNode";
import TKExecutionNode from "./object_fact_diagram/tk_execution/TKExecutionNode";
import TransactionTimeNode from "./object_fact_diagram/transaction_time/TransactionTimeNode";
import TextNode from "./text/TextNode";
import type { ObjectFactDiagramNode } from "./object_fact_diagram/objectFactDiagram.types";
import type { ProcessStructureDiagramNode } from "./process_structure_diagram/processStructureDiagram.types";
import type { TextNode as TextNodeType } from "./text/textNode.types";
import type { CSSProperties } from "react";
import type { Position } from "@xyflow/react";
import type { GhostNode as GhostNodeType } from "./ghost/ghost.types";
import GhostNode from "./ghost/GhostNode";

export const nodeTypes = {
  // cooperation model
  actor: ActorNode,
  transaction: TransactionNode,
  transactor: TransactorNode,
  self_activation: SelfActivationNode,
  composite: CompositeNode,
  elementary_actor: ElementaryActorNode,
  several_actors: SeveralActorsNode,

  // transaction pattern diagram
  transaction_time: TransactionTimeNode,
  transaction_kind: TransactionKindNode,
  //
  initiation_fact: InitiationFactNode,
  c_fact: CFactNode,
  c_act: CActNode,
  tk_execution: TKExecutionNode,

  // object fact diagram
  production_event: ProductionEventNode,
  entity_class: EntityClassNode,
  derived_entity: DerivedEntityNode,

  // misc
  text: TextNode,
  ghost: GhostNode,
};

export type DEMONode =
  | CooperationModelNode
  | ObjectFactDiagramNode
  | ProcessStructureDiagramNode
  | TextNodeType
  | GhostNodeType;

export type ColorType = "default" | string;

export type DEMOHandle = { id: string; type?: string; style?: CSSProperties };

export type DEMOHandlePosition = Position;

export type SubModel =
  | "cooperation_model"
  | "object_fact_diagram"
  | "process_structure_diagram";

export type DEMOHandlesPositionData = {
  handles?: DEMOHandle[];
  max?: number;
  offset?: number;
  step?: number;
};

export type DEMOHandlesData = {
  top?: DEMOHandlesPositionData;
  bottom?: DEMOHandlesPositionData;
  left?: DEMOHandlesPositionData;
  right?: DEMOHandlesPositionData;
  isVisible: boolean;
};

export type DEMONodeBaseData<T extends SubModel> = {
  handles: DEMOHandlesData;
  subModel: T;
  fontSize?: string;
  color?: string;
  content?: string;
};
