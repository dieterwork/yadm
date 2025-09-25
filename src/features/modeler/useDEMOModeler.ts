import { create } from "zustand";
import { temporal } from "zundo";
import {
  addEdge as _addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type CoordinateExtent,
  type ReactFlowInstance,
  type Viewport,
  type ReactFlowJsonObject,
  type XYPosition,
  reconnectEdge,
  type OnReconnect,
  MarkerType,
  type FinalConnectionState,
  type HandleType,
  type OnConnectEnd,
  useStore,
  useStoreApi,
  type ReactFlowState,
  useReactFlow,
  type Connection,
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode, DEMOHandlesData } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";
import type { DEMOEdge } from "../edges/edges.types";
import type { CSSProperties } from "react";
import { convertAbsoluteToParentRelativePosition } from "../nodes/utils/convertAbsoluteToParentRelativePosition";
import getEdgeType from "./utils/getEdgeType";
import getMarkerType from "./utils/getMarkerType";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

export interface DEMOModelerState {
  id: string;
  fileName: string;
  nodes: DEMONode[];
  edges: DEMOEdge[];
  viewport: Viewport;
  isEnabled: boolean;
  grid: {
    isVisible: boolean;
    isSnapEnabled: boolean;
  };
  createNode: ({
    id,
    type,
    data,
    width,
    height,
    selected,
  }: {
    id?: string;
    type: DEMONode["type"];
    data?: DEMONode["data"];
    width?: string;
    height?: string;
    selected?: boolean;
  }) => DEMONode;
  setEnabled: (isEnabled: ReactStyleStateSetter<boolean>) => void;
  setFileName: (filename: string) => void;
  setNodes: (newNodesOrSetterFn: ReactStyleStateSetter<DEMONode[]>) => void;
  setEdges: (newEdgesOrSetterFn: ReactStyleStateSetter<DEMOEdge[]>) => void;
  DEMOInstance: null | ReactFlowInstance<DEMONode, DEMOEdge>;
  updateNodeColor: (id: string, color: string) => void;
  updateNodeState: (id: string, state: string, type: string) => void;
  updateNodeScope: (id: string, scope: string, type: string) => void;
  addNode: (node: DEMONode) => void;
  addEdge: (edge: Edge) => void;
  getNode: (id: string) => DEMONode | undefined;
  getChildNodes: (id: string) => DEMONode[];
  updateNodeExtent: (id: string, extent: CoordinateExtent) => void;
  getNodeAbsolutePosition: (id: string) => { x: number; y: number };
  updateNodeContent: (id: string, content: string) => void;
  updateNodeFontSize: (id: string, fontSize: number) => void;
  setModelFromJSONObject: (object: ReactFlowJsonObject<DEMONode, Edge>) => void;
  updateNode: (
    id: string,
    data: Partial<DEMONode["data"]>,
    options?: {
      replace: boolean;
    }
  ) => void;
  updateNodeHandles: (
    id: string,
    handles: ReactStyleStateSetter<DEMOHandlesData>
  ) => void;
  updateNodeConnectionHandlesVisibility: (
    id: string,
    isVisible: ReactStyleStateSetter<boolean>
  ) => void;
  updateNodeBorderVisibility: (
    id: string,
    isVisible: ReactStyleStateSetter<boolean>
  ) => void;
  updateNodeTextAlign: (
    id: string,
    textAlign: CSSProperties["textAlign"]
  ) => void;
  connectionLinePath: XYPosition[];
  selectionOnDrag: boolean;
  panOnDrag: boolean;
  setConnectionLinePath: (connectionLinePath: XYPosition[]) => void;
  setGridVisibility: (isVisible: ReactStyleStateSetter<boolean>) => void;
  setGridSnapability: (isSnapEnabled: ReactStyleStateSetter<boolean>) => void;
}

const getMarker = (connection: Connection) => {
  const sourceNode = getNode(connection.source);
  const targetNode = getNode(connection.target);
  return {
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  };
};

