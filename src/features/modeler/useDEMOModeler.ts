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
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode } from "../nodes/nodes.types";
import uuid from "../../shared/utils/uuid";

type ReactStyleStateSetter<T> = T | ((prev: T) => T);

export interface DEMOModelerState {
  id: string;
  nodes: DEMONode[];
  edges: Edge[];
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
  onNodesChange: OnNodesChange<DEMONode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (newNodesOrSetterFn: ReactStyleStateSetter<DEMONode[]>) => void;
  setEdges: (newEdgesOrSetterFn: ReactStyleStateSetter<Edge[]>) => void;
  DEMOInstance: null | ReactFlowInstance<DEMONode, Edge>;
  setDEMOInstance: (instance: ReactFlowInstance<DEMONode, Edge>) => void;
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
}

export const useDEMOModeler = create<DEMOModelerState>()(
  temporal((set, get) => ({
    id: uuid(),
    nodes: initialNodes,
    edges: initialEdges,
    DEMOInstance: null,
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
    },
    setViewport: (viewport) => {
      set({ viewport });
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
          { ...connection, type: "cooperation_model_edge" },
          get().edges
        ),
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
    addEdge: (edge: Edge) => {
      set({
        edges: get()
          .edges.map((edge) => ({
            ...edge,
          }))
          .concat([edge]),
      });
    },
    deleteNode: (nodeId: string) => {
      set({
        nodes: get().nodes.filter((node) => node.id !== nodeId),
      });
    },
    updateNodeColor: (nodeId: string, color: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, color } };
          }

          return node;
        }),
      });
    },
    updateNodeState: (nodeId: string, state: string, type: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, state } };
          }

          return node;
        }),
      });
    },
    updateNodeScope: (nodeId: string, scope: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, scope } };
          }

          return node;
        }),
      });
    },
    updateNodeFontSize: (nodeId: string, fontSize: number) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, fontSize } };
          }

          return node;
        }),
      });
    },
    updateNodeExtent: (nodeId: string, extent: CoordinateExtent) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, extent };
          }

          return node;
        }),
      });
    },
    updateNodeContent: (nodeId: string, content: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, content };
          }

          return node;
        }),
      });
    },
    getNode: (nodeId: string) => get().nodes.find((node) => node.id === nodeId),
    getChildrenNodes: (nodeId: string) =>
      get().nodes.filter((node) => node.parentId === nodeId),
    addNode: (node: DEMONode) => {
      set({
        nodes: get()
          .nodes.map((node) => ({
            ...node,
            selected: false,
          }))
          .concat(Array.isArray(node) ? node : [node]),
      });
    },
    getNodeAbsolutePosition: (nodeId: string) => {
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
    setModelFromJSONObject: (object: ReactFlowJsonObject<DEMONode, Edge>) => {
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
  }))
);
