import { NodeResizer, type NodeProps, Handle, Position } from "@xyflow/react";

import DEMOObject from "../features/DEMO_objects/DEMOObject";

import type { DEMOObjectNode as DEMOObjectNodeType } from "../features/DEMO_objects/types";
import { useRef } from "react";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

const padding = 4;

const SelfActivationNode = ({
  id,
  selected,
  data,
  width,
  height,
}: NodeProps<DEMOObjectNodeType>) => {
  const DEMOObjectRef = useRef<SVGSVGElement>(null!);
  const editableRef = useRef<HTMLDivElement>(null!);
  const { type } = data;

  return (
    <>
      <NodeResizer keepAspectRatio={true} isVisible={selected} />
      <DEMOObject
        ref={DEMOObjectRef}
        type={type}
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
          contentEditable="false"
          suppressContentEditableWarning={true}
          className="block content-center w-full h-full break-all overflow-hidden text-center focus-visible:outline-none whitespace-pre-wrap content-not-editable:select-none"
        >
          Transactor
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

export default SelfActivationNode;
