import { type NodeProps } from "@xyflow/react";

import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import type { CompositeNode as CompositeNodeType } from "./composite.types";
import EditableContent from "../../../editable_content/EditableContent";

const CompositeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<CompositeNodeType>) => {
  const { content, fontSize, isEditable, actions } = data;

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeState",
    "editText",
  ];

  if (parentId) {
    defaultActions.push("attachNode");
  }

  return (
    <DEMONodeBase
      id={id}
      data={data}
      draggable={draggable}
      selected={selected}
      width={width}
      height={height}
      type="composite"
      actions={actions ?? defaultActions}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content}
        width={width}
        height={height}
        fontSize={fontSize}
        maxLength={50}
      />
    </DEMONodeBase>
  );
};

export default CompositeNode;
