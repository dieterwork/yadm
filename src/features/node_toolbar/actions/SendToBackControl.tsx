import {
  getNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import DEMOElementToolbarButton from "$/shared/components/ui/element_toolbar/DEMOElementToolbarButton";
import { sendNodeToBack } from "$/shared/utils/zIndex";
import { SelectionForegroundIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

const SendToBackControl = ({ nodeId }: { nodeId: string }) => {
  const { t } = useTranslation();
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const node = getNode(nodeId);
  if (!node) return null;

  const label = t(($) => $["Send to back"]);

  return (
    <DEMOElementToolbarButton
      icon={(iconProps) => {
        return <SelectionForegroundIcon {...iconProps} />;
      }}
      label={label}
      onPress={() => {
        sendNodeToBack(nodeId, nodes);
      }}
    />
  );
};

export default SendToBackControl;
