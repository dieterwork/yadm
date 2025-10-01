import { useEffect } from "react";
import useShortcut from "../keyboard/useShortcut";
import {
  resetPreviewNode,
  updatePreviewNodePosition,
  usePreviewNodeStore,
} from "./usePreviewNodeStore";
import { useReactFlow, useStore } from "@xyflow/react";
import uuid from "$/shared/utils/uuid";
import { createNode } from "../nodes/utils/createNode";
import { addNode, setAction, setNodes } from "../modeler/useDEMOModelerStore";
import { X_SMALL_NODE_SIZE } from "../nodes/utils/consts";
import { sortNodes } from "$/shared/utils/sortNodes";

const ofdNodes = ["c_fact", "c_act", "tk_execution", "initiation_fact"];

export const usePreviewNode = () => {
  const rfDomNode = useStore((state) => state.domNode);
  const { screenToFlowPosition } = useReactFlow();
  const previewNode = usePreviewNodeStore((state) => state.previewNode);

  const addNodeFromSidebar = (e: MouseEvent) => {
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const id = uuid();

    const newNode = createNode({ id, type: previewNode?.type, position });

    addNode(newNode);

    if (ofdNodes.includes(previewNode?.type)) {
      // create text node
      const textNode = createNode({
        type: "text",
        position: {
          x: X_SMALL_NODE_SIZE / 2 - 30 / 2,
          y: -X_SMALL_NODE_SIZE,
        },
        parentId: id,
        width: 30,
        height: 20,
        content: "",
        textAlign: "center",
      });
      addNode(textNode);
    }

    resetPreviewNode();
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!previewNode) return;
      e.preventDefault();
      const target = e.target;
      if (
        rfDomNode &&
        target instanceof Element &&
        (rfDomNode.contains(target) || rfDomNode === target)
      ) {
        addNodeFromSidebar(e);
      } else {
        resetPreviewNode();
      }
      setAction("pan");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [previewNode, rfDomNode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updatePreviewNodePosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updatePreviewNodePosition]);
};
