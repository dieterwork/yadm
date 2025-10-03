import useAttachNode from "$/features/actions/attach/useAttachNode";
import { setAttachChildNodeId } from "$/features/actions/attach/useAttachStore";
import {
  getNode,
  setAction,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import getChildNodes from "$/features/nodes/utils/getChildNodes";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { LinkBreakIcon, LinkIcon } from "@phosphor-icons/react";

const AttachNodeControl = ({ nodeId }: { nodeId: string }) => {
  const node = getNode(nodeId);
  if (!node) return null;

  const nodes = useDEMOModelerStore((state) => state.nodes);
  const parentId = node?.parentId;
  const { detachNode } = useAttachNode();

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => {
        const Icon = parentId ? LinkBreakIcon : LinkIcon;
        return <Icon {...iconProps} />;
      }}
      label={parentId ? "Detach node" : "Attach node"}
      onPress={() => {
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

export default AttachNodeControl;
