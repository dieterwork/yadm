import type { DEMOEdge } from "$/features/edges/edges.types";
import uuid from "$/shared/utils/uuid";
import type { DEMONode } from "../../nodes/nodes.types";

export const getDisabledNodes = (
  selectedNodes: DEMONode[],
  disabledNodeTypes?: DEMONode["type"][]
) => {
  if (!disabledNodeTypes) return selectedNodes;
  return selectedNodes.filter((node) => {
    return disabledNodeTypes.some((type) => node.type === type);
  });
};

export const showDisabledNodesError = (disabledNodes: DEMONode[]) => {
  return disabledNodes.map((node) =>
    console.error(`Cannot copy node type ${node.type}`)
  );
};

export const updateNodeWithNewHandleIds = (node: DEMONode) => {
  if (!("handles" in node.data)) {
    return node;
  }
  return {
    ...node,
    data: {
      ...node.data,
      handles: {
        ...node.data.handles,
        bottom: {
          ...node.data.handles?.bottom,
          handles: node.data.handles?.bottom?.handles?.map((handle) => ({
            ...handle,
            id: uuid(),
          })),
        },
        top: {
          ...node.data.handles?.top,
          handles: node.data.handles?.top?.handles?.map((handle) => ({
            ...handle,
            id: uuid(),
          })),
        },
        left: {
          ...node.data.handles?.left,
          handles: node.data.handles?.left?.handles?.map((handle) => ({
            ...handle,
            id: uuid(),
          })),
        },
        right: {
          ...node.data.handles?.right,
          handles: node.data.handles?.right?.handles?.map((handle) => ({
            ...handle,
            id: uuid(),
          })),
        },
      },
    },
  };
};

export const createNodeIdMap = (nodes: DEMONode[]) => {
  const nodeIdMap = new Map<string, string>();
  for (const node of nodes) {
    const newId = uuid();
    nodeIdMap.set(node.id, newId);
  }
  return nodeIdMap;
};

export const createEdgeIdMap = (edges: DEMOEdge[]) => {
  const edgeIdMap = new Map<string, string>();
  for (const edge of edges) {
    const newId = uuid();
    edgeIdMap.set(edge.id, newId);
  }
  return edgeIdMap;
};

export const getMinCoords = (nodes: DEMONode[]) => {
  const minX = Math.min(
    ...nodes.filter((node) => !node.parentId).map((node) => node.position.x)
  );
  const minY = Math.min(
    ...nodes.filter((node) => !node.parentId).map((node) => node.position.y)
  );
  return [minX, minY];
};

export const createNewHandles = (
  edge: DEMOEdge,
  oldSourceNode: DEMONode,
  oldTargetNode: DEMONode,
  newSourceNode: DEMONode,
  newTargetNode: DEMONode
) => {
  if (
    !("handles" in oldSourceNode.data) ||
    !("handles" in oldTargetNode.data) ||
    !("handles" in newSourceNode.data) ||
    !("handles" in newTargetNode.data) ||
    !oldSourceNode.data.handles ||
    !oldTargetNode.data.handles ||
    !newSourceNode.data.handles ||
    !newTargetNode.data.handles
  ) {
    return {
      sourceHandle: undefined,
      targetHandle: undefined,
    };
  }

  const oldSourceNodeHandleIds = createHandleIds(oldSourceNode);
  const oldTargetNodeHandleIds = createHandleIds(oldTargetNode);

  const newSourceNodeHandleIds = createHandleIds(newSourceNode);
  const newTargetNodeHandleIds = createHandleIds(newTargetNode);

  const oldSourceHandleIndex = oldSourceNodeHandleIds.findIndex(
    (id) => id === edge.sourceHandle
  );
  const oldTargetHandleIndex = oldTargetNodeHandleIds.findIndex(
    (id) => id === edge.targetHandle
  );

  const newSourceHandle = newSourceNodeHandleIds[oldSourceHandleIndex];
  const newTargetHandle = newTargetNodeHandleIds[oldTargetHandleIndex];

  return {
    sourceHandle: newSourceHandle,
    targetHandle: newTargetHandle,
  };
};

const createHandleIds = (node: DEMONode) => {
  if (!("handles" in node.data) || !node.data.handles) return [];
  return (
    Object.entries(node.data.handles)
      .filter(([key]) => {
        return key !== "isVisible";
      })
      // sort alphabetically so always in same order in case object property positions are different
      .sort((a, b) => {
        return a[0].toLocaleLowerCase().localeCompare(b[0].toLocaleLowerCase());
      })
      .flatMap(([key, value]) => {
        if (typeof value === "boolean") return "";
        return value.handles?.map((h) => h.id) ?? "";
      })
  );
};
