import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactionKindNode as TransactionKindNodeType } from "./transactionKind.types";
import EditableContent from "../../../editable_content/EditableContent";

const TransactionKindNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionKindNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="transaction_kind"
        resizable={false}
        actions={["editText"]}
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
      </DEMONodePrimitive>
    </>
  );
};

export default TransactionKindNode;
