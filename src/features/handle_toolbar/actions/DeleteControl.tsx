import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { TrashIcon } from "@phosphor-icons/react";
import type { DEMOHandleToolbarControlProps } from "../types/DEMOHandleToolbar.types";
import { useTranslation } from "react-i18next";
import { useUpdateNodeInternals, type Position } from "@xyflow/react";
import deleteHandle from "$/features/connection_handles/utils/deleteHandle";
import { useDEMOModelerStore } from "$/features/modeler/store/useDEMOModelerStore";

const DeleteControl = ({
  handleId,
  position,
  nodeId,
}: DEMOHandleToolbarControlProps) => {
  const { t } = useTranslation();
  const edges = useDEMOModelerStore((state) => state.edges);
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => <TrashIcon {...iconProps} />}
      label={t(($) => $["Delete"])}
      onPress={() => {
        deleteHandle(handleId, position, nodeId, edges, updateNodeInternals);
      }}
      state="danger"
    />
  );
};

export default DeleteControl;
