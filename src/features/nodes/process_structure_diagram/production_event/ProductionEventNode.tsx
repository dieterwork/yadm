import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import EditableContent from "../../../editable_content/EditableContent";
import type { ProductionEventNode as ProductionEventNodeType } from "./productionEvent.types";

const ProductionEventNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ProductionEventNodeType>) => {
  const { content, fontSize } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="production_event"
      >
        <EditableContent
          content={content}
          width={width}
          height={height}
          editable={true}
          fontSize={fontSize}
          color={
            data.color === "default"
              ? "var(--color-white)"
              : "var(--color-black)"
          }
        />
      </DEMONodePrimitive>
    </>
  );
};

export default ProductionEventNode;
