import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive.tsx";
import type { TKExecutionNode as TKExecutionNodeType } from "./tkExecution.types.ts";

const TKExecutionNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TKExecutionNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="tk_execution"
      />
    </>
  );
};

export default TKExecutionNode;
