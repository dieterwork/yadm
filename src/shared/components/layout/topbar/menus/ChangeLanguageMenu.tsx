import { useTranslation } from "react-i18next";
import TopbarListboxButton from "../_components/TopbarListboxButton";
import TopbarListboxItem from "../_components/TopbarListBoxItem";
import i18n from "$/features/i18n/config";
import { useState } from "react";
import type { Key, Selection } from "react-aria-components";

const ChangeLanguageMenu = () => {
  const { t, i18n } = useTranslation();

  const items = [
    { id: "en", label: t(($) => $["English"]) as string },
    {
      id: "nl",
      label: `${t(($) => $["Dutch"])} - ${t(($) => $["Belgium"])}` as string,
    },
    { id: "fr", label: t(($) => $["French"]) as string },
  ] satisfies Record<string, string>[];

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
        console.log(selection);
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
