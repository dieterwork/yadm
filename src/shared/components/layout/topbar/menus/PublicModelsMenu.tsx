import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import TopbarSubMenuButton from "$shared/components/layout/topbar/_components/TopbarSubMenuButton.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import getPublicModelsByCompany from "$/shared/utils/getPublicModelsByCompany";
import { useId, useState } from "react";
import TopbarMenuItemErrorState from "../_components/TopbarMenuItemErrorState";
import TopbarMenuItemLoadingState from "../_components/TopbarMenuItemLoadingState";
import loadPublicModels from "$/features/actions/load/actions/loadPublicModels";
import loadPublicModel from "$/features/actions/load/actions/loadPublicModel";
import toast from "react-hot-toast/headless";
import { setModel } from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuButtonAutoComplete from "../_components/TopbarMenuButtonAutoComplete";
import uuid from "$/shared/utils/uuid";
import { useReactFlow } from "@xyflow/react";

const PublicModelsMenu = () => {
  const { t } = useTranslation();

  const { fitView } = useReactFlow();

  const publicModelsQuery = useQuery({
    queryKey: ["public_models"],
    queryFn: loadPublicModels,
    select: (data) => data.map((m) => ({ id: uuid(), ...m })),
  });

  const loadingId = useId();

  const [searchValue, setSearchValue] = useState("");

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

  const companyMenuItems = [...publicModelsByCompany.keys()]
    .sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()))
    .map((c) => ({ id: uuid(), name: c }));

  if (searchValue) {
    return (
      <TopbarMenuButtonAutoComplete
        label={label}
        searchValue={searchValue}
        onSearchValueChange={(value) => setSearchValue(value)}
        items={publicModelsQuery.data}
        searchLabel="Search public models"
        size="large"
        renderEmptyState={() => <div>No public models exist</div>}
      >
        {(model) => (
          <TopbarMenuItem
            onAction={() => {
              publicModelMutation.mutate({
                fileName: model.fileName,
                company: model.companyName,
              });
            }}
          >
            {model.modelName}
          </TopbarMenuItem>
        )}
      </TopbarMenuButtonAutoComplete>
    );
  }

  return (
    <TopbarMenuButtonAutoComplete
      label={label}
      items={companyMenuItems}
      searchValue={searchValue}
      onSearchValueChange={(value) => setSearchValue(value)}
      searchLabel="Search public models"
      size="large"
      renderEmptyState={() => <div>No public models exist</div>}
    >
      {(company) => {
        const publicModels = publicModelsByCompany
          .get(company.name)
          ?.sort((a, b) =>
            a.modelName
              .toLocaleLowerCase()
              .localeCompare(b.modelName.toLocaleLowerCase())
          );
        return (
          <TopbarSubMenuButton label={company.name} items={publicModels}>
            {(model) => (
              <TopbarMenuItem
                onAction={() => {
                  publicModelMutation.mutate({
                    fileName: model.fileName,
                    company: company.name,
                  });
                }}
              >
                {model.modelName}
              </TopbarMenuItem>
            )}
          </TopbarSubMenuButton>
        );
      }}
    </TopbarMenuButtonAutoComplete>
  );
};

export default PublicModelsMenu;
