import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import viTranslation from "./locales/vi.json";

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Tích hợp với React
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      vi: {
        translation: viTranslation,
      },
    },
    fallbackLng: "vi", // Ngôn ngữ mặc định
    debug: false,
    interpolation: {
      escapeValue: false, // React đã tự động escape
    },
  });

export default i18n;
