import { create } from "zustand";
import {
  addEdge as _addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type HandleType,
  isEdge,
  isNode,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type OnNodesDelete,
  type OnReconnect,
  Position,
  reconnectEdge,
  type Viewport,
} from "@xyflow/react";

import type { DEMOHandle, DEMONode, NodeScope } from "../../nodes/nodes.types";
import uuid from "../../../shared/utils/uuid";
import type { DEMOEdge } from "../../edges/edges.types";
import getEdgeType from "../utils/getEdgeType";
import getMarkerType from "../utils/getMarkerType";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import getEdgeData from "../utils/getEdgeData";
import { sortNodes } from "$/shared/utils/sortNodes";
import { updateHelperLinesFromNodeChanges } from "../../helper_lines/useHelperLinesStore";
import type { CooperationModelNode } from "../../nodes/cooperation_model/cooperationModel.types";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import takeSnapshotAndSave from "../../actions/undo/takeSnapshotAndSave";
import takeWhiteboardSnapshotAndSave from "$/features/whiteboard/utils/takeWhiteboardSnapshotAndSave";

export type ModelerAction =
  | "attach"
  | "preview"
  | "select"
  | "pan"
  | "edit"
  | "draw"
  | null;

export interface DEMOModelerState {
  id: string;
  fileName: string;
  nodes: DEMONode[];
  edges: DEMOEdge[];
  action: ModelerAction | null;
  isEnabled: boolean;
  isExportEnabled: boolean;
  isGridVisible: boolean;
  isGridSnapEnabled: boolean;
  isHandleEditModeEnabled: boolean;
  isWhiteboardEnabled: boolean;
  viewport: Viewport;
}

const localDEMOModelJSON = localStorage.getItem("yadm-model");
const localDEMOModel: DEMOModelJSON | null = localDEMOModelJSON
  ? JSON.parse(localDEMOModelJSON)
  : null;
console.log(
  localDEMOModel
    ? `[Loaded version ${localDEMOModel?.version}]`
    : "[Loaded version 1.0]",
);

export const useDEMOModelerStore = create<DEMOModelerState>()((set, get) => ({
  id: uuid(),
  fileName: localDEMOModel?.fileName ?? `New Model`,
  nodes: localDEMOModel?.nodes ?? [],
  edges: localDEMOModel?.edges ?? [],
  action: "pan",
  isGridVisible: true,
  isGridSnapEnabled: true,
  isEnabled: localDEMOModel?.isEnabled ?? true,
  isExportEnabled: false,
  isHandleEditModeEnabled: false,
  isWhiteboardEnabled: false,
  viewport: localDEMOModel?.viewport ?? { x: 0, y: 0, zoom: 1 },
}));

export const setNodes = (newNodes: ReactStyleStateSetter<DEMONode[]>) => {
  useDEMOModelerStore.setState((state) => ({
    nodes: Array.isArray(newNodes) ? newNodes : newNodes(state.nodes),
  }));
};

export const setEdges = (newEdges: ReactStyleStateSetter<DEMOEdge[]>) => {
  useDEMOModelerStore.setState((state) => ({
    edges: Array.isArray(newEdges) ? newEdges : newEdges(state.edges),
  }));
};

export const setViewport = (newViewport: ReactStyleStateSetter<Viewport>) => {
  useDEMOModelerStore.setState((state) => ({
    viewport:
      typeof newViewport === "object"
        ? newViewport
        : newViewport(state.viewport),
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNode = (
  id: string,
  filter?: (node: DEMONode, index: number, array: DEMONode[]) => boolean,
) => {
  return useDEMOModelerStore
    .getState()
    .nodes.find(
      (node, index, array) =>
        node.id === id && (filter ? filter(node, index, array) : true),
    );
};

export const getEdge = (id: string) => {
  return useDEMOModelerStore.getState().edges.find((edge) => edge.id === id);
};

export const updateNodeData = <T extends DEMONode>(
  id: string,
  newData: ReactStyleStateSetter<Partial<T["data"]>>,
) => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id !== id) return node;
      const isTypedNode = isNode<T>(node);
      if (!isTypedNode) return node;
      const data =
        typeof newData === "object"
          ? newData
          : node?.data
            ? newData(node.data)
            : undefined;
      return { ...node, data: { ...node.data, ...data } };
    }),
  );
};

export const updateNode = <T extends DEMONode>(
  id: string,
  newNode: ReactStyleStateSetter<Partial<T>>,
) => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id !== id) return node;
      const isTypedNode = isNode<T>(node);
      if (!isTypedNode) return node;
      const _newNode = typeof newNode === "object" ? newNode : newNode(node);
      return { ...node, ..._newNode };
    }),
  );
};