export const useDEMOModeler = create<DEMOModelerState>()(
  temporal(
    (set, get) => ({
      id: uuid(),
      fileName: `DEMO Model_${new Date().toISOString()}`,
      nodes: initialNodes,
      edges: initialEdges,
      DEMOInstance: null,
      connectionLinePath: [],
      grid: {
        isVisible: true,
        isSnapEnabled: true,
      },
      selectionOnDrag: false,
      panOnDrag: true,
      isEnabled: true,
      setConnectionLinePath: (connectionLinePath) => {
        set({ connectionLinePath });
      },
      setFileName: (fileName) => {
        set({ fileName });
      },
      setEnabled: (isEnabledSetter) => {
        set({
          isEnabled:
            typeof isEnabledSetter === "boolean"
              ? isEnabledSetter
              : isEnabledSetter(get().isEnabled),
        });
      },
      setNodes: (newNodesOrSetterFn) => {
        set(({ nodes }) => {
          if (Array.isArray(newNodesOrSetterFn)) {
            const newArr = newNodesOrSetterFn;
            return { nodes: newArr };
          }
          const setterFn = newNodesOrSetterFn;
          return {
            nodes: setterFn(nodes),
          };
        });
      },
      setEdges: (newEdgesOrSetterFn) => {
        set(({ edges }) => {
          if (Array.isArray(newEdgesOrSetterFn)) {
            const newArr = newEdgesOrSetterFn;
            return { edges: newArr };
          }
          const setterFn = newEdgesOrSetterFn;
          return {
            edges: setterFn(edges),
          };
        });
      },
      updateNodeColor: (id, color) => {
        get().updateNode(id, { color });
      },
      updateNodeState: (id, state) => {
        get().updateNode(id, { state });
      },
      updateNodeScope: (id, scope) => {
        get().updateNode(id, { scope });
      },
      updateNodeFontSize: (id, fontSize) => {
        get().updateNode(id, { fontSize });
      },
      updateNodeContent: (id, content) => {
        get().updateNode(id, { content });
      },
      updateNodeConnectionHandlesVisibility: (id, newVisibilityOrSetterFn) => {
        const node = get().getNode(id);
        get().updateNode(id, {
          handles: {
            ...node?.handles,
            isVisible:
              typeof newVisibilityOrSetterFn === "boolean"
                ? newVisibilityOrSetterFn
                : newVisibilityOrSetterFn(node?.data.handles.isVisible),
          },
        });
      },
      updateNodeBorderVisibility: (id, newBorderVisibilityOrSetterFn) => {
        get().updateNode(id, {
          isBorderVisible:
            typeof newBorderVisibilityOrSetterFn === "boolean"
              ? newBorderVisibilityOrSetterFn
              : newBorderVisibilityOrSetterFn(
                  get().getNode(id)?.data.isBorderVisible
                ),
        });
      },
      setGridVisibility: (newGridVisibilityOrSetterFn) => {
        set({
          grid: {
            ...get().grid,
            isVisible:
              typeof newGridVisibilityOrSetterFn === "boolean"
                ? newGridVisibilityOrSetterFn
                : newGridVisibilityOrSetterFn(get().grid.isVisible),
          },
        });
      },
      setGridSnapability: (newGridSnapabilityOrSetterFn) => {
        set({
          grid: {
            ...get().grid,
            isSnapEnabled:
              typeof newGridSnapabilityOrSetterFn === "boolean"
                ? newGridSnapabilityOrSetterFn
                : newGridSnapabilityOrSetterFn(get().grid.isSnapEnabled),
          },
        });
      },
      updateNodeHandles: (id, newHandlesOrSetterFn) => {
        get().updateNode(id, {
          handles:
            typeof newHandlesOrSetterFn === "object"
              ? newHandlesOrSetterFn
              : newHandlesOrSetterFn(get().getNode(id)?.data.handles),
        });
      },
      getNode: (id) => get().nodes.find((node) => node.id === id),
      getChildNodes: (id) => get().nodes.filter((node) => node.parentId === id),
      addNode: (node) => {
        set({
          nodes: get()
            .nodes.map((node) => ({
              ...node,
              selected: false,
            }))
            .concat(Array.isArray(node) ? node : [node]),
        });
      },
      setModelFromJSONObject: (object) => {
        set({
          nodes: object.nodes,
          edges: object.edges,
          viewport: {
            x: object.viewport.x,
            y: object.viewport.y,
            zoom: object.viewport.zoom,
          },
        });
      },
      updateNode(id, data, options) {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === id) {
              return options?.replace
                ? { ...node, data }
                : { ...node, data: { ...node.data, ...data } };
            }

            return node;
          }),
        });
      },
      updateNodeTextAlign(id, textAlign) {
        get().updateNode(id, { textAlign });
      },
    }),
    {
      onSave: (state) => {},
      partialize: (state) => {
        const { nodes } = state;
        return {
          ...state,
          nodes: nodes.map((node) => ({ ...node, selected: undefined })),
        };
      },
    }
  )
);

