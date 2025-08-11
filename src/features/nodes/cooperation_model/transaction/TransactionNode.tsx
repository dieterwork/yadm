import {
  NodeResizer,
  type NodeProps,
  Handle,
  Position,
  type NodeDimensionChange,
  applyNodeChanges,
} from "@xyflow/react";

import { useRef, useState } from "react";
import Shape from "../../../shapes/Shape";
import TransactionShape from "./TransactionShape";
import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";
import { calculateDoubleDiamondInCircleDimensions } from "../../../shapes/utils/calculateDoubleDiamondInCircleDimensions";
import { useDEMOModeler } from "../../../modeler/useDEMOModeler";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

const padding = 4;

const TransactionNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionNodeType>) => {
  const { content, fontSize } = data;

  const setNodes = useDEMOModeler((state) => state.setNodes);
  const nodes = useDEMOModeler((state) => state.nodes);

  if (data.state === "double" && height) {
    width = calculateDoubleDiamondInCircleDimensions(height).width + 4;
  }

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="transaction"
        resizable={false}
      >
        <EditableContent
          content={content}
          width={data.state === "double" ? height : width}
          height={height}
          fontSize={fontSize}
          hide={data.state === "unclear"}
          editable={data.state !== "unclear"}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default TransactionNode;