export const updateEdge = <T extends DEMOEdge>(
  id: string,
  newEdge: ReactStyleStateSetter<Partial<T>>,
) => {
  setEdges((edges) =>
    edges.map((edge) => {
      if (edge.id !== id) return edge;
      const isTypedEdge = isEdge<T>(edge);
      if (!isTypedEdge) return edge;
      const _newEdge = typeof newEdge === "object" ? newEdge : newEdge(edge);
      return { ...edge, ..._newEdge };
    }),
  );
};

export const updateEdgeData = <T extends DEMOEdge>(
  id: string,
  newEdgeData: ReactStyleStateSetter<Partial<T["data"]>>,
) => {
  setEdges((edges) =>
    edges.map((edge) => {
      if (edge.id !== id) return edge;
      const isTypedEdge = isEdge<T>(edge);
      if (!isTypedEdge) return edge;
      const data =
        typeof newEdgeData === "object"
          ? newEdgeData
          : edge.data
            ? newEdgeData(edge.data)
            : undefined;
      return { ...edge, data: { ...edge.data, ...data } };
    }),
  );
};

export const clearModel = () => {
  setEdges([]);
  setNodes([]);
  setFileName(`New model`);
};

export const onNodesChange: OnNodesChange<DEMONode> = (changes) => {
  useDEMOModelerStore.setState((state) => {
    const updatedChanges = updateHelperLinesFromNodeChanges(
      changes,
      state.nodes,
      state.edges,
    );
    return {
      nodes: applyNodeChanges(updatedChanges, state.nodes),
    };
  });
};

export const onEdgesChange: OnEdgesChange<DEMOEdge> = (changes) => {
  useDEMOModelerStore.setState((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  }));
};

export const onReconnectEnd = (
  event: MouseEvent | TouchEvent,
  edge: DEMOEdge,
  handleType: HandleType,
) => {
  if (handleType === "source") {
    setNodes((nodes) => {
      return nodes.filter((node) => {
        const isGhost = node.type === "ghost";
        const isTarget = node.id === edge.target;

        return !(isGhost && isTarget);
      });
    });

    setEdges((edges) => edges.filter((_edge) => _edge.id !== edge.id));
  }
};

export const onEdgesDelete = (deletedEdges: DEMOEdge[]) => {
  setNodes((nodes) => {
    return deletedEdges.reduce(
      (accNodes, edge) =>
        accNodes.filter((node) => {
          const isGhost = node.type === "ghost";
          const isSourceOrTarget =
            node.id === edge.source || node.id === edge.target;

          return !(isGhost && isSourceOrTarget);
        }),
      nodes,
    );
  });
  takeSnapshotAndSave();
};

export const addNode = (node: DEMONode | DEMONode[]) => {
  useDEMOModelerStore.setState((state) => {
    // create copy of nodes
    const newNodes = [...state.nodes]
      // add either node or array of nodes
      .concat(Array.isArray(node) ? node : [node]);
    // sort nodes
    const sortedNodes = newNodes.sort((a, b) => sortNodes(a, b, newNodes));
    return { nodes: sortedNodes };
  });
};

export const addEdge = (edge: DEMOEdge) => {
  useDEMOModelerStore.setState((state) => ({
    edges: _addEdge(edge, state.edges),
  }));
};

export const onConnect: OnConnect = (connection) => {
  const isHandleEditModeEnabled =
    useDEMOModelerStore.getState().isHandleEditModeEnabled;
  if (isHandleEditModeEnabled) return;
  const sourceNode = getNode(connection.source);
  const targetNode = getNode(connection.target);
  const type = getEdgeType(sourceNode?.type, targetNode?.type, "initial");
  const marker = getMarkerType(sourceNode?.type, targetNode?.type, "initial");
  const data = getEdgeData(type);
  const newEdge = {
    ...connection,
    id: `${sourceNode?.type ?? "node"}_${connection.sourceHandle}->${targetNode?.type ?? "node"}_${connection.targetHandle}`,
    type,
    data: {
      ...data,
      markerMid: marker.markerMid,
    },
    markerStart: marker.markerStart,
    markerEnd: marker.markerEnd,
    zIndex: 110,
    deletable: true,
  } satisfies DEMOEdge;

  takeSnapshotAndSave();
  addEdge(newEdge);
};

