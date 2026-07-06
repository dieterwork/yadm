import {
  getNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { bringNodeToFront } from "$/shared/utils/zIndex";
import {
  SelectionBackgroundIcon,
  SelectionForegroundIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const BringToFrontControl = ({ nodeId }: { nodeId: string }) => {
  const { t } = useTranslation();
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const node = getNode(nodeId);
  if (!node) return null;

  const label = t(($) => $["Bring to front"]);

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => {
        return <SelectionBackgroundIcon {...iconProps} />;
      }}
      label={label}
      onPress={() => {
        bringNodeToFront(nodeId, nodes);
      }}
    />
  );
};

export default BringToFrontControl;
