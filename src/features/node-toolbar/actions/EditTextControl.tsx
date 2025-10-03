import {
  setAction,
  updateNode,
  updateNodeEditable,
} from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { PencilIcon } from "@phosphor-icons/react";
import type { DEMONodeToolbarControlProps } from "../types/DEMONodeToolbar.types";

const EditTextControl = ({ nodeId }: DEMONodeToolbarControlProps) => {
  return (
    <DEMOElementToolbarButton
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

export default EditTextControl;
