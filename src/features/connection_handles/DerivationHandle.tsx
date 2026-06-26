import {
  EdgeLabelRenderer,
  useInternalNode,
  useViewport,
  ViewportPortal,
} from "@xyflow/react";
import { createPortal } from "react-dom";

type Props = {
  position: "top" | "bottom" | "left" | "right";
  size?: number;
  nodeId: string;
};

const DerivationHandle = ({ position, size = 32, nodeId }: Props) => {
  const internalNode = useInternalNode(nodeId);

  const handleBounds = internalNode?.internals.handleBounds;

  // node's absolute position in the flow
  const { x: nodeX, y: nodeY } = internalNode?.internals.positionAbsolute ?? {
    x: 0,
    y: 0,
  };

  // absolute handle position (flow coords)
  const handleAbsX =
    nodeX +
    (handleBounds?.source?.[0]?.x ?? 0) +
    (handleBounds?.source?.[0]?.width ?? 0) / 2;
  const handleAbsY =
    nodeY +
    (handleBounds?.source?.[0]?.y ?? 0) +
    (handleBounds?.source?.[0]?.height ?? 0) / 2;

  const { x: vpX, y: vpY, zoom } = useViewport();

  const screenX = handleAbsX * zoom + vpX;
  const screenY = handleAbsY * zoom + vpY;

  return (
    <ViewportPortal>
      <div
        className="poo"
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${screenX}px, ${screenY}px)`,
          left: screenX,
          top: handleAbsY,
          width: size,
          height: size,
          backgroundColor: "red",
        }}
      />
      ,
    </ViewportPortal>
  );
};

export default DerivationHandle;
