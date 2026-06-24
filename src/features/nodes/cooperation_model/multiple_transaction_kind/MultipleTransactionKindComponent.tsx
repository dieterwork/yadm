import { type NodeProps } from "@xyflow/react";

import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";

const MultipleTransactionKindComponent = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<MultipleTransactionKindNode>) => {
  const { content, fontSize, isEditable, actions, resizable } = data;

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeFocus",
    "editText",
    "changeState",
  ].concat(parentId ? ["attachNode"] : []);

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="multiple_transaction_kind"
      keepAspectRatio={true}
      actions={actions ?? defaultActions}
      resizable={resizable}
      draggable={draggable}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable && data.state !== "unclear"}
        content={content?.body}
        width={height}
        height={height}
        fontSize={fontSize}
        hide={data.state === "unclear"}
        maxLength={75}
        maxLines={4}
        style={{ right: "auto" }}
      />
    </DEMONodeBase>
  );
};

export default MultipleTransactionKindComponent;
