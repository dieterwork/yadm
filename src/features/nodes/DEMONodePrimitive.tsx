import { Handle, NodeResizer, Position, type NodeProps } from "@xyflow/react";
import { shapeMap } from "../shapes/shapeMap";
import Shape from "../shapes/Shape";
import { useRef, type ReactNode } from "react";
import NodeToolbar from "../node-toolbar/NodeToolbar";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

interface DEMONodePrimitiveProps extends NodeProps<ActorNode> {
  children: ReactNode;
}

const DEMONodePrimitive = ({
  id,
  data,
  selected,
  width,
  height,
  type,
  children,
}: DEMONodePrimitiveProps) => {
  const DEMOShape = shapeMap[type];
  if (!DEMOShape) return null;

  const shapeRef = useRef<SVGSVGElement>(null!);

  const { state, scope, color } = data;

  return (
    <div>
      {/* Controls */}
      <NodeToolbar id={id} data={data} type={type} />
      <NodeResizer keepAspectRatio={false} isVisible={selected} />
      {handlePositions.map((position) => (
        <Handle
          id={position}
          type="source"
          position={position}
          key={position}
        />
      ))}
      {/* Shape */}
      <Shape ref={shapeRef} width={width} height={height} strokeWidth={2}>
        <DEMOShape state={state} scope={scope} color={color} />
      </Shape>
      {/* Children Content */}
      {children}
    </div>
  );
};

export default DEMONodePrimitive;
