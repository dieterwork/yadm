import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive.tsx";
import type { CActNode as CActNodeType } from "./cAct.types.ts";

const CActNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<CActNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="c_act"
      />
    </>
  );
};

export default CActNode;
