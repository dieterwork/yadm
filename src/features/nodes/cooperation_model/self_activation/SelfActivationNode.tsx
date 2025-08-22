import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
import type { SelfActivationNode as SelfActivationNodeType } from "./selfActivation.types";
import uuid from "../../../../shared/utils/uuid";
import { DEFAULT_SIZE_MAP } from "../../utils/consts";
import EditableContent from "../../../editable_content/EditableContent";

const padding = 4;

const SelfActivationNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<SelfActivationNodeType>) => {
  const { content, fontSize } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="self_activation"
      >
        <EditableContent
          content={content}
          width={DEFAULT_SIZE_MAP["transaction"].width}
          height={DEFAULT_SIZE_MAP["transaction"].height}
          editable={true}
          fontSize={fontSize}
          maxLength={50}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default SelfActivationNode;
