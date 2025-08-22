import { Handle, Position, type NodeProps } from "@xyflow/react";

import type { ActorNode as ActorNodeType } from "./actor.types";
import DEMONodePrimitive from "../../DEMONodePrimitive";
import EditableContent from "../../../editable_content/EditableContent";
import { MEDIUM_NODE_SIZE } from "../../utils/consts";
import { getHandleParams } from "../../utils/getHandleArray";
import uuid from "../../../../shared/utils/uuid";
import { useEffect, useState } from "react";
import { useResizerHandles } from "../../../resize/useResizer";

const handleRightArr = [{ id: uuid(), style: { right: 0 } }];
const handleTopArr = [{ id: uuid(), style: { top: 0 } }];
const handleBottomArr = [{ id: uuid(), style: { bottom: 0 } }];
const ActorNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<ActorNodeType>) => {
  const { content, fontSize } = data;

  const { topArray, bottomArray, leftArray, rightArray } = useResizerHandles({
    top: true,
    bottom: true,
    left: true,
    right: true,
    width,
    height,
  });

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
        <EditableContent
          content={content}
          width={width}
          height={height}
          editable={true}
          fontSize={fontSize}
          maxLength={60}
        />
        {topArray &&
          topArray.map(({ id, style }) => (
            <Handle
              id={id}
              position={Position.Top}
              type="source"
              style={style}
            />
          ))}
        {bottomArray &&
          bottomArray.map(({ id, style }) => (
            <Handle
              id={id}
              position={Position.Bottom}
              type="source"
              style={style}
            />
          ))}
        {leftArray &&
          leftArray.map(({ id, style }) => (
            <Handle
              id={id}
              position={Position.Left}
              type="source"
              style={style}
            />
          ))}
        {rightArray &&
          rightArray.map(({ id, style }) => (
            <Handle
              id={id}
              position={Position.Right}
              type="source"
              style={style}
            />
          ))}
      </DEMONodePrimitive>
    </>
  );
};

export default ActorNode;
