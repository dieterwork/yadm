import {useTranslation} from "react-i18next";
import LoginEmailModal from "$shared/components/layout/topbar/menus/login/LoginEmailModal.tsx";
import {useState} from "react";
import {cn} from "@sglara/cn";
import {Button} from "react-aria-components";

const LoginMenu = () => {

    const [isEmailLoginOpen, setEmailLoginOpen] = useState(false);

    const {t} = useTranslation();

    const handleClick = () => setEmailLoginOpen(true);

    return (
        <>
            <Button onClick={handleClick}
                    className={cn(
                        "text-slate-900 text-sm font-medium leading-none px-2.5 h-[1.875rem] content-center hover:bg-slate-100 data-[pressed]:bg-slate-200 transition-colors cursor-default outline-hidden focus-visible:bg-slate-100 rounded-sm"
                    )}
            >
                Login
            </Button>
            <LoginEmailModal
                title={t(($) => $["Login"])}
                isOpen={isEmailLoginOpen}
                onOpenChange={(isOpen) => setEmailLoginOpen(isOpen)}
            />
        </>
    );
};

export default LoginMenu;
