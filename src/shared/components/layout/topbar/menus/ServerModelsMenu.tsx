import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useId, useState } from "react";
import loadServerModels from "$/features/actions/load/loadServerModels";
import loadServerModel from "$/features/actions/load/loadServerModel";
import toast, { useToaster } from "react-hot-toast/headless";
import ServerPasswordModal from "$/shared/components/ui/modal/ServerPasswordModal";
import useUserStore from "$/features/auth/useUserStore";
import type { AppError } from "$/shared/utils/AppError";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";
import { setModel } from "$/features/modeler/store/useDEMOModelerStore";
import TopbarMenuItemLoadingState from "../_components/TopbarMenuItemLoadingState";
import TopbarMenuItemErrorState from "../_components/TopbarMenuItemErrorState";
import useSharedServerModel from "$/features/modeler/hooks/useSharedServerModel";
import loadPublicModel from "$/features/actions/load/loadPublicModel";
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
      fitView();
      setSearchValue("");
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

  const publicModelMutation = useMutation({
    mutationKey: ["public_model_test"],
    mutationFn: loadPublicModel,
    onSuccess: (data) => {
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        })
      );
      setModel({ ...data, isEnabled: false });
      fitView();
    },
    onMutate: () => {
      toast.loading(
        t(($) => $["Loading model"]),
        { id: loadingId }
      );
    },
    onError: () => {
      toast.dismiss(loadingId);
      toast.error(t(($) => $["Error loading model"]));
    },
  });

  useEffect(() => {
    const modelName =
      new URLSearchParams(window.location.search).get("model") ?? "";

    if (modelName !== "" && modelName.includes("/")) {
      const piecesCount = modelName.split("/").length;

      console.log(modelName);

      if (piecesCount === 3) {
        // 3 slashes is my models
        const [mymodels, , fileName] = modelName.split("/");

        if (mymodels === "mymodels") {
          console.log("my models");
          serverModelMutation.mutate(fileName);
          setSharedModel(true);
        }
      } else if (piecesCount === 2) {
        // 2 slashes is a public model

        console.log("public model");

        const [company, fileName] = modelName.split("/");

        publicModelMutation.mutate({ fileName, company });
        setSharedModel(true);
      } else {
        setSharedModel(false);
      }
    } else {
      setSharedModel(false);
    }
  }, []);

  const label = t(($) => $["My models"]);

  useEffect(() => {
    console.log(searchValue, serverModelsQuery.data);
  }, [searchValue, serverModelsQuery.data]);

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
        onSearchValueChange={(value) => setSearchValue(value)}
        searchLabel="Search my models"
        size="large"
        renderEmptyState={() => <div>You have no server models</div>}
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
