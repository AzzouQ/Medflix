import i18next, { LanguageDetectorAsyncModule } from 'i18next';
import { Device } from '@capacitor/device';

import { fr, en } from './locales';

const capacitorLangDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: (callback) => {
    Device.getLanguageCode().then(({ value }) => {
      callback(value);
    });
  },
  cacheUserLanguage: () => {},
};

i18next.use(capacitorLangDetector).init({
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
});

export const t = i18next.t.bind(i18next);
