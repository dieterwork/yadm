import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import TopbarSubMenuButton from "../_components/TopbarSubMenuButton";
import {
  clearModel,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import useSave from "$/features/actions/save/useSave";
import useExport from "$/features/actions/export/useExport";
import useImport from "$/features/actions/import/useImport";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast/headless";

const FileMenu = () => {
  const { save } = useSave();
  const { exportAsPNG, exportAsPDF, exportAsJSON } = useExport();
  const fileName = useDEMOModelerStore((state) => state.fileName);

  const { importJSON } = useImport();

  const { t } = useTranslation();

  return (
    <TopbarMenuButton label={t(($) => $["File"])}>
      <TopbarMenuItem
        onAction={() => {
          clearModel();
          localStorage.removeItem("demo-model");
        }}
      >
        {t(($) => $["New"])}
      </TopbarMenuItem>
      <TopbarMenuItem
        onAction={() => {
          save();
          toast.success(`Saved "${fileName}"`);
        }}
      >
        {t(($) => $["Save"])}
      </TopbarMenuItem>

      <TopbarMenuItem
        onAction={() => {
          importJSON();
        }}
      >
        {t(($) => $["Import JSON"])}
      </TopbarMenuItem>
      <TopbarSubMenuButton label={t(($) => $["Export as"])}>
        <TopbarMenuItem
          onAction={() => {
            exportAsJSON();
          }}
        >
          JSON
        </TopbarMenuItem>
        <TopbarSubMenuButton label={t(($) => $["PNG"])}>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(1);
            }}
          >
            1x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(2);
            }}
          >
            2x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(3);
            }}
          >
            3x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPNG(4);
            }}
          >
            4x
          </TopbarMenuItem>
        </TopbarSubMenuButton>
        <TopbarSubMenuButton label={t(($) => $["PDF"])}>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(1);
            }}
          >
            1x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(2);
            }}
          >
            2x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(3);
            }}
          >
            3x
          </TopbarMenuItem>
          <TopbarMenuItem
            onAction={() => {
              exportAsPDF(4);
            }}
          >
            4x
          </TopbarMenuItem>
        </TopbarSubMenuButton>
      </TopbarSubMenuButton>
    </TopbarMenuButton>
  );
};

export default FileMenu;
