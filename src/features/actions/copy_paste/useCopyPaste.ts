import {
  getNode,
  setEdges,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { DEMONode } from "$/features/nodes/nodes.types";
import {
  getConnectedEdges,
  useReactFlow,
  useStore,
  type XYPosition,
} from "@xyflow/react";
import { useEffect, useRef } from "react";
import {
  setCopyPasteBufferedEdges,
  setCopyPasteBufferedNodes,
  useCopyPasteStore,
} from "./useCopyPasteStore";
import getChildNodes from "$/features/nodes/utils/getChildNodes";
import { sortNodes } from "$/shared/utils/sortNodes";
import {
  createEdgeIdMap,
  createNewHandles,
  createNodeIdMap,
  getMinCoords,
  updateNodeWithNewHandleIds,
} from "./utils";

const preventDefault = (e: Event) => e.preventDefault();

const canCopyParentIdList = [
  "elementary_actor",
  "several_actors",
  "transactor",
  "transaction_time",
];

const isEditableContent = () =>
  document.activeElement instanceof HTMLElement &&
  document.activeElement.contentEditable === "true";

const useCopyPaste = () => {
  const rfDomNode = useStore((state) => state.domNode);
  const mousePosition = useRef<XYPosition>({ x: 0, y: 0 });
  const { screenToFlowPosition } = useReactFlow();
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const edges = useDEMOModelerStore((state) => state.edges);
  const bufferedNodes = useCopyPasteStore((state) => state.bufferedNodes);
  const bufferedEdges = useCopyPasteStore((state) => state.bufferedEdges);
  const action = useDEMOModelerStore((state) => state.action);

  useEffect(() => {
    if (rfDomNode) {
      const onMouseMove = (e: MouseEvent) => {
        mousePosition.current = {
          x: e.clientX,
          y: e.clientY,
        };
      };

      rfDomNode.addEventListener("mousemove", onMouseMove);
      rfDomNode.addEventListener("cut", preventDefault);
      rfDomNode.addEventListener("copy", preventDefault);
      rfDomNode.addEventListener("paste", preventDefault);

      return () => {
        rfDomNode.removeEventListener("mousemove", onMouseMove);
        rfDomNode.removeEventListener("cut", preventDefault);
        rfDomNode.removeEventListener("copy", preventDefault);
        rfDomNode.removeEventListener("paste", preventDefault);
      };
    }
  }, [rfDomNode]);

  const copyNodes = () => {
    const selectedNodes = nodes.filter((node) => node.selected);
    const disabledNodes = nodes.filter((node) => {
      const parentNode = node.parentId ? getNode(node.parentId) : null;

      if (parentNode && canCopyParentIdList.includes(parentNode.type)) {
        return true;
      } else {
        return false;
      }
    });

    const filteredNodes = selectedNodes.filter(
      (node) => !disabledNodes?.includes(node),
    );

    const childNodes = getChildNodes(filteredNodes, nodes);

    const combinedSelectedNodes = [...filteredNodes, ...childNodes];

    const selectedEdges = getConnectedEdges(filteredNodes, edges).filter(
      (edge) => {
        const isExternalSource = filteredNodes.every(
          (n) => n.id !== edge.source,
        );
        const isExternalTarget = filteredNodes.every(
          (n) => n.id !== edge.target,
        );

        return !(isExternalSource || isExternalTarget);
      },
    );

    setCopyPasteBufferedNodes(combinedSelectedNodes);
    setCopyPasteBufferedEdges(selectedEdges);

    return { selectedNodes: combinedSelectedNodes, selectedEdges };
  };

  const cutNodes = () => {
    const selectedElements = copyNodes();

    if (!selectedElements) return;

    const { selectedEdges, selectedNodes } = selectedElements;

    // A cut action needs to remove the copied nodes and edges from the graph.
    setNodes((nodes) => nodes.filter((node) => !selectedNodes.includes(node)));
    setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
  };

  const pasteNodes = (
    { x: pasteX, y: pasteY } = screenToFlowPosition(mousePosition.current),
  ) => {
    // create an old/new id map to keep track of old node ids
    const nodeIdMap = createNodeIdMap(bufferedNodes);
    const [minX, minY] = getMinCoords(bufferedNodes);

    const newNodes = bufferedNodes.map((node) => {
      // create new id
      const newId = nodeIdMap.get(node.id)!;

      // if has a parent id, fetch the id from the map
      const parentId = node.parentId ? nodeIdMap.get(node.parentId) : undefined;

      const x = pasteX + (node.position.x - minX);
      const y = pasteY + (node.position.y - minY);
      const position = node.parentId ? node.position : { x, y };

      const baseNewNode: DEMONode = {
        ...node,
        id: newId,
        parentId,
        position,
      };

      const nodeWithNewHandles = updateNodeWithNewHandleIds(
        baseNewNode,
      ) as DEMONode;

      return nodeWithNewHandles;
    });

    // create an old/new id map to keep track of old edge ids
    const edgeIdMap = createEdgeIdMap(bufferedEdges);

    const newEdges = bufferedEdges.map((edge) => {
      // get new id
      const newId = edgeIdMap.get(edge.id)!;

      const oldSourceNode = bufferedNodes.find(
        (node) => node.id === edge.source,
      );
      const oldTargetNode = bufferedNodes.find(
        (node) => node.id === edge.target,
      );

      const source = nodeIdMap.get(edge.source)!;
      const target = nodeIdMap.get(edge.target)!;

      const newSourceNode = newNodes.find((node) => node.id == source);
      const newTargetNode = newNodes.find((node) => node.id == target);

      if (
        !oldSourceNode ||
        !oldTargetNode ||
        !newSourceNode ||
        !newTargetNode
      ) {
        return edge;
      }

      const { sourceHandle, targetHandle } = createNewHandles(
        edge,
        oldSourceNode,
        oldTargetNode,
        newSourceNode,
        newTargetNode,
      );

      return {
        ...edge,
        id: newId,
        source,
        target,
        sourceHandle,
        targetHandle,
      };
    });

    const unsortedUpdatedNodes = [
      ...nodes.map((node) => ({ ...node, selected: false })),
      ...newNodes,
    ];

    const updatedNodes = unsortedUpdatedNodes.sort((a, b) =>
      sortNodes(a, b, unsortedUpdatedNodes),
    );

    const updatedEdges = [
      ...edges.map((edge) => ({ ...edge, selected: false })),
      ...newEdges,
    ];

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const copyText = () => {
    const selection = window.getSelection();
    if (selection?.toString()) {
      navigator.clipboard.writeText(selection.toString());
    }
  };

  const dispatchInputEvent = () =>
    document.activeElement?.dispatchEvent(
      new InputEvent("input", { bubbles: true }),
    );

  const cutText = () => {
    const selection = window.getSelection();
    if (!selection?.toString()) return;
    navigator.clipboard.writeText(selection.toString());
    selection.getRangeAt(0).deleteContents();
    dispatchInputEvent();
  };

  const pasteText = async () => {
    const text = await navigator.clipboard.readText();
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    dispatchInputEvent();
  };

  const copy = () => {
    if (isEditableContent()) {
      copyText();
    } else {
      copyNodes();
    }
  };

  const paste = () => {
    if (isEditableContent()) {
      pasteText();
    } else {
      pasteNodes();
    }
  };

  const cut = () => {
    if (isEditableContent()) {
      cutText();
    } else {
      cutNodes();
    }
  };

  return { copy, paste, cut };
};

export default useCopyPaste;
