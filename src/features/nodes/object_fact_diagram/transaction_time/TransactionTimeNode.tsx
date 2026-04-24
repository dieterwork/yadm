import {
  useReactFlow,
  type CoordinateExtent,
  type NodeProps,
  type OnResize,
  type OnResizeStart,
  type XYPosition,
} from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { TransactionTimeNode as TransactionTimeNodeType } from "./transactionTime.types";
import { TRANSACTION_TIME_HEIGHT } from "../../utils/consts";
import { useRef, useState } from "react";
import getChildNodes from "../../utils/getChildNodes";
import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";

const horizontalResizeControlClasses = ["right", "left"] as const;

const TransactionTimeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<TransactionTimeNodeType>) => {
  const [isHorizontalResizeControl, setIsHorizontalResizeControl] =
    useState(false);
  const nodes = useDEMOModelerStore((state) => state.nodes);

  const { screenToFlowPosition } = useReactFlow();

  const node = getNode(id);
  if (!node) return null;

  const onResize: OnResize = (
    params,
    { width: newWidth, height: newHeight },
  ) => {
    if (isHorizontalResizeControl) return;

    const childNodes = getChildNodes([node], nodes);
    const transactionKind = childNodes.find(
      (node) => node.type === "transaction_kind",
    );

    if (!transactionKind) return;

    const newSize = newHeight - 4;

    // find percentage of width current position is
    const scaledXPosition = (transactionKind?.position.x ?? 0) / (width ?? 0);

    const position: XYPosition = {
      x: newWidth * scaledXPosition,
      y: newHeight / 2 - newSize / 2,
    };

    updateNode(transactionKind.id, {
      position,
      width: newSize,
      height: newSize,
    });
  };

  const onResizeStart: OnResizeStart = (e) => {
    const isHorizontalResizeControl = horizontalResizeControlClasses.some(
      (c) =>
        (e.sourceEvent.target as HTMLElement).classList.contains(c) &&
        !(e.sourceEvent.target as HTMLElement).classList.contains("top") &&
        !(e.sourceEvent.target as HTMLElement).classList.contains("bottom"),
    );
    setIsHorizontalResizeControl(isHorizontalResizeControl);
  };

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      draggable={draggable}
      type="transaction_time"
      actions={["changeColor", "toggleHandlesVisibility"].concat(
        parentId ? "attachNode" : [],
      )}
      resizerProps={{
        minHeight: TRANSACTION_TIME_HEIGHT,
        onResize,
        onResizeStart,
      }}
      keepAspectRatio={!isHorizontalResizeControl}
    />
  );
};

export default TransactionTimeNode;
