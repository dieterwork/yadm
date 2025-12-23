import type { DEMOEdge } from "$/features/edges/edges.types";
import {
  getNode,
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
import { sortNodes } from "$/shared/utils/sortNodes";

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
    const disabledNodes = nodes.filter((node) => {
      const parentNode = node.parentId ? getNode(node.parentId) : null;

      if (
        parentNode &&
        (parentNode.type === "elementary_actor" ||
          parentNode.type === "several_actors" ||
          parentNode.type === "transactor" ||
          parentNode.type === "transaction_time")
      ) {
        return true;
      }
      return false;
    });

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

    // create an old/new id map to keep track of old node ids
    const nodeIdMap = new Map<string, string>();
    for (const node of bufferedNodes) {
      const newId = uuid();
      nodeIdMap.set(node.id, newId);
    }

    const newNodes = bufferedNodes.map((node) => {
      // get new id
      const newId = node.type + "_" + nodeIdMap.get(node.id)!;

      // if has a parent id, fetch the id from the map, else it's undefined
      const parentId = node.parentId ? nodeIdMap.get(node.parentId) : undefined;

      const x = pasteX + (node.position.x - minX);
      const y = pasteY + (node.position.y - minY);
      const position = node.parentId ? node.position : { x, y };

      const nodeClone = structuredClone(node);

      const baseNewNode = {
        ...nodeClone,
        id: newId,
        parentId,
        position,
      } satisfies DEMONode;

      if (!("handles" in node.data)) return baseNewNode;

      return {
        ...baseNewNode,
        data: {
          ...node.data,
          handles: {
            ...node.data.handles,
            bottom: {
              ...node.data.handles?.bottom,
              handles: node.data.handles?.bottom?.handles?.map((handle) => ({
                ...handle,
                id: uuid(),
              })),
            },
            top: {
              ...node.data.handles?.top,
              handles: node.data.handles?.top?.handles?.map((handle) => ({
                ...handle,
                id: uuid(),
              })),
            },
            left: {
              ...node.data.handles?.left,
              handles: node.data.handles?.left?.handles?.map((handle) => ({
                ...handle,
                id: uuid(),
              })),
            },
            right: {
              ...node.data.handles?.right,
              handles: node.data.handles?.right?.handles?.map((handle) => ({
                ...handle,
                id: uuid(),
              })),
            },
          },
        },
      };
    }) satisfies DEMONode[];

    // create an old/new id map to keep track of old edge ids
    const edgeIdMap = new Map<string, string>();
    for (const edge of bufferedEdges) {
      const newId = uuid();
      edgeIdMap.set(edge.id, newId);
    }

    const newEdges = bufferedEdges
      .map((edge) => {
        // get new id
        const newId = edgeIdMap.get(edge.id)!;

        const sourceNode = bufferedNodes.find(
          (node) => node.id === edge.source
        );
        const targetNode = bufferedNodes.find(
          (node) => node.id === edge.target
        );

        const newSource = nodeIdMap.get(edge.source)!;
        const newTarget = nodeIdMap.get(edge.target)!;

        const newSourceNode = newNodes.find((node) => node.id == newSource);
        const newTargetNode = newNodes.find((node) => node.id == newTarget);

        if (
          !sourceNode ||
          !targetNode ||
          !("handles" in sourceNode.data) ||
          !("handles" in targetNode.data) ||
          !newSourceNode ||
          !newTargetNode ||
          !("handles" in newSourceNode?.data) ||
          !("handles" in newTargetNode?.data)
        ) {
          return null;
        }

        // get sourceHandle index

        const topSourceNodeHandle =
          sourceNode.data.handles?.top?.handles?.findIndex(
            (handle) => handle.id === edge.sourceHandle
          ) ?? -1;
        const bottomSourceNodeHandle =
          sourceNode.data.handles?.bottom?.handles?.findIndex(
            (handle) => handle.id === edge.sourceHandle
          ) ?? -1;
        const leftSourceNodeHandle =
          sourceNode.data.handles?.left?.handles?.findIndex(
            (handle) => handle.id === edge.sourceHandle
          ) ?? -1;
        const rightSourceNodeHandle =
          sourceNode.data.handles?.right?.handles?.findIndex(
            (handle) => handle.id === edge.sourceHandle
          ) ?? -1;

        const sourceNodeHandleSelections = [
          topSourceNodeHandle,
          bottomSourceNodeHandle,
          leftSourceNodeHandle,
          rightSourceNodeHandle,
        ];

        // get targetHandle index

        const topTargetNodeHandle =
          targetNode.data.handles?.top?.handles?.findIndex(
            (handle) => handle.id === edge.targetHandle
          ) ?? -1;
        const bottomTargetNodeHandle =
          targetNode.data.handles?.bottom?.handles?.findIndex(
            (handle) => handle.id === edge.targetHandle
          ) ?? -1;
        const leftTargetNodeHandle =
          targetNode.data.handles?.left?.handles?.findIndex(
            (handle) => handle.id === edge.targetHandle
          ) ?? -1;
        const rightTargetNodeHandle =
          targetNode.data.handles?.right?.handles?.findIndex(
            (handle) => handle.id === edge.targetHandle
          ) ?? -1;

        const targetNodeHandleSelections = [
          topTargetNodeHandle,
          bottomTargetNodeHandle,
          leftTargetNodeHandle,
          rightTargetNodeHandle,
        ];

        const newSourceHandle =
          newSourceNode?.data.handles?.top?.handles?.[
            sourceNodeHandleSelections[0]
          ]?.id ??
          newSourceNode?.data.handles?.bottom?.handles?.[
            sourceNodeHandleSelections[1]
          ]?.id ??
          newSourceNode?.data.handles?.left?.handles?.[
            sourceNodeHandleSelections[2]
          ]?.id ??
          newSourceNode?.data.handles?.right?.handles?.[
            sourceNodeHandleSelections[3]
          ]?.id;

        const newTargetHandle =
          newTargetNode?.data.handles?.top?.handles?.[
            targetNodeHandleSelections[0]
          ]?.id ??
          newTargetNode?.data.handles?.bottom?.handles?.[
            targetNodeHandleSelections[1]
          ]?.id ??
          newTargetNode?.data.handles?.left?.handles?.[
            targetNodeHandleSelections[2]
          ]?.id ??
          newTargetNode?.data.handles?.right?.handles?.[
            targetNodeHandleSelections[3]
          ]?.id;

        const edgeClone = structuredClone(edge);

        return {
          ...edgeClone,
          id: newId,
          source: newSource,
          target: newTarget,
          sourceHandle: newSourceHandle,
          targetHandle: newTargetHandle,
        };
      })
      .filter((edge) => !!edge) satisfies DEMOEdge[];

    const updatedNodes = [
      ...nodes.map((node) => ({ ...node, selected: false })),
      ...newNodes,
    ];

    const sortedNodes = updatedNodes.sort((a, b) =>
      sortNodes(a, b, updatedNodes)
    );

    setNodes(sortedNodes);

    setEdges((edges) => [
      ...edges.map((edge) => ({ ...edge, selected: false })),
      ...newEdges,
    ]);
  };
  return { cut, copy, paste };
};

export default useCopyPaste;
