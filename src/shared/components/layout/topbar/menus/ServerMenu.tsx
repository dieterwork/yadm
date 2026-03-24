import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useTranslation } from "react-i18next";
import { useReactFlow } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  setEdges,
  setEnabled,
  setFileName,
  setNodes,
} from "$/features/modeler/useDEMOModelerStore";
import loadServerModels from "$/features/actions/load/actions/loadServerModels";
import loadServerModel from "$/features/actions/load/actions/loadServerModel";

const ServerMenu = () => {
  const { t } = useTranslation();
  const [serverFileName, setServerFileName] = useState("");

  const serverModelsQuery = useQuery({
    queryKey: ["server_models"],
    queryFn: loadServerModels,
  });

  const serverModelQuery = useQuery({
    queryKey: ["server_model", serverFileName],
    queryFn: () => loadServerModel(serverFileName),
    enabled: !!serverFileName,
  });

  const [prevServerModel, setPrevServerModel] = useState(serverModelQuery.data);

  if (prevServerModel !== serverModelQuery.data && serverModelQuery.isSuccess) {
    setPrevServerModel(serverModelQuery.data);
    setNodes(serverModelQuery.data.nodes);
    setEdges(serverModelQuery.data.edges);
    setFileName(serverModelQuery.data.fileName);
    setEnabled(serverModelQuery.data.isEnabled);
  }

  return (
    <TopbarMenuButton label={t(($) => $["My models"])}>
      {serverModelsQuery.data?.map((model) => (
        <TopbarMenuItem
          key={model.fileName}
          onAction={() => setServerFileName(model.fileName)}
        >
          {model.fileName}
        </TopbarMenuItem>
      ))}
    </TopbarMenuButton>
  );
};

export default ServerMenu;
