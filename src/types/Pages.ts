import type { ReactNode } from 'react';
import type { MultiLocaleString } from './Generic';

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
  // text: string | MultiLocaleString;
  text: any;
}

export interface Page {
  id: string;
  // name: string | MultiLocaleString;
  name: any;
  // slug: string | MultiLocaleString;
  slug: any;
  template: 'deposit' | 'generic';
  inMenu: boolean;
  // menuTitle?: string | MultiLocaleString;
  menuTitle?: any;
  // content?: string | MultiLocaleString;
  content?: any;
  action?: PageAction;
  logo?: boolean;
}

export interface MenuBarProps {
  pages: Page[];
}

export interface PageProps {
  page: Page;
}