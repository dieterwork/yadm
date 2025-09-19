import { useEffect, type RefObject } from "react";
import useShortcut from "../keyboard/useShortcut";
import { usePreviewNodeStore } from "./usePreviewNodeStore";
import { useReactFlow, useStore } from "@xyflow/react";
import uuid from "$/shared/utils/uuid";
import { createNode } from "../nodes/utils/createNode";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import {
  SMALL_NODE_SIZE,
  TRANSACTION_TIME_SIZE,
  X_SMALL_NODE_SIZE,
} from "../nodes/utils/consts";

const ofdNodes = ["c_fact", "c_act", "tk_execution", "initiation_fact"];

export const usePreviewNode = ({
  reactFlowRef,
}: {
  reactFlowRef: RefObject<HTMLDivElement>;
}) => {
  const reset = usePreviewNodeStore((state) => state.reset);
  const { screenToFlowPosition } = useReactFlow();
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const updatePosition = usePreviewNodeStore((state) => state.updatePosition);
  useShortcut("Escape", reset);
  const node = useStore((state) => state.domNode);
  const addNode = useDEMOModeler((state) => state.addNode);

  const addNodeFromSidebar = (e: MouseEvent) => {
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const id = uuid();

    const newNode = createNode({ id, type: previewNode.type, position });

    addNode(newNode);

    if (ofdNodes.includes(previewNode.type)) {
      // create text node
      const textNode = createNode({
        type: "text",
        position: {
          x: X_SMALL_NODE_SIZE / 2 - 50 / 2,
          y: -X_SMALL_NODE_SIZE,
        },
        parentId: id,
        width: 50,
        height: 20,
        content: "",
      });
      addNode(textNode);
    }

    if (previewNode.type === "transaction_time") {
      const ghostNode1Id = uuid();
      const ghostNode2Id = uuid();

      // add ghosts
      addNode({
        id: `ghost-${ghostNode1Id}`,
        type: "ghost",
        position: {
          x: 40 + TRANSACTION_TIME_SIZE,
          y: SMALL_NODE_SIZE / 2 + 3,
        },
        data: {},
        parentId: newNode[0].id,
      });

      addNode({
        id: `ghost-${ghostNode2Id}`,
        type: "ghost",
        position: {
          x: -40,
          y: SMALL_NODE_SIZE / 2 + 3,
        },
        data: {},
        parentId: newNode[0].id,
      });
    }

    reset();
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!previewNode) return;
      e.preventDefault();
      const target = e.target;
      if (
        target instanceof Element &&
        (reactFlowRef.current.contains(target) ||
          reactFlowRef.current === target)
      ) {
        addNodeFromSidebar(e);
      } else {
        reset();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [previewNode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [updatePosition]);
};
