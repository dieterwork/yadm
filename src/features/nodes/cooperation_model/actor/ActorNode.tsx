import { NodeResizer, Handle, Position, type NodeProps } from "@xyflow/react";

import { useRef } from "react";
import type { ActorNode } from "./actor.types";
import ActorShape from "./ActorShape";
import Shape from "../../../shapes/Shape";
import NodeToolbar from "../../../node-toolbar/NodeToolbar";
import uuid from "../../../../shared/utils/uuid";
import DEMONodePrimitive from "../../DEMONodePrimitive";

const padding = 4;

const ActorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ActorNode>) => {
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
        type="actor"
      >
        <div
          className={`actor-wrapper | absolute top-[50%] left-[50%] translate-[-50%] w-full h-full p-${padding} overflow-hidden text-center`}
        >
          {data.state !== "unclear" && (
            <div
              aria-label="DEMO Title"
              contentEditable="true"
              suppressContentEditableWarning={true}
              className="block content-center w-full h-full break-all overflow-hidden text-center focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none [&>:first-child]:font-bold"
            >
              {contentWithUUID.map(({ content, id }) => (
                <div key={id}>{content}</div>
              ))}
            </div>
          )}
        </div>
      </DEMONodePrimitive>
    </>
  );
};

export default ActorNode;
