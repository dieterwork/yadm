import {
  useConnection,
  type NodeProps,
  type NodeResizerProps,
} from "@xyflow/react";
import { shapeMap } from "../shapes/shapeMap";
import Shape from "../shapes/Shape";
import { useRef, type ReactNode, type RefObject } from "react";
import NodeToolbar from "../node_toolbar/DEMONodeToolbar";
import { MIN_SIZE_MAP } from "./utils/consts";
import type { DEMONode } from "./nodes.types";
import DEMONodeResizer from "../resize/NodeResizer";
import Handles from "../connection_handles/Handles";
import {
  getNode,
  useDEMOModelerStore,
} from "../modeler/store/useDEMOModelerStore";
import { cn } from "@sglara/cn";
import useParentDrag from "./utils/useParentDrag";

const NO_SHAPE_NODES = [
  "transactor",
  "several_actors",
  "elementary_actor",
  "self_activation",
  "set",
];

interface DEMONodeBaseProps extends Omit<NodeProps<DEMONode>, "dragHandle"> {
  resizable?: boolean;
  keepAspectRatio?: boolean;
  children: ReactNode;
  actions?: NodeToolbarAction[] | null;
  resizerProps?: NodeResizerProps;
  dragHandle?: boolean;
  dragParent?: boolean;
  ref?: RefObject<HTMLDivElement>;
  className?: string;
  parentId?: string;
}

export type NodeToolbarAction =
  | "changeColor"
  | "changeFontSize"
  | "addHandle"
  | "toggleHandlesVisibility"
  | "attachNode"
  | "changeFocus"
  | "changeState"
  | "editText"
  | "showBorder"
  | "sendToBack"
  | "bringToFront";

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
    "changeFontSize",
    "addHandle",
    "toggleHandlesVisibility",
    "editText",
  ],
  resizerProps,
  draggable,
  dragging,
  dragParent,
  className,
  parentId,
}: DEMONodeBaseProps) => {
  const { inProgress: isConnectionInProgress } = useConnection();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const isExportEnabled = useDEMOModelerStore((state) => state.isExportEnabled);
  const action = useDEMOModelerStore((state) => state.action);
  const ref = useRef<HTMLDivElement>(null);

  const shapeRef = useRef<SVGSVGElement>(null!);
  const node = getNode(id);
  const DEMOShape = shapeMap[type];

  useParentDrag(parentId, ref, dragParent);

  if (!node) return;

  if (type === "text") {
    throw new Error("Cannot render node primitive with text node");
  }

  return (
    <div
      ref={ref}
      className={cn(
        "isolate",
        className,
        !!parentId &&
          !!dragParent &&
          isEnabled &&
          "nopan cursor-grab active:cursor-grabbing",
      )}
      style={{ width, height }}
    >
      {/* Controls */}
      {!isConnectionInProgress &&
        isEnabled &&
        !isExportEnabled &&
        action !== "attach" && <NodeToolbar nodeId={id} actions={actions} />}
      {resizable && isEnabled && !isExportEnabled && (
        <DEMONodeResizer
          {...resizerProps}
          nodeId={id}
          keepAspectRatio={keepAspectRatio}
          isVisible={selected && !dragging}
          minHeight={MIN_SIZE_MAP[type]?.height}
          minWidth={MIN_SIZE_MAP[type]?.width}
          lineClassName="node-resizer-line"
          handleClassName="node-resizer-handle"
          type={type}
        />
      )}
      {"handles" in data && data.handles && !isExportEnabled && (
        <Handles
          nodeId={id}
          handles={data?.handles}
          width={width}
          height={height}
        />
      )}
      {/* Shape */}
      {DEMOShape && !NO_SHAPE_NODES.includes(type) && (
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
            state={"state" in data ? data.state : undefined}
            focus={"focus" in data ? data.focus : undefined}
            color={"color" in data ? data.color : undefined}
          />
        </Shape>
      )}
      {children}
    </div>
  );
};

export default DEMONodeBase;
