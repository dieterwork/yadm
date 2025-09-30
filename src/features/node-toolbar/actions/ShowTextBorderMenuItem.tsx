import { updateNodeBorderVisibility } from "$/features/modeler/useDEMOModelerStore";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";

const ShowTextBorderMenuItem = ({
  nodeId,
  isBorderVisible,
}: {
  nodeId: string;
  isBorderVisible: boolean;
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <ToolbarMenuItem
      icon={(iconProps) => {
        const Icon = isBorderVisible ? EyeIcon : EyeClosedIcon;
        return <Icon {...iconProps} />;
      }}
      label={isBorderVisible ? "Hide border" : "Show border"}
      onAction={() => {
        updateNodeBorderVisibility(nodeId, (isVisible) => !isVisible);
        updateNodeInternals(nodeId);
      }}
    />
  );
};

export default ShowTextBorderMenuItem;
