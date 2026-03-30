import {
  getNode,
  setNodes,
  useDEMOModelerStore,
} from "../../modeler/store/useDEMOModelerStore";
import { sortNodes } from "../../../shared/utils/sortNodes";
import convertAbsoluteToRelativePosition from "$/features/nodes/utils/convertAbsoluteToRelativePosition";
import convertRelativeToAbsolutePosition from "$/features/nodes/utils/convertRelativeToAbsolutePosition";
import type { DEMONode } from "$/features/nodes/nodes.types";
import { resetAttach, useAttachStore } from "./useAttachStore";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast/headless";

/** Attach node as a child to another node */

export const useAttachNode = () => {
  const action = useDEMOModelerStore((state) => state.action);
  const childNodeId = useAttachStore((state) => state.childNodeId);
  const { t } = useTranslation();

  const attachNode = (
    nodeIds: string[],
    parentNodeId: string,
    extant?: "parent" | [[number, number], [number, number]]
  ) => {
    setNodes((nodes) => {
      const nextNodes = nodes.map((node) => {
        if (!nodeIds.includes(node.id)) return node;

        if (!parentNodeId) return node;

        const parentNode = getNode(parentNodeId);
        if (!parentNode) return node;

        const newPosition = convertAbsoluteToRelativePosition(
          node.position,
          parentNode,
          nodes,
          true
        );

        return {
          ...node,
          parentId: parentNodeId,
          extant,
          position: { x: newPosition.x ?? 0, y: newPosition.y ?? 0 },
        };
      });
      const sortedNodes = nextNodes.sort((a, b) => sortNodes(a, b, nextNodes));
      return sortedNodes;
    });
  };

  const detachNode = (ids: string[], removeParentId?: string) => {
    setNodes((nodes) => {
      const nextNodes = nodes
        .map((node) => {
          if (!ids.includes(node.id) || !node.parentId) return node;
          const newPosition = convertRelativeToAbsolutePosition(
            node.position,
            node,
            nodes
          );
          return {
            ...node,
            position: { x: newPosition.x ?? 0, y: newPosition.y ?? 0 },
            expandParent: undefined,
            parentId: undefined,
            extent: undefined,
          };
        })
        .filter((node) => node.id !== removeParentId)
        .sort((a, b) => sortNodes(a, b, nodes));
      return nextNodes;
    });
  };

  const handleNodeAttach = (node: DEMONode) => {
    if (action !== "attach" || !childNodeId) return;
    if (!childNodeId) {
      return console.error("Could not find child node");
    }
    if (node.parentId && node.type !== "transaction_kind") {
      return console.warn("Cannot attach to a node with an existing parent");
    }
    let parentNodeId = node.id;
    if (node.type === "transaction_kind" && node.parentId) {
      // get parent node
      const transactionTimeNode = getNode(node.parentId);
      if (!transactionTimeNode)
        throw new Error("Transaction kind does not have parent");
      parentNodeId = transactionTimeNode.id;
    }

    attachNode([childNodeId], parentNodeId);
    const childNode = getNode(childNodeId);
    if (!childNode) {
      return console.error("Could not find child node");
    }
    const parentNode = getNode(parentNodeId);
    const parentNodeLabel = t(($) => $[parentNode.ariaLabel]);
    const childNodeLabel = t(($) => $[childNode.ariaLabel]);
    toast(
      t(($) => $["attached_toast"], {
        childNode: childNodeLabel,
        parentNode: parentNodeLabel,
      }),
      {
        icon: "link",
      }
    );

    resetAttach();
    toast.dismiss(childNode.id);
  };

  return { attachNode, detachNode, handleNodeAttach };
};

export default useAttachNode;
