import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";
import loadServerModels from "$/features/actions/load/loadServerModels";
import loadServerModel from "$/features/actions/load/loadServerModel";
import toast from "react-hot-toast/headless";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import useUserStore from "$/features/auth/useUserStore";
import type { AppError } from "$/shared/utils/AppError";
import {
  type DEMOModelJSON,
  fullEmptyModel,
} from "$/shared/types/reactFlow.types";
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
  const [, setSharedModel] = useSharedServerModel();
  const { fitView } = useReactFlow();

  const serverModelsQuery = useQuery({
    queryKey: ["server_models"],
    queryFn: loadServerModels,
    select: (data) => data.map((m) => ({ id: uuid(), ...m })),
  });

  const loadingId = useId();

  const { user } = useUserStore();

  const [searchValue, setSearchValue] = useState("");

  const [selectedModel, setSelectedModel] = useState<{
    fileName: string;
  } | null>(null);

  const serverModelQuery = useQuery<DEMOModelJSON, AppError>({
    queryKey: ["server_model", selectedModel?.fileName],
    queryFn: () => loadServerModel(selectedModel!.fileName),
    enabled: !!selectedModel && !!user.password,
    retry: false,
    staleTime: Infinity,
  });

  const [lastLoaded, setLastLoaded] = useState<{
    model: { fileName: string };
    updatedAt: number;
  } | null>(null);
  const [lastErrorAt, setLastErrorAt] = useState<number | null>(null);

  if (
    selectedModel &&
    serverModelQuery.isSuccess &&
    serverModelQuery.data &&
    (lastLoaded?.model !== selectedModel ||
      lastLoaded?.updatedAt !== serverModelQuery.dataUpdatedAt)
  ) {
    setLastLoaded({
      model: selectedModel,
      updatedAt: serverModelQuery.dataUpdatedAt,
    });

    setPwdModalOpen(false);
    const data = { ...fullEmptyModel, ...serverModelQuery.data };
    setModel(data);
    fitView();
    setSearchValue("");
    setSharedModel(false);
  }

  if (
    selectedModel &&
    serverModelQuery.isError &&
    serverModelQuery.errorUpdatedAt !== lastErrorAt
  ) {
    setLastErrorAt(serverModelQuery.errorUpdatedAt);
    setPwdModalOpen(serverModelQuery.error?.httpCode === 401);
  }

  useEffect(() => {
    if (selectedModel) {
      if (serverModelQuery.isFetching) {
        toast.loading(
          t(($) => $["Loading model"]),
          { id: loadingId },
        );
      } else if (serverModelQuery.isSuccess && serverModelQuery.data) {
        toast.dismiss(loadingId);
        const data = { ...fullEmptyModel, ...serverModelQuery.data };
        toast.success(
          t(($) => $["Loaded model"], {
            fileName: data.fileName,
          }),
          {
            duration: 2000,
          },
        );
      } else if (serverModelQuery.isError) {
        toast.dismiss(loadingId);
        if (serverModelQuery.error?.httpCode !== 401) {
          toast.error(t(($) => $["Error loading model. Please try again."]));
        }
      }
    }
  }, [
    toast,
    selectedModel,
    serverModelQuery.status,
    serverModelQuery.fetchStatus,
    serverModelQuery.dataUpdatedAt,
    serverModelQuery.errorUpdatedAt,
  ]);

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
              setSelectedModel({ fileName: model.fileName });
              if (!user.password) {
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
        isPending={serverModelQuery.isFetching}
        onSubmitCallback={() => {
          serverModelQuery.refetch();
        }}
        errorMessage={
          serverModelQuery.error?.httpCode === 401
            ? "Invalid password"
            : undefined
        }
      />
    </>
  );
};

export default ServerModelsMenu;
