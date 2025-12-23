import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { TransactionTimeNode as TransactionTimeNodeType } from "./transactionTime.types";
import { SMALL_NODE_SIZE } from "../../utils/consts";

const TransactionTimeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<TransactionTimeNodeType>) => {
  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      draggable={draggable}
      type="transaction_time"
      actions={["changeColor", "toggleHandlesVisibility"].concat(
        parentId ? "attachNode" : []
      )}
      resizerProps={{ maxHeight: SMALL_NODE_SIZE }}
    />
  );
};

export default TransactionTimeNode;
