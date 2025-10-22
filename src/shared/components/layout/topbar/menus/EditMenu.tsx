import {
  clearModel,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import { t } from "i18next";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";

const EditMenu = () => {
  const { undo, redo } = useDEMOModelerStore.temporal.getState();
  const { t } = useTranslation();
  return (
    <TopbarMenuButton label={t(($) => $["Edit"])}>
      <TopbarMenuItem onAction={() => undo()}>Undo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => redo()}>Redo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => clearModel()}>Clear</TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default EditMenu;
