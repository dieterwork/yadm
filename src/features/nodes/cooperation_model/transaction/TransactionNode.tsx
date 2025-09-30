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

const TransactionNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionNodeType>) => {
  const { content, fontSize, isEditable } = data;

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
        keepAspectRatio={true}
        actions={[
          "addHandle",
          "changeColor",
          "changeFontSize",
          "delete",
          "toggleHandlesVisibility",
          "changeScope",
        ]}
      >
        <EditableContent
          isSelected={selected}
          isEditable={isEditable && data.state !== "unclear"}
          content={content}
          width={data.state === "double" ? height : width}
          height={height}
          fontSize={fontSize}
          hide={data.state === "unclear"}
          maxLength={50}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default TransactionNode;
