import { useRef } from "react";
import { type NodeProps } from "@xyflow/react";

import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import type { CompositeNode as CompositeNodeType } from "./composite.types";
import EditableContent from "../../../editable_content/EditableContent";
import useParentDrag from "../../utils/useParentDrag";

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

  // As a passive child (inside an elementary_actor), a drag on the composite
  // body drives React Flow's native drag on the parent, while clicks still
  // select the composite and handles stay connectable.
  const dragRef = useRef<HTMLDivElement>(null);
  useParentDrag(parentId, dragRef);

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeFocus",
    "editText",
  ].concat(parentId ? ["attachNode"] : []);

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
      parentId={parentId}
      dragParent
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content?.body}
        width={width}
        height={height}
        fontSize={fontSize}
        maxLength={50}
      />
    </DEMONodeBase>
  );
};

export default CompositeNode;
