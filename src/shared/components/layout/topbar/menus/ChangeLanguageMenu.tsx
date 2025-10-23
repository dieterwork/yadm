import { useTranslation } from "react-i18next";
import TopbarListboxButton from "../_components/TopbarListboxButton";
import TopbarListboxItem from "../_components/TopbarListBoxItem";
import i18n from "$/features/i18n/config";
import { useState } from "react";
import type { Key, Selection } from "react-aria-components";

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

  const [selected, setSelected] = useState<Key | null>(i18n.language);

  return (
    <TopbarListboxButton
      items={items}
      selectedKey={selected}
      defaultSelectedKey={items[0].id}
      onSelectionChange={async (selection) => {
        setSelected(selection);
        if (!selection) return;
        localStorage.setItem("lang", selection as string);
        await i18n.changeLanguage(selection as string);
      }}
    >
      {(item) => (
        <TopbarListboxItem label={item.label} textValue={item.label} />
      )}
    </TopbarListboxButton>
  );
};

export default ChangeLanguageMenu;
