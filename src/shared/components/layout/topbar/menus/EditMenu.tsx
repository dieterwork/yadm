import {
  clearModel,
  setUndoAction,
} from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import useTemporalDEMOModelerStore from "$/features/modeler/useTemporalDEMOModelerStore";
import { useRef } from "react";

const EditMenu = () => {
  const { undo, redo } = useTemporalDEMOModelerStore((state) => state);
  const { t } = useTranslation();
  const timer = useRef<NodeJS.Timeout | null>(null);
  return (
    <TopbarMenuButton label={t(($) => $["Edit"])}>
      <TopbarMenuItem
        onAction={() => {
          if (timer.current) clearTimeout(timer.current);
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
        onAction={() => {
          if (timer.current) clearTimeout(timer.current);
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
