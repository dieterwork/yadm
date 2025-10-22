import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

  const [selected, setSelected] = useState<Selection>(new Set([i18n.language]));

  const label =
    items?.find((item) => item.id === i18n.language)?.label ?? "English";

  return (
    <TopbarListboxButton
      label={label}
      items={items}
      selectedKeys={selected}
      selectionMode="single"
      onSelectionChange={(selection) => {
        setSelected(selection);
        if (!(selection instanceof Set)) return;
        for (const entry of selection) {
          if (typeof entry !== "string") return;
          i18n.changeLanguage(entry);
          localStorage.setItem("lang", entry);
        }
      }}
    >
      {(item) => <TopbarListboxItem label={item.label} />}
    </TopbarListboxButton>
  );
};

export default ChangeLanguageMenu;
