import { type NodeProps, Position } from "@xyflow/react";

import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";

const TransactionNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<TransactionNodeType>) => {
  const { content, fontSize, isEditable, actions } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="transaction"
      keepAspectRatio={true}
      actions={
        actions ??
        [
          "addHandle",
          "changeColor",
          "changeFontSize",
          "delete",
          "toggleHandlesVisibility",
          "changeScope",
          "editText",
          "changeState",
        ].concat(parentId ? "attachNode" : [])
      }
      resizable={false}
      draggable={draggable}
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
        style={{ right: data.state === "double" ? "auto" : 0 }}
      />
    </DEMONodeBase>
  );
};

export default TransactionNode;
