import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactorNode as TransactorNodeType } from "./transactor.types";
import EditableContent from "../../../editable_content/EditableContent";

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
          style={{ height: height && width ? height - width / 4 : 0 }}
          content={content}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default TransactorNode;
