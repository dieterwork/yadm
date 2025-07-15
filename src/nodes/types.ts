import type { Node, BuiltInNode, NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import type { DEMOObjectType } from "../features/DEMO_objects/types";
import DEMOObjectNode from "./DEMOObjectNode";
import ActorNode from "../features/DEMO_objects/actor/ActorNode";
import TransactorNode from "../features/DEMO_objects/transactor/TransactorNode";
import TransactionNode from "../features/DEMO_objects/transaction/TransactionNode";

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type DEMOObjectNode = Node<{ type: DEMOObjectType }, "demo-object">;
export type ActorNode = Node<{ state: ActorState }, "actor">;
export type TransactionNode = Node<{ state: TransactionState }, "transaction">;
export type TransactorNode = Node<{ state: TransactorState }, "transactor">;
export type AppNode =
  | BuiltInNode
  | PositionLoggerNode
  | ActorNode
  | TransactionNode
  | TransactorNode;
export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  actor: ActorNode,
  transaction: TransactionNode,
  transactor: TransactorNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

// Scope
type Scope = "in" | "out";

// States

// Cooperation Model

// States
type ActorState = "default" | "unclear" | "missing";
type TransactionState = "default" | "unclear" | "missing" | "double";
type TransactorState = "internal" | "external";
type CompositeCTARState = "internal" | "external";
type ElementaryActorCTARState = "internal" | "external";
type SeveralActorsCTAR = "internal" | "external";
