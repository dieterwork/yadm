import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useId, useState } from "react";
import loadServerModels from "$/features/actions/load/loadServerModels";
import loadServerModel from "$/features/actions/load/loadServerModel";
import toast from "react-hot-toast/headless";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import useUserStore from "$/features/auth/useUserStore";
import type { AppError } from "$/shared/utils/AppError";
import {type DEMOModelJSON, fullEmptyModel} from "$/shared/types/reactFlow.types";
import { setModel } from "$/features/modeler/store/useDEMOModelerStore";
import TopbarMenuItemLoadingState from "../_components/TopbarMenuItemLoadingState";
import TopbarMenuItemErrorState from "../_components/TopbarMenuItemErrorState";
import useSharedServerModel from "$/features/modeler/hooks/useSharedServerModel";
import { useReactFlow } from "@xyflow/react";
import TopbarMenuButtonAutoComplete from "../_components/TopbarMenuButtonAutoComplete";
import uuid from "$/shared/utils/uuid";

const ServerModelsMenu = () => {
  const { t } = useTranslation();
  const [isPwdModalOpen, setPwdModalOpen] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(null);
  const [isSharedModel, setSharedModel] = useSharedServerModel();
  const { fitView } = useReactFlow();

  const serverModelsQuery = useQuery({
    queryKey: ["server_models"],
    queryFn: loadServerModels,
    select: (data) => data.map((m) => ({ id: uuid(), ...m })),
  });

  const loadingId = useId();

  const { user } = useUserStore();

  const [searchValue, setSearchValue] = useState("");

  const serverModelMutation = useMutation<
    DEMOModelJSON,
    AppError,
    string,
    void
  >({
    mutationKey: ["server_model"],
    mutationFn: loadServerModel,
    onSuccess: (data) => {

      data = {...fullEmptyModel, ...data};

      setPwdModalOpen(false);
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        }),
      );
      setCurrentFileName(null);
      setModel(data);
      fitView();
      setSearchValue("");
      setSharedModel(false);
    },
    onMutate: () => {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId },
      );
    },
    onError: (error) => {
      toast.dismiss(loadingId);
      if (error.httpCode === 401) {
        setPwdModalOpen(true);
      } else {
        setPwdModalOpen(false);
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
      <TopbarMenuButtonAutoComplete
        label={label}
        items={serverModelsQuery.data}
        searchValue={searchValue}
        onSearchValueChange={(value) =>
          setSearchValue(value.trimStart().replace(/[^a-zA-Z0-9_\-\s]/g, ""))
        }
        searchLabel="Search my models"
        size="large"
        renderEmptyState={() => (
          <div className="px-2 h-[2rem] content-center">
            <p className="text-sm text-slate-900">No server models found</p>
          </div>
        )}
      >
        {(model) => (
          <TopbarMenuItem
            onAction={() => {
              setCurrentFileName(model.fileName);
              if (user.password) {
                serverModelMutation.mutate(model.fileName);
              } else {
                setPwdModalOpen(true);
              }
            }}
            textValue={model.fileName}
          >
            {model.fileName}
          </TopbarMenuItem>
        )}
      </TopbarMenuButtonAutoComplete>
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
