import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import EditableContent from "../../../editable_content/EditableContent";
import type { EntityClassNode as EntityClassNodeType } from "./entityClass.types";

const EntityClassNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<EntityClassNodeType>) => {
  const { content } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="entity_class"
      >
        <EditableContent
          content={content}
          width={width * 0.75}
          height={height * 0.75}
          editable={true}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default EntityClassNode;
