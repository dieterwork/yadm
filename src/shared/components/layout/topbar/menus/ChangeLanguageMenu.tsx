import { changeLanguage, t } from "i18next";
import { useTranslation } from "react-i18next";
import { useI18NStore } from "$/features/i18n/i18n";
import TopbarListboxButton from "../_components/TopbarListboxButton";
import TopbarListboxItem from "../_components/TopbarListBoxItem";
import i18n from "$/features/i18n/config";
import { useState } from "react";
import type { Selection } from "react-aria-components";

const items = [
  { id: "en", label: i18n.t(($) => $["English"]) as string },
  {
    id: "nl-be",
    label: `${i18n.t(($) => $["Dutch"])} - ${i18n.t(
      ($) => $["Belgium"]
    )}` as string,
  },
  { id: "fr", label: i18n.t(($) => $["French"]) as string },
] satisfies Record<string, string>[];

const ChangeLanguageMenu = () => {
  const { t } = useTranslation();
  const lang = useI18NStore((state) => state.lang);

  const [selected, setSelected] = useState<Selection>(new Set([lang]));

  return (
    <TopbarListboxButton
      label={t(($) => $[items.find((item) => item.id === lang)])}
      items={items}
      selectedKeys={selected}
      selectionMode="single"
      onSelectionChange={(selection) => {
        setSelected(selection);
        console.log(selection);
        if (!(selection instanceof Set)) return;
        for (const entry of selection) {
          if (typeof entry !== "string") return;
          changeLanguage(entry);
        }
      }}
    >
      {(item) => <TopbarListboxItem label={item.label} />}
    </TopbarListboxButton>
  );
};

export default ChangeLanguageMenu;
