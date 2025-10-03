import {
  Position,
  useViewport,
  type Align,
  type XYPosition,
} from "@xyflow/react";
import type { CSSProperties, HTMLAttributes } from "react";
import EdgeToolbarPortal from "./EdgeToolbarPortal";
import { cn } from "@sglara/cn";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import { getEdgeToolbarTransform } from "./utils/getEdgeToolbarTransform";

/**
 * @expand
 */
export type EdgeToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * By passing in an array of edge id's you can render a single tooltip for a group or collection
   * of edges.
   */
  edgeId?: string | string[];
  /** If `true`, edge toolbar is visible even if edge is not selected. */
  isVisible?: boolean;
  /**
   * Position of the toolbar relative to the edge.
   * @default Position.Top
   * @example Position.TopLeft, Position.TopRight, Position.BottomLeft, Position.BottomRight
   */
  position?: Position;
  /**
   * The space between the edge and the toolbar, measured in pixels.
   * @default 10
   */
  offset?: number;
  /**
   * Align the toolbar relative to the edge.
   * @default "center"
   * @example Align.Start, Align.Center, Align.End
   */
  align?: Align;
  xyPosition?: XYPosition;
};

/**
 * This component can render a toolbar or tooltip to one side of a custom node. This
 * toolbar doesn't scale with the viewport so that the content is always visible.
 *
 * @public
 * @example
 * ```jsx
 *import { memo } from 'react';
 *import { Handle, Position, NodeToolbar } from '@xyflow/react';
 *
 *function CustomNode({ data }) {
 *  return (
 *    <>
 *      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
 *        <button>delete</button>
 *        <button>copy</button>
 *        <button>expand</button>
 *      </NodeToolbar>
 *
 *      <div style={{ padding: '10px 20px' }}>
 *        {data.label}
 *      </div>
 *
 *      <Handle type="target" position={Position.Left} />
 *      <Handle type="source" position={Position.Right} />
 *    </>
 *  );
 *};
 *
 *export default memo(CustomNode);
 *```
 * @remarks By default, the toolbar is only visible when a node is selected. If multiple
 * nodes are selected it will not be visible to prevent overlapping toolbars or
 * clutter. You can override this behavior by setting the `isVisible` prop to `true`.
 */
const EdgeToolbar = ({
  edgeId,
  children,
  className,
  style,
  isVisible,
  position = Position.Top,
  offset = 10,
  align = "center",
  xyPosition,
  ...restProps
}: EdgeToolbarProps) => {
  xyPosition = xyPosition ?? { x: 0, y: 0 };

  const { x, y, zoom } = useViewport();
  const edges = useDEMOModelerStore((state) => {
    if (!edgeId) {
      return state.edges;
    }

    return state.edges.filter((edge) =>
      Array.isArray(edgeId) ? edgeId.includes(edge.id) : edge.id === edgeId
    );
  });
  const selectedEdges = edges.filter((edge) => edge.selected);

  // if isVisible is not set, we show the toolbar only if its node is selected and no other node is selected
  const isActive =
    typeof isVisible === "boolean" ? isVisible : selectedEdges.length === 1;

  if (!isActive || !selectedEdges) {
    return null;
  }

  const zIndex = Math.max(...edges.map((edge) => (edge?.zIndex ?? 0) + 1));

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    transform: getEdgeToolbarTransform(
      xyPosition,
      { x, y, zoom },
      position,
      offset,
      align
    ),
    zIndex,
    ...style,
  };

  return (
    <EdgeToolbarPortal>
      <div
        {...restProps}
        style={wrapperStyle}
        className={cn("react-flow__edge-toolbar", className)}
      >
        {children}
      </div>
    </EdgeToolbarPortal>
  );
};

export default EdgeToolbar;
