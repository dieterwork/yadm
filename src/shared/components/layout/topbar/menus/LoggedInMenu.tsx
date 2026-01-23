import {useTranslation} from "react-i18next";
import TopbarMenuButton from "$shared/components/layout/topbar/_components/TopbarMenuButton.tsx";
import {logOut, useAskServerPwdDataStore} from "$features/backend/useBackendStore.ts";
import TopbarMenuItem from "$shared/components/layout/topbar/_components/TopbarMenuItem.tsx";
import ServerPasswordModal from "$shared/components/layout/topbar/menus/login/ServerPasswordModal.tsx";

const LoggedInMenu = () => {

    const {t} = useTranslation();

    const showPwdModal = useAskServerPwdDataStore(state => state.showPwdModal);

    return (
        <>
            <TopbarMenuButton label={t(($) => $["User"])}>
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
