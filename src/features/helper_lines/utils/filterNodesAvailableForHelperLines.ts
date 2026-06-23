import type { DEMONode } from "$/features/nodes/nodes.types";

const cooperationModelAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "multiple_transaction_kind",
  "transaction_time",
  "production_event",
  "set",
  "entity_type",
];

const transactionTimeAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "multiple_transaction_kind",
  "transaction_time",
  "production_event",
  "set",
  "entity_type",
];

const processStructureDiagramAvailableNodes: DEMONode["type"][] = [
  "tk_execution",
  "c_fact",
  "c_act",
  "initiation_fact",
  "tk_execution",
  "transaction_time",
];

const objectFactDiagramAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "multiple_transaction_kind",
  "transaction_time",
  "production_event",
  "set",
  "entity_type",
  "attribute",
];

const textAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "multiple_transaction_kind",
  "transaction_time",
  "production_event",
  "set",
  "entity_type",
  "tk_execution",
  "text",
  "c_fact",
  "c_act",
  "initiation_fact",
  "tk_execution",
  "attribute",
];

const organizationAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "multiple_transaction_kind",
  "transaction_time",
  "production_event",
  "set",
  "entity_type",
  "tk_execution",
  "text",
  "c_fact",
  "c_act",
  "initiation_fact",
  "tk_execution",
  "transaction_time",
  "organization",
  "attribute",
];

type NodesMapType = Record<DEMONode["type"], DEMONode["type"][] | null>;

const availableNodesMap: NodesMapType = {
  actor: cooperationModelAvailableNodes,
  transaction: cooperationModelAvailableNodes,
  transactor: cooperationModelAvailableNodes,
  self_activation: cooperationModelAvailableNodes,
  composite: cooperationModelAvailableNodes,
  elementary_actor: cooperationModelAvailableNodes,
  several_actors: cooperationModelAvailableNodes,
  multiple_transaction_kind: cooperationModelAvailableNodes,
  transaction_time: processStructureDiagramAvailableNodes,
  initiation_fact: processStructureDiagramAvailableNodes,
  c_act: processStructureDiagramAvailableNodes,
  c_fact: processStructureDiagramAvailableNodes,
  tk_execution: processStructureDiagramAvailableNodes,
  production_event: objectFactDiagramAvailableNodes,
  set: objectFactDiagramAvailableNodes,
  entity_type: objectFactDiagramAvailableNodes,
  attribute: objectFactDiagramAvailableNodes,
  text: textAvailableNodes,
  transaction_kind: null,
  ghost: null,
  organization: organizationAvailableNodes,
};

export default function filterNodesAvailableForHelperLines(
  nodeA: DEMONode,
  nodeB: DEMONode,
): boolean {
  const availableNodeBArray = availableNodesMap[nodeA.type];
  if (!availableNodeBArray) return false;
  if (availableNodeBArray.includes(nodeB.type)) {
    return true;
  }
  return false;
}
