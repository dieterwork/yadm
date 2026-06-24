import ActorNode from "./cooperation_model/actor/ActorNode";
import TransactionNode from "./cooperation_model/transaction/TransactionNode";
import TransactorNode from "./cooperation_model/transactor/TransactorNode";
import SelfActivationNode from "./cooperation_model/self_activation/SelfActivationNode";
import CompositeNode from "./cooperation_model/composite/CompositeNode";
import ElementaryActorNode from "./cooperation_model/elementary_actor/ElementaryActorNode";
import SeveralActorsNode from "./cooperation_model/several_actors/SeveralActorsNode";
import ProductionEventNode from "./object_fact_diagram/production_event/ProductionEventNode";
import TransactionKindNode from "./process_structure_diagram/transaction_kind/TransactionKindNode";
import CFactNode from "./process_structure_diagram/c_fact/CFactNode";
import InitiationFactNode from "./process_structure_diagram/initiation_fact/InitiationFactNode";
import CActNode from "./process_structure_diagram/c_act/CActNode";
import TKExecutionNode from "./process_structure_diagram/tk_execution/TKExecutionNode";
import TransactionTimeNode from "./process_structure_diagram/transaction_time/TransactionTimeNode";
import TextNode from "./text/TextNode";
import OrganizationNodeComponent from "./organization/OrganizationNode";
import WhiteboardNodeComponent from "./whiteboard/WhiteboardNode";
import GhostNode from "./ghost/GhostNode";

import type { ProcessStructureDiagramNode } from "./process_structure_diagram/processStructureDiagram.types";
import type { ObjectFactDiagramNode } from "./object_fact_diagram/objectFactDiagram.types";
import type { TextNode as TextNodeType } from "./text/textNode.types";
import type { CSSProperties } from "react";
import type { Node, Position } from "@xyflow/react";
import type { GhostNode as GhostNodeType } from "./ghost/ghost.types";
import type { CooperationModelNode } from "./cooperation_model/cooperationModel.types";
import type { NodeToolbarAction } from "./DEMONodeBase";
import type { Points } from "../whiteboard/types/whiteboard.types";
import SetNode from "./object_fact_diagram/set/SetNode";
import EntityTypeNode from "./object_fact_diagram/entity_type/EntityTypeNode";
import AttributeNode from "./object_fact_diagram/attribute/AttributeNode";
import MultipleTransactionKindComponent from "./cooperation_model/multiple_transaction_kind/MultipleTransactionKindComponent";

export const nodeTypes = {
  // cooperation model
  actor: ActorNode,
  transaction: TransactionNode,
  transactor: TransactorNode,
  self_activation: SelfActivationNode,
  composite: CompositeNode,
  elementary_actor: ElementaryActorNode,
  several_actors: SeveralActorsNode,
  multiple_transaction_kind: MultipleTransactionKindComponent,

  // transaction pattern diagram
  transaction_time: TransactionTimeNode,
  transaction_kind: TransactionKindNode,
  initiation_fact: InitiationFactNode,
  c_fact: CFactNode,
  c_act: CActNode,
  tk_execution: TKExecutionNode,

  // object fact diagram
  production_event: ProductionEventNode,
  set: SetNode,
  entity_type: EntityTypeNode,
  attribute: AttributeNode,

  // misc
  text: TextNode,
  ghost: GhostNode,
  organization: OrganizationNodeComponent,
  whiteboard: WhiteboardNodeComponent,
};

export type DEMONode =
  | CooperationModelNode
  | ObjectFactDiagramNode
  | ProcessStructureDiagramNode
  | TextNodeType
  | GhostNodeType
  | OrganizationNode
  | WhiteboardNodeType;

export type DEMOHandle = {
  id: string;
  offset: number;
  type?: string;
  style?: CSSProperties;
  canDrag?: boolean;
  derivation?: "aggregation" | "generalisation" | "none";
};

export type DEMOHandlePosition = Position;

export type DEMONodeContent = {
  header: string;
  body: string;
};

export type SubModel =
  | "cooperation_model"
  | "object_fact_diagram"
  | "process_structure_diagram";

export type DEMOHandlesPositionData = {
  handles?: DEMOHandle[];
  max?: number;
  step?: number;
  // for objectFactDiagram
  derivation?: "aggregation" | "generalisation" | "none";
};

export type DEMOHandlesData = {
  top?: DEMOHandlesPositionData;
  bottom?: DEMOHandlesPositionData;
  left?: DEMOHandlesPositionData;
  right?: DEMOHandlesPositionData;
  isVisible?: boolean;
};

export type DEMONodeBaseData<T extends SubModel> = {
  handles?: DEMOHandlesData;
  subModel: T;
  fontSize?: string;
  color?: string;
  content?: Partial<DEMONodeContent>;
  isEditable?: boolean;
  actions?: NodeToolbarAction[];
};

// Focus
export const ALL_NODE_FOCUS_OPTIONS = ["in", "out"] as const;
export type NodeFocus = (typeof ALL_NODE_FOCUS_OPTIONS)[number];

// Organization
export type OrganizationState = "default" | "missing";
export type OrganizationNode = Node<
  {
    state: OrganizationState;
    actions?: NodeToolbarAction[];
  },
  "organization"
>;

export type WhiteboardNodeType = Node<{
  points: Points;
  color: string;
  initialSize: { width: number; height: number };
}>;

export type MultipleTransactionKindState = "default" | "unclear" | "missing";
export type MultipleTransactionKindNode = Node<
  {
    state: MultipleTransactionKindState;
    focus: NodeFocus;
  } & DEMONodeBaseData<"cooperation_model">,
  "multiple_transaction_kind"
>;
