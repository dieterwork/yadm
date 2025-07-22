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
} from "@xyflow/react";

import { initialNodes } from "../nodes/initialNodes";
import { initialEdges } from "../edges/initialEdges";
import type { DEMONode } from "../nodes/nodes.types";

export interface DEMOModelerState {
  nodes: DEMONode[];
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
    updateNodeScope: (nodeId: string, scope: string, type: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, scope } };
          }

          return node;
        }),
      });
    },
    addNode: (node: DEMONode<unknown>) => {
      set({
        nodes: get()
          .nodes.map((node) => ({
            ...node,
            selected: false,
          }))
          .concat([node]),
      });
    },
    deleteNode: (nodeId: string) => {
      set({
        nodes: get().nodes.filter((node) => node.id !== nodeId),
      });
    },
  }))
);
