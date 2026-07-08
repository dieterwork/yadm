import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { EntityTypeNode as EntityTypeNodeType } from "../objectFactDiagram.types";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";

const EntityTypeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<EntityTypeNodeType>) => {
  const { content, fontSize, isEditable, resizable } = data;
  const setParentId = parentId ? getNode(parentId)?.parentId : undefined;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="entity_type"
      draggable={draggable}
      resizable={resizable}
      actions={[
        "addHandle",
        "changeColor",
        "changeFontSize",
        "editText",
        "toggleHandlesVisibility",
        "changeFocus",
        "bringToFront",
        "sendToBack",
      ].concat(setParentId || parentId ? "attachNode" : [])}
      parentId={setParentId || parentId}
      dragParent
    >
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

export default EntityTypeNode;
