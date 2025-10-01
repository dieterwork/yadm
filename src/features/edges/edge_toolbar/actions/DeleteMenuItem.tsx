import useDelete from "$/features/actions/delete/useDelete";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { TrashIcon } from "@phosphor-icons/react";

const DeleteMenuItem = ({ edgeId }: { edgeId: string }) => {
  const { deleteEdge } = useDelete();
  return (
    <ToolbarMenuItem
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label="Delete"
      onAction={() => {
        deleteEdge();
      }}
      state="danger"
    />
  );
};

export default DeleteMenuItem;
