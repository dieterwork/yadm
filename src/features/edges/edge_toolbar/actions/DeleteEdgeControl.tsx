import useDelete from "$/features/actions/delete/useDelete";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { TrashIcon } from "@phosphor-icons/react";
import type { DEMOEdgeToolbarControlProps } from "../types/DEMOEdgeToolbar.types";

const DeleteMenuItem = ({ edgeId }: DEMOEdgeToolbarControlProps) => {
  const { deleteEdge } = useDelete();
  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label="Delete"
      onPress={() => {
        deleteEdge();
      }}
      state="danger"
    />
  );
};

export default DeleteMenuItem;
