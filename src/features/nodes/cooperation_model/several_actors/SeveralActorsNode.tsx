import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { SeveralActorsNode as SeveralActorsNodeType } from "./severalActors.types";
import uuid from "../../../../shared/utils/uuid";
import { calculateDoubleDiamondInCircleDimensions } from "../../../shapes/utils/calculateDoubleDiamondInCircleDimensions";
import EditableContent from "../../../editable_content/EditableContent";
import { DEFAULT_SIZE_MAP } from "../../utils/consts";

const padding = 4;

const SeveralActorsNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<SeveralActorsNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="several_actors"
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
          style={{ bottom: "auto", right: 100 / 8 }}
          fontSize={fontSize}
          maxLength={50}
        />
      </DEMONodeBase>
    </>
  );
};

export default SeveralActorsNode;
