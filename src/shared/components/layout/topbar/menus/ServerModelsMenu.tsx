import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useReactFlow } from "@xyflow/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useId, useState } from "react";
import {
  setEdges,
  setEnabled,
  setFileName,
  setModel,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import loadServerModels from "$/features/actions/load/actions/loadServerModels";
import loadServerModel from "$/features/actions/load/actions/loadServerModel";
import toast, { useToaster } from "react-hot-toast/headless";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import useUserStore from "$/features/auth/useUserStore";
import type { AppError } from "$/shared/utils/AppError";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";

const ServerModelsMenu = () => {
  const { t } = useTranslation();
  const [isPwdModalOpen, setPwdModalOpen] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(null);

  const serverModelsQuery = useQuery({
    queryKey: ["server_models"],
    queryFn: loadServerModels,
  });

  const loadingId = useId();

  const { user } = useUserStore();

  const serverModelMutation = useMutation<
    DEMOModelJSON,
    AppError,
    string,
    void
  >({
    mutationKey: ["server_model"],
    mutationFn: loadServerModel,
    onSuccess: (data) => {
      if (isPwdModalOpen) {
        setPwdModalOpen(false);
      }
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        })
      );
      setCurrentFileName(null);
    },
    onMutate: () => {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId }
      );
    },
    onError: (error) => {
      toast.dismiss(loadingId);
      if (error.httpCode === 401) {
        setPwdModalOpen(true);
      } else {
        toast.error(t(($) => $["Error loading model. Please try again."]));
      }
    },
  });

  return (
    <>
      <TopbarMenuButton label={t(($) => $["My models"])}>
        {serverModelsQuery.data?.map((model) => (
          <TopbarMenuItem
            key={model.fileName}
            onAction={() => {
              if (user.password) {
                serverModelMutation.mutate(model.fileName);
              } else {
                setPwdModalOpen(true);
                setCurrentFileName(model.fileName);
              }
            }}
          >
            {model.fileName}
          </TopbarMenuItem>
        ))}
      </TopbarMenuButton>
      <ServerPasswordModal
        isOpen={isPwdModalOpen}
        onOpenChange={(isOpen) => setPwdModalOpen(isOpen)}
        onSubmitCallback={() => {
          if (currentFileName) {
            serverModelMutation.mutate(currentFileName);
          }
        }}
        isPending={serverModelMutation.isPending}
      />
    </>
  );
};

export default ServerModelsMenu;
