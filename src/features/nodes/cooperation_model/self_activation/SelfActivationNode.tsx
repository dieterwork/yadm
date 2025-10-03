import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
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
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="self_activation"
        actions={[
          "addHandle",
          "changeColor",
          "changeFontSize",
          "delete",
          "toggleHandlesVisibility",
          "changeState",
          "editText",
        ]}
      >
        <EditableContent
          isSelected={selected}
          isEditable={isEditable}
          content={content}
          width={DEFAULT_SIZE_MAP["transaction"].width}
          height={DEFAULT_SIZE_MAP["transaction"].height}
          fontSize={fontSize}
          maxLength={50}
        />
      </DEMONodeBase>
    </>
  );
};

export default SelfActivationNode;
