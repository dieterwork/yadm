import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import { useState } from "react";
import CheatSheetModal from "./help/cheat_sheet/CheatSheetModal";
import AboutModal from "./help/about/AboutModal";
import InfoModal from "./help/info/InfoModal";
import { useTranslation } from "react-i18next";

const HelpMenu = () => {
  const [isCheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <TopbarMenuButton label={t(($) => $["Help"])}>
        <TopbarMenuItem onAction={() => setCheatSheetOpen(true)}>
          Cheat sheet
        </TopbarMenuItem>
        <TopbarMenuItem onAction={() => setInfoOpen(true)}>Info</TopbarMenuItem>
        <TopbarMenuItem onAction={() => setAboutOpen(true)}>
          About
        </TopbarMenuItem>
      </TopbarMenuButton>
      <CheatSheetModal
        title={t(($) => $["Cheat sheet"])}
        isOpen={isCheatSheetOpen}
        onOpenChange={(isOpen) => setCheatSheetOpen(isOpen)}
      />
      <InfoModal
        title={t(($) => $["Info"])}
        isOpen={isInfoOpen}
        onOpenChange={(isOpen) => setInfoOpen(isOpen)}
      />
      <AboutModal
        title={t(($) => $["About"])}
        isOpen={isAboutOpen}
        onOpenChange={(isOpen) => setAboutOpen(isOpen)}
      />
    </>
  );
};

export default HelpMenu;
