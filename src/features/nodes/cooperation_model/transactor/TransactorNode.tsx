import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactorNode as TransactorNodeType } from "./transactor.types";
import EditableContent from "../../../editable_content/EditableContent";
import { MEDIUM_NODE_SIZE } from "../../utils/consts";

const TransactorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactorNodeType>) => {
  const { content } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="transactor"
      >
        <EditableContent
          width={width}
          height={height ? height - MEDIUM_NODE_SIZE / 2 : undefined}
          style={{ bottom: 0, top: "auto" }}
          content={content}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default TransactorNode;
