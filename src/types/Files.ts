export interface FileColumns {
  field: 'fileName' | 'readableSize' | 'readableType';
  headerName: string;
}

export interface FileActions {
  label: string;
  value: string;
}

export interface ReduxFileActions {
  fileName: string;
  type: 'process' | 'role' | 'restricted';
  value: FileActions | FileActions[] | boolean | null;
}

export type FileLocation = 'local' | 'online';

export interface SelectedFile {
  fileName: string;
  readableSize: string;
  readableType: string;
  location: FileLocation;
  restricted?: boolean;
  role?: FileActions;
  process?: FileActions[];
}