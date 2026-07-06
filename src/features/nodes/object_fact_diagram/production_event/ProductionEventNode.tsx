import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { ProductionEventNode as ProductionEventNodeType } from "../objectFactDiagram.types";

const ProductionEventNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<ProductionEventNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="production_event"
      keepAspectRatio={true}
      draggable={draggable}
      actions={[
        "addHandle",
        "changeColor",
        "changeFontSize",
        "editText",
        "toggleHandlesVisibility",
        "attachNode",
        "bringToFront",
        "sendToBack",
      ]}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content?.body}
        width={width}
        height={height}
        fontSize={fontSize}
      />
    </DEMONodeBase>
  );
};

export default ProductionEventNode;
