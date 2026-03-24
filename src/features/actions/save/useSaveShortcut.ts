import useShortcut from "$/features/keyboard/useShortcut";
import toast from "react-hot-toast/headless";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import { saveLocalModel } from "$/features/actions/save/saveLocalModel";

const useSaveShortcut = () => {
  const { t } = useTranslation();
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const edges = useDEMOModelerStore((state) => state.edges);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const viewport = useDEMOModelerStore((state) => state.viewport);

  useShortcut(["Control+s", "Meta+s"], () => {
    saveLocalModel({
      fileName,
      nodes,
      edges,
      isEnabled,
      viewport,
      version: "1.0.0",
    });
    toast.success(t(($) => $["save_toast"], { fileName }));
  });
};

export default useSaveShortcut;
