import useAttachNode from "$/features/actions/attach/useAttachNode";
import { setAttachChildNodeId } from "$/features/actions/attach/useAttachStore";
import {
  getNode,
  setAction,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import getChildNodes from "$/features/nodes/utils/getChildNodes";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { LinkBreakIcon, LinkIcon, TrashIcon } from "@phosphor-icons/react";

const AttachNodeMenuItem = ({
  nodeId,
  parentId,
}: {
  nodeId: string;
  parentId?: string;
}) => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const { detachNode } = useAttachNode();
  return (
    <ToolbarMenuItem
      icon={(iconProps) => {
        const Icon = parentId ? LinkBreakIcon : LinkIcon;
        return <Icon {...iconProps} />;
      }}
      label={parentId ? "Detach node" : "Attach node"}
      onAction={() => {
        const node = getNode(nodeId);
        const childNodeIds = getChildNodes([node], nodes, true).map(
          (node) => node.id
        );
        if (childNodeIds.length === 0) {
          setAttachChildNodeId(nodeId);
          setAction("attach");
        } else {
          detachNode(childNodeIds, nodeId);
        }
      }}
    />
  );
};

export default AttachNodeMenuItem;
