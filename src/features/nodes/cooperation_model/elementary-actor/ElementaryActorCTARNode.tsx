import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { ElementaryActorCTARNode as ElementaryActorCTARNodeType } from "./elementaryActorCTAR.types";
import uuid from "../../../../shared/utils/uuid";

const padding = 4;

const ElementaryActorCTARNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ElementaryActorCTARNodeType>) => {
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
        type="elementary-actor"
      >
        <div
          className={`elementary-actor-wrapper | absolute top-0 left-[50%] translate-x-[-50%] w-full p-${padding} overflow-hidden text-center`}
          style={{ width: width / 2, height: width / 2 }}
        >
          <div
            aria-label="DEMO Title"
            contentEditable="true"
            suppressContentEditableWarning={true}
            className="block content-center w-full h-full break-all overflow-hidden text-center focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
          >
            {contentWithUUID.map(({ content, id }) => (
              <div key={id}>{content}</div>
            ))}
          </div>
        </div>
      </DEMONodePrimitive>
    </>
  );
};

export default ElementaryActorCTARNode;
