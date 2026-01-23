import TopbarMenuModal, {
    type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import {Button, Input, Label, TextField} from "react-aria-components";
import {useTranslation} from "react-i18next";
import {sendCodeToEmail, useUserDataStore, verifyCode} from "$features/backend/useBackendStore.ts";
import {useState} from "react";

const LoginEMailModal = ({...restProps}: TopbarMenuModalProps) => {

    const {t} = useTranslation();

    const [showEmailInput, setShowEmailInput] = useState(true);

    const [showCodeInput, setShowCodeInput] = useState(false);

    const [showSendButton, setShowSendButton] = useState(true);

    const email = useUserDataStore(state => state.email);

    const code = useUserDataStore(state => state.code);

    const isLoggedIn = () => '' !== (localStorage.getItem('yadm-auth-key') || '');

    const handleSend = () => {

        if (showEmailInput) {

            const result = sendCodeToEmail();

            result.then(ok => {

                if (ok) {
                    setShowEmailInput(false);
                    setShowCodeInput(true);
                }

            });

        }

        if (showCodeInput) {

            const result = verifyCode();

            result.then(ok => {

                if (ok) {
                    setShowEmailInput(false);
                    setShowCodeInput(false);
                    setShowSendButton(false);

                    setTimeout(() => {
                        location.reload();
                    }, 500);

                }

            });

        }

    };

    function emailInput() {

        if (showEmailInput) {
            return (
                <TextField className="grid grid-cols-[auto_1fr] items-center gap-2">
                    <Label className="text-slate-900 text-xs">
                        {t(($) => $["e-mail"])}
                    </Label>
                    <Input name="email" type="email" value={email}
                           onChange={e => {
                               useUserDataStore.setState({email: e.target.value});
                           }}
                           className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500"/>
                </TextField>
            )
        }

    }

    function codeInput() {

        if (showCodeInput) {
            return (
                <TextField className="grid grid-cols-[auto_1fr] items-center gap-2">
                    <Label className="text-slate-900 text-xs">
                        {t(($) => $["code"])}
                    </Label>
                    <Input name="code" type="text" value={code}
                           onChange={e => {
                               useUserDataStore.setState({code: e.target.value});
                           }}
                           className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500"/>
                </TextField>
            )
        }

    }

    function sendButton() {

        if (showSendButton) {
            return (
                <Button onPress={() => handleSend()}
                        className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700">
                    Send
                </Button>
            );
        }

    }

    function showAllOk() {

        return (
            <p className="text-md text-slate-900 font-medium">All ok</p>
        );

    }

    if (isLoggedIn()) {
        return (
            <TopbarMenuModal {...restProps}>
                {showAllOk()}
            </TopbarMenuModal>
        );
    }

    return (
        <TopbarMenuModal {...restProps}>
            {emailInput()}
            {codeInput()}
            {sendButton()}
        </TopbarMenuModal>
    );
};

export default LoginEMailModal;
