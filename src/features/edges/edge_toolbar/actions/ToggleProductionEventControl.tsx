import { getEdge, updateEdge } from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

const ToggleProductionEventMenuItem = ({ edgeId }: { edgeId: string }) => {
  const edge = getEdge(edgeId);
  if (!edge) return null;
  const isProductionFactVisible = !!edge?.markerStart;
  return (
    <DEMOElementToolbarToggleButton
      icon={(iconProps) => {
        const Icon = isProductionFactVisible ? MinusIcon : PlusIcon;
        return <Icon {...iconProps} />;
      }}
      label={
        isProductionFactVisible
          ? "Remove production fact"
          : "Add production fact"
      }
      isSelected={isProductionFactVisible}
      onChange={(isProductionFactVisible) => {
        updateEdge(edgeId, {
          markerStart: isProductionFactVisible ? undefined : "diamond",
        });
      }}
    />
  );
};

export default ToggleProductionEventMenuItem;
