import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEng from './locales/en/translation.json';
import translationRus from './locales/ru/translation.json';

export const defaultNS = 'translationEng';
export const resources = {
  en: {
    translationEng,
  },
  ru: {
    translationRus,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['translationEng'],
  defaultNS,
  resources,
});

export default i18n;
