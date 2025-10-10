import {
  useConnection,
  type NodeProps,
  type NodeResizerProps,
} from "@xyflow/react";
import { shapeMap } from "../shapes/shapeMap";
import Shape from "../shapes/Shape";
import { useRef, type ReactNode } from "react";
import NodeToolbar from "../node-toolbar/DEMONodeToolbar";
import { MIN_SIZE_MAP } from "./utils/consts";
import type { DEMONode } from "./nodes.types";
import DEMONodeResizer from "../resize/NodeResizer";
import Handles from "../connection_handles/Handles";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "../modeler/useDEMOModelerStore";

interface DEMONodeBaseProps extends NodeProps<DEMONode> {
  resizable?: boolean;
  keepAspectRatio?: boolean;
  children: ReactNode;
  actions?: NodeToolbarAction[] | null;
  resizerProps?: NodeResizerProps;
}

export type NodeToolbarAction =
  | "changeColor"
  | "delete"
  | "changeFontSize"
  | "addHandle"
  | "toggleHandlesVisibility"
  | "attachNode"
  | "changeScope"
  | "changeState"
  | "editText"
  | "showBorder";

const DEMONodeBase = ({
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
    "addHandle",
    "toggleHandlesVisibility",
    "editText",
  ],
  resizerProps,
}: DEMONodeBaseProps) => {
  if (type === "text")
    throw new Error("Cannot render node primitive with text node");

  const DEMOShape = shapeMap[type];
  const shapeRef = useRef<SVGSVGElement>(null!);

  const { inProgress: isConnectionInProgress } = useConnection();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isExportEnabled = useDEMOModelerStore((state) => state.isExportEnabled);

  return (
    <div className={cn(`${type}_node | `, "isolate")} style={{ width, height }}>
      {/* Controls */}
      {actions && !isConnectionInProgress && isEnabled && !isExportEnabled && (
        <NodeToolbar nodeId={id} actions={actions} />
      )}
      {resizable && isEnabled && !isExportEnabled && (
        <DEMONodeResizer
          {...resizerProps}
          nodeId={id}
          keepAspectRatio={keepAspectRatio}
          isVisible={selected}
          minHeight={MIN_SIZE_MAP[type]?.height}
          minWidth={MIN_SIZE_MAP[type]?.width}
          lineClassName="node-resizer-line"
          handleClassName="node-resizer-handle"
          type={type}
        />
      )}
      {data?.handles && isEnabled && !isExportEnabled && (
        <Handles
          nodeId={id}
          handles={data?.handles}
          width={width}
          height={height}
        />
      )}
      {/* Shape */}
      {DEMOShape && (
        <Shape
          ref={shapeRef}
          width={width}
          height={height}
          strokeWidth={2}
          isHighlighted={
            selected && !resizable && isEnabled && !isExportEnabled
          }
        >
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

export default DEMONodeBase;
