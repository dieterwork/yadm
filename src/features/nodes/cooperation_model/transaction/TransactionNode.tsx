import { NodeResizer, type NodeProps, Handle, Position } from "@xyflow/react";

import { useRef } from "react";
import Shape from "../../../shapes/Shape";
import TransactionShape from "./TransactionShape";
import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

const padding = 4;

const TransactionNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactionNodeType>) => {
  const { content } = data;

  const contentWithUUID = content.map((content) => ({ content, id: uuid() }));

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="transaction"
        resizable={false}
      >
        <EditableContent
          as="input"
          content={content}
          width={width}
          height={height}
        />
        <div
          className={`transaction-wrapper | absolute top-[50%] left-[50%] translate-[-50%] w-full h-full p-${padding} overflow-hidden text-center`}
        >
          <div
            aria-label="DEMO Title"
            contentEditable="true"
            suppressContentEditableWarning={true}
            className="block content-center w-full h-full break-all overflow-hidden text-center focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
          >
            {contentWithUUID.map(({ content }) => (
              <>
                <div>{content}</div>
              </>
            ))}
          </div>
        </div>
      </DEMONodePrimitive>
    </>
  );
};

export default TransactionNode;
