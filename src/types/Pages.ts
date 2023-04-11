import type { ReactNode } from 'react';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface ComponentTypes {
  [key: string]: () => JSX.Element;
}