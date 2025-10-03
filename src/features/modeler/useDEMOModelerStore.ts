import { create } from "zustand";
import { temporal } from "zundo";
import {
  addEdge as _addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type ReactFlowInstance,
  type Viewport,
  reconnectEdge,
  type OnReconnect,
  type FinalConnectionState,
  type HandleType,
  Position,
  isEdge,
  isNode,
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode, DEMOHandle, NodeScope } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";
import type { DEMOEdge } from "../edges/edges.types";
import type { CSSProperties } from "react";
import getEdgeType from "./utils/getEdgeType";
import getMarkerType from "./utils/getMarkerType";
import type { ReactStyleStateSetter } from "$/shared/types/react.types";
import getEdgeData from "./utils/getEdgeData";
import { sortNodes } from "$/shared/utils/sortNodes";
import throttle from "$/shared/utils/throttle";
import { updateHelperLines } from "../helper_lines/useHelperLinesStore";
import type { CooperationModelNode } from "../nodes/cooperation_model/cooperationModel.types";

type ModelerAction = "attach" | "preview" | "select" | "pan" | "edit" | null;
export interface DEMOModelerState {
  id: string;
  fileName: string;
  nodes: DEMONode[];
  edges: DEMOEdge[];
  action: ModelerAction;
  isEnabled: boolean;
  isGridVisible: boolean;
  isGridSnapEnabled: boolean;
  DEMOInstance: null | ReactFlowInstance<DEMONode, DEMOEdge>;
}

export const useDEMOModelerStore = create<DEMOModelerState>()(
  temporal(
    (set, get) => ({
      id: uuid(),
      fileName: `DEMO Model_${new Date().toISOString()}`,
      nodes: initialNodes,
      edges: initialEdges,
      DEMOInstance: null,
      action: "edit",
      isGridVisible: true,
      isGridSnapEnabled: true,
      isEnabled: true,
    }),
    {
      handleSet: (handleSet) =>
        throttle((state) => {
          handleSet(state);
        }, 1000),
      onSave: (state) => {
        console.log("Saved");
      },
      partialize: (state) => {
        const { nodes, edges } = state;
        const savedNodes = nodes.map((node) => {
          const { selected, ...restNode } = node;
          return { ...restNode };
        });
        const savedEdges = edges.map((edge) => {
          const { selected, ...restEdge } = edge;
          return { ...restEdge };
        });
        return {
          nodes: savedNodes,
          edges: savedEdges,
        };
      },
    }
  )
);

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

export const getNode = (id: string) => {
  return useDEMOModelerStore
    .getState()
    .nodes.filter((node) => node.id === id)[0];
};

export const getEdge = (id: string) => {
  return useDEMOModelerStore
    .getState()
    .edges.filter((edge) => edge.id === id)[0];
};

export const updateNodeData = <T extends DEMONode>(
  id: string,
  newData: ReactStyleStateSetter<Partial<T["data"]>>
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
    })
  );
};

export const updateNode = <T extends DEMONode>(
  id: string,
  newNode: ReactStyleStateSetter<Partial<T>>
) => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id !== id) return node;
      const isTypedNode = isNode<T>(node);
      if (!isTypedNode) return node;
      const _newNode = typeof newNode === "object" ? newNode : newNode(node);
      return { ...node, ..._newNode };
    })
  );
};

export const updateEdge = <T extends DEMOEdge>(
  id: string,
  newEdge: ReactStyleStateSetter<Partial<T>>
) => {
  setEdges((edges) =>
    edges.map((edge) => {
      if (edge.id !== id) return edge;
      const isTypedEdge = isEdge<T>(edge);
      if (!isTypedEdge) return edge;
      const _newEdge = typeof newEdge === "object" ? newEdge : newEdge(edge);
      return { ...edge, ..._newEdge };
    })
  );
};

export const updateEdgeData = <T extends DEMOEdge>(
  id: string,
  newEdgeData: ReactStyleStateSetter<Partial<T["data"]>>
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
    })
  );
};

export const deleteEdge = (id: string) => {
  setEdges((edges) => edges.filter((edge) => edge.id !== id));
};

export const clearModel = () => {
  setEdges([]);
  setNodes([]);
};

