import {
  setAction,
  updateNode,
  updateNodeEditable,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { PencilIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";

const EditTextControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const { t } = useTranslation("translation");
  return (
    <DEMOElementToolbarButton
      onPress={() => {
        updateNodeEditable(nodeId, true);
        updateNode(nodeId, { draggable: false });
        setAction("edit");
        setTimeout(() => {
          document
            .querySelector<HTMLDivElement>(
              `.react-flow__node[data-id='${nodeId}'] [contenteditable]`
            )
            ?.focus();
        }, 0);
      }}
      icon={(iconProps) => <PencilIcon {...iconProps} />}
      label={t(($) => $["Edit text"])}
    />
  );
};

export default EditTextControl;
