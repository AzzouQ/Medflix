import { Device } from '@capacitor/core';
import i18next from 'i18next';
import en from './en/translation.json';
import fr from './fr/translation.json';

const capacitorLangDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  cacheUserLanguage: () => {},
  detect: (callback) => {
    Device.getLanguageCode().then(({ value }) => {
      callback(value);
    });
  },
};

i18next.use(capacitorLangDetector).init({
  interpolation: {
    // React already does escaping
    escapeValue: false,
  },
  fallbackLng: 'en',
  // Using simple hardcoded resources for simple example
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
});
const t = i18next.t.bind(i18next);

export { t };
export default i18next;
