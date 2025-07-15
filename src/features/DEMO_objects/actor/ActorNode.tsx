import { NodeResizer, type NodeProps, Handle, Position } from "@xyflow/react";

import DEMOObject from "../DEMOObject";

import type { DEMOObjectNode as DEMOObjectNodeType } from "../types";
import { useRef } from "react";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

const padding = 4;

const ActorNode = ({
  id,
  selected,
  data,
  width,
  height,
}: NodeProps<DEMOObjectNodeType>) => {
  const DEMOObjectRef = useRef<SVGSVGElement>(null!);
  const editableRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <NodeResizer keepAspectRatio={true} isVisible={selected} />
      <DEMOObject
        ref={DEMOObjectRef}
        type="actor"
        width={width}
        height={height}
        strokeWidth={2}
        fillOpacity={0.8}
      />
      <div
        className={`actor-wrapper | absolute top-[50%] left-[50%] translate-[-50%] w-full h-full p-${padding} overflow-hidden text-center`}
      >
        <div
          ref={editableRef}
          aria-label="DEMO Title"
          contentEditable="true"
          suppressContentEditableWarning={true}
          className="block content-center w-full h-full break-all overflow-hidden text-center focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
        >
          Actor
        </div>
      </div>
      {handlePositions.map((position) => (
        <Handle
          id={position}
          type="source"
          position={position}
          key={position}
        />
      ))}
    </>
  );
};

export default ActorNode;
