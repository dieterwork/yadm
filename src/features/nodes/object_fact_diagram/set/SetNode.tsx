import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { SetNode as SetNodeType } from "./set.types";

const SetNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<SetNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="set"
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
        width={width! * 0.75}
        height={height! * 0.75}
        fontSize={fontSize}
        alignContent="center"
        maxLength={60}
      />
    </DEMONodeBase>
  );
};

export default SetNode;
