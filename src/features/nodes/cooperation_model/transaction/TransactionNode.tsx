import { type NodeProps, Position } from "@xyflow/react";

import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
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

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeScope",
    "editText",
    "changeState",
  ];

  if (parentId) {
    defaultActions.push("attachNode");
  }

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="transaction"
      keepAspectRatio={true}
      actions={actions ?? defaultActions}
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
