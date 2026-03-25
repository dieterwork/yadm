import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useId, useState } from "react";
import loadServerModels from "$/features/actions/load/actions/loadServerModels";
import loadServerModel from "$/features/actions/load/actions/loadServerModel";
import toast, { useToaster } from "react-hot-toast/headless";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import useUserStore from "$/features/auth/useUserStore";
import type { AppError } from "$/shared/utils/AppError";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import { setModel } from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuItemLoadingState from "../_components/TopbarMenuItemLoadingState";
import TopbarMenuItemErrorState from "../_components/TopbarMenuItemErrorState";

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
      setModel(data);
    },
    onMutate: () => {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId }
      );
    },
    onError: (error) => {
      console.log(error);
      toast.dismiss(loadingId);
      if (error.httpCode === 401) {
        setPwdModalOpen(true);
      } else {
        toast.error(t(($) => $["Error loading model. Please try again."]));
      }
    },
  });

  const label = t(($) => $["My models"]);

  if (serverModelsQuery.isError || !serverModelsQuery.data) {
    return (
      <TopbarMenuButton label={label}>
        <TopbarMenuItemErrorState
          onAction={() => serverModelsQuery.refetch()}
        />
      </TopbarMenuButton>
    );
  }

  if (serverModelsQuery.isPending) {
    return (
      <TopbarMenuButton label={label}>
        <TopbarMenuItemLoadingState />
      </TopbarMenuButton>
    );
  }

  return (
    <>
      <TopbarMenuButton label={label}>
        {serverModelsQuery.data?.length === 0 && (
          <TopbarMenuItem>You have no models available.</TopbarMenuItem>
        )}
        {serverModelsQuery.data?.length > 0 &&
          serverModelsQuery.data?.map((model) => (
            <TopbarMenuItem
              key={model.fileName}
              onAction={() => {
                setCurrentFileName(model.fileName);
                if (user.password) {
                  serverModelMutation.mutate(model.fileName);
                } else {
                  setPwdModalOpen(true);
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
        errorMessage={
          serverModelMutation.error?.httpCode === 401
            ? "Invalid password"
            : undefined
        }
      />
    </>
  );
};

export default ServerModelsMenu;
