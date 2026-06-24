import { NodeToolbar, Position, type NodeToolbarProps } from "@xyflow/react";
import DEMOElementToolbarSeparator from "$/shared/components/ui/element_toolbar/DEMOElementToolbarSeparator";
import DEMOElementToolbarGroup from "$/shared/components/ui/element_toolbar/DEMOElementToolbarGroup";
import DeleteControl from "./actions/DeleteControl";
import DEMOElementToolbar from "$/shared/components/ui/element_toolbar/DEMOElementToolbar";
import { useTranslation } from "react-i18next";
import ChangeDerivationControl from "./actions/ChangeDerivationControl";

const DEMOHandleToolbar = ({
  nodeId,
  actions,
  isVisible,
  position,
  handleId,
}: Omit<NodeToolbarProps, "nodeId"> & {
  nodeId?: string;
  handleId: string | undefined | null;
  position: string;
  actions?: ("delete" | "changeDerivation")[] | null;
}) => {
  const { t } = useTranslation();

  if (!handleId || !nodeId) return null;

  return (
    <NodeToolbar position={position} isVisible={isVisible}>
      <DEMOElementToolbar>
        {/*{actions && actions.length > 1 && <DEMOElementToolbarSeparator />}*/}
        <DEMOElementToolbarGroup
          aria-label={t(($) => $["Danger zone actions"])}
        >
          <DeleteControl
            nodeId={nodeId}
            position={position}
            handleId={handleId}
          />
        </DEMOElementToolbarGroup>
      </DEMOElementToolbar>
    </NodeToolbar>
  );
};

export default DEMOHandleToolbar;
