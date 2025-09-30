import useDelete from "$/features/actions/delete/useDelete";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { TrashIcon } from "@phosphor-icons/react";

const DeleteMenuItem = ({ nodeId }: { nodeId: string }) => {
  const { deleteNode } = useDelete();
  return (
    <ToolbarMenuItem
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label="Delete"
      onAction={() => {
        deleteNode();
      }}
      state="danger"
    />
  );
};

export default DeleteMenuItem;
