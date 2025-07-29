import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { TransactorNode } from "./transactor.types";
import uuid from "../../../../shared/utils/uuid";

const padding = 4;

const TransactorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<TransactorNode>) => {
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
        type="transactor"
      >
        <div
          className={`transactor-wrapper | absolute bottom-0 left-[50%] translate-x-[-50%] w-full p-${padding} overflow-hidden text-center`}
          style={{ height: height && width ? height - width / 4 : 0 }}
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

export default TransactorNode;
