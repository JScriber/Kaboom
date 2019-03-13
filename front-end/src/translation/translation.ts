import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const bundle = require('i18next-resource-store-loader!../assets/i18n/index.ts');

/** List of all the available languages. */
export enum Languages {
  French = 'fr',
  English = 'en'
}

/** Default language. */
const DEFAULT_LANGUAGE = Languages.French;

/** Fallback language. */
const FALLBACK_LANGUAGE = Languages.English;

/** Configuration. */
i18n.use(initReactI18next)
  .init({
    resources: bundle,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: FALLBACK_LANGUAGE,
    keySeparator: '.',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
