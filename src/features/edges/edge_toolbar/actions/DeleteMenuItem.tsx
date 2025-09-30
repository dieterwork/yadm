import { deleteEdge } from "$/features/modeler/useDEMOModelerStore";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { TrashIcon } from "@phosphor-icons/react";

const DeleteMenuItem = ({ edgeId }: { edgeId: string }) => {
  return (
    <ToolbarMenuItem
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label="Delete"
      onAction={() => {
        deleteEdge(edgeId);
      }}
      state="danger"
    />
  );
};

export default DeleteMenuItem;
