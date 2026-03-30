import useShortcut from "$/features/keyboard/useShortcut";
import toast from "react-hot-toast/headless";
import {
  modelSelector,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import { useTranslation } from "react-i18next";
import useLocalModel from "$/features/modeler/hooks/useLocalModel";
import useSharedServerModel from "$/features/modeler/hooks/useSharedServerModel";
import { useShallow } from "zustand/react/shallow";

const useSaveShortcut = () => {
  const { t } = useTranslation();
  const [_, setLocalModel] = useLocalModel();
  const [isSharedServerModel] = useSharedServerModel();
  const model = useDEMOModelerStore(useShallow(modelSelector));

  useShortcut(["Control+s", "Meta+s"], () => {
    if (!isSharedServerModel) {
      setLocalModel({
        ...model,
        version: "1.0.0",
      });
      toast.success(t(($) => $["save_toast"], { fileName: model.fileName }));
    } else {
      toast.error(t(($) => $["You cannot save shared server models"]));
    }
  });
};

export default useSaveShortcut;
