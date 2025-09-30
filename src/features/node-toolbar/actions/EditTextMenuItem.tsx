import useDelete from "$/features/actions/delete/useDelete";
import {
  setAction,
  updateNode,
  updateNodeEditable,
} from "$/features/modeler/useDEMOModelerStore";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { PencilIcon, TrashIcon } from "@phosphor-icons/react";

const EditTextMenuItem = ({ nodeId }: { nodeId: string }) => {
  return (
    <ToolbarMenuItem
      onPress={() => {
        updateNodeEditable(nodeId, true);
        updateNode(nodeId, { draggable: false });
        setAction("edit");
        // setEndOfContentEditable(ref.current);
      }}
      icon={(iconProps) => <PencilIcon {...iconProps} />}
      label="Edit text"
    />
  );
};

export default EditTextMenuItem;
