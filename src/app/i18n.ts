import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { languages } from '../config/global/languages';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { LanguageStrings, Language } from '../types/Language';

i18n
  .use(resourcesToBackend((language: string, namespace: string) => import(`../config/global/locales/${language}/${namespace}.json`)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: languages,
    detection: {
      order: ['cookie', 'localStorage'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;

export function lookupLanguageString(obj: LanguageStrings | string | undefined, language: string): string | undefined {
  return (
    obj === undefined ?
    '' :
    typeof obj === 'string' ? 
    obj : 
    obj[language as Language]
  );
}

