import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { AttributeNode as AttributeNodeType } from "../objectFactDiagram.types";

const AttributeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<AttributeNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="attribute"
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
        content={content?.header}
        width={width}
        height={height}
        alignContent="center"
        fontSize={fontSize}
        maxLength={60}
      />
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content?.body}
        width={width}
        height={height}
        alignContent="center"
        fontSize={fontSize}
        maxLength={60}
      />
    </DEMONodeBase>
  );
};

export default AttributeNode;
