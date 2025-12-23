import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { ProductionEventNode as ProductionEventNodeType } from "./productionEvent.types";

const ProductionEventNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
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
      ].concat(parentId ? "attachNode" : [])}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable}
        content={content}
        width={width}
        height={height}
        fontSize={fontSize}
        color={
          data.color === "default"
            ? "var(--color-white)"
            : "var(--color-slate-900)"
        }
      />
    </DEMONodeBase>
  );
};

export default ProductionEventNode;
