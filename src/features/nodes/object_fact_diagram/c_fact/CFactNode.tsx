import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive.tsx";
import type { CFactNode as CFactNodeType } from "./cFact.types.ts";

const CFactNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<CFactNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        resizable={false}
        type="c_fact"
      />
    </>
  );
};

export default CFactNode;
