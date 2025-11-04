import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { CompositeNode as CompositeNodeType } from "./composite.types";
import uuid from "../../../../shared/utils/uuid";
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
  const { content, fontSize, isEditable } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      draggable={draggable}
      selected={selected}
      width={width}
      height={height}
      type="composite"
      actions={[
        "addHandle",
        "changeColor",
        "changeFontSize",
        "delete",
        "toggleHandlesVisibility",
        "changeState",
        "editText",
      ].concat(parentId ? "attachNode" : [])}
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
