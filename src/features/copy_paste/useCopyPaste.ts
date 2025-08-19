import { useState, useCallback, useEffect, useRef } from "react";
import {
  type Node,
  useReactFlow,
  getConnectedEdges,
  type Edge,
  type XYPosition,
  useStore,
} from "@xyflow/react";
import useShortcut from "../keyboard/useShortcut";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import type { DEMONode } from "../nodes/nodes.types";
import { matchNode } from "./utils";
import uuid from "../../shared/utils/uuid";

interface UseCopyPasteParams {
  disabledNodes: DEMONode["type"] | DEMONode["type"][];
}
const useCopyPaste = ({ disabledNodes }: UseCopyPasteParams) => {
  const mousePosition = useRef<XYPosition>({ x: 0, y: 0 });
  const rfDomNode = useStore((state) => state.domNode);

  const { nodes, edges, setNodes, setEdges } = useDEMOModeler(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
    }))
  );
  const { screenToFlowPosition } = useReactFlow<DEMONode, Edge>();

  // Set up the paste buffers to store the copied nodes and edges.
  const [bufferedNodes, setBufferedNodes] = useState<DEMONode[] | []>([]);
  const [bufferedEdges, setBufferedEdges] = useState<Edge[] | []>([]);

  // initialize the copy/paste hook
  // 1. remove native copy/paste/cut handlers
  // 2. add mouse move handler to keep track of the current mouse position
  useEffect(() => {
    const events = ["cut", "copy", "paste"];

    if (rfDomNode) {
      const preventDefault = (e: Event) => e.preventDefault();

      const onMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
          x: event.clientX,
          y: event.clientY,
        };
      };

      for (const event of events) {
        rfDomNode.addEventListener(event, preventDefault);
      }

      rfDomNode.addEventListener("mousemove", onMouseMove);

      return () => {
        for (const event of events) {
          rfDomNode.removeEventListener(event, preventDefault);
        }

        rfDomNode.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [rfDomNode]);

  const copy = () => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const selectedEdges = getConnectedEdges(selectedNodes, edges).filter(
      (edge) => {
        const isExternalSource = selectedNodes.every(
          (n) => n.id !== edge.source
        );
        const isExternalTarget = selectedNodes.every(
          (n) => n.id !== edge.target
        );

        return !(isExternalSource || isExternalTarget);
      }
    );

    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);
  };

  const cut = () => {
    const selectedNodes = nodes.filter(
      (node) => node.selected && matchNode(node, disabledNodes)
    );
    const selectedEdges = getConnectedEdges(selectedNodes, edges).filter(
      (edge) => {
        const isExternalSource = selectedNodes.every(
          (n) => n.id !== edge.source
        );
        const isExternalTarget = selectedNodes.every(
          (n) => n.id !== edge.target
        );

        return !(isExternalSource || isExternalTarget);
      }
    );

    setBufferedNodes(selectedNodes);
    setBufferedEdges(selectedEdges);

    // A cut action needs to remove the copied nodes and edges from the graph.
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const paste = (
    { x: pasteX, y: pasteY } = screenToFlowPosition({
      x: mousePosition.current.x,
      y: mousePosition.current.y,
    })
  ) => {
    const minX = Math.min(...bufferedNodes.map((s) => s.position.x));
    const minY = Math.min(...bufferedNodes.map((s) => s.position.y));

    const newNodes: DEMONode[] = bufferedNodes.map((node) => {
      const id = uuid();
      const x = pasteX + (node.position.x - minX);
      const y = pasteY + (node.position.y - minY);

      return { ...node, id, position: { x, y } };
    });

    const newEdges: Edge[] = bufferedEdges.map((edge) => {
      const id = uuid();
      const sourceId = uuid();
      const targetId = uuid();
      const source = sourceId;
      const target = targetId;

      return { ...edge, id, source, target };
    });

    setNodes((nodes) => [
      ...nodes.map((node) => ({ ...node, selected: false })),
      ...newNodes,
    ]);
    setEdges((edges) => [
      ...edges.map((edge) => ({ ...edge, selected: false })),
      ...newEdges,
    ]);
  };

  useShortcut(["Meta+x", "Control+x"], cut);
  useShortcut(["Meta+c", "Control+c"], copy);
  useShortcut(["Meta+v", "Control+v"], paste);

  return { cut, copy, paste, bufferedNodes, bufferedEdges };
};

export default useCopyPaste;