export const onReconnect: OnReconnect = (oldEdge, newConnection) => {
  const sourceNode = getNode(newConnection.source);
  const targetNode = getNode(newConnection.target);
  const reconnectedEdges = reconnectEdge<DEMOEdge>(
    oldEdge as DEMOEdge,
    newConnection,
    useDEMOModelerStore.getState().edges,
  );
  const newEdge = reconnectedEdges.find(
    (edge) =>
      edge.source === newConnection.source &&
      edge.target === newConnection.target,
  );
  const newEdges = reconnectedEdges.map((edge) => {
    if (newEdge?.id !== edge.id) return edge;
    const marker = getMarkerType(sourceNode.type, targetNode.type);
    const type = getEdgeType(sourceNode.type, targetNode.type);
    const data = getEdgeData(type, edge.data);

    return {
      ...edge,
      id: `${type ?? "edge"}_${uuid()}`,
      data: {
        ...edge.data,
        ...data,
        markerMid: marker.markerMid,
        center: undefined,
      },

      markerStart: marker.markerStart,
      markerEnd: marker.markerEnd,
      type,
      zIndex: 110,
      deletable: true,
    } satisfies DEMOEdge;
  });
  useDEMOModelerStore.setState(() => ({
    edges: newEdges,
  }));
  takeSnapshotAndSave();
};

export const updateNodeColor = (id: string, color: string) => {
  updateNodeData(id, { color });
};

export const updateNodeState = (
  id: string,
  state: CooperationModelNode["data"]["state"],
) => {
  updateNodeData(id, { state });
};

export const updateNodeScope = (id: string, scope: NodeScope) => {
  updateNodeData(id, { scope });
};

export const updateNodeBorderVisibility = (
  id: string,
  isBorderVisible: ReactStyleStateSetter<boolean>,
) => {
  updateNodeData(id, { isBorderVisible });
};

export const updateNodeTextAlign = (
  id: string,
  textAlign: "start" | "center" | "end",
) => {
  updateNodeData(id, { textAlign });
};

export const updateNodeFontSize = (id: string, fontSize: number) => {
  updateNodeData(id, { fontSize });
};
export const updateNodeContent = (id: string, content: string) => {
  updateNodeData(id, { content });
};

export const setAction = (action: ModelerAction) => {
  useDEMOModelerStore.setState(() => ({ action }));
};

export const setFileName = (fileName: string) => {
  useDEMOModelerStore.setState(() => ({ fileName }));
};

export const setEnabled = (isEnabled: ReactStyleStateSetter<boolean>) => {
  useDEMOModelerStore.setState((state) => ({
    isEnabled:
      typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
  }));
};

export const toggleLock = (isEnabled: ReactStyleStateSetter<boolean>) => {
  useDEMOModelerStore.setState((state) => ({
    isEnabled:
      typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
    nodes: state.nodes.map((node) => ({
      ...node,
      draggable:
        typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
      selected:
        typeof isEnabled === "boolean"
          ? isEnabled
            ? node.selected
            : false
          : isEnabled(state.isEnabled)
            ? node.selected
            : false,
      selectable:
        typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
    })),
    edges: state.edges.map((edge) => ({
      ...edge,
      draggable:
        typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
      selected:
        typeof isEnabled === "boolean"
          ? isEnabled
            ? edge.selected
            : false
          : isEnabled(state.isEnabled)
            ? edge.selected
            : false,
      selectable:
        typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.isEnabled),
    })),
  }));
  if (useDEMOModelerStore.getState().action !== "pan") setAction("pan");
};

export const updateNodeHandlesVisibility = (
  id: string,
  isVisible: ReactStyleStateSetter<boolean>,
) => {
  updateNodeData(id, (data) => ({
    handles: {
      ...data?.handles,
      isVisible:
        typeof isVisible === "boolean"
          ? isVisible
          : isVisible(data.handles.isVisible),
    },
  }));
};

export const setGridVisible = (isVisible: ReactStyleStateSetter<boolean>) => {
  useDEMOModelerStore.setState((state) => ({
    isGridVisible:
      typeof isVisible === "boolean"
        ? isVisible
        : isVisible(state.isGridVisible),
  }));
};

export const setGridSnapEnabled = (
  isSnapEnabled: ReactStyleStateSetter<boolean>,
) => {
  useDEMOModelerStore.setState((state) => ({
    isGridSnapEnabled:
      typeof isSnapEnabled === "boolean"
        ? isSnapEnabled
        : isSnapEnabled(state.isGridSnapEnabled),
  }));
};

export const updateNodeHandles = (
  id: string,
  position: Position,
  newHandles: ReactStyleStateSetter<DEMOHandle[]>,
) => {
  updateNodeData(id, (data) => {
    return {
      handles: {
        ...data.handles,
        [position]: {
          ...data.handles[position],
          handles:
            typeof newHandles === "object"
              ? newHandles
              : newHandles(data.handles[position]?.handles),
        },
      },
    };
  });
};

