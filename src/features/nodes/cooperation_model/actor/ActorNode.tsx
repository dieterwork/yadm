import {
  Handle,
  Position,
  useUpdateNodeInternals,
  type NodeProps,
} from "@xyflow/react";

import type { ActorNode as ActorNodeType } from "./actor.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import EditableContent from "../../../editable_content/EditableContent";
import { useResizerHandles } from "../../../resize/useResizer";

const ActorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ActorNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="actor"
        actions={[
          "addHandle",
          "changeColor",
          "changeFontSize",
          "delete",
          "toggleHandlesVisibility",
          "changeScope",
          "changeState",
          "editText",
        ]}
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
      </DEMONodePrimitive>
    </>
  );
};

export default ActorNode;
