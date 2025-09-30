import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { CompositeNode as CompositeNodeType } from "./composite.types";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";

const padding = 4;

const CompositeNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<CompositeNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
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
        ]}
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
      </DEMONodePrimitive>
    </>
  );
};

export default CompositeNode;
