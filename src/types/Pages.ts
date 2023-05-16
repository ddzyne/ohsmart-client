import type { ReactNode, SyntheticEvent } from 'react';
import type { Language, LanguageStrings } from './Language';

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

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface TabHeaderProps {
  handleChange: (event: SyntheticEvent, newValue: number) => void;
  value: number;
}

export interface ComponentTypes {
  [key: string]: (values: PageProps) => JSX.Element;
}