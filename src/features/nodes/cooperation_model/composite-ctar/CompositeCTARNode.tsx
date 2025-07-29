import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { CompositeCTARNode as CompositeCTARNodeType } from "./compositeCTAR.types";
import uuid from "../../../../shared/utils/uuid";

const padding = 4;

const CompositeCTARNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<CompositeCTARNodeType>) => {
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
        type="composite-ctar"
      >
        <div
          className={`composite-ctar-wrapper | absolute top-[50%] left-[50%] translate-[-50%] w-full h-full p-${padding} overflow-hidden text-center`}
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

export default CompositeCTARNode;
