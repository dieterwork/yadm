import { useCallback } from "react";
import { OnNodeDrag, useReactFlow, type Node } from "@xyflow/react";
import { sortNodes } from "$/shared/utils/sortNodes";
import {
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import type { DEMONode } from "../nodes.types";

const getNodePositionInsideParent = (
  node: Partial<Node>,
  organizationNode: Node
) => {
  const position = node.position ?? { x: 0, y: 0 };
  const nodeWidth = node.measured?.width ?? 0;
  const nodeHeight = node.measured?.height ?? 0;
  const groupWidth = organizationNode.measured?.width ?? 0;
  const groupHeight = organizationNode.measured?.height ?? 0;

  if (position.x < organizationNode.position.x) {
    position.x = 0;
  } else if (
    position.x + nodeWidth >
    organizationNode.position.x + groupWidth
  ) {
    position.x = groupWidth - nodeWidth;
  } else {
    position.x = position.x - organizationNode.position.x;
  }

  if (position.y < organizationNode.position.y) {
    position.y = 0;
  } else if (
    position.y + nodeHeight >
    organizationNode.position.y + groupHeight
  ) {
    position.y = groupHeight - nodeHeight;
  } else {
    position.y = position.y - organizationNode.position.y;
  }

  return position;
};

export function useNodeDragHandlers() {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const { getIntersectingNodes } = useReactFlow();

  const onNodeDragStop: OnNodeDrag = (_, node) => {
    if (
      (node.type === "ghost" ||
        node.type === "transaction_kind" ||
        node.type === "text" ||
        node.type === "organization") &&
      !node.parentId
    ) {
      return;
    }

    const intersections = getIntersectingNodes(node).filter(
      (n) => n.type === "organization"
    );
    const groupNode = intersections[0];

    // when there is an intersection on drag stop, we want to attach the node to its new parent
    if (intersections.length && node.parentId !== groupNode?.id) {
      const nextNodes: Node[] = nodes
        .map((n) => {
          if (n.id === groupNode.id) {
            return {
              ...n,
              className: "",
            };
          } else if (n.id === node.id) {
            const position = getNodePositionInsideParent(n, groupNode) ?? {
              x: 0,
              y: 0,
            };

            return {
              ...n,
              position,
              parentId: groupNode.id,
              extent: "parent",
            } as Node;
          }

          return n;
        })
        .sort((a, b) => sortNodes(a, b, nodes));

      setNodes(nextNodes);
    }
  };

  const onNodeDrag: OnNodeDrag<DEMONode> = (_, node) => {
    if (
      (node.type === "ghost" ||
        node.type === "transaction_kind" ||
        node.type === "text" ||
        node.type === "organization") &&
      !node.parentId
    ) {
      return;
    }

    const intersections = getIntersectingNodes(node).filter(
      (n) => n.type === "group"
    );
    const organizationClassName =
      intersections.length && node.parentId !== intersections[0]?.id
        ? "active"
        : "";
    setNodes((nds) => {
      return nds.map((n) => {
        if (n.type === "organization") {
          return {
            ...n,
            className: organizationClassName,
          };
        } else if (n.id === node.id) {
          return {
            ...n,
            position: node.position,
          };
        }

        return { ...n };
      });
    });
  };

  return {
    onNodeDragStop,
    onNodeDrag,
  };
}
