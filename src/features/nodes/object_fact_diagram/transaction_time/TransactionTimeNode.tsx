import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactionTimeNode as TransactionTimeNodeType } from "./transactionTime.types";
import { SMALL_NODE_SIZE } from "../../utils/consts";

const TransactionTimeNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionTimeNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="transaction_time"
        actions={["changeColor", "delete", "toggleConnectionHandlesVisibility"]}
        resizerProps={{ maxHeight: SMALL_NODE_SIZE }}
      />
    </>
  );
};

export default TransactionTimeNode;
