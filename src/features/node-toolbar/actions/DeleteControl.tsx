import useDelete from "$/features/actions/delete/useDelete";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { TrashIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";

const DeleteControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  const { deleteNode } = useDelete();
  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label="Delete"
      onPress={() => {
        deleteNode();
      }}
      state="danger"
    />
  );
};

export default DeleteControl;
