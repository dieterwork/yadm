import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import nlBeTranslation from "./en/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: enTranslation,
  },
  "nl-be": {
    translation: nlBeTranslation,
  },
} as const;

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    defaultNS,
    ns: ["translation"],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
