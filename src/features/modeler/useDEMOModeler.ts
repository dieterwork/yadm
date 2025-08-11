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
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode } from "../nodes/nodes.types";

export interface DEMOModelerState {
  nodes: DEMONode<string>[];
  edges: Edge[];
  onNodesChange: OnNodesChange<DEMONode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: DEMONode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateNodeState: (nodeId: string, state: string, type: string) => void;
  updateNodeScope: (nodeId: string, scope: string, type: string) => void;
  deleteNode: (nodeId: string) => void;
  addNode: (node: DEMONode<unknown>) => void;
  getNode: (nodeId: string) => DEMONode<unknown>;
  getChildrenNodes: (nodeId: string) => DEMONode<unknown>[];
  updateNodeExtent: (nodeId: string, extent: CoordinateExtent) => void;
  getNodeAbsolutePosition: (nodeId: string) => { x: number; y: number };
  updateNodeContent: (nodeId: string, content: string | string[]) => void;
}

export const useDEMOModeler = create<DEMOModelerState>()(
  temporal((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
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
        edges: addEdge(connection, get().edges),
      });
    },
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
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
    updateNodeContent: (nodeId: string, content: string[] | string) => {
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
    addNode: (node: DEMONode<unknown>) => {
      set({
        nodes: get()
          .nodes.map((node) => ({
            ...node,
            selected: false,
          }))
          .concat(Array.isArray(node) ? node : [node]),
      });
    },
    deleteNode: (nodeId: string) => {
      set({
        nodes: get().nodes.filter((node) => node.id !== nodeId),
      });
    },
    getNodeAbsolutePosition: (nodeId: string) => {
      const node = get().getNode(nodeId);
      let x = 0;
      let y = 0;
      let host: DEMONode<string> | undefined = node;

      while (host) {
        x += host.position.x;
        y += host.position.y;

        host = host.parentId
          ? get().nodes.find((node) => node.id === host?.parentId)
          : undefined;
      }
      return { x, y };
    },
  }))
);
