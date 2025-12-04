import useShortcut from "$/features/keyboard/useShortcut";
import toast from "react-hot-toast/headless";
import {
  saveModel,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import { useTranslation } from "react-i18next";

const useSaveShortcut = () => {
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const { t } = useTranslation();
  useShortcut(["Control+s", "Meta+s"], () => {
    saveModel();
    toast.success(t(($) => $["save_toast"], { fileName }));
  });
};

export default useSaveShortcut;
