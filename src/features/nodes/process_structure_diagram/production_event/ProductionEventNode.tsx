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
}: NodeProps<ProductionEventNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="production_event"
        keepAspectRatio={true}
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
          fontSize={fontSize}
          color={
            data.color === "default"
              ? "var(--color-white)"
              : "var(--color-slate-900)"
          }
        />
      </DEMONodeBase>
    </>
  );
};

export default ProductionEventNode;
