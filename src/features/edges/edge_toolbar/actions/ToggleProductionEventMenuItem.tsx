import {
  deleteEdge,
  getEdge,
  updateEdge,
} from "$/features/modeler/useDEMOModelerStore";
import ToolbarMenuItem from "$/shared/components/ui/toolbar/ToolbarMenuItem";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";

const ToggleProductionEventMenuItem = ({ edgeId }: { edgeId: string }) => {
  const edge = getEdge(edgeId);
  if (!edge) return null;
  const isProductionFactVisible = edge.markerStart;
  return (
    <ToolbarMenuItem
      icon={(iconProps) => {
        const Icon = isProductionFactVisible ? EyeClosedIcon : EyeIcon;
        return <Icon {...iconProps} />;
      }}
      label={
        isProductionFactVisible
          ? "Remove production fact"
          : "Add production fact"
      }
      onAction={() => {
        updateEdge(edgeId, {
          markerStart: isProductionFactVisible ? undefined : "diamond",
        });
      }}
    />
  );
};

export default ToggleProductionEventMenuItem;
