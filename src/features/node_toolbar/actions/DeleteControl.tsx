import useDelete from "$/features/actions/delete/useDelete";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { TrashIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";
import { useTranslation } from "react-i18next";

const DeleteControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const { deleteNode } = useDelete();
  const { t } = useTranslation();
  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label={t(($) => $["Delete"])}
      onPress={() => {
        deleteNode(nodeId);
      }}
      state="danger"
    />
  );
};

export default DeleteControl;
