import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { SelfActivationNode as SelfActivationNodeType } from "./selfActivation.types";
import uuid from "../../../../shared/utils/uuid";

const padding = 4;

const SelfActivationNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<SelfActivationNodeType>) => {
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
        type="self-activation"
      >
        <div
          className={`self-activation-wrapper | absolute top-[50%] left-[50%] translate-[-50%] w-full p-${padding} overflow-hidden text-center`}
          style={{ width: width / 2, height: height / 2 }}
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

export default SelfActivationNode;
