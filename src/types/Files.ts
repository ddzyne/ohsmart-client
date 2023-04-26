export type FileColumn = 'name' | 'size' | 'type';

export interface FileActions {
  label: string;
  value: string;
}

export interface ReduxFileActions {
  id: string;
  type: 'process' | 'role' | 'restricted';
  value: FileActions | FileActions[] | boolean | null;
}

export type FileLocation = 'local' | 'online';

export interface SelectedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  location: FileLocation;
  url: string;
  restricted?: boolean;
  role?: FileActions;
  process?: FileActions[];
}