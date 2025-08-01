import { type NodeProps } from "@xyflow/react";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactionTimeNode as TransactionTimeNodeType } from "./transactionTime.types";

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
      />
    </>
  );
};

export default TransactionTimeNode;
