import { type NodeProps, type NodeResizerProps } from "@xyflow/react";
import { shapeMap } from "../shapes/shapeMap";
import Shape from "../shapes/Shape";
import { useRef, type ReactNode } from "react";
import NodeToolbar from "../node-toolbar/NodeToolbar";
import { MIN_SIZE_MAP } from "./utils/consts";
import type { DEMONode } from "./nodes.types";
import DEMONodeResizer from "../resize/NodeResizer";
import Handles from "../handles/Handles";

interface DEMONodePrimitiveProps extends NodeProps<DEMONode> {
  resizable?: boolean;
  keepAspectRatio?: boolean;
  children: ReactNode;
  actions?: Action[] | null;
  resizerProps?: NodeResizerProps;
}

type Action =
  | "changeColor"
  | "delete"
  | "changeFontSize"
  | "connect"
  | "addConnectionHandle";

const DEMONodePrimitive = ({
  id,
  data,
  selected,
  width,
  height,
  type,
  resizable = true,
  keepAspectRatio = false,
  children,
  actions = [
    "changeColor",
    "delete",
    "changeFontSize",
    "connect",
    "addConnectionHandle",
  ],
  resizerProps,
}: DEMONodePrimitiveProps) => {
  if (type === "text_node")
    throw new Error("Cannot render node primitive with text node");

  const DEMOShape = shapeMap[type];
  const shapeRef = useRef<SVGSVGElement>(null!);

  return (
    <div style={{ width, height }}>
      {/* Controls */}
      {actions && (
        <NodeToolbar id={id} data={data} type={type} actions={actions} />
      )}
      {resizable && (
        <DEMONodeResizer
          {...resizerProps}
          nodeId={id}
          keepAspectRatio={keepAspectRatio}
          isVisible={selected}
          minHeight={MIN_SIZE_MAP[type].height}
          minWidth={MIN_SIZE_MAP[type].width}
          lineClassName="node-resizer-line"
          handleClassName="node-resizer-handle"
          type={type}
        />
      )}
      {data?.handles && (
        <Handles
          nodeId={id}
          handles={data.handles}
          nodeDimensions={{ width, height }}
        />
      )}
      {/* Shape */}
      {DEMOShape && (
        <Shape ref={shapeRef} width={width} height={height} strokeWidth={2}>
          <DEMOShape
            state={data?.state}
            scope={data?.scope}
            color={data?.color}
          />
        </Shape>
      )}
      {children}
    </div>
  );
};

export default DEMONodePrimitive;
