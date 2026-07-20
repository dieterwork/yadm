import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../../assets/locales/en/translation.json";
import nlBeTranslation from "../../assets/locales/nl/translation.json";
import frTranslation from "../../assets/locales/fr/translation.json";

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

export type Resources = (typeof resources)["en"];
export type DefaultNS = typeof defaultNS;

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: localStorage.getItem("lang") || "en",
    resources,
    defaultNS,
    ns: ["translation"],
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    enableSelector: true,
  });

export default i18n;
