import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import {useTranslation} from "react-i18next";
import {loadServerFile, useUserDataStore} from "$features/backend/useBackendStore.ts";
import {useReactFlow} from "@xyflow/react";

const ServerMenu = () => {

    const {t} = useTranslation();

    const {fitView} = useReactFlow();

    const serverFiles = useUserDataStore(state => state.serverFiles);

    const openFile = (file: string) => {
        loadServerFile(file).then(() => fitView());
    };

    const serverFileElements = serverFiles.map(value => (
        <TopbarMenuItem key={value.fileName} onAction={() => openFile(value.fileName)}>
            {value.fileName}
        </TopbarMenuItem>
    ));

    return (
        <TopbarMenuButton label={t(($) => $["My models"])}>
            {serverFileElements}
        </TopbarMenuButton>
    );

};

export default ServerMenu;
