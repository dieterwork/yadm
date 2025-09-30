import { deleteEdge } from "$/features/modeler/useDEMOModelerStore";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { ArrowsLeftRightIcon, TrashIcon } from "@phosphor-icons/react";
import useSwapConnection from "../../hooks/useSwapConnection";

const SwapConnectionMenuItem = ({
  edgeId,
  sourceNodeId,
  targetNodeId,
}: {
  edgeId: string;
  sourceNodeId: string;
  targetNodeId: string;
}) => {
  const swapConnection = useSwapConnection({
    sourceNodeId,
    targetNodeId,
    edgeId,
  });
  return (
    <ToolbarMenuItem
      icon={(iconProps) => <ArrowsLeftRightIcon {...iconProps} />}
      label="Swap connection"
      onAction={() => {
        swapConnection();
      }}
    />
  );
};

export default SwapConnectionMenuItem;
