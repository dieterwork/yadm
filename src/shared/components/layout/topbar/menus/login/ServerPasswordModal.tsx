import TopbarMenuModal, {
    type TopbarMenuModalProps,
} from "$/shared/components/layout/topbar/_components/TopbarMenuModal";
import {Button, Input, Label, TextField} from "react-aria-components";
import {useTranslation} from "react-i18next";
import {useAskServerPwdDataStore} from "$features/backend/useBackendStore.ts";
import {sha256} from "js-sha256";

const ServerPasswordModal = ({...restProps}: TopbarMenuModalProps) => {

    const {t} = useTranslation();

    function handlePress() {
        useAskServerPwdDataStore.setState({showPwdModal: false});
        useAskServerPwdDataStore.getState().callback();
    }

    return (
        <TopbarMenuModal {...restProps}>
            <TextField className="grid grid-cols-[auto_1fr] items-center gap-2">
                <Label className="text-slate-900 text-xs">
                    {t(($) => $["password"])}
                </Label>
                <Input name="password" type="password" autoComplete="off"
                       onChange={e => {
                           localStorage.setItem('yadm-pwd', sha256(e.target.value));
                       }}
                       className="outline-hidden border-1 border-slate-200 rounded-sm w-[16rem] text-sm h-[2rem] content-center px-2 focus-within:ring-2 focus-within:ring-sky-500"/>
            </TextField>
            <Button onPress={() => handlePress()}
                    className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700">
                Save
            </Button>
        </TopbarMenuModal>
    );
};

export default ServerPasswordModal;
