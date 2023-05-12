import type { ReactNode } from 'react';
import type { Language, LanguageStrings } from './Language';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface ComponentTypes {
  [key: string]: (values: any) => JSX.Element;
}

interface PageAction {
  link: string;
  text: string | LanguageStrings;
}

export interface Page {
  id: string;
  name: string | LanguageStrings;
  slug: string;
  template: 'deposit' | 'generic';
  inMenu: boolean;
  menuTitle?: string | LanguageStrings;
  content?: string | LanguageStrings;
  action?: PageAction;
  logo?: boolean;
}

export interface Link {
  name: string | LanguageStrings;
  link: string;
  icon?: string;
}

export interface Footer {
  header?: string | LanguageStrings;
  links?: Link[];
  freetext?: string | LanguageStrings;
}

export interface MenuBarProps {
  pages: Page[];
}

export interface PageProps {
  page: Page;
}