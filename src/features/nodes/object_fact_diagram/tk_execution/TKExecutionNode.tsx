import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase.tsx";
import type { TKExecutionNode as TKExecutionNodeType } from "./tkExecution.types.ts";

const TKExecutionNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<TKExecutionNodeType>) => {
  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        draggable={draggable}
        type="tk_execution"
        actions={[
          "delete",
          "changeColor",
          "attachNode",
          "toggleHandlesVisibility",
        ]}
      />
    </>
  );
};

export default TKExecutionNode;
