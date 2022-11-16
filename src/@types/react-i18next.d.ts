import { resources, defaultNS } from '../i18n';
import 'react-i18next';
import translationEng from './locales/en/translation.json';
import translationRus from './locales/ru/translation.json';

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'translationEng';
    // custom resources type
    resources: {
      en: typeof translationEng;
      ru: typeof translationRus;
    };
  }
}
