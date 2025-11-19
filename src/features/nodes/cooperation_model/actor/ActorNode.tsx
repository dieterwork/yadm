import { type NodeProps } from "@xyflow/react";

import type { ActorNode as ActorNodeType } from "./actor.types";
import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";

const ActorNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<ActorNodeType>) => {
  const { content, fontSize, isEditable, resizable, actions } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      resizable={resizable}
      draggable={draggable}
      type="actor"
      actions={
        actions ??
        [
          "addHandle",
          "changeColor",
          "changeFontSize",
          "delete",
          "toggleHandlesVisibility",
          "changeScope",
          "changeState",
          "editText",
        ].concat(parentId ? "attachNode" : [])
      }
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content}
        width={width}
        height={height}
        fontSize={fontSize}
        maxLength={60}
        hidden={data.state === "unclear"}
      />
    </DEMONodeBase>
  );
};

export default ActorNode;
