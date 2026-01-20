import {
  getNode,
  setAction,
  updateNode,
  updateNodeData,
  updateNodeEditable,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { PencilIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";
import setEndOfContentEditable from "$/features/editable_content/utils/setEndOfContentEditable";

const EditTextControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const { t } = useTranslation("translation");
  if (!nodeId) return null;
  const node = getNode(nodeId);
  if (!node) return null;

  return (
    <DEMOElementToolbarButton
      isDisabled={"state" in node.data && node.data.state === "unclear"}
      onPress={() => {
        const element = document.querySelector<HTMLDivElement>(
          `.react-flow__node[data-id='${nodeId}'] [contenteditable]`
        );
        if (!element) return;
        updateNodeEditable(nodeId, true);
        updateNode(nodeId, { selected: false });
        setAction("edit");
        setTimeout(() => {
          element.focus();
          setEndOfContentEditable(element);
        }, 50);
      }}
      icon={(iconProps) => <PencilIcon {...iconProps} />}
      label={t(($) => $["Edit text"])}
    />
  );
};

export default EditTextControl;
