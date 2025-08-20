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
import {
  getChildNodes,
  getDisabledNodes,
  showDisabledNodesError,
} from "./utils";
import uuid from "../../shared/utils/uuid";

interface UseCopyPasteParams {
  disabledNodeTypes: DEMONode["type"][];
}
const useCopyPaste = ({ disabledNodeTypes }: UseCopyPasteParams) => {
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

  const _copy = () => {
    const selectedNodes = nodes.filter((node) => node.selected);

    const disabledNodes = getDisabledNodes(selectedNodes, disabledNodeTypes);

    if (disabledNodes.length > 0) {
      showDisabledNodesError(disabledNodes);
      return;
    }

    const childNodes = getChildNodes(selectedNodes, nodes);

    const combinedSelectedNodes = selectedNodes.concat(childNodes);

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

    setBufferedNodes(combinedSelectedNodes);
    setBufferedEdges(selectedEdges);

    return { selectedNodes: combinedSelectedNodes, selectedEdges };
  };

  const copy = () => {
    _copy();
  };

  const cut = () => {
    const selectedElements = _copy();

    if (!selectedElements) return;

    const { selectedEdges, selectedNodes } = selectedElements;

    // A cut action needs to remove the copied nodes and edges from the graph.
    setNodes((nodes) => nodes.filter((node) => !selectedNodes.includes(node)));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const paste = (
    { x: pasteX, y: pasteY } = screenToFlowPosition({
      x: mousePosition.current.x,
      y: mousePosition.current.y,
    })
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

    const newNodes: DEMONode[] = bufferedNodes.map((node) => {
      // get new id
      const id = idMap.get(node.id)!;

      // if has a parent id, fetch the id from the map, else it's undefined
      const parentId = node.parentId ? idMap.get(node.parentId) : undefined;

      const x = pasteX + (node.position.x - minX);
      const y = pasteY + (node.position.y - minY);
      const position = node.parentId ? node.position : { x, y };

      return { ...node, id, parentId, position };
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
