import i18n from 'i18next';
import type { LanguageStrings, Language } from '../types/Language';

export function lookupLanguageString(obj: LanguageStrings | string): string | undefined {
  return typeof obj === 'string' ? obj : obj[i18n.language as Language];
}
