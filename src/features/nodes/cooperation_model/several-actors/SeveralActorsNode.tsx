import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { SeveralActorsNode as SeveralActorsNodeType } from "./severalActors.types";
import uuid from "../../../../shared/utils/uuid";
import { calculateDoubleDiamondInCircleDimensions } from "../../../shapes/utils/calculateDoubleDiamondInCircleDimensions";

const padding = 4;

const SeveralActorsNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<SeveralActorsNodeType>) => {
  const { content } = data;

  const contentWithUUID = content.map((content) => ({ content, id: uuid() }));

  const doubleDiamondInCircleWidth = calculateDoubleDiamondInCircleDimensions(
    100,
    1 / 8
  );

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="several-actors"
      >
        <div
          className={`several-actors-wrapper | absolute top-0 translate-x-[-50%] w-[100px] h-[100px] p-${padding} overflow-hidden text-center`}
          style={{ left: `calc(50% - ${100 / 8}px)` }}
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

export default SeveralActorsNode;
