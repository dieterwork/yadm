import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import uuid from "$/shared/utils/uuid";
import {
  getConnectedEdges,
  useReactFlow,
  useStore,
  type XYPosition,
} from "@xyflow/react";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  setCopyPasteBufferedEdges,
  setCopyPasteBufferedNodes,
  useCopyPasteStore,
} from "./useCopyPasteStore";
import getChildNodes from "$/features/nodes/utils/getChildNodes";

const useCopyPaste = () => {
  const rfDomNode = useStore((state) => state.domNode);
  const mousePosition = useRef<XYPosition>({ x: 0, y: 0 });
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges } = useDEMOModelerStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }))
  );
  const { bufferedNodes, bufferedEdges } = useCopyPasteStore(
    useShallow((state) => ({
      bufferedNodes: state.bufferedNodes,
      bufferedEdges: state.bufferedEdges,
    }))
  );

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

      rfDomNode.addEventListener("mousemove", onMouseMove);

      for (const event of events) {
        rfDomNode.addEventListener(event, preventDefault);
      }

      return () => {
        for (const event of events) {
          rfDomNode.removeEventListener(event, preventDefault);
        }

        rfDomNode.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [rfDomNode]);

  const copyNodes = () => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const disabledNodes = nodes.filter(
      (node) => node.type === "transaction_kind"
    );

    const filteredNodes = selectedNodes.filter(
      (node) => !disabledNodes?.includes(node)
    );

    const childNodes = getChildNodes(filteredNodes, nodes);

    const combinedSelectedNodes = filteredNodes.concat(childNodes);

    const selectedEdges = getConnectedEdges(filteredNodes, edges).filter(
      (edge) => {
        const isExternalSource = filteredNodes.every(
          (n) => n.id !== edge.source
        );
        const isExternalTarget = filteredNodes.every(
          (n) => n.id !== edge.target
        );

        return !(isExternalSource || isExternalTarget);
      }
    );

    setCopyPasteBufferedNodes(combinedSelectedNodes);
    setCopyPasteBufferedEdges(selectedEdges);

    return { selectedNodes: combinedSelectedNodes, selectedEdges };
  };

  const copy = () => {
    copyNodes();
  };

  const cut = () => {
    const selectedElements = copyNodes();

    if (!selectedElements) return;

    const { selectedEdges, selectedNodes } = selectedElements;

    // A cut action needs to remove the copied nodes and edges from the graph.
    setNodes((nodes) => nodes.filter((node) => !selectedNodes.includes(node)));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const paste = (
    { x: pasteX, y: pasteY } = screenToFlowPosition(mousePosition.current)
  ) => {
    const minX = Math.min(
      ...bufferedNodes
        .filter((node) => !node.parentId)
        .map((node) => node.position.x)
    );
    const minY = Math.min(
      ...bufferedNodes
        .filter((node) => !node.parentId)
        .map((node) => node.position.y)
    );

    // create an old/new id map to keep track of old ids
    const idMap = new Map<string, string>();
    for (const node of bufferedNodes) {
      idMap.set(node.id, uuid());
    }

    const newNodes = bufferedNodes.map((node) => {
      // get new id
      const id = idMap.get(node.id)!;

      // if has a parent id, fetch the id from the map, else it's undefined
      const parentId = node.parentId ? idMap.get(node.parentId) : undefined;

      const x = pasteX + (node.position.x - minX);
      const y = pasteY + (node.position.y - minY);
      const position = node.parentId ? node.position : { x, y };

      return { ...node, id, parentId, position };
    }) satisfies DEMONode[];

    const newEdges = bufferedEdges.map((edge) => {
      const id = uuid();
      const sourceId = uuid();
      const targetId = uuid();
      const source = sourceId;
      const target = targetId;

      return { ...edge, id, source, target };
    }) satisfies DEMOEdge[];

    setNodes((nodes) => [
      ...nodes.map((node) => ({ ...node, selected: false })),
      ...newNodes,
    ]);
    setEdges((edges) => [
      ...edges.map((edge) => ({ ...edge, selected: false })),
      ...newEdges,
    ]);
  };
  return { cut, copy, paste };
};

export default useCopyPaste;
