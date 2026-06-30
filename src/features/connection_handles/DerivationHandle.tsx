import { ja } from "zod/v4/locales";
import { getEdge } from "../modeler/store/useDEMOModelerStore";
import AggregationHandle from "./AggregationHandle";
import GeneralisationHandle from "./GeneralisationHandle";
import getDerivationRotation from "./utils/getDerivationRotation";
import { Position, useInternalNode } from "@xyflow/react";
import { useEffect } from "react";

type Props = {
  size?: number;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  linePath?: string;
  nodeId: string;
  derivation?: "generalisation" | "aggregation" | "none";
};

const DerivationHandle = ({
  size = 32,
  source,
  target,
  sourceHandle,
  targetHandle,
  linePath,
  nodeId,
  derivation = "none",
}: Props) => {
  if (!source || !target || !sourceHandle || !targetHandle) return null;
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const sourceXYPosition = sourceNode?.internals.positionAbsolute ?? {
    x: 0,
    y: 0,
  };
  const targetXYPosition = targetNode?.internals.positionAbsolute ?? {
    x: 0,
    y: 0,
  };

  const sourceH = sourceNode?.internals.handleBounds?.source?.find(
    (h) => h.id === sourceHandle,
  );
  const targetH = targetNode?.internals.handleBounds?.source?.find(
    (h) => h.id === targetHandle,
  );

  const sourceX =
    sourceXYPosition.x + (sourceH?.x ?? 0) + (sourceH?.width ?? 0) / 2;
  const sourceY =
    sourceXYPosition.y + (sourceH?.y ?? 0) + (sourceH?.height ?? 0) / 2;
  const targetX =
    targetXYPosition.x + (targetH?.x ?? 0) + (targetH?.width ?? 0) / 2;
  const targetY =
    targetXYPosition.y + (targetH?.y ?? 0) + (targetH?.height ?? 0) / 2;

  const rotation = getDerivationRotation({
    source: { x: sourceX, y: sourceY },
    target: { x: targetX, y: targetY },
    sourcePosition: sourceH?.position ?? Position.Left,
    targetPosition: targetH?.position ?? Position.Right,
    linePath,
  });

  if (derivation === "aggregation") {
    return <AggregationHandle rotation={rotation} />;
  } else if (derivation === "generalisation") {
    return <GeneralisationHandle rotation={rotation} />;
  } else {
    return null;
  }
};

export default DerivationHandle;
