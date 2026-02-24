import {useTranslation} from "react-i18next";
import TopbarMenuButton from "$shared/components/layout/topbar/_components/TopbarMenuButton.tsx";
import {logOut, useAskServerPwdDataStore} from "$features/backend/useBackendStore.ts";
import TopbarMenuItem from "$shared/components/layout/topbar/_components/TopbarMenuItem.tsx";
import ServerPasswordModal from "$shared/components/layout/topbar/menus/login/ServerPasswordModal.tsx";

const LoggedInMenu = () => {

    const {t} = useTranslation();

    const handleClickMyModels = () => window.open('https://yadm.app/admin/models', '_blank');

    const handleClickMyProfile = () => window.open('https://yadm.app/admin/profile', '_blank');

    const handleClickOrg = () => window.open('https://yadm.app/admin/organisation', '_blank');

    const showPwdModal = useAskServerPwdDataStore(state => state.showPwdModal);

    return (
        <>
            <TopbarMenuButton label={t(($) => $["Account"])}>
                <TopbarMenuItem
                    onAction={handleClickMyModels}
                >
                    {t(($) => $["My models"])}
                </TopbarMenuItem>
                <TopbarMenuItem
                    onAction={handleClickMyProfile}
                >
                    {t(($) => $["Profile"])}
                </TopbarMenuItem>
                <TopbarMenuItem
                    onAction={handleClickOrg}
                >
                    {t(($) => $["Organization"])}
                </TopbarMenuItem>
                <TopbarMenuItem
                    onAction={() => {
                        logOut();
                    }}
                >
                    {t(($) => $["Logout"])}
                </TopbarMenuItem>
            </TopbarMenuButton>
            <ServerPasswordModal
                title={t(($) => $["Pwd"])}
                isOpen={showPwdModal}
                onOpenChange={(isOpen) => useAskServerPwdDataStore.setState({showPwdModal: isOpen})}
            />
        </>
    );
};

export default LoggedInMenu;
