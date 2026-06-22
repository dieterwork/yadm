import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { EntityTypeNode as EntityTypeNodeType } from "./entityType.types";

const EntityTypeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<EntityTypeNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="derived_entity"
      draggable={draggable}
      actions={[
        "addHandle",
        "changeColor",
        "changeFontSize",
        "editText",
        "toggleHandlesVisibility",
      ].concat(parentId ? "attachNode" : [])}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content}
        width={width}
        height={height}
        alignContent="center"
        fontSize={fontSize}
        maxLength={60}
      />
    </DEMONodeBase>
  );
};

export default EntityTypeNode;
