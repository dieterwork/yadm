import { useReactFlow, type OnConnectEnd } from "@xyflow/react";
import { useDEMOModeler } from "../../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";
import uuid from "../../../shared/utils/uuid";
import type { DEMOEdge } from "../edges.types";
import { convertAbsoluteToParentRelativePosition } from "../../nodes/utils/convertAbsoluteToParentRelativePosition";
import { MEDIUM_NODE_SIZE, SMALL_NODE_SIZE } from "../../nodes/utils/consts";

export function useIncompleteEdge() {
  const { screenToFlowPosition } = useReactFlow();

  const { setNodes, setEdges, addNode, addEdge } = useDEMOModeler(
    useShallow((state) => ({
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      addNode: state.addNode,
      addEdge: state.addEdge,
    }))
  );

  const onConnectEnd: OnConnectEnd = (event, connectionState) => {
    if (
      connectionState.isValid ||
      connectionState.fromHandle?.type === "target"
    ) {
      return;
    }

    const fromNodeId = connectionState.fromNode?.id;
    const fromNodeType = connectionState.fromNode?.type;
    const id = `ghost-${uuid()}`;
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

    const newNode = {
      id: `ghost-${id}`,
      type: "ghost",
      position:
        fromNodeType === "transaction_time"
          ? {
              x: relativeParentCoordinates.x,
              y: SMALL_NODE_SIZE / 2 + 2,
            }
          : screenToFlowPosition({
              x: clientX,
              y: clientY,
            }),
      data: {},
      parentId: fromNodeType === "transaction_time" ? fromNodeId : undefined,
    };

    const newEdge: DEMOEdge = {
      id: `${fromNodeId}->ghost-${id}`,
      source: fromNodeId,
      target: `ghost-${id}`,
      reconnectable: "target",
      type:
        fromNodeType === "transaction_time"
          ? "transaction_time_edge"
          : "cooperation_model_edge",
      sourceHandle: connectionState.fromHandle?.id,
    };
    addNode(newNode);
    addEdge(newEdge);
  };

  const onReconnectEnd = (_, oldEdge, handleType) => {
    if (handleType === "source") {
      setNodes((nodes) => {
        return nodes.filter((node) => {
          const isGhost = node.type === "ghost";
          const isTarget = node.id === oldEdge.target;

          return !(isGhost && isTarget);
        });
      });

      setEdges((edges) => edges.filter((edge) => edge.id !== oldEdge.id));
    }
  };

  const onEdgesDelete = (deletedEdges: DEMOEdge[]) => {
    setNodes((nodes) => {
      return deletedEdges.reduce(
        (acc, edge) =>
          acc.filter((n) => {
            const isGhost = n.type === "ghost";
            const isSourceOrTarget =
              n.id === edge.source || n.id === edge.target;

            return !(isGhost && isSourceOrTarget);
          }),
        nodes
      );
    });
  };

  return {
    onConnectEnd,
    onReconnectEnd,
    onEdgesDelete,
  };
}
