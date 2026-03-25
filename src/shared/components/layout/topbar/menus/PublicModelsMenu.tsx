import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import TopbarSubMenuButton from "$shared/components/layout/topbar/_components/TopbarSubMenuButton.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import getPublicModelsByCompany from "$/shared/utils/getPublicModelsByCompany";
import { useId } from "react";
import TopbarMenuItemErrorState from "../_components/TopbarMenuItemErrorState";
import TopbarMenuItemLoadingState from "../_components/TopbarMenuItemLoadingState";
import loadPublicModels from "$/features/actions/load/actions/loadPublicModels";
import loadPublicModel from "$/features/actions/load/actions/loadPublicModel";
import toast from "react-hot-toast/headless";
import { setModel } from "$/features/modeler/useDEMOModelerStore";

const PublicModelsMenu = () => {
  const { t } = useTranslation();

  const publicModelsQuery = useQuery({
    queryKey: ["public_models"],
    queryFn: loadPublicModels,
  });

  const loadingId = useId();

  const publicModelMutation = useMutation({
    mutationKey: ["public_model"],
    mutationFn: loadPublicModel,
    onSuccess: (data) => {
      toast.dismiss(loadingId);
      toast.success(
        t(($) => $["Loaded model"], {
          fileName: data.fileName,
        })
      );
      setModel(data);
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

  const label = t(($) => $["Public models"]);

  if (publicModelsQuery.isError || !publicModelsQuery.data) {
    return (
      <TopbarMenuButton label={label}>
        <TopbarMenuItemErrorState
          onAction={() => publicModelsQuery.refetch()}
        />
      </TopbarMenuButton>
    );
  }

  if (publicModelsQuery.isPending) {
    return (
      <TopbarMenuButton label={label}>
        <TopbarMenuItemLoadingState />
      </TopbarMenuButton>
    );
  }

  const publicModelsByCompany = getPublicModelsByCompany(
    publicModelsQuery.data
  );
  const companies = [...publicModelsByCompany.keys()].sort((a, b) =>
    a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())
  );

  return (
    <TopbarMenuButton label={t(($) => $["Public models"])} autocomplete={true}>
      {companies.map((company) => {
        const publicModels = publicModelsByCompany
          .get(company)
          ?.sort((a, b) =>
            a.modelName
              .toLocaleLowerCase()
              .localeCompare(b.modelName.toLocaleLowerCase())
          );
        return (
          <TopbarSubMenuButton label={company}>
            {publicModels?.map((model) => (
              <TopbarMenuItem
                key={`${model.fileName}-${company}`}
                onAction={() => {
                  publicModelMutation.mutate({
                    fileName: model.fileName,
                    company,
                  });
                }}
              >
                {model.modelName}
              </TopbarMenuItem>
            ))}
          </TopbarSubMenuButton>
        );
      })}
    </TopbarMenuButton>
  );
};

export default PublicModelsMenu;