export const updateNodeHandle = (
  id: string,
  handleId: string,
  position: Position,
  newHandle: ReactStyleStateSetter<DEMOHandle>,
) => {
  updateNodeData(id, (data) => {
    if (!("handles" in data) || !data?.handles) return data;
    if (!(position in data.handles)) return data;
    return {
      handles: {
        ...data.handles,
        [position]: {
          ...data.handles[position],
          handles: data.handles[position]?.handles?.map((handle) =>
            handle.id === handleId
              ? typeof newHandle === "object"
                ? newHandle
                : newHandle(handle)
              : handle,
          ),
        },
      },
    };
  });
};

export const updateNodeHandleOffset = (
  id: string,
  handleId: string,
  position: Position,
  offset: number,
) => {
  updateNodeHandle(id, handleId, position, (handle) => ({
    ...handle,
    offset,
  }));
};

export const updateNodeEditable = (
  id: string,
  isEditable: ReactStyleStateSetter<boolean>,
) => {
  updateNodeData(id, (data) => ({
    isEditable:
      typeof isEditable === "boolean"
        ? isEditable
        : isEditable(data.isEditable),
  }));
};

export const updateNodeDraggable = (
  id: string,
  isDraggable: ReactStyleStateSetter<boolean>,
) => {
  updateNode(id, (node) => ({
    draggable:
      node.draggable &&
      (typeof isDraggable === "boolean"
        ? isDraggable
        : isDraggable(node.draggable)),
  }));
};

export const setNodesHandlesVisibility = (
  isVisible: ReactStyleStateSetter<boolean>,
) => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (!("handles" in node.data)) return node;
      const newNode: DEMONode = {
        ...node,
        data: {
          ...node.data,
          handles: {
            ...node.data.handles,
            isVisible:
              typeof isVisible === "boolean"
                ? isVisible
                : isVisible(node.data.handles.isVisible),
          },
        },
      };
      return newNode;
    }),
  );
};

export const setExportEnabled = (
  isExportEnabled: ReactStyleStateSetter<boolean>,
) => {
  useDEMOModelerStore.setState((state) => ({
    isExportEnabled:
      typeof isExportEnabled === "boolean"
        ? isExportEnabled
        : isExportEnabled(state.isExportEnabled),
  }));
};

export const setHandleEditModeEnabled = (
  isHandleEditModeEnabled: ReactStyleStateSetter<boolean>,
) => {
  useDEMOModelerStore.setState((state) => ({
    isHandleEditModeEnabled:
      typeof isHandleEditModeEnabled === "boolean"
        ? isHandleEditModeEnabled
        : isHandleEditModeEnabled(state.isHandleEditModeEnabled),
  }));
};

export const onConnectStart = () => {
  const isHandleEditModeEnabled =
    useDEMOModelerStore.getState().isHandleEditModeEnabled;
  if (isHandleEditModeEnabled) return;
};

export const onReconnectStart = () => {};

export const onNodesDelete: OnNodesDelete<DEMONode> = (nodes) => {
  if (nodes.every((node) => node.type === "whiteboard")) {
    takeWhiteboardSnapshotAndSave();
  } else if (nodes.some((node) => node.type === "whiteboard")) {
    // saves twice... TODO
    takeWhiteboardSnapshotAndSave();
    takeSnapshotAndSave();
  } else {
    takeSnapshotAndSave();
  }
};

export const setModel = (model: DEMOModelJSON) => {
  setNodes(model.nodes);
  setEdges(model.edges);
  setFileName(model.fileName);
  setViewport(model.viewport ?? { x: 0, y: 0, zoom: 1 });
  toggleLock(model.isEnabled);
};

export const setWhiteboardVisible = (
  isWhiteboardVisible: ReactStyleStateSetter<boolean>,
) => {
  useDEMOModelerStore.setState((state) => ({
    nodes: state.nodes.map((node) => {
      if (node.type === "whiteboard") {
        return {
          ...node,
          selected: false,
          hidden:
            typeof isWhiteboardVisible === "boolean"
              ? !isWhiteboardVisible
              : isWhiteboardVisible(!node.hidden),
        };
      } else {
        return node;
      }
    }),
  }));
};

export const setWhiteboardEnabled = (
  isWhiteboardEnabled: ReactStyleStateSetter<boolean>,
) => {
  useDEMOModelerStore.setState((state) => ({
    isWhiteboardEnabled:
      typeof isWhiteboardEnabled === "boolean"
        ? isWhiteboardEnabled
        : isWhiteboardEnabled(state.isWhiteboardEnabled),
  }));
};

export const modelSelector = (state: DEMOModelerState) => ({
  nodes: state.nodes,
  edges: state.edges,
  fileName: state.fileName,
  isEnabled: state.isEnabled,
  viewport: state.viewport,
});
