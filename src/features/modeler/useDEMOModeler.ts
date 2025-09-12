import { create } from "zustand";
import { temporal } from "zundo";
import {
  addEdge,
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
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode, DEMOHandlesData } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";
import type { DEMOEdge } from "../edges/edges.types";
import type { CSSProperties } from "react";

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
  onNodesChange: OnNodesChange<DEMONode>;
  onEdgesChange: OnEdgesChange<DEMOEdge>;
  onConnect: OnConnect;
  onReconnect: OnReconnect<DEMOEdge>;
  setNodes: (newNodesOrSetterFn: ReactStyleStateSetter<DEMONode[]>) => void;
  setEdges: (newEdgesOrSetterFn: ReactStyleStateSetter<DEMOEdge[]>) => void;
  DEMOInstance: null | ReactFlowInstance<DEMONode, DEMOEdge>;
  setDEMOInstance: (instance: ReactFlowInstance<DEMONode, DEMOEdge>) => void;
  updateNodeColor: (id: string, color: string) => void;
  updateNodeState: (id: string, state: string, type: string) => void;
  updateNodeScope: (id: string, scope: string, type: string) => void;
  deleteNode: (id: string) => void;
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
      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      setEnabled: (isEnabledSetter) => {
        set({
          isEnabled:
            typeof isEnabledSetter === "boolean"
              ? isEnabledSetter
              : isEnabledSetter(get().isEnabled),
        });
      },
      onConnect: (connection) => {
        set({
          edges: addEdge(
            {
              ...connection,
              id: uuid(),
              type: "cooperation_model_edge",
            },
            get().edges
          ),
        });
      },
      onReconnect: (oldEdge, newConnection) => {
        set({
          edges: reconnectEdge(oldEdge, newConnection, get().edges),
        });
      },
      setDEMOInstance: (instance) => {
        set({ DEMOInstance: instance });
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
      addEdge: (edge) => {
        set({
          edges: get()
            .edges.map((edge) => ({
              ...edge,
            }))
            .concat([edge]),
        });
      },
      deleteNode: (id) => {
        set({
          nodes: get().nodes.filter((node) => {
            if (node.id !== id && node.parentId !== id) return true;
            return false;
          }),
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
      deleteDiagram: () => {
        get().setModelFromJSONObject({
          nodes: [],
          edges: [],
          viewport: { x: 0, y: 0, zoom: 1 },
        });
        const DEMOInstance = get().DEMOInstance;
        if (DEMOInstance) get().setDEMOInstance(DEMOInstance);
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

export const setSelectionOnDrag = (
  isEnabledSetter: ReactStyleStateSetter<boolean>
) => {
  useDEMOModeler.setState((state) => ({
    selectionOnDrag:
      typeof isEnabledSetter === "boolean"
        ? isEnabledSetter
        : isEnabledSetter(state.selectionOnDrag),
  }));
};

export const setPanOnDrag = (
  isEnabledSetter: ReactStyleStateSetter<boolean>
) => {
  useDEMOModeler.setState((state) => ({
    panOnDrag:
      typeof isEnabledSetter === "boolean"
        ? isEnabledSetter
        : isEnabledSetter(state.panOnDrag),
  }));
};
