import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { ElementaryActorNode as ElementaryActorNodeType } from "./elementaryActor.types";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";
import { DEFAULT_SIZE_MAP } from "../../utils/consts";

const padding = 4;

const ElementaryActorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ElementaryActorNodeType>) => {
  const { content, fontSize, isEditable } = data;

  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="elementary_actor"
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
          style={{ bottom: "auto" }}
          fontSize={fontSize}
          maxLength={50}
        />
      </DEMONodeBase>
    </>
  );
};

export default ElementaryActorNode;
