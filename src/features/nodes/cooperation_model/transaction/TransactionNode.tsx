import { NodeResizer, type NodeProps, Handle, Position } from "@xyflow/react";

import { useRef } from "react";
import Shape from "../../../shapes/Shape";
import TransactionShape from "./TransactionShape";
import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";

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
  const { content } = data;

  const contentWithUUID = content.map((content) => ({ content, id: uuid() }));

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
          width={width}
          height={height}
          editable={true}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default TransactionNode;
