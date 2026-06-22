import {
  useReactFlow,
  type CoordinateExtent,
  type NodeProps,
  type OnResize,
  type OnResizeEnd,
  type OnResizeStart,
  type XYPosition,
} from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { TransactionTimeNode as TransactionTimeNodeType } from "./transactionTime.types";
import { TRANSACTION_TIME_HEIGHT } from "../../utils/consts";
import { useState } from "react";
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
  const node = getNode(id);

  if (!node) return null;

  const transactionKindNode = getChildNodes([node], nodes).find(
    (node) => node.type === "transaction_kind",
  );

  if (!transactionKindNode) return null;

  const onResize: OnResize = (
    params,
    { width: newWidth, height: newHeight },
  ) => {
    if (newHeight < TRANSACTION_TIME_HEIGHT) return;

    const extent: CoordinateExtent = [
      [2, 2],
      [newWidth - 2, newHeight - 2],
    ];

    if (isHorizontalResizeControl) {
      updateNode(transactionKindNode.id, {
        extent,
      });
    } else {
      const newSize = newHeight - 4;

      // find percentage of width current position is
      const scaledXPosition =
        (transactionKindNode?.position.x ?? 0) / (width ?? 0);

      const position: XYPosition = {
        x: newWidth * scaledXPosition,
        y: newHeight / 2 - newSize / 2,
      };

      updateNode(transactionKindNode.id, {
        position,
        width: newSize,
        height: newSize,
        extent,
      });
    }
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

  const onResizeEnd: OnResizeEnd = (_, { height: newHeight }) => {
    // resolves bug where resizing quickly prevents transaction kind node from properly resizing
    const newSize = newHeight - 4;
    if (
      transactionKindNode.height === newSize &&
      transactionKindNode.width === newSize
    )
      return;
    updateNode(transactionKindNode.id, { width: newSize, height: newSize });
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
        onResizeEnd,
      }}
      keepAspectRatio={!isHorizontalResizeControl}
    />
  );
};

export default TransactionTimeNode;