export const onNodesChange: OnNodesChange<DEMONode> = (changes) => {
  useDEMOModelerStore.setState((state) => {
    const updatedChanges = updateHelperLines(changes, state.nodes);
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

export const setDEMOInstance = (
  DEMOInstance: ReactFlowInstance<DEMONode, DEMOEdge>
) => {
  useDEMOModelerStore.setState(() => ({ DEMOInstance }));
};

export const onReconnectEnd = (
  event: MouseEvent | TouchEvent,
  edge: DEMOEdge,
  handleType: HandleType,
  connectionState: FinalConnectionState
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
      nodes
    );
  });
};

export const addNode = (node: DEMONode | DEMONode[]) => {
  useDEMOModelerStore.setState((state) => {
    // create copy of nodes
    const newNodes = [...state.nodes]
      // add either node or array of nodes
      .concat(Array.isArray(node) ? node : [node])
      // sort nodes
      .sort(sortNodes);
    return { nodes: newNodes };
  });
};

export const addEdge = (edge: DEMOEdge) => {
  useDEMOModelerStore.setState((state) => ({
    edges: _addEdge(edge, state.edges),
  }));
};

export const onConnect: OnConnect = (connection) => {
  const sourceNode = getNode(connection.source);
  const targetNode = getNode(connection.target);
  const type = getEdgeType(sourceNode.type, targetNode.type);
  const marker = getMarkerType(sourceNode.type, targetNode.type);
  const data = getEdgeData(type);
  const newEdge: DEMOEdge = {
    ...connection,
    id: `${sourceNode.type}_${connection.sourceHandle}->${sourceNode.type}_${connection.targetHandle}`,
    type,
    data: {
      ...data,
      markerMid: marker.markerMid,
    },
    markerStart: marker.markerStart,
    markerEnd: marker.markerEnd,
  };
  addEdge(newEdge);
};

export const onReconnect: OnReconnect = (oldEdge, newConnection) => {
  const sourceNode = getNode(newConnection.source);
  const targetNode = getNode(newConnection.target);
  const reconnectedEdges = reconnectEdge<DEMOEdge>(
    oldEdge,
    newConnection,
    useDEMOModelerStore.getState().edges
  );
  const newEdge = reconnectedEdges.find(
    (edge) =>
      edge.source === newConnection.source &&
      edge.target === newConnection.target
  );
  const newEdges = reconnectedEdges.map((edge) => {
    if (newEdge?.id !== edge.id) return edge;
    const marker = getMarkerType(sourceNode.type, targetNode.type);
    const type = getEdgeType(sourceNode.type, targetNode.type);
    const _newEdge: DEMOEdge = {
      ...edge,
      data: {
        ...edge.data,
        markerMid: marker.markerMid,
      },
      type,
      markerStart: marker.markerStart,
      markerEnd: marker.markerEnd,
    };
    return _newEdge;
  });
  useDEMOModelerStore.setState(() => ({
    edges: newEdges,
  }));
};

export const updateNodeColor = (id: string, color: string) => {
  updateNodeData(id, { color });
};

export const updateNodeState = (
  id: string,
  state: CooperationModelNode["data"]["state"]
) => {
  updateNodeData(id, { state });
};

export const updateNodeScope = (id: string, scope: NodeScope) => {
  updateNodeData(id, { scope });
};

export const updateNodeBorderVisibility = (
  id: string,
  isBorderVisible: ReactStyleStateSetter<boolean>
) => {
  updateNodeData(id, { isBorderVisible });
};

export const updateNodeTextAlign = (
  id: string,
  textAlign: "start" | "center" | "end"
) => {
  updateNodeData(id, { textAlign });
};

export const updateNodeFontSize = (
  id: string,
  fontSize: CSSProperties["fontSize"]
) => {
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

export const updateNodeHandlesVisibility = (
  id: string,
  isVisible: ReactStyleStateSetter<boolean>
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
  isSnapEnabled: ReactStyleStateSetter<boolean>
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
  newHandles: ReactStyleStateSetter<DEMOHandle[]>
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

export const updateNodeEditable = (
  id: string,
  isEditable: ReactStyleStateSetter<boolean>
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
  isDraggable: ReactStyleStateSetter<boolean>
) => {
  updateNode(id, (node) => ({
    draggable:
      node.draggable &&
      (typeof isDraggable === "boolean"
        ? isDraggable
        : isDraggable(node.draggable)),
  }));
};
