import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { CompositeNode as CompositeNodeType } from "./compositetypes";
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
  const { content } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="composite"
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

export default CompositeNode;
