import type { LanguageStrings } from './Language';

export type FileColumn = 'name' | 'size' | 'type';

export interface FileActions {
  label: string | LanguageStrings;
  value: string;
}

export type FileActionType = 'process' | 'role' | 'restricted';

export interface ReduxFileActions {
  id: string;
  type: FileActionType;
  value: FileActions | FileActions[] | boolean | null;
}

export interface SelectedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  location: FileLocation;
  url: string;
  restricted?: boolean;
  role?: FileActions;
  process?: FileActions[];
}

interface FileError {
  code: string;
  message: string;
}

export interface RejectedFiles {
  file: File;
  errors: FileError[];
}

export interface RejectedFilesProps {
  fileRejections: RejectedFiles[];
}

export type FileLocation = 'local' | 'online';