export const setNodes = (newNodes: ReactStyleStateSetter<DEMONode[]>) => {
  useDEMOModeler.setState((state) => ({
    nodes: Array.isArray(newNodes) ? newNodes : newNodes(state.nodes),
  }));
};

export const setEdges = (newEdges: ReactStyleStateSetter<DEMOEdge[]>) => {
  useDEMOModeler.setState((state) => ({
    edges: Array.isArray(newEdges) ? newEdges : newEdges(state.edges),
  }));
};

export const setSelectionOnDrag = (
  isEnabled: ReactStyleStateSetter<boolean>
) => {
  useDEMOModeler.setState((state) => ({
    selectionOnDrag:
      typeof isEnabled === "boolean"
        ? isEnabled
        : isEnabled(state.selectionOnDrag),
  }));
};

export const setPanOnDrag = (isEnabled: ReactStyleStateSetter<boolean>) => {
  useDEMOModeler.setState((state) => ({
    panOnDrag:
      typeof isEnabled === "boolean" ? isEnabled : isEnabled(state.panOnDrag),
  }));
};

export const getNode = (id: string) => {
  return useDEMOModeler.getState().nodes.filter((node) => node.id === id)[0];
};

export const getEdge = (id: string) => {
  return useDEMOModeler.getState().nodes.filter((edge) => edge.id === id)[0];
};

export const updateNode = (
  id: string,
  dataSetter: ReactStyleStateSetter<DEMONode["data"]>
) => {
  useDEMOModeler.setState((state) => ({
    nodes: state.nodes.map<DEMONode>((node) => {
      if (node.id !== id) return node;
      const data =
        typeof dataSetter === "object" ? dataSetter : dataSetter(node.data);
      return { ...node, data: { ...node.data, ...data } };
    }),
  }));
};

export const updateNodeConnectionHandlesVisibility = (
  id: string,
  newVisibilityOrSetterFn: ReactStyleStateSetter<boolean>
) => {
  updateNode(id, (data) => ({
    handles: {
      ...data.handles,
      isVisible:
        typeof newVisibilityOrSetterFn === "boolean"
          ? newVisibilityOrSetterFn
          : newVisibilityOrSetterFn(data.handles.isVisible),
    },
  }));
};

export const deleteNode = (id: string) => {
  useDEMOModeler
    .getState()
    .setNodes((nodes) => nodes.filter((node) => node.id !== id));
};

export const deleteEdge = (id: string) => {
  useDEMOModeler
    .getState()
    .setEdges((edges) => edges.filter((edge) => edge.id !== id));
};

export const clearModel = () => {
  useDEMOModeler.getState().setEdges([]);
  useDEMOModeler.getState().setNodes([]);
};

export const onNodesChange: OnNodesChange<DEMONode> = (changes) => {
  useDEMOModeler.setState((state) => ({
    nodes: applyNodeChanges(changes, state.nodes),
  }));
};

export const onEdgesChange: OnEdgesChange<DEMOEdge> = (changes) => {
  useDEMOModeler.setState((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  }));
};

export const setDEMOInstance = (
  DEMOInstance: ReactFlowInstance<DEMONode, DEMOEdge>
) => {
  useDEMOModeler.setState(() => ({ DEMOInstance }));
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

export const addNode = (node: DEMONode) => {
  useDEMOModeler.setState((state) => ({
    nodes: [...state.nodes, node],
  }));
};

export const addEdge = (edge: DEMOEdge) => {
  useDEMOModeler.setState((state) => ({
    edges: _addEdge(edge, state.edges),
  }));
};

export const onConnect: OnConnect = (connection) => {
  const sourceNode = getNode(connection.source);
  const targetNode = getNode(connection.target);
  const type = getEdgeType(sourceNode.type, targetNode.type);
  const marker = getMarkerType(sourceNode.type, targetNode.type);
  addEdge({
    ...connection,
    id: `${sourceNode.type}_${connection.sourceHandle}->${sourceNode.type}_${connection.targetHandle}`,
    type,
    ...marker,
  });
};

export const onReconnect: OnReconnect = (oldEdge, newConnection) => {
  useDEMOModeler.setState((state) => ({
    edges: reconnectEdge(oldEdge, newConnection, state.edges),
  }));
};
