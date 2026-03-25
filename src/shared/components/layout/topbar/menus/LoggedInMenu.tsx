import { useTranslation } from "react-i18next";
import TopbarMenuButton from "$shared/components/layout/topbar/_components/TopbarMenuButton.tsx";
import TopbarMenuItem from "$shared/components/layout/topbar/_components/TopbarMenuItem.tsx";
import useUserStore from "$/features/auth/useUserStore";
import {
  clearModel,
  setEdges,
  setNodes,
} from "$/features/modeler/useDEMOModelerStore";

const LoggedInMenu = () => {
  const { t } = useTranslation();
  const { setEmail, setPassword, setAuthKey } = useUserStore();

  const logout = () => {
    setEmail(null);
    setPassword(null);
    setAuthKey(null);
    localStorage.removeItem("yadm-model");
    clearModel();
  };

  return (
    <>
      <TopbarMenuButton label={t(($) => $["Account"])}>
        <TopbarMenuItem href="https://yadm.app/admin/models">
          {t(($) => $["My models"])}
        </TopbarMenuItem>
        <TopbarMenuItem href="https://yadm.app/admin/profile">
          {t(($) => $["Profile"])}
        </TopbarMenuItem>
        <TopbarMenuItem href="https://yadm.app/admin/organisation">
          {t(($) => $["Organization"])}
        </TopbarMenuItem>
        <TopbarMenuItem onAction={() => logout()}>
          {t(($) => $["Logout"])}
        </TopbarMenuItem>
      </TopbarMenuButton>
      {/* <ServerPasswordModal
        title={t(($) => $["Pwd"])}
        isOpen={showPwdModal}
        onOpenChange={(isOpen) =>
          useAskServerPwdDataStore.setState({ showPwdModal: isOpen })
        }
      /> */}
    </>
  );
};

export default LoggedInMenu;
