import { type NodeProps, Handle, Position } from "@xyflow/react";

import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";
import { calculateDoubleDiamondInCircleDimensions } from "../../../shapes/utils/calculateDoubleDiamondInCircleDimensions";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

const topId = uuid();
const bottomId = uuid();
const leftId = uuid();
const rightId = uuid();

const TransactionNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionNodeType>) => {
  const { content, fontSize } = data;

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
          maxLength={50}
        />
        <Handle position={Position.Top} type="source" id={topId} />
        <Handle position={Position.Bottom} type="source" id={bottomId} />
        <Handle position={Position.Right} type="source" id={rightId} />
        <Handle position={Position.Left} type="source" id={leftId} />
      </DEMONodePrimitive>
    </>
  );
};

export default TransactionNode;
