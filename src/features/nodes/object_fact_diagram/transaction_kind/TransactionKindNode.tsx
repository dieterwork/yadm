import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { TransactionKindNode as TransactionKindNodeType } from "./transactionKind.types";
import EditableContent from "../../../editable_content/EditableContent";

const TransactionKindNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<TransactionKindNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="transaction_kind"
      resizable={false}
      draggable={draggable}
      actions={["editText", "changeColor"]}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content}
        width={width}
        height={height}
        maxLines={1}
        maxLength={3}
        fontSize={fontSize}
      />
    </DEMONodeBase>
  );
};

export default TransactionKindNode;
