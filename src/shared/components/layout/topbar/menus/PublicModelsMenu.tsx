import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import {useTranslation} from "react-i18next";
import {openPublicFile, usePublicModelsDataStore} from "$features/backend/useBackendStore.ts";
import TopbarSubMenuButton from "$shared/components/layout/topbar/_components/TopbarSubMenuButton.tsx";
import {useReactFlow} from "@xyflow/react";

const PublicModelsMenu = () => {

    const {fitView} = useReactFlow();

    const {t} = useTranslation();

    const publicFiles = usePublicModelsDataStore(state => state.files);

    const publicFilesByCompany = new Map<string, { modelName: string, fileName: string, companyName: string }[]>();

    publicFiles.forEach(value => {

        if (!publicFilesByCompany.has(value.companyName)) {
            publicFilesByCompany.set(value.companyName, []);
        }

        publicFilesByCompany.get(value.companyName)?.push(value);

    });

    function publicFileElements(companyName: string) {
        return (publicFilesByCompany.get(companyName) ?? [])
            .sort((a, b) =>
                a.modelName.toLowerCase().localeCompare(b.modelName.toLowerCase())
            )
            .map(value => (
                <TopbarMenuItem
                    onAction={() => {
                        openPublicFile(value.fileName, companyName).then(() => fitView())
                    }}
                >{value.modelName}</TopbarMenuItem>
            ));
    }

    function publicModelsCompanies() {
        return [...publicFilesByCompany.keys()]
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .map(value => {
                return (<TopbarSubMenuButton label={t(($) => $[value])}>
                    {publicFileElements(value)}
                </TopbarSubMenuButton>)
            });
    }

    return (
        <TopbarMenuButton label={t(($) => $["Public models"])}>
            {publicModelsCompanies()}
        </TopbarMenuButton>
    );

};

export default PublicModelsMenu;
