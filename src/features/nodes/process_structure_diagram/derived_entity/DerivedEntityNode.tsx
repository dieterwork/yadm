import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { DerivedEntityNode as DerivedEntityNodeType } from "./derivedEntity.types";

const DerivedEntityNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<DerivedEntityNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="derived_entity"
        actions={[
          "addHandle",
          "changeColor",
          "changeFontSize",
          "delete",
          "editText",
          "toggleHandlesVisibility",
        ]}
      >
        <EditableContent
          isSelected={selected}
          isEditable={isEditable}
          content={content}
          width={width}
          height={height}
          alignContent="center"
          fontSize={fontSize}
          maxLength={60}
        />
      </DEMONodeBase>
    </>
  );
};

export default DerivedEntityNode;
