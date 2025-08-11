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
  const { content } = data;

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
          as="input"
          content={content}
          width={width}
          height={height}
          editable={true}
          color={
            data.color === "default"
              ? "var(--color-white)"
              : "var(--color-black)"
          }
          size="large"
        />
      </DEMONodePrimitive>
    </>
  );
};

export default ProductionEventNode;
