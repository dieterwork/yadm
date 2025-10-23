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
  if (!nodeId) return null;
  const { t } = useTranslation("translation");
  return (
    <DEMOElementToolbarButton
      onPress={() => {
        const element = document.querySelector<HTMLDivElement>(
          `.react-flow__node[data-id='${nodeId}'] [contenteditable]`
        );
        if (!element) return;
        updateNodeEditable(nodeId, true);
        updateNode(nodeId, { draggable: false });
        setAction("edit");
        setTimeout(() => {
          element?.focus();
          updateNodeEditable(nodeId, true);
          updateNode(nodeId, { selected: false });
          setEndOfContentEditable(element);
        }, 0);
      }}
      icon={(iconProps) => <PencilIcon {...iconProps} />}
      label={t(($) => $["Edit text"])}
    />
  );
};

export default EditTextControl;
