import useAttachNode from "$/features/actions/attach/useAttachNode";
import { setAttachChildNodeId } from "$/features/actions/attach/useAttachStore";
import { getNode, setAction } from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { LinkBreakIcon, LinkIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const AttachNodeControl = ({ nodeId }: { nodeId: string }) => {
  const node = getNode(nodeId);
  if (!node) return null;

  const parentId = node?.parentId;
  const { detachNode } = useAttachNode();
  const { t } = useTranslation();

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => {
        const Icon = parentId ? LinkBreakIcon : LinkIcon;
        return <Icon {...iconProps} />;
      }}
      label={parentId ? t(($) => $["Detach node"]) : t(($) => $["Attach node"])}
      onPress={() => {
        const node = getNode(nodeId);
        if (parentId) {
          detachNode([node.id]);
          setAction("pan");
        } else {
          setAttachChildNodeId(nodeId);
          setAction("attach");
        }
      }}
    />
  );
};

export default AttachNodeControl;
