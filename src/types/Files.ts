import type { LanguageStrings } from './Language';

export interface FileActions {
  label: string | LanguageStrings;
  value: string;
}

export type FileActionType = 'process' | 'role' | 'restricted' | 'valid';

export interface ReduxFileActions {
  id: string;
  type: FileActionType;
  value: any;
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
  valid?: boolean;
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

export interface DansSimpleList {
  list: string[];
}

export interface DansSimpleListQueryResponse {
  data: string[];
  isLoading: boolean;
  isFetching: boolean;
}

interface DansFilesFormat {
  'file-extension': string;
  'mime-type': string[];
  preferred: boolean;
  'required-convert-to': string;
}

export interface DansFilesResponse {
  type: string;
  format: DansFilesFormat[];
}

export interface DansFilesQueryResponse {
  data: DansFilesResponse[];
  isLoading: boolean;
  isFetching: boolean;
}