import useDelete from "$/features/actions/delete/useDelete";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { TrashIcon } from "@phosphor-icons/react";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";
import { useTranslation } from "react-i18next";

const DeleteMenuItem = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { deleteEdge } = useDelete();
  const { t } = useTranslation();
  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label={t(($) => $["Delete"])}
      onPress={() => {
        deleteEdge(edgeId);
      }}
      state="danger"
    />
  );
};

export default DeleteMenuItem;
