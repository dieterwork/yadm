import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive";
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
  const { content } = data;

  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="elementary_actor"
      >
        <EditableContent
          content={content}
          width={DEFAULT_SIZE_MAP["transaction"].width}
          height={DEFAULT_SIZE_MAP["transaction"].height}
          editable={true}
          style={{ bottom: "auto" }}
        />
      </DEMONodePrimitive>
    </>
  );
};

export default ElementaryActorNode;
