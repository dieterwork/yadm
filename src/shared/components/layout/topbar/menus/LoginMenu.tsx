import {useTranslation} from "react-i18next";
import LoginEmailModal from "$shared/components/layout/topbar/menus/login/LoginEmailModal.tsx";
import {useState} from "react";
import TopbarMenuItem from "$shared/components/layout/topbar/_components/TopbarMenuItem.tsx";
import TopbarMenuButton from "$shared/components/layout/topbar/_components/TopbarMenuButton.tsx";

const LoginMenu = () => {

    const [isEmailLoginOpen, setEmailLoginOpen] = useState(false);

    const {t} = useTranslation();

    const handleClick = () => setEmailLoginOpen(true);

    const handleCreateAccount = () => window.open('https://yadm.app/admin', '_blank');

    return (
        <>

            <TopbarMenuButton label={t(($) => $["Account"])}>
                <TopbarMenuItem
                    onAction={handleClick}
                >
                    {t(($) => $["Login"])}
                </TopbarMenuItem>
                <TopbarMenuItem
                    onAction={handleCreateAccount}
                >
                    {t(($) => $["Create account"])}
                </TopbarMenuItem>
            </TopbarMenuButton>

            <LoginEmailModal
                title={t(($) => $["Login"])}
                isOpen={isEmailLoginOpen}
                onOpenChange={(isOpen) => setEmailLoginOpen(isOpen)}
            />
        </>
    );
};

export default LoginMenu;
