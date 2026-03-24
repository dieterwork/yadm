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

const ServerMenu = () => {
  const { t } = useTranslation();

  const serverModelsQuery = useQuery({
    queryKey: ["server_models"],
    queryFn: loadServerModels,
  });

  const loadingId = useId();

  const serverModelMutation = useMutation({
    mutationKey: ["server_model"],
    mutationFn: loadServerModel,
    onSuccess: (data) => {
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        })
      );
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

  return (
    <TopbarMenuButton label={t(($) => $["My models"])}>
      {serverModelsQuery.data?.map((model) => (
        <TopbarMenuItem
          key={model.fileName}
          onAction={() => {
            serverModelMutation.mutate(model.fileName);
          }}
        >
          {model.fileName}
        </TopbarMenuItem>
      ))}
    </TopbarMenuButton>
  );
};

export default ServerMenu;
