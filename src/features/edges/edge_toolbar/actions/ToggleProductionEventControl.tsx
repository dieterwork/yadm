import { takeSnapshot } from "$/features/actions/undo/useUndoRedoStore";
import { getEdge, updateEdge } from "$/features/modeler/useDEMOModelerStore";
import DEMOElementToolbarToggleButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarToggleButton";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const ToggleProductionEventMenuItem = ({ edgeId }: { edgeId: string }) => {
  const edge = getEdge(edgeId);
  if (!edge) return null;
  const isProductionFactVisible = !!edge?.markerStart;
  const { t } = useTranslation();
  return (
    <DEMOElementToolbarToggleButton
      icon={(iconProps) => {
        const Icon = isProductionFactVisible ? MinusIcon : PlusIcon;
        return <Icon {...iconProps} />;
      }}
      label={
        isProductionFactVisible
          ? t(($) => $["Remove production fact"])
          : t(($) => $["Add production fact"])
      }
      isSelected={isProductionFactVisible}
      onChange={(isProductionFactVisible) => {
        updateEdge(edgeId, {
          markerStart: isProductionFactVisible ? "diamond" : undefined,
        });
        takeSnapshot();
      }}
    />
  );
};

export default ToggleProductionEventMenuItem;
