import type { Connection } from "@xyflow/react";
import type { DEMOEdge } from "../../edges/edges.types";
import { getNode } from "../store/useDEMOModelerStore";
import type { DEMONode } from "../../nodes/nodes.types";

const allowedConnectionMap = {
  // cooperation model
  actor: [
    "actor",
    "transaction",
    "transactor",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "multiple_transaction_kind",
    "ghost",
  ],
  transaction: [
    "actor",
    "self_activation",
    "composite",
    "elementary_actor",
    "ghost",
  ],
  transactor: [
    "actor",
    "transaction",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "multiple_transaction_kind",
    "ghost",
  ],
  self_activation: [
    "actor",
    "transaction",
    "transactor",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "multiple_transaction_kind",
    "ghost",
  ],
  composite: [
    "actor",
    "transaction",
    "transactor",
    "self_activation",
    "composite",
    "elementary_actor",
    "several_actors",
    "multiple_transaction_kind",
    "ghost",
  ],
  elementary_actor: [
    "transaction",
    "self_activation",
    "composite",
    "multiple_transaction_kind",
    "ghost",
  ],
  several_actors: [
    "actor",
    "self_activation",
    "composite",
    "multiple_transaction_kind",
    "ghost",
  ],
  multiple_transaction_kind: [
    "actor",
    "self_activation",
    "composite",
    "elementary_actor",
    "ghost",
  ],
  // psd
  transaction_time: [
    "transaction_time",
    "initiation_fact",
    "c_fact",
    "c_act",
    "tk_execution",
    "ghost",
  ],
  initiation_fact: ["initiation_fact", "c_fact", "c_act", "ghost"],
  c_fact: ["initiation_fact", "c_fact", "c_act", "tk_execution", "ghost"],
  c_act: ["initiation_fact", "c_fact", "tk_execution", "ghost"],
  tk_execution: ["c_fact", "c_act", "ghost"],
  // ofd
  production_event: [
    "set",
    "entity_type",
    "production_event",
    "attribute",
    "ghost",
  ],
  set: ["set", "entity_type", "production_event", "attribute", "ghost"],
  entity_type: ["set", "entity_type", "production_event", "attribute", "ghost"],
  attribute: ["set", "entity_type", "production_event", "attribute", "ghost"],
  // misc
  ghost: [
    "actor",
    "c_act",
    "c_fact",
    "composite",
    "entity_type",
    "elementary_actor",
    "set",
    "initiation_fact",
    "production_event",
    "self_activation",
    "several_actors",
    "tk_execution",
    "transaction_time",
    "transactor",
    "attribute",
  ],
} satisfies Omit<
  Record<DEMONode["type"], DEMONode["type"][]>,
  "text" | "transaction_kind"
>;

const isValidConnection = (connection: DEMOEdge | Connection) => {
  const sourceNode = getNode(connection.source);
  const targetNode = getNode(connection.target);
  if (
    !sourceNode ||
    !targetNode ||
    sourceNode.type === "transaction_kind" ||
    sourceNode.type === "text"
  )
    return false;
  const allowedConnections = allowedConnectionMap[sourceNode?.type];
  if (!allowedConnections?.includes(targetNode?.type)) return false;
  return true;
};

export default isValidConnection;
