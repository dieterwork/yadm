import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import TopbarSubMenuButton from "../_components/TopbarSubMenuButton";
import {
  clearModel,
  modelSelector,
  setFileName,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import useExport from "$/features/actions/export/useExport";
import useImport from "$/features/actions/import/useImport";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast/headless";
import DEMOModal from "$/shared/components/ui/modal/DEMOModal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import saveServerModel from "$/features/actions/save/saveServerModel";
import { saveLocalModel } from "$/features/actions/save/saveLocalModel";
import useUserStore from "$/features/auth/useUserStore";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import { useShallow } from "zustand/react/shallow";

const FileMenu = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isPwdModalOpen, setPwdModalOpen] = useState(false);

  const { importJSON } = useImport();
  const { exportAsPNG, exportAsPDF, exportAsJSON } = useExport();

  const model = useDEMOModelerStore(useShallow(modelSelector));

  const { isAuthenticated } = useUserStore();
  const [isNewModalOpen, setNewModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: saveServerModel,
    onError: () => {
      toast.error(
        t(($) => $["Error saving model to server. Please try again"])
      );
    },
    onMutate: () => {
      toast.loading(t(($) => $["Saving model to server"]));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["server_models"] });
      toast.success(
        t(($) => $["save_on_server_storage_toast"], {
          fileName: model.fileName,
        })
      );
    },
  });

  return (
    <>
      <TopbarMenuButton label={t(($) => $["File"])}>
        <TopbarMenuItem
          onAction={() => {
            setNewModalOpen(true);
          }}
        >
          {t(($) => $["New"])}
        </TopbarMenuItem>
        <TopbarMenuItem
          onAction={() => {
            saveLocalModel({ ...model, version: "1.0.0" });
            toast.success(
              t(($) => $["save_storage_toast"], { fileName: model.fileName })
            );
          }}
        >
          {t(($) => $[`Save` + (!isAuthenticated ? " (local)" : "")])}
        </TopbarMenuItem>

        {isAuthenticated && (
          <TopbarMenuItem
            onAction={() => {
              mutation.mutate({ ...model, version: "1.0.0" });
            }}
          >
            {t(($) => $["Save to my models"])}
          </TopbarMenuItem>
        )}
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
              {t(($) => $["1x"])}
            </TopbarMenuItem>
            <TopbarMenuItem
              onAction={() => {
                exportAsPNG(2);
              }}
            >
              {t(($) => $["2x"])}
            </TopbarMenuItem>
            <TopbarMenuItem
              onAction={() => {
                exportAsPNG(3);
              }}
            >
              {t(($) => $["3x"])}
            </TopbarMenuItem>
            <TopbarMenuItem
              onAction={() => {
                exportAsPNG(4);
              }}
            >
              {t(($) => $["4x"])}
            </TopbarMenuItem>
          </TopbarSubMenuButton>
          <TopbarSubMenuButton label={t(($) => $["PDF"])}>
            <TopbarMenuItem
              onAction={() => {
                exportAsPDF(1);
              }}
            >
              {t(($) => $["1x"])}
            </TopbarMenuItem>
            <TopbarMenuItem
              onAction={() => {
                exportAsPDF(2);
              }}
            >
              {t(($) => $["2x"])}
            </TopbarMenuItem>
            <TopbarMenuItem
              onAction={() => {
                exportAsPDF(3);
              }}
            >
              {t(($) => $["3x"])}
            </TopbarMenuItem>
            <TopbarMenuItem
              onAction={() => {
                exportAsPDF(4);
              }}
            >
              {t(($) => $["4x"])}
            </TopbarMenuItem>
          </TopbarSubMenuButton>
        </TopbarSubMenuButton>
      </TopbarMenuButton>
      <DEMOModal
        isOpen={isNewModalOpen}
        onOpenChange={(isOpen) => setNewModalOpen(isOpen)}
        onAction={() => {
          localStorage.removeItem("demo-model");
          clearModel();
          setNewModalOpen(false);
        }}
        title={t(($) => $["Create new model?"])}
        actionLabel={t(($) => $["Yes, create new model"])}
        actionType="danger"
        cancelLabel={t(($) => $["Keep my current model"])}
      >
        <div className="prose prose-slate">
          <p>
            {t(
              ($) =>
                $[
                  "This will delete the current model and remove any saved changes."
                ]
            )}
          </p>
          <p>{t(($) => $["This action cannot be undone."])}</p>
        </div>
      </DEMOModal>
      <ServerPasswordModal
        isOpen={isPwdModalOpen}
        onOpenChange={(isOpen) => setPwdModalOpen(isOpen)}
      />
    </>
  );
};

export default FileMenu;
