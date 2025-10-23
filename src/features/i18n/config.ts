import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import nlBeTranslation from "./nl/translation.json";
import frTranslation from "./fr/translation.json";

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: enTranslation,
  },
  nl: {
    translation: nlBeTranslation,
  },
  fr: {
    translation: frTranslation,
  },
} as const;

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: localStorage.getItem("lang") || "en",
    resources,
    debug: true,
    defaultNS,
    ns: ["translation"],
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
