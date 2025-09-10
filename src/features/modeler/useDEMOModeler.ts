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

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

export interface DEMOModelerState {
  id: string;
  fileName: string;
  nodes: DEMONode[];
  edges: DEMOEdge[];
  viewport: Viewport;
  setFileName: (filename: string) => void;
  onNodesChange: OnNodesChange<DEMONode>;
  onEdgesChange: OnEdgesChange<DEMOEdge>;
  onConnect: OnConnect;
  onReconnect: OnReconnect<DEMOEdge>;
  setNodes: (newNodesOrSetterFn: ReactStyleStateSetter<DEMONode[]>) => void;
  setEdges: (newEdgesOrSetterFn: ReactStyleStateSetter<DEMOEdge[]>) => void;
  DEMOInstance: null | ReactFlowInstance<DEMONode, DEMOEdge>;
  setDEMOInstance: (instance: ReactFlowInstance<DEMONode, DEMOEdge>) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeState: (nodeId: string, state: string, type: string) => void;
  updateNodeScope: (nodeId: string, scope: string, type: string) => void;
  deleteNode: (nodeId: string) => void;
  addNode: (node: DEMONode) => void;
  addEdge: (edge: Edge) => void;
  getNode: (nodeId: string) => DEMONode | undefined;
  getChildrenNodes: (nodeId: string) => DEMONode[];
  updateNodeExtent: (nodeId: string, extent: CoordinateExtent) => void;
  getNodeAbsolutePosition: (nodeId: string) => { x: number; y: number };
  updateNodeContent: (nodeId: string, content: string) => void;
  updateNodeFontSize: (nodeId: string, fontSize: number) => void;
  setModelFromJSONObject: (object: ReactFlowJsonObject<DEMONode, Edge>) => void;
  updateNode: (
    id: string,
    nodeUpdate: Partial<Node>,
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
  connectionLinePath: XYPosition[];
  setConnectionLinePath: (connectionLinePath: XYPosition[]) => void;
}

export const useDEMOModeler = create<DEMOModelerState>()(
  temporal(
    (set, get) => ({
      id: uuid(),
      fileName: `demo-model_${new Date().toISOString()}`,
      nodes: initialNodes,
      edges: initialEdges,
      DEMOInstance: null,
      connectionLinePath: [],
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
      deleteNode: (nodeId) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== nodeId),
        });
      },
      updateNodeColor: (nodeId, color) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, color } };
            }

            return node;
          }),
        });
      },
      updateNodeState: (nodeId, state: string, type) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, state } };
            }

            return node;
          }),
        });
      },
      updateNodeScope: (nodeId, scope) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, scope } };
            }

            return node;
          }),
        });
      },
      updateNodeFontSize: (nodeId, fontSize) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, fontSize } };
            }

            return node;
          }),
        });
      },
      updateNodeExtent: (nodeId, extent) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, extent };
            }

            return node;
          }),
        });
      },
      updateNodeContent: (nodeId, content) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, content };
            }

            return node;
          }),
        });
      },
      updateNodeConnectionHandlesVisibility: (
        nodeId,
        newVisibilityOrSetterFn
      ) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              if (typeof newVisibilityOrSetterFn === "boolean") {
                const newVisibility = newVisibilityOrSetterFn;
                return {
                  ...node,
                  data: {
                    ...node.data,
                    handles: {
                      ...node.data.handles,
                      isVisible: newVisibility,
                    },
                  },
                };
              }
              const setterFn = newVisibilityOrSetterFn;
              return {
                ...node,
                data: {
                  ...node.data,
                  handles: {
                    ...node.data.handles,
                    isVisible: setterFn(node.data.handles.isVisible),
                  },
                },
              };
            }

            return node;
          }),
        });
      },
      updateNodeBorderVisibility: (nodeId, newBorderVisibilityOrSetterFn) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              if (typeof newBorderVisibilityOrSetterFn === "boolean") {
                const newBorderVisibility = newBorderVisibilityOrSetterFn;
                return {
                  ...node,
                  data: {
                    ...node.data,
                    isBorderVisible: newBorderVisibility,
                  },
                };
              }
              const setterFn = newBorderVisibilityOrSetterFn;
              return {
                ...node,
                data: {
                  ...node.data,
                  isBorderVisible: setterFn(node.data.isBorderVisible),
                },
              };
            }

            return node;
          }),
        });
      },
      updateNodeHandles: (nodeId, newHandlesOrSetterFn) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              if (typeof newHandlesOrSetterFn === "object") {
                const newHandles = newHandlesOrSetterFn;
                return {
                  ...node,
                  data: {
                    ...node.data,
                    handles: newHandles,
                  },
                };
              }
              const setterFn = newHandlesOrSetterFn;
              return {
                ...node,
                data: {
                  ...node.data,
                  handles: setterFn(node.data.handles),
                },
              };
            }

            return node;
          }),
        });
      },
      getNode: (nodeId) => get().nodes.find((node) => node.id === nodeId),
      getChildrenNodes: (nodeId) =>
        get().nodes.filter((node) => node.parentId === nodeId),
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
      getNodeAbsolutePosition: (nodeId) => {
        const node = get().getNode(nodeId);
        let x = 0;
        let y = 0;
        let host: DEMONode | undefined = node;

        while (host) {
          x += host.position.x;
          y += host.position.y;

          host = host.parentId
            ? get().nodes.find((node) => node.id === host?.parentId)
            : undefined;
        }
        return { x, y };
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
      updateNode(id, nodeUpdate, options) {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === id) {
              return options?.replace ? nodeUpdate : { ...node, ...nodeUpdate };
            }

            return node;
          }),
        });
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
