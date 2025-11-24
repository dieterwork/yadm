import { NodeResizer, type NodeResizerProps } from "@xyflow/react";
import { MIN_SIZE_MAP } from "../nodes/utils/consts";
import type { DEMONode } from "../nodes/nodes.types";
import useTemporalDEMOModelerStore from "../modeler/useTemporalDEMOModelerStore";

const DEMONodeResizer = ({
  nodeId,
  type,
  onResizeStart,
  onResize,
  onResizeEnd,
  ...restProps
}: NodeResizerProps & { type: DEMONode["type"] }) => {
  if (!nodeId) throw new Error("Could not find nodeId");

  const { pause, resume, isTracking } = useTemporalDEMOModelerStore(
    (state) => state
  );

  return (
    <NodeResizer
      {...restProps}
      onResizeStart={(...args) => {
        onResizeStart && onResizeStart(...args);
      }}
      onResize={(...args) => {
        onResize && onResize(...args);
        if (isTracking) pause();
      }}
      onResizeEnd={(...args) => {
        onResizeEnd && onResizeEnd(...args);
        if (!isTracking) resume();
      }}
      minHeight={MIN_SIZE_MAP[type].height}
      minWidth={MIN_SIZE_MAP[type].width}
      lineClassName="node-resizer-line"
      handleClassName="node-resizer-handle"
    />
  );
};
export default DEMONodeResizer;
