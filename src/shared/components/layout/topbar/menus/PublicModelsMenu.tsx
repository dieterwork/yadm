import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import TopbarSubMenuButton from "$shared/components/layout/topbar/_components/TopbarSubMenuButton.tsx";
import { useReactFlow } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import getPublicModelsByCompany from "$/shared/utils/getPublicModelsByCompany";
import { useEffect, useState } from "react";
import {
  setEdges,
  setEnabled,
  setFileName,
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuItemErrorState from "../_components/TopbarMenuItemErrorState";
import TopbarMenuItemLoadingState from "../_components/TopbarMenuItemLoadingState";
import loadPublicModels from "$/features/actions/load/actions/loadPublicModels";
import loadPublicModel from "$/features/actions/load/actions/loadPublicModel";
import { saveLocalModel } from "$/features/actions/save/saveLocalModel";

const PublicModelsMenu = () => {
  const { t } = useTranslation();
  const { fitView } = useReactFlow();
  const viewport = useDEMOModelerStore((state) => state.viewport);

  const [publicModelCompany, setPublicModelCompany] = useState("");
  const [publicModelFileName, setPublicModelFileName] = useState("");

  const publicModelsQuery = useQuery({
    queryKey: ["public_models"],
    queryFn: loadPublicModels,
  });

  const publicModelQuery = useQuery({
    queryKey: ["public_model", publicModelFileName, publicModelCompany],
    queryFn: () => loadPublicModel(publicModelFileName, publicModelCompany),
    enabled: !!publicModelFileName && !!publicModelCompany,
  });

  const [prevPublicModelData, setPrevPublicModelData] = useState(
    publicModelQuery.data
  );

  const label = t(($) => $["Public models"]);

  if (
    publicModelQuery.isSuccess &&
    publicModelQuery.data &&
    prevPublicModelData !== publicModelQuery.data
  ) {
    setPrevPublicModelData(publicModelQuery.data);
    setNodes(publicModelQuery.data.nodes);
    setEdges(publicModelQuery.data.edges);
    setEnabled(publicModelQuery.data.isEnabled);
    setFileName(publicModelQuery.data.fileName);
    saveLocalModel({
      nodes: publicModelQuery.data.nodes,
      edges: publicModelQuery.data.edges,
      isEnabled: publicModelQuery.data.isEnabled,
      viewport,
      fileName: publicModelQuery.data.fileName,
      version: "1.0.0",
    });
  }

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
                  setPublicModelCompany(company);
                  setPublicModelFileName(model.fileName);
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
