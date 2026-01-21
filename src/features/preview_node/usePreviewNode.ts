import { useEffect } from "react";
import {
  resetPreviewNode,
  updatePreviewNodePosition,
  usePreviewNodeStore,
} from "./usePreviewNodeStore";
import { useReactFlow, useStore } from "@xyflow/react";
import uuid from "$/shared/utils/uuid";
import { createNode } from "../nodes/utils/createNode";
import { addNode } from "../modeler/useDEMOModelerStore";
import { X_SMALL_NODE_SIZE } from "../nodes/utils/consts";
import { resetAttach, useAttachStore } from "../actions/attach/useAttachStore";
import { useTranslation } from "react-i18next";

const ofdNodes = ["c_fact", "c_act", "tk_execution", "initiation_fact"];

export const usePreviewNode = () => {
  const rfDomNode = useStore((state) => state.domNode);
  const { screenToFlowPosition } = useReactFlow();
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const childNodeId = useAttachStore((state) => state.childNodeId);
  const { t } = useTranslation();

  const addNodeFromSidebar = (e: MouseEvent) => {
    if (!previewNode) return;
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const id = uuid();

    const newNode = createNode({
      id,
      type: previewNode.type,
      position,
      translateFn: t,
    });

    addNode(newNode);

    if (ofdNodes.includes(previewNode.type)) {
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
        translateFn: t,
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
      const pane = rfDomNode?.querySelector(".react-flow__pane");
      if (
        pane &&
        target instanceof Element &&
        (pane.contains(target) || pane === target)
      ) {
        addNodeFromSidebar(e);
      } else {
        if (previewNode) resetPreviewNode();
        if (childNodeId) resetAttach();
      }
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
