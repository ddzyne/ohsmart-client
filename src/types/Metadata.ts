export type SectionStatus = 'error' | 'warning' | 'success' | undefined;

export interface SectionType {
  id: string;
  title: string;
  fields: Field[];
  status?: SectionStatus;
}

// note we use autocomplete for every selectbox
export type FieldType = 'text' | 'datetime-local' | 'date' | 'checkbox' | 'radiobutton' | 'autocomplete' | 'group';

export type OptionsType = {
  label: string;
  value: string;
};

export type Field = TextFieldType | AutocompleteFieldType | GroupFieldType | RepeatTextFieldType;
export type InputField = TextFieldType | AutocompleteFieldType;

export interface RepeatTextFieldType {
  type: 'repeatSingleField';
  id: string;
  fields: TextFieldType[];
}

export interface TextFieldType {
  type: 'text' | 'datetime-local' | 'date' | 'number';
  id: string;
  name: string;
  label: string;
  validation?: 'email' | 'number';
  maxValue?: number;
  minValue?: number; 
  value?: string;
  repeatable?: boolean;
  valid?: boolean | '';
  disabled?: boolean;
  multiline?: boolean;
  description?: string;
  required?: boolean;
  private?: boolean;
}

type TypeaheadAPI = 'orcid' | 'ror';

export interface AutocompleteFieldType {
  type: 'autocomplete';
  id: string;
  name: string;
  label: string;
  validation?: never;
  value?: any;
  multiselect?: boolean;
  valid?: boolean | '';
  disabled?: boolean;
  description?: string;
  required?: boolean;
  private?: boolean;
  options?: OptionsType[] | TypeaheadAPI;
}

export interface GroupFieldType {
  type: 'group';
  id: string;
  name: string;
  label: string;
  repeatable?: boolean;
  description?: string;
  fields: InputField[] | InputField[][];
}

export interface FieldProps {
  field: Field;
  sectionIndex: number;
  groupedFieldId?: string;
  currentField?: number;
  totalFields?: number;
}

export interface GroupFieldProps extends FieldProps {
  field: GroupFieldType;
}

export interface TextFieldProps extends FieldProps {
  field: TextFieldType;
}

export interface AutocompleteFieldProps extends FieldProps {
  field: AutocompleteFieldType;
}

export interface FieldButtonProps {
  sectionIndex: number;
  groupedFieldId?: string;
  deleteFieldIndex?: number;
  type?: 'single' | 'group';
  size?: 'small' | 'medium' | 'large';
}

export interface FieldSetPayload {
  sectionIndex: number;
  id: string;
  value: string | string[] | null;
  groupedFieldId?: string;
};

export type InitialStateType = {
  form: SectionType[];
  panel: string;
}