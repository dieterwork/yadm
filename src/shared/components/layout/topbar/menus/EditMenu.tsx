import {
  clearModel,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import {
  redo,
  setUndoAction,
  undo,
  useUndoRedoStore,
} from "$/features/actions/undo/useUndoRedoStore";

const EditMenu = () => {
  const { t } = useTranslation();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const pastHistory = useUndoRedoStore((state) => state.past);
  const futureHistory = useUndoRedoStore((state) => state.future);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  return (
    <TopbarMenuButton label={t(($) => $["Edit"])}>
      <TopbarMenuItem
        isDisabled={pastHistory.length === 0 || !isEnabled}
        onAction={() => {
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
          setUndoAction("undo");
          undo();
          timer.current = setTimeout(() => {
            setUndoAction(null);
          }, 300);
        }}
      >
        {t(($) => $["Undo"])}
      </TopbarMenuItem>
      <TopbarMenuItem
        isDisabled={futureHistory.length === 0 || !isEnabled}
        onAction={() => {
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
          setUndoAction("redo");
          redo();
          timer.current = setTimeout(() => {
            setUndoAction(null);
          }, 300);
        }}
      >
        {t(($) => $["Redo"])}
      </TopbarMenuItem>
      <TopbarMenuItem
        isDisabled={!isEnabled}
        onAction={() => {
          clearModel();
        }}
      >
        {t(($) => $["Clear"])}
      </TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default EditMenu;
