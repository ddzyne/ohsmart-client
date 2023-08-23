import type { LanguageStrings, Language } from '../types/Language';

export function lookupLanguageString(obj: LanguageStrings | string | undefined, language: string): string | undefined {
  return (
    obj === undefined ?
    '' :
    typeof obj === 'string' ? 
    obj : 
    obj[language as Language]
  );
}

