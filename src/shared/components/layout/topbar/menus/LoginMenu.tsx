import { useTranslation } from "react-i18next";
import LoginEmailModal from "$/shared/components/ui/modal/LoginEmailModal";
import { useState } from "react";
import TopbarMenuItem from "$shared/components/layout/topbar/_components/TopbarMenuItem.tsx";
import TopbarMenuButton from "$shared/components/layout/topbar/_components/TopbarMenuButton.tsx";

const LoginMenu = () => {
  const { t } = useTranslation();

  const [isEmailLoginOpen, setEmailLoginOpen] = useState(false);

  return (
    <>
      <TopbarMenuButton label={t(($) => $["Account"])}>
        <TopbarMenuItem onAction={() => setEmailLoginOpen(true)}>
          {t(($) => $["Login"])}
        </TopbarMenuItem>
        <TopbarMenuItem href="https://yadm.app/admin">
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
