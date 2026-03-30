import { useTranslation } from "react-i18next";
import TopbarMenuButton from "$shared/components/layout/topbar/_components/TopbarMenuButton.tsx";
import TopbarMenuItem from "$shared/components/layout/topbar/_components/TopbarMenuItem.tsx";
import useUserStore from "$/features/auth/useUserStore";
import { clearModel } from "$/features/modeler/store/useDEMOModelerStore";
import useLocalModel from "$/features/modeler/hooks/useLocalModel";

const LoggedInMenu = () => {
  const { t } = useTranslation();
  const { setEmail, setPassword, setAuthKey } = useUserStore();
  const [_, setLocalModel] = useLocalModel();

  const logout = () => {
    setEmail(null);
    setPassword(null);
    setAuthKey(null);
    setLocalModel(null);
    clearModel();
  };

  return (
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
  );
};

export default LoggedInMenu;
