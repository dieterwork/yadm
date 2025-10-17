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
import {
  addEdge,
  addNode,
  getNode,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { GhostNode } from "$/features/nodes/ghost/ghost.types";
import getEdgeType from "$/features/modeler/utils/getEdgeType";
import getMarkerType from "$/features/modeler/utils/getMarkerType";
import convertAbsoluteToRelativePosition from "$/features/nodes/utils/convertAbsoluteToRelativePosition";

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
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const onConnectEnd: OnConnectEnd = (event, connectionState) => {
    console.log(connectionState);
    if (
      connectionState.isValid ||
      connectionState.fromHandle?.type === "target" ||
      !connectionState.fromNode
    ) {
      return;
    }
    const fromNode = connectionState.fromNode;
    const fromPosition = connectionState.fromPosition;
    const ghostId = `ghost_${uuid()}`;
    const { clientX, clientY } =
      "changedTouches" in event ? event.changedTouches[0] : event;

    const position = screenToFlowPosition({
      x: clientX,
      y: clientY,
    });

    const parentNode = getNode(fromNode.id);

    const relativeParentCoordinates = convertAbsoluteToRelativePosition(
      position,
      parentNode,
      nodes
    );

    const ghostNode = {
      id: ghostId,
      type: "ghost",
      position:
        fromNode?.type === "transaction_time"
          ? {
              x:
                fromPosition === "left"
                  ? (relativeParentCoordinates.x ?? 0) > 0
                    ? -20
                    : relativeParentCoordinates.x ?? 0
                  : fromNode.measured.width &&
                    (relativeParentCoordinates.x ?? 0) < fromNode.measured.width
                  ? fromNode.measured.width + 20
                  : relativeParentCoordinates.x ?? 0,
              y: SMALL_NODE_SIZE / 2,
            }
          : position,
      data: { handlePosition: getPosition(fromPosition) },
      parentId:
        fromNode?.type === "transaction_time" ? fromNode?.id : undefined,
    } satisfies GhostNode;

    const newEdgeType = getEdgeType(fromNode?.type, "ghost");
    const newEdgeMarker = getMarkerType(fromNode?.type, "ghost");
    const newEdge = {
      id: `${fromNode?.id}->${ghostId}`,
      source: fromNode?.id,
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
