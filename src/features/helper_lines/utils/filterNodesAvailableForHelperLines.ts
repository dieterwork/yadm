import type { DEMONode } from "$/features/nodes/nodes.types";

const cooperationModelAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "transaction_time",
  "production_event",
  "entity_class",
  "derived_entity",
];

const transactionTimeAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "transaction_time",
  "production_event",
  "entity_class",
  "derived_entity",
];

const objectFactDiagramAvailableNodes: DEMONode["type"][] = [
  "tk_execution",
  "c_fact",
  "c_act",
  "initiation_fact",
  "tk_execution",
  "transaction_time",
];

const processStructureDiagramAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "transaction_time",
  "production_event",
  "entity_class",
  "derived_entity",
];

const textAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "transaction_time",
  "production_event",
  "entity_class",
  "derived_entity",
  "tk_execution",
  "text",
  "c_fact",
  "c_act",
  "initiation_fact",
  "tk_execution",
];

const organizationAvailableNodes: DEMONode["type"][] = [
  "actor",
  "transaction",
  "transactor",
  "self_activation",
  "composite",
  "elementary_actor",
  "several_actors",
  "transaction_time",
  "production_event",
  "entity_class",
  "derived_entity",
  "tk_execution",
  "text",
  "c_fact",
  "c_act",
  "initiation_fact",
  "tk_execution",
  "transaction_time",
  "organization",
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
  transaction_time: transactionTimeAvailableNodes,
  initiation_fact: objectFactDiagramAvailableNodes,
  c_act: objectFactDiagramAvailableNodes,
  c_fact: objectFactDiagramAvailableNodes,
  tk_execution: objectFactDiagramAvailableNodes,
  production_event: processStructureDiagramAvailableNodes,
  entity_class: processStructureDiagramAvailableNodes,
  derived_entity: processStructureDiagramAvailableNodes,
  text: textAvailableNodes,
  transaction_kind: null,
  ghost: null,
  organization: organizationAvailableNodes,
};

export default function filterNodesAvailableForHelperLines(
  nodeA: DEMONode,
  nodeB: DEMONode
): boolean {
  const availableNodeBArray = availableNodesMap[nodeA.type];
  if (!availableNodeBArray) return false;
  if (availableNodeBArray.includes(nodeB.type)) {
    return true;
  }
  return false;
}
