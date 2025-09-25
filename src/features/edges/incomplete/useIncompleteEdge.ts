import { convertAbsoluteToParentRelativePosition } from "$/features/nodes/utils/convertAbsoluteToParentRelativePosition";
import uuid from "$/shared/utils/uuid";
import {
  MarkerType,
  Position,
  useReactFlow,
  type OnConnectEnd,
} from "@xyflow/react";
import type { DEMOEdge } from "../edges.types";
import { SMALL_NODE_SIZE } from "$/features/nodes/utils/consts";
import { addEdge, addNode } from "$/features/modeler/useDEMOModeler";
import type { GhostNode } from "$/features/nodes/ghost/ghost.types";
import getEdgeType from "$/features/modeler/utils/getEdgeType";
import type { DEMONode } from "$/features/nodes/nodes.types";
import getMarkerType from "$/features/modeler/utils/getMarkerType";

const getPosition = (fromPosition: Position | null) => {
  switch (fromPosition) {
    case Position.Top:
      return Position.Bottom;
    case Position.Left:
      return Position.Right;
    case Position.Right:
      return Position.Left;
    case Position.Bottom:
      return Position.Top;
    default:
      return Position.Top;
  }
};

export const useIncompleteEdge = () => {
  const { screenToFlowPosition } = useReactFlow();
  const onConnectEnd: OnConnectEnd = (event, connectionState) => {
    if (
      connectionState.isValid ||
      connectionState.fromHandle?.type === "target" ||
      !connectionState.fromNode
    ) {
      return;
    }
    const fromNodeId = connectionState.fromNode?.id;
    const fromNodeType = connectionState.fromNode?.type as DEMONode["type"];
    const ghostId = `ghost_${uuid()}`;
    const { clientX, clientY } =
      "changedTouches" in event ? event.changedTouches[0] : event;

    const position = screenToFlowPosition({
      x: clientX,
      y: clientY,
    });

    const relativeParentCoordinates = convertAbsoluteToParentRelativePosition({
      absolutePosition: position,
      parentAbsolutePosition: connectionState.fromNode?.position,
    });

    const ghostNode = {
      id: ghostId,
      type: "ghost",
      position:
        fromNodeType === "transaction_time"
          ? {
              x: relativeParentCoordinates.x,
              y: SMALL_NODE_SIZE / 2 + 2,
            }
          : position,
      data: { position: getPosition(connectionState.fromPosition) },
      parentId: fromNodeType === "transaction_time" ? fromNodeId : undefined,
    } satisfies GhostNode;

    const newEdgeType = getEdgeType(fromNodeType, "ghost");
    const newEdgeMarker = getMarkerType(fromNodeType, "ghost");
    const newEdge = {
      id: `${fromNodeId}->${ghostId}`,
      source: fromNodeId,
      target: ghostId,
      reconnectable: "target",
      type: newEdgeType,
      sourceHandle: connectionState.fromHandle?.id,
      ...newEdgeMarker,
    } satisfies DEMOEdge;

    addNode(ghostNode);
    addEdge(newEdge);
  };
  return onConnectEnd;
};
