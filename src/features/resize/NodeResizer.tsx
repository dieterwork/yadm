import { useShallow } from "zustand/react/shallow";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import {
  NodeResizer,
  useUpdateNodeInternals,
  type NodeResizerProps,
  type ResizeDragEvent,
  type ResizeParamsWithDirection,
} from "@xyflow/react";
import { MIN_SIZE_MAP } from "../nodes/utils/consts";
import type { DEMONode } from "../nodes/nodes.types";
import { getNodeHandlesOnResize } from "./getNodeHandlesOnResize";

const DEMONodeResizer = ({
  nodeId,
  keepAspectRatio = false,
  isVisible,
  type,
  ...restProps
}: NodeResizerProps & { type: DEMONode["type"] }) => {
  if (!nodeId) throw new Error("Could not find nodeId");

  const updateNodeInternals = useUpdateNodeInternals();

  const { getNode, getChildrenNodes, updateNodeExtent, updateNodeHandles } =
    useDEMOModeler(
      useShallow((state) => ({
        getNode: state.getNode,
        getChildrenNodes: state.getChildrenNodes,
        updateNodeExtent: state.updateNodeExtent,
        updateNodeHandles: state.updateNodeHandles,
      }))
    );

  const node = getNode(nodeId);

  // const changeChildExtent = () => {
  //   const parentNode = getNode(nodeId);
  //   const childrenNodes = getChildrenNodes(nodeId);
  //   if (!parentNode?.width || !parentNode?.height) return;

  //   for (const child of childrenNodes) {
  //     if (!child || !child?.extent || child?.extent === "parent") return;
  //     updateNodeExtent(child.id, [
  //       [12.5, 12.5],
  //       [parentNode.width - 12.5, parentNode.height - 12.5],
  //     ]);
  //   }
  // };

  const changeHandles = (params: ResizeParamsWithDirection) => {
    updateNodeHandles(nodeId, (handles) => {
      return getNodeHandlesOnResize({
        width: params.width,
        height: params.height,
        direction: params.direction,
        handles,
      });
    });
    updateNodeInternals(nodeId);
  };

  const onResize = (e: ResizeDragEvent, params: ResizeParamsWithDirection) => {
    // changeChildExtent();
    changeHandles(params);
    restProps.onResize && restProps?.onResize(e, params);
  };

  return (
    <NodeResizer
      {...restProps}
      isVisible={isVisible}
      onResize={onResize}
      minHeight={MIN_SIZE_MAP[type].height}
      minWidth={MIN_SIZE_MAP[type].width}
      lineClassName="node-resizer-line"
      handleClassName="node-resizer-handle"
    />
  );
};
export default DEMONodeResizer;
