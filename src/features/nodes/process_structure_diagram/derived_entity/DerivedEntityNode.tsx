import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import EditableContent from "../../../editable_content/EditableContent";
import type { DerivedEntityNode as DerivedEntityNodeType } from "./derivedEntity.types";

const DerivedEntityNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<DerivedEntityNodeType>) => {
  const { content, fontSize } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="derived_entity"
      >
        <EditableContent
          content={content}
          width={width}
          height={height}
          editable={true}
          textPosition="top"
          fontSize={fontSize}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default DerivedEntityNode;
