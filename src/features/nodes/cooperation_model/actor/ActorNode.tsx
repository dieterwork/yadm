import { type NodeProps } from "@xyflow/react";

import type { ActorNode as ActorNodeType } from "./actor.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import EditableContent from "../../../editable_content/EditableContent";

const ActorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ActorNodeType>) => {
  const { content } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="actor"
      >
        <EditableContent
          content={content}
          width={width}
          height={height}
          editable={true}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default ActorNode;
