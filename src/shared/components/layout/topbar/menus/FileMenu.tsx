import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import TopbarSubMenuButton from "../_components/TopbarSubMenuButton";
import {
  clearModel,
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

const FileMenu = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { importJSON } = useImport();
  const { exportAsPNG, exportAsPDF, exportAsJSON } = useExport();

  const nodes = useDEMOModelerStore((state) => state.nodes);
  const edges = useDEMOModelerStore((state) => state.edges);
  const fileName = useDEMOModelerStore((state) => state.fileName);
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const viewport = useDEMOModelerStore((state) => state.viewport);

  const { isAuthenticated } = useUserStore();
  const [isNewModalOpen, setNewModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: saveServerModel,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["server_models"] });
    },
  });

  if (mutation.isPending) {
    toast.loading(t(($) => $["Saving model to server"]));
  }

  if (mutation.isError) {
    toast.error(t(($) => $["Error saving model to server. Please try again"]));
  }

  if (mutation.isSuccess) {
    toast.success(
      t(($) => $["save_on_server_storage_toast"], {
        fileName,
      })
    );
  }

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
            saveLocalModel({
              nodes,
              edges,
              fileName,
              isEnabled,
              version: "1.0.0",
              viewport,
            });
            toast.success(t(($) => $["save_storage_toast"], { fileName }));
          }}
        >
          {t(($) => $[`Save` + (!isAuthenticated ? " (local)" : "")])}
        </TopbarMenuItem>

        {isAuthenticated && (
          <TopbarMenuItem
            onAction={() => {
              mutation.mutate({
                nodes,
                edges,
                fileName,
                isEnabled,
                viewport,
                version: "1.0.0",
              });
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
          setFileName("New model");
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
    </>
  );
};

export default FileMenu;
