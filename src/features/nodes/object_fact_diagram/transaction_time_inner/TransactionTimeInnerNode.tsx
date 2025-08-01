import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactionTimeInnerNode as TransactionTimeInnerNodeType } from "./transactionTimeInner.types";

const TransactionTimeInnerNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionTimeInnerNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="transaction_time_inner"
      />
    </>
  );
};

export default TransactionTimeInnerNode;
