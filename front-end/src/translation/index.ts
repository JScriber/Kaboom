import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "ACCOUNT": "Account"
    }
  },
  fr: {
    translation: {
      "ACCOUNT": "Compte"
    }
  }
};

i18n.use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
