import { clearModel } from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import useTemporalDEMOModelerStore from "$/features/modeler/useTemporalDEMOModelerStore";

const EditMenu = () => {
  const { undo, redo } = useTemporalDEMOModelerStore((state) => state);
  const { t } = useTranslation();
  return (
    <TopbarMenuButton label={t(($) => $["Edit"])}>
      <TopbarMenuItem onAction={() => undo()}>
        {t(($) => $["Undo"])}
      </TopbarMenuItem>
      <TopbarMenuItem onAction={() => redo()}>
        {t(($) => $["Redo"])}
      </TopbarMenuItem>
      <TopbarMenuItem onAction={() => clearModel()}>
        {t(($) => $["Clear"])}
      </TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default EditMenu;
