import useAttachNode from "$/features/actions/attach/useAttachNode";
import { setAttachChildNodeId } from "$/features/actions/attach/useAttachStore";
import takeSnapshotAndSave from "$/features/actions/undo/takeSnapshotAndSave";
import {
  getNode,
  setAction,
  updateNode,
} from "$/features/modeler/store/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { LinkBreakIcon, LinkIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast/headless";
import { useTranslation } from "react-i18next";

const AttachNodeControl = ({ nodeId }: { nodeId: string }) => {
  const { detachNode } = useAttachNode();
  const { t } = useTranslation();
  const node = getNode(nodeId);
  if (!node) return null;

  const parentId = node?.parentId;

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
          const childNode = getNode(node.id);
          const parentNode = getNode(node.parentId!);
          detachNode([node.id]);
          setAction("pan");
          const parentNodeLabel = t(($) => $[parentNode.ariaLabel]);
          const childNodeLabel = t(($) => $[childNode.ariaLabel]);
          toast(
            t(($) => $["detached_toast"], {
              childNode: childNodeLabel,
              parentNode: parentNodeLabel,
            }),
            { icon: "linkBreak" },
          );
          takeSnapshotAndSave();
        } else {
          setAttachChildNodeId(nodeId);
          toast(
            t(($) => $["attach_toast"]),
            {
              icon: "link",
              id: nodeId,
              // TODO adjust toaster to set autoremove to false
              duration: 1000000,
              className: "no-remove",
            },
          );
          updateNode(nodeId, { selected: false });
        }
      }}
    />
  );
};

export default AttachNodeControl;
