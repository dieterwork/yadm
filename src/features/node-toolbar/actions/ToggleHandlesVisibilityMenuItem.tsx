import { updateNodeHandlesVisibility } from "$/features/modeler/useDEMOModelerStore";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { useUpdateNodeInternals } from "@xyflow/react";

const ToggleHandlesVisibilityMenuItem = ({
  nodeId,
  isVisible,
}: {
  nodeId: string;
  isVisible: boolean;
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <ToolbarMenuItem
      icon={(iconProps) => {
        const Icon = isVisible ? EyeClosedIcon : EyeIcon;
        return <Icon {...iconProps} />;
      }}
      label={isVisible ? "Hide handles" : "Show handles"}
      onAction={() => {
        updateNodeHandlesVisibility(nodeId, (isVisible) => !isVisible);
        updateNodeInternals(nodeId);
      }}
    />
  );
};

export default ToggleHandlesVisibilityMenuItem;
